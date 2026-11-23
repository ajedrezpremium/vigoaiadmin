// Sincroniza la campaña de IA para la Administración Local con el CRM de CHESS AI AGENCY.
//
//   node scripts/crm-sync.mjs            # simulación (no escribe)
//   node scripts/crm-sync.mjs --commit   # escribe en el Supabase del CRM
//
// Destino: Supabase de CHESS AI AGENCY (okdeqt…), tablas crm_pipeline y campaign_logs.
// Fuente: los CSV de campaña de este repo. No toca project_stages (el portfolio).
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

function readCsv(file) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/).filter((l) => l.trim() !== "");
  const head = lines[0].split(";");
  return lines.slice(1).map((l) => {
    const cells = l.split(";");
    const o = {};
    head.forEach((h, i) => (o[h.trim()] = (cells[i] ?? "").trim()));
    return o;
  });
}
const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const pipeline = new Map(); // id -> row
const logs = [];

function addPipeline({ concello, email, telefono, estado, proyecto, campaign, fecha, accion, valor = 0 }) {
  const id = `ial-${slug(concello)}`;
  pipeline.set(id, {
    id, cliente: concello, proyecto, resp: "Roberto Páramos",
    estado, accion: accion ?? "", fecha: fecha ?? "", valor,
    timestamp: new Date().toISOString(), email: email ?? "", telefono: telefono ?? "",
    _campaign: campaign,
  });
}

// 1) Pontevedra: solo contactados + Vigo. Los 21 aparcados no se sincronizan.
const pon = readCsv("CONTACTOS_PONTEVEDRA.csv");
for (const r of pon) {
  if (!r.concello || r.concello.includes("Oficina de Inform")) continue;
  const esVigo = r.concello === "Vigo";
  if (r.estado !== "contactado" && !esVigo) continue;
  addPipeline({
    concello: r.concello, email: r.correo, telefono: r.telefono,
    estado: esVigo ? "negotiation" : "contact",
    proyecto: esVigo ? "VIGO AI ADMINISTRATION" : "IA Administración Local",
    campaign: esVigo ? "vigo-piloto" : "ia-admin-local-pontevedra",
    fecha: r.data_contacto, accion: r.seguinte_paso, valor: esVigo ? 12500 : 0,
  });
  if (r.data_contacto) {
    logs.push({ email: r.correo, campaign: esVigo ? "vigo-piloto" : "ia-admin-local-pontevedra", step: Number(r.toque || 1), subject: esVigo ? `Propuesta de piloto · ${r.concello}` : `Proposta de demostración · ${r.concello}`, sent: true });
  }
}

// 2) Galicia >20k (A Coruña) y 3) Campaña 2 (ciudades + extensión): preparados, aún sin enviar.
for (const [file, camp] of [["CONTACTOS_GALICIA_20K.csv", "ia-admin-local-galicia"], ["CONTACTOS_CAMPANA_2.csv", "ia-admin-local-ciudades"]]) {
  for (const r of readCsv(file)) {
    if (!r.concello) continue;
    addPipeline({ concello: r.concello, email: r.correo, telefono: r.telefono, estado: "lead", proyecto: "IA Administración Local", campaign: camp, fecha: "", accion: r.seguinte_paso });
  }
}

// 4) España >50k: preparados (correo / formulario / teléfono), aún sin enviar.
for (const r of readCsv("CONTACTOS_ESPANA_50K.csv")) {
  if (!r.municipio) continue;
  addPipeline({ concello: r.municipio, email: r.correo, telefono: r.telefono, estado: "lead", proyecto: "IA Administración Local", campaign: "ia-admin-local-espana", fecha: "", accion: r.seguinte_paso });
}

const rows = [...pipeline.values()];
const byEstado = {};
for (const r of rows) byEstado[r.estado] = (byEstado[r.estado] || 0) + 1;
console.log(`Pipeline: ${rows.length} oportunidades · ${JSON.stringify(byEstado)}`);
console.log(`Campaign logs: ${logs.length} envíos`);
if (!commit) {
  console.log("\nSimulación. Muestra:");
  for (const r of rows.slice(0, 6)) console.log(`  ${r.id} | ${r.cliente} | ${r.estado} | ${r.email}`);
  console.log("\nUsa --commit para escribir en el CRM.");
  process.exit(0);
}

// Upsert pipeline (id es PK).
const up = await fetch(`${URL}/rest/v1/crm_pipeline`, {
  method: "POST",
  headers: { ...H, Prefer: "resolution=merge-duplicates,return=minimal" },
  body: JSON.stringify(rows.map(({ _campaign, ...r }) => r)),
});
console.log("upsert crm_pipeline:", up.status, up.ok ? "OK" : await up.text());

// Logs: borrar los de nuestras campañas y reinsertar (idempotente).
const camps = [...new Set(logs.map((l) => l.campaign))];
const del = await fetch(`${URL}/rest/v1/campaign_logs?campaign=in.(${camps.join(",")})`, { method: "DELETE", headers: { ...H, Prefer: "return=minimal" } });
console.log("delete campaign_logs:", del.status);
const ins = await fetch(`${URL}/rest/v1/campaign_logs`, { method: "POST", headers: { ...H, Prefer: "return=minimal" }, body: JSON.stringify(logs) });
console.log("insert campaign_logs:", ins.status, ins.ok ? "OK" : await ins.text());
if (!up.ok || !ins.ok) process.exit(1);
console.log("\nCampaña compartida con el CRM de CHESS AI AGENCY.");
