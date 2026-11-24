// Sincroniza la agenda de campaña con el CRM de CHESS AI AGENCY.
//
//   node scripts/crm-agenda-sync.mjs            # simulación
//   node scripts/crm-agenda-sync.mjs --commit   # escribe en Supabase
//
// Fuente: campaign/agenda.json (un evento por acción).
// Destino: Supabase del CRM (okdeqt…), tabla campaign_agenda.
// La tabla es de solo lectura para el CRM (política select); la escritura va
// con service_role desde este script.
import { readFileSync } from "node:fs";

const CHESS_ENV = "C:/Users/param/Documents/CHESS AI AGENCY/.env";
const env = {};
for (const line of readFileSync(CHESS_ENV, "utf8").split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const URL = env.SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const H = { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };
const commit = process.argv.includes("--commit");

const events = JSON.parse(readFileSync("campaign/agenda.json", "utf8"));
const REQUIRED = ["id", "campaign", "fecha", "tipo", "titulo"];
const TIPOS = new Set(["envio", "llamada", "formulario", "cierre", "hito"]);
const ESTADOS = new Set(["pendiente", "hecho", "desplazado", "cancelado"]);

let errors = 0;
const ids = new Set();
for (const e of events) {
  for (const k of REQUIRED) if (!e[k]) { console.error(`Falta ${k} en ${e.id || "(sin id)"}`); errors++; }
  if (ids.has(e.id)) { console.error(`ID duplicado: ${e.id}`); errors++; }
  ids.add(e.id);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(e.fecha)) { console.error(`Fecha inválida en ${e.id}: ${e.fecha}`); errors++; }
  if (!TIPOS.has(e.tipo)) { console.error(`Tipo inválido en ${e.id}: ${e.tipo}`); errors++; }
  if (e.estado && !ESTADOS.has(e.estado)) { console.error(`Estado inválido en ${e.id}: ${e.estado}`); errors++; }
}
if (errors) { console.error(`\n${errors} error(es). No se sincroniza.`); process.exit(1); }

const byCampaign = {};
const byTipo = {};
for (const e of events) {
  byCampaign[e.campaign] = (byCampaign[e.campaign] || 0) + 1;
  byTipo[e.tipo] = (byTipo[e.tipo] || 0) + 1;
}
console.log(`Agenda: ${events.length} eventos · ${new Date(events[0].fecha).toISOString().slice(0,10)} → ${new Date(events[events.length-1].fecha).toISOString().slice(0,10)}`);
console.log("Por campaña:", JSON.stringify(byCampaign));
console.log("Por tipo:", JSON.stringify(byTipo));

const rows = events.map((e) => ({
  id: e.id,
  campaign: e.campaign,
  fecha: e.fecha,
  hora: e.hora || "",
  tipo: e.tipo,
  titulo: e.titulo,
  detalle: e.detalle || "",
  estado: e.estado || "pendiente",
  responsable: e.responsable || "Roberto",
  referencia: e.referencia || "",
  updated_at: new Date().toISOString(),
}));

if (!commit) {
  console.log("\nSimulación. Primeros 3:");
  for (const r of rows.slice(0, 3)) console.log(`  ${r.fecha} ${r.hora} | ${r.campaign} | ${r.tipo} | ${r.titulo}`);
  console.log("\nUsa --commit para escribir en el CRM.");
  process.exit(0);
}

const res = await fetch(`${URL}/rest/v1/campaign_agenda`, {
  method: "POST",
  headers: { ...H, Prefer: "resolution=merge-duplicates,return=minimal" },
  body: JSON.stringify(rows),
});
console.log("\nupsert campaign_agenda:", res.status, res.ok ? "OK" : await res.text());
if (!res.ok) process.exit(1);
console.log("Agenda compartida con el CRM de CHESS AI AGENCY.");
