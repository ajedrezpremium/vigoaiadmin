// Informe global de seguimiento: portfolio de CHESS AI AGENCY + campaña de IA Administración Local.
//
//   node scripts/crm-report.mjs            # imprime el resumen
//   node scripts/crm-report.mjs --md       # además escribe SEGUIMIENTO_GLOBAL_CRM.md
//
// Lee el Supabase del CRM (okdeqt…). No escribe nada.
import { readFileSync, writeFileSync } from "node:fs";
const env = {};
for (const line of readFileSync("C:/Users/param/Documents/CHESS AI AGENCY/.env", "utf8").split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const H = { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}` };
async function get(table, q = "") {
  const r = await fetch(`${env.SUPABASE_URL}/rest/v1/${table}${q}`, { headers: H });
  if (!r.ok) return [];
  return r.json();
}
const stages = await get("project_stages", "?select=project_key,project_name,level&order=level.desc,project_name.asc");
const pipe = await get("crm_pipeline", "?select=*");
const logs = await get("campaign_logs", "?select=campaign,step,sent");

const byEstado = {};
for (const p of pipe) byEstado[p.estado] = (byEstado[p.estado] || 0) + 1;
const byProyecto = {};
for (const p of pipe) byProyecto[p.proyecto] = (byProyecto[p.proyecto] || 0) + 1;
const byCampaign = {};
for (const l of logs) byCampaign[l.campaign] = (byCampaign[l.campaign] || 0) + 1;
const iaLeads = pipe.filter((p) => p.proyecto === "IA Administración Local");
const vigo = pipe.filter((p) => p.proyecto === "VIGO AI ADMINISTRATION");

const L = [];
L.push(`# Seguimiento global · CHESS AI AGENCY + IA Administración Local`);
L.push(`\n**Generado:** ${new Date().toISOString().slice(0, 16).replace("T", " ")} · **Fuente:** Supabase del CRM (\`okdeqt…\`) · **Vista:** \`crm.html\`\n`);
L.push(`## 1. Portfolio de proyectos (${stages.length})\n`);
L.push(`| Nivel | Proyecto | Clave |`);
L.push(`|---:|---|---|`);
for (const s of stages) L.push(`| ${s.level} | ${s.project_name} | \`${s.project_key}\` |`);
L.push(`\n> Nivel 1 = DEMO … 10 = PRODUCTO. La campaña de IA Administración Local se sigue en el pipeline (§2), no como nivel de producto.\n`);
L.push(`## 2. Pipeline de la campaña (${pipe.length} oportunidades)\n`);
L.push(`| Estado | Nº |`);
L.push(`|---|---:|`);
for (const [k, v] of Object.entries(byEstado).sort()) L.push(`| ${k} | ${v} |`);
L.push(`\n**Por proyecto:**`);
for (const [k, v] of Object.entries(byProyecto)) L.push(`- ${k}: ${v}`);
L.push(`\n**Vigo (piloto):** ${vigo.length ? vigo.map((p) => `${p.cliente} · ${p.estado} · ${p.valor} €`).join("; ") : "—"}\n`);
L.push(`## 3. Envíos registrados (${logs.length})\n`);
L.push(`| Campaña | Envíos |`);
L.push(`|---|---:|`);
for (const [k, v] of Object.entries(byCampaign).sort()) L.push(`| ${k} | ${v} |`);
L.push(`\n## 4. Cómo se actualiza\n`);
L.push(`- Contactos y estado: CSV de este repo (\`CONTACTOS_*.csv\`).`);
L.push(`- Compartir con el CRM: \`node scripts/crm-sync.mjs --commit\`.`);
L.push(`- Este informe: \`node scripts/crm-report.mjs --md\`.`);
L.push(`- Vista interactiva: \`crm.html\` del proyecto CHESS AI AGENCY (login con token de admin).\n`);
const md = L.join("\n");
console.log(md);
if (process.argv.includes("--md")) {
  writeFileSync("SEGUIMIENTO_GLOBAL_CRM.md", md, "utf8");
  console.log("\n→ escrito SEGUIMIENTO_GLOBAL_CRM.md");
}
