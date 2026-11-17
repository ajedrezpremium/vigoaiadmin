// Renderiza una plantilla de correo a HTML/texto sin arrancar Next.
// Uso: node --experimental-strip-types scripts/render-email.mjs final gl out
import { writeFileSync } from "node:fs";
import { finalEmail, firstContactEmail } from "../lib/email-templates.ts";

const kind = process.argv[2] ?? "final";
const idioma = process.argv[3] === "es" ? "es" : "gl";
const base = process.argv[4] ?? "tmp/email-preview";

const lead = {
  concello: process.argv[5] ?? "Concello de Vigo",
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

const mail =
  kind === "first" ? firstContactEmail(lead) : kind === "final" ? finalEmail(lead) : finalEmail(lead);

writeFileSync(`${base}.html`, mail.html);
writeFileSync(`${base}.txt`, mail.text);
console.log(JSON.stringify({ kind, idioma, subject: mail.subject, html: `${base}.html`, text: `${base}.txt` }, null, 2));
