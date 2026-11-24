// Sincroniza la agenda de campaña con el CRM de CHESS AI AGENCY.
//
//   node scripts/crm-agenda-sync.mjs                     # simulación
//   node scripts/crm-agenda-sync.mjs --commit            # escribe en Supabase
//   node scripts/crm-agenda-sync.mjs --done <id>         # marca hecho (y sincroniza)
//   node scripts/crm-agenda-sync.mjs --move <id>=<fecha> # cambia la fecha (y sincroniza)
//   node scripts/crm-agenda-sync.mjs --list              # lista los eventos pendientes
//
// Fuente: campaign/agenda.json (un evento por acción).
// Destino: Supabase del CRM (okdeqt…), tabla campaign_agenda.
// La tabla es de solo lectura para el CRM (política select); la escritura va
// con service_role desde este script.
import { readFileSync, writeFileSync } from "node:fs";

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

/* ---------- utilidades de mantenimiento ---------- */
const argOf = (name) => {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : null;
};
/** Escribe el JSON conservando un evento por línea (diffs mínimos). */
const saveJson = () =>
  writeFileSync("campaign/agenda.json", `[\n${events.map((e) => `  ${JSON.stringify(e)}`).join(",\n")}\n]\n`, "utf8");

if (process.argv.includes("--list")) {
  const pend = events.filter((e) => e.estado === "pendiente").sort((a, b) => `${a.fecha}${a.hora}`.localeCompare(`${b.fecha}${b.hora}`));
  console.log(`Agenda: ${events.length} eventos · ${pend.length} pendientes\n`);
  for (const e of pend) console.log(`${e.fecha} ${(e.hora || "").padEnd(5)} | ${e.campaign.padEnd(16)} | ${e.tipo.padEnd(10)} | ${e.titulo}`);
  process.exit(0);
}

let changed = false;
const doneId = argOf("--done");
if (doneId) {
  const e = events.find((x) => x.id === doneId);
  if (!e) {
    console.error(`No existe el evento ${doneId}. Usa --list para ver los ids.`);
    process.exit(1);
  }
  e.estado = "hecho";
  changed = true;
  console.log(`Hecho: ${e.fecha} · ${e.titulo}`);
}

const moveArg = argOf("--move");
if (moveArg) {
  const [id, fecha] = moveArg.split("=");
  const e = events.find((x) => x.id === id);
  if (!e || !fecha) {
    console.error(`Formato: --move <id>=YYYY-MM-DD`);
    process.exit(1);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || Number.isNaN(Date.parse(`${fecha}T00:00:00`))) {
    console.error(`Fecha inválida: ${fecha}`);
    process.exit(1);
  }
  const antes = e.fecha;
  e.fecha = fecha;
  e.estado = "pendiente";
  changed = true;
  console.log(`Movido: ${e.titulo} · ${antes} → ${fecha}`);
}

if (changed) saveJson();

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

if (!commit && !changed) {
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
