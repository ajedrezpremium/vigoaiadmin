// Captación de concellos — validación, almacenamiento y aviso de nuevos leads.
// Capa comercial separada del asistente: no toca el corpus ni el chat.

import { getServerSupabase } from "@/lib/supabase";

const DB_TIMEOUT_MS = 4_000;
const NOTIFY_TIMEOUT_MS = 4_000;

export const TRAMOS = ["A", "B", "C", "D", "outro"] as const;
export type Tramo = (typeof TRAMOS)[number];

export interface LeadInput {
  concello: string;
  nome: string;
  cargo?: string;
  email: string;
  telefono?: string;
  tramo?: string;
  interese?: string;
  mensaxe?: string;
  idioma?: string;
  orixe?: string;
  userAgent?: string;
}

export type LeadStore = "leads" | "audit" | "none";

function withTimeout<T>(p: PromiseLike<T>, ms = DB_TIMEOUT_MS): Promise<T> {
  return Promise.race([
    Promise.resolve(p),
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);
}

/** Limpia texto libre: sin caracteres de control, sin saltos múltiples, longitud acotada. */
function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export type ValidationResult =
  | { ok: true; lead: LeadInput }
  | { ok: false; error: string };

export function validateLead(raw: unknown): ValidationResult {
  const body = (raw ?? {}) as Record<string, unknown>;

  // Honeypot: un humano nunca rellena este campo.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return { ok: false, error: "Solicitud rechazada." };
  }

  const concello = clean(body.concello, 120);
  const nome = clean(body.nome, 120);
  const email = clean(body.email, 160).toLowerCase();
  const consent = body.consent === true || body.consent === "true";

  if (concello.length < 2) return { ok: false, error: "Indica o concello." };
  if (nome.length < 2) return { ok: false, error: "Indica o teu nome." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "O correo electrónico non é válido." };
  if (!consent) return { ok: false, error: "Precisamos o teu consentimento para responder." };

  const tramo = clean(body.tramo, 20);
  return {
    ok: true,
    lead: {
      concello,
      nome,
      cargo: clean(body.cargo, 120) || undefined,
      email,
      telefono: clean(body.telefono, 40) || undefined,
      tramo: TRAMOS.includes(tramo as Tramo) ? tramo : undefined,
      interese: clean(body.interese, 80) || undefined,
      mensaxe: clean(body.mensaxe, 1_500) || undefined,
      idioma: clean(body.idioma, 5) || "gl",
      orixe: "landing_ayuntamientos",
      userAgent: clean(body.userAgent, 300) || undefined,
    },
  };
}

/**
 * Guarda el lead en `leads`. Si la tabla aún no existe (falta ejecutar el SQL),
 * cae a `audit_events` con event_type `lead_ayuntamiento` para no perder el contacto.
 */
export async function saveLead(lead: LeadInput): Promise<LeadStore> {
  const client = getServerSupabase();
  if (!client) return "none";

  try {
    const { error } = await withTimeout(
      client.from("leads").insert({
        concello: lead.concello,
        nome: lead.nome,
        cargo: lead.cargo ?? null,
        email: lead.email,
        telefono: lead.telefono ?? null,
        tramo: lead.tramo ?? null,
        interese: lead.interese ?? null,
        mensaxe: lead.mensaxe ?? null,
        orixe: lead.orixe,
        idioma: lead.idioma,
        user_agent: lead.userAgent ?? null,
      })
    );
    if (!error) return "leads";
    console.warn("[leads] tabla leads no disponible:", error.message);
  } catch (e) {
    console.warn("[leads] timeout guardando en leads:", e);
  }

  try {
    const { error } = await withTimeout(
      client.from("audit_events").insert({
        event_type: "lead_ayuntamiento",
        payload: { ...lead, canal: "landing" },
      })
    );
    if (!error) return "audit";
    console.warn("[leads] fallback audit_events falló:", error.message);
  } catch (e) {
    console.warn("[leads] timeout guardando en audit_events:", e);
  }

  return "none";
}

function leadSummary(lead: LeadInput): string {
  return [
    `Novo contacto desde a landing: ${lead.concello}`,
    `Nome: ${lead.nome}${lead.cargo ? ` (${lead.cargo})` : ""}`,
    `Correo: ${lead.email}`,
    lead.telefono ? `Teléfono: ${lead.telefono}` : null,
    lead.tramo ? `Tramo: ${lead.tramo}` : null,
    lead.interese ? `Interese: ${lead.interese}` : null,
    lead.mensaxe ? `Mensaxe: ${lead.mensaxe}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Envía un correo con Resend. Nunca lanza: si falla, el lead ya está guardado y
 * solo queda una línea en el log. `false` significa "no entregado", no "error fatal".
 */
async function sendEmail(msg: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL ?? "VIGO AI <onboarding@resend.dev>",
        to: [msg.to],
        reply_to: msg.replyTo,
        subject: msg.subject,
        text: msg.text,
      }),
      signal: AbortSignal.timeout(NOTIFY_TIMEOUT_MS),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.warn("[leads] Resend respondió", res.status, detail.slice(0, 200));
      return false;
    }
    return true;
  } catch (e) {
    console.warn("[leads] fallo enviando correo:", e);
    return false;
  }
}

/** Acuse de recibo al concello, en su idioma. Refuerza la promesa de responder en 24 h. */
function autoReply(lead: LeadInput): { subject: string; text: string } {
  const demo = "https://vigo-ai-demo.vercel.app";
  const detalle = [
    `Concello: ${lead.concello}`,
    lead.interese ? `Interese: ${lead.interese}` : null,
    lead.tramo ? `Tamaño: ${lead.tramo}` : null,
    lead.mensaxe ? `Mensaxe: ${lead.mensaxe}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  if (lead.idioma === "es") {
    return {
      subject: `Solicitud recibida · ${lead.concello}`,
      text: [
        `Buenos días, ${lead.nome}:`,
        "",
        "Hemos recibido tu solicitud desde la web de VIGO AI ADMINISTRATION. Gracias por escribirnos.",
        "",
        "Resumen de lo que nos cuentas:",
        detalle,
        "",
        "Te respondemos en menos de 24 horas laborables a este mismo correo. Si prefieres hablar antes, llama al 607 869 278.",
        "",
        `Mientras tanto puedes probar la demo, sin registro: ${demo}`,
        "",
        "Un saludo,",
        "Roberto Páramos",
        "CHESS AI AGENCY · VIGO AI ADMINISTRATION",
        "607 869 278 · chessagencyai@gmail.com",
      ].join("\n"),
    };
  }

  return {
    subject: `Solicitude recibida · ${lead.concello}`,
    text: [
      `Bo día, ${lead.nome}:`,
      "",
      "Recibimos a túa solicitude desde a web de VIGO AI ADMINISTRATION. Grazas por escribirnos.",
      "",
      "Resumo do que nos contas:",
      detalle,
      "",
      "Respondémosche en menos de 24 horas laborables a este mesmo correo. Se prefires falar antes, chama ao 607 869 278.",
      "",
      `Mentres tanto podes probar a demo, sen rexistro: ${demo}`,
      "",
      "Un saúdo,",
      "Roberto Páramos",
      "CHESS AI AGENCY · VIGO AI ADMINISTRATION",
      "607 869 278 · chessagencyai@gmail.com",
    ].join("\n"),
  };
}

/**
 * Aviso inmediato del lead. Dos canales opcionales, configurables por entorno:
 *  - RESEND_API_KEY + LEAD_NOTIFY_EMAIL → correo interno + acuse de recibo al concello
 *  - LEAD_WEBHOOK_URL → POST JSON (Slack, Discord, Make, n8n…)
 * Si no hay ninguno, el lead queda igualmente guardado.
 */
export async function notifyLead(lead: LeadInput): Promise<boolean> {
  const text = leadSummary(lead);

  const [notified] = await Promise.all([
    (async () => {
      const to = process.env.LEAD_NOTIFY_EMAIL;
      if (!to) return false;
      return sendEmail({
        to,
        replyTo: lead.email,
        subject: `Novo lead · ${lead.concello} · ${lead.tramo ?? "sen tramo"}`,
        text,
      });
    })(),
    (async () => {
      const ack = autoReply(lead);
      return sendEmail({
        to: lead.email,
        replyTo: process.env.LEAD_NOTIFY_EMAIL,
        subject: ack.subject,
        text: ack.text,
      });
    })(),
  ]);

  let sent = notified;

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, content: text, lead }),
        signal: AbortSignal.timeout(NOTIFY_TIMEOUT_MS),
      });
      if (res.ok) sent = true;
      else console.warn("[leads] webhook respondió", res.status);
    } catch (e) {
      console.warn("[leads] fallo enviando webhook:", e);
    }
  }

  return sent;
}

export interface LeadRow {
  id?: string;
  created_at: string;
  concello: string;
  nome: string;
  cargo?: string | null;
  email: string;
  telefono?: string | null;
  tramo?: string | null;
  interese?: string | null;
  mensaxe?: string | null;
  estado?: string | null;
}

/** Lista para el panel interno: `leads` y, si no existe, los eventos de auditoría. */
export async function listLeads(limit = 100): Promise<LeadRow[]> {
  const client = getServerSupabase();
  if (!client) return [];

  try {
    const { data, error } = await withTimeout(
      client
        .from("leads")
        .select("id, created_at, concello, nome, cargo, email, telefono, tramo, interese, mensaxe, estado")
        .order("created_at", { ascending: false })
        .limit(limit)
    );
    if (!error && data) return data as LeadRow[];
  } catch (e) {
    console.warn("[leads] lectura de leads falló:", e);
  }

  try {
    const { data, error } = await withTimeout(
      client
        .from("audit_events")
        .select("id, created_at, payload")
        .eq("event_type", "lead_ayuntamiento")
        .order("created_at", { ascending: false })
        .limit(limit)
    );
    if (error || !data) return [];
    return data.map((row) => {
      const p = (row.payload ?? {}) as Record<string, unknown>;
      return {
        id: String(row.id),
        created_at: String(row.created_at),
        concello: String(p.concello ?? ""),
        nome: String(p.nome ?? ""),
        cargo: p.cargo ? String(p.cargo) : null,
        email: String(p.email ?? ""),
        telefono: p.telefono ? String(p.telefono) : null,
        tramo: p.tramo ? String(p.tramo) : null,
        interese: p.interese ? String(p.interese) : null,
        mensaxe: p.mensaxe ? String(p.mensaxe) : null,
        estado: "novo",
      };
    });
  } catch {
    return [];
  }
}
