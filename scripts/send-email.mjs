// Envío puntual de una plantilla de correo por Resend (sin arrancar Next).
//
//   node --experimental-strip-types scripts/send-email.mjs --to 010@vigo.org --kind final --idioma gl --commit
//
// Sin --commit es una simulación: imprime el payload y no envía nada.
// El endpoint /api/admin/email-test está cerrado en producción a propósito;
// este script es el único camino para un envío real y siempre es manual.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { finalEmail, firstContactEmail } from "../lib/email-templates.ts";

function loadEnv(file = ".env.local") {
  const out = {};
  try {
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      out[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    // sin .env.local: se usan solo las variables ya presentes en el proceso
  }
  return out;
}

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}
const commit = args.includes("--commit");

const to = arg("to");
const kind = arg("kind", "final");
const idioma = arg("idioma", "gl") === "es" ? "es" : "gl";
const concello = arg("concello", "Concello de Vigo");
const replyTo = arg("reply-to", "chessagencyai@gmail.com");
const bcc = arg("bcc", "");
const subjectPrefix = arg("subject-prefix", "");

if (!to) {
  console.error("Falta --to. Ejemplo: --to 010@vigo.org --kind final --commit");
  process.exit(2);
}

const env = { ...loadEnv(), ...process.env };
const key = env.RESEND_API_KEY;
const from = arg("from", env.LEAD_FROM_EMAIL ?? "CHESS AI AGENCY <onboarding@resend.dev>");

if (!key) {
  console.error("Falta RESEND_API_KEY en .env.local o en el entorno.");
  process.exit(2);
}

const lead = {
  concello,
  nome: "",
  cargo: "",
  email: "",
  telefono: "",
  tramo: "A",
  interese: "Asistente de IA para a Administración Local",
  mensaxe: "",
  idioma,
  orixe: "campana",
};

const mail = kind === "first" ? firstContactEmail(lead) : finalEmail(lead);
const subject = `${subjectPrefix}${mail.subject}`;

const payload = {
  from,
  to: [to],
  reply_to: replyTo,
  subject,
  text: mail.text,
  html: mail.html,
};
if (bcc) payload.bcc = bcc.split(",").map((s) => s.trim()).filter(Boolean);

if (!commit) {
  console.log(
    JSON.stringify(
      { dryRun: true, from, to, reply_to: replyTo, subject, bytesText: mail.text.length, bytesHtml: mail.html.length },
      null,
      2
    )
  );
  console.log("\n--- texto que se enviaría ---\n" + mail.text);
  process.exit(0);
}

const res = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const body = await res.text();
mkdirSync("tmp", { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const logFile = `tmp/sent-${stamp}.json`;
writeFileSync(
  logFile,
  JSON.stringify({ at: new Date().toISOString(), status: res.status, response: body, request: { ...payload, html: undefined } }, null, 2)
);

if (!res.ok) {
  console.error(`Resend ${res.status}: ${body.slice(0, 400)}`);
  process.exit(1);
}
console.log(JSON.stringify({ sent: true, to, subject, status: res.status, id: JSON.parse(body).id ?? null, log: logFile }, null, 2));
