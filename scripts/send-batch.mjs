// Envío por lote de la campaña (máximo 10 destinatarios por día).
//
//   node --experimental-strip-types scripts/send-batch.mjs --file tmp/batch.json
//   node --experimental-strip-types scripts/send-batch.mjs --file tmp/batch.json --commit
//
// Sin --commit solo imprime el resumen (destinatario, asunto, enlace) y no envía nada.
// El JSON de entrada es una lista: [{ "concello": "...", "email": "...", "idioma": "gl" }]
// Regla de campaña: límite duro de 10 correos por ejecución.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { firstContactEmail, finalEmail } from "../lib/email-templates.ts";

function loadEnv(file = ".env.local") {
  const out = {};
  try {
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      out[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    // sin .env.local: solo variables de entorno del proceso
  }
  return out;
}

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}

const commit = args.includes("--commit");
const file = arg("file");
const kind = arg("kind", "first");
const bcc = arg("bcc", "gmparamos@gmail.com");
const replyTo = arg("reply-to", "chessagencyai@gmail.com");
const max = Number(arg("max", "10"));

if (!file) {
  console.error("Falta --file. Ejemplo: --file tmp/batch.json [--commit]");
  process.exit(2);
}

const batch = JSON.parse(readFileSync(file, "utf8"));
if (!Array.isArray(batch) || batch.length === 0) {
  console.error("El JSON debe ser una lista no vacía.");
  process.exit(2);
}
if (batch.length > max) {
  console.error(`El lote tiene ${batch.length} destinatarios y el límite es ${max}/día.`);
  process.exit(2);
}

const env = { ...loadEnv(), ...process.env };
const key = env.RESEND_API_KEY;
const from = arg("from", env.LEAD_FROM_EMAIL ?? "CHESS AI AGENCY <onboarding@resend.dev>");
if (!key && commit) {
  console.error("Falta RESEND_API_KEY en .env.local o en el entorno.");
  process.exit(2);
}

const results = [];

for (const item of batch) {
  const lead = {
    concello: item.concello,
    nome: "",
    cargo: "",
    email: item.email,
    telefono: "",
    tramo: item.tramo ?? "B",
    interese: "Asistente de IA para a Administración Local",
    mensaxe: "",
    idioma: item.idioma === "es" ? "es" : "gl",
    orixe: "campana",
  };
  const mail = kind === "final" ? finalEmail(lead) : firstContactEmail(lead);
  const payload = {
    from,
    to: [item.email],
    reply_to: replyTo,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  };
  if (bcc) payload.bcc = bcc.split(",").map((s) => s.trim()).filter(Boolean);

  if (!commit) {
    const link = (mail.text.match(/https:\/\/ia-administracion-local\.vercel\.app\/\S+/) ?? [""])[0];
    console.log(`${item.concello.padEnd(24)} ${item.email.padEnd(40)} ${mail.subject}  →  ${link}`);
    results.push({ concello: item.concello, email: item.email, subject: mail.subject, dryRun: true });
    continue;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await res.text();
  let id = null;
  try {
    id = JSON.parse(body).id ?? null;
  } catch {
    id = null;
  }
  const entry = { concello: item.concello, email: item.email, subject: mail.subject, status: res.status, id, ok: res.ok };
  results.push(entry);
  console.log(`${res.ok ? "OK " : "ERR"} ${item.concello.padEnd(24)} ${item.email.padEnd(40)} ${res.status} ${id ?? body.slice(0, 160)}`);

  // Pausa entre envíos para no disparar la cuota por segundo de Resend.
  await new Promise((r) => setTimeout(r, 1200));
}

mkdirSync("tmp", { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const logFile = `tmp/batch-${stamp}.json`;
writeFileSync(logFile, JSON.stringify({ at: new Date().toISOString(), commit, kind, bcc, results }, null, 2), "utf8");

const ok = results.filter((r) => r.ok).length;
console.log(`\n${commit ? `Enviados ${ok}/${results.length}` : `Simulación: ${results.length} correos`} · log: ${logFile}`);
if (commit && ok !== results.length) process.exit(1);
