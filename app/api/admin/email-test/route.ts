// API /api/admin/email-test — envía una copia de las plantillas de correo.
// Sirve para revisar diseño, logo y textos sin esperar a que un concello rellene el formulario.
// Protegido con ADMIN_TOKEN (x-admin-key), igual que el resto del panel.

import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth, hasRole } from "@/lib/admin-auth";
import { sendEmail } from "@/lib/leads";
import { firstContactEmail, leadEmails } from "@/lib/email-templates";
import type { LeadInput } from "@/lib/leads";

export const runtime = "nodejs";
export const maxDuration = 30;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const SAMPLE: LeadInput = {
  concello: "Concello de Moaña",
  nome: "Ana Pérez",
  cargo: "Secretaría Xeral",
  email: "ana.perez@concellodemoana.org",
  telefono: "986 310 100",
  tramo: "B",
  interese: "Borradores e informes",
  mensaxe:
    "Temos 4.000 expedientes de licencias sen indexar. Queremos probar o asistente cunha área concreta antes de decidir.",
  idioma: "gl",
  orixe: "prueba_admin",
};

export async function POST(req: NextRequest) {
  const auth = await checkAdminAuth(req);
  if (!hasRole(auth, "admin")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const to = typeof body.to === "string" ? body.to.trim() : "";
  const kind = body.kind === "alert" || body.kind === "final" || body.kind === "first" || body.kind === "both" ? body.kind : "ack";

  if (!EMAIL_RE.test(to)) {
    return NextResponse.json({ error: "Indica un correo válido en 'to'." }, { status: 400 });
  }

  const lead: LeadInput = {
    ...SAMPLE,
    ...(typeof body.concello === "string" && body.concello.trim() ? { concello: body.concello.trim() } : {}),
    ...(typeof body.idioma === "string" && body.idioma === "es" ? { idioma: "es" } : {}),
  };

  const { alert, ack, final } = leadEmails(lead);
  const first = firstContactEmail(lead);

  const results: Record<string, boolean> = {};

  if (kind === "ack" || kind === "both") {
    results.ack = await sendEmail({
      to,
      replyTo: process.env.LEAD_NOTIFY_EMAIL,
      subject: `[PRUEBA] ${ack.subject}`,
      text: ack.text,
      html: ack.html,
    });
  }

  if (kind === "alert" || kind === "both") {
    results.alert = await sendEmail({
      to,
      replyTo: lead.email,
      subject: `[PRUEBA] ${alert.subject}`,
      text: alert.text,
      html: alert.html,
    });
  }

  if (kind === "final") {
    results.final = await sendEmail({
      to,
      replyTo: process.env.LEAD_NOTIFY_EMAIL,
      subject: `[PRUEBA] ${final.subject}`,
      text: final.text,
      html: final.html,
    });
  }

  if (kind === "first" || kind === "both") {
    results.first = await sendEmail({
      to,
      replyTo: process.env.LEAD_NOTIFY_EMAIL,
      subject: `[PRUEBA] ${first.subject}`,
      text: first.text,
      html: first.html,
    });
  }

  return NextResponse.json({ ok: Object.values(results).some(Boolean), sent: results });
}
