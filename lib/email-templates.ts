// Plantillas de correo — aviso interno y acuse de recibo al concello.
// HTML de correo real: tablas, estilos en línea y nada de flexbox ni JS.
// Gmail, Outlook, Apple Mail y móviles renderizan esto igual (o casi).

import type { LeadInput } from "@/lib/leads";

const SITE = "https://vigo-ai-demo.vercel.app";
// Dominio neutro para la campaña: en fase 1 no debe verse "vigo" en el enlace.
const CAMPAIGN_SITE = process.env.CAMPAIGN_SITE_URL || "https://ia-administracion-local.vercel.app";
const LANDING = `${SITE}/ayuntamientos`;
const LOGO = `${SITE}/logo-email.png`;

const BRAND = "#2550eb";
const BRAND_SOFT = "#dbe6fe";
const INK = "#0f172a";
const MUTED = "#64748b";
const LINE = "#e2e8f0";
const PAPER = "#eef2f7";

const FROM_NAME = "CHESS AI AGENCY";
const OWNER = "Roberto Páramos";
const PHONE = "607 869 278";
const PHONE_HREF = "tel:+34607869278";
const MAIL = "chessagencyai@gmail.com";

export interface LeadEmail {
  subject: string;
  html: string;
  text: string;
}

export function leadEmails(lead: LeadInput) {
  return { alert: leadAlertEmail(lead), ack: leadAckEmail(lead), final: finalEmail(lead) };
}

const FONT = "Arial,Helvetica,sans-serif";

/** Escapa texto introducido por el usuario: nunca se inyecta HTML en un correo. */
export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string, href?: string): string {
  if (!value) return "";
  const content = href
    ? `<a href="${esc(href)}" style="color:${BRAND};text-decoration:none;">${esc(value)}</a>`
    : esc(value);
  return `<tr>
    <td style="padding:9px 0;font:12px/1.4 ${FONT};color:#94a3b8;text-transform:uppercase;letter-spacing:.6px;width:132px;vertical-align:top;">${esc(
      label
    )}</td>
    <td style="padding:9px 0;font:15px/1.5 ${FONT};color:${INK};vertical-align:top;">${content}</td>
  </tr>`;
}

function button(href: string, text: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 0;">
    <tr>
      <td bgcolor="${BRAND}" style="background:${BRAND};border-radius:9px;">
        <a href="${esc(href)}" style="display:inline-block;padding:13px 24px;font:bold 15px/1 ${FONT};color:#ffffff;text-decoration:none;border-radius:9px;">${esc(
          text
        )}</a>
      </td>
    </tr>
  </table>`;
}

interface LayoutOptions {
  lang: "gl" | "es";
  preheader: string;
  kicker: string;
  title: string;
  subtitle: string;
  body: string;
  legal: string;
  titleTag: string;
  role?: string;
  somos?: string;
  siteUrl?: string;
  siteLabel?: string;
  logo?: string;
}

function layout(o: LayoutOptions): string {
  return `<!doctype html>
<html lang="${o.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(o.titleTag)}</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${PAPER};font-size:1px;line-height:1px;">${esc(
    o.preheader
  )}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${PAPER}" style="background:${PAPER};">
<tr>
<td align="center" style="padding:28px 12px;">

  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${LINE};border-radius:14px;overflow:hidden;">

    <!-- Cabecera de marca -->
    <tr>
      <td bgcolor="${BRAND}" style="background:${BRAND};padding:26px 32px 22px;">
        <img src="${esc(o.logo ?? LOGO)}" width="248" height="62" alt="CHESS AI AGENCY"
             style="display:block;border:0;outline:none;text-decoration:none;width:248px;max-width:100%;height:auto;">
        <div style="height:10px;line-height:10px;font-size:0;">&nbsp;</div>
        <div style="font:13px/1.4 ${FONT};color:${BRAND_SOFT};">
          CHESS AI AGENCY &nbsp;·&nbsp; IA PARA CONCELLOS
        </div>
      </td>
    </tr>

    <!-- Cuerpo -->
    <tr>
      <td style="padding:30px 32px 10px;">
        <div style="font:bold 11px/1.4 ${FONT};color:${BRAND};letter-spacing:1.2px;text-transform:uppercase;">${esc(
    o.kicker
  )}</div>
        <h1 style="margin:8px 0 0;font:bold 25px/1.25 ${FONT};color:${INK};">${esc(o.title)}</h1>
        <p style="margin:8px 0 0;font:15px/1.55 ${FONT};color:${MUTED};">${esc(o.subtitle)}</p>
        <div style="height:22px;line-height:22px;font-size:0;">&nbsp;</div>
        <div style="height:1px;background:${LINE};line-height:1px;font-size:0;">&nbsp;</div>
        ${o.body}
      </td>
    </tr>

    <!-- Pie de página -->
    <tr>
      <td bgcolor="${INK}" style="background:${INK};padding:22px 32px;">
        <div style="font:bold 14px/1.4 ${FONT};color:#ffffff;">${esc(FROM_NAME)}</div>
        <div style="font:12px/1.6 ${FONT};color:#94a3b8;margin-top:2px;">AI · Innovation · Execution</div>
        <div style="font:13px/1.7 ${FONT};color:#cbd5e1;margin-top:10px;">
          ${esc(OWNER)}${o.role ? ` &nbsp;·&nbsp; ${esc(o.role)}` : ""} &nbsp;·&nbsp;
          <a href="${PHONE_HREF}" style="color:#cbd5e1;text-decoration:none;">${esc(PHONE)}</a> &nbsp;·&nbsp;
          <a href="mailto:${MAIL}" style="color:#cbd5e1;text-decoration:none;">${esc(MAIL)}</a>
        </div>
        ${o.somos ? `<div style="font:13px/1.7 ${FONT};margin-top:4px;"><a href="${esc(o.somos)}" style="color:#93b4fd;text-decoration:none;">${esc(o.somos)}</a></div>` : ""}
        <div style="font:13px/1.7 ${FONT};margin-top:4px;">
          <a href="${esc(o.siteUrl ?? LANDING)}" style="color:#93b4fd;text-decoration:none;">${esc(
            o.siteLabel ?? "vigo-ai-demo.vercel.app/administracion-local"
          )}</a>
        </div>
      </td>
    </tr>

  </table>

  <div style="max-width:600px;margin:0 auto;padding:14px 10px 0;font:11px/1.6 ${FONT};color:#94a3b8;text-align:center;">
    ${esc(o.legal)}
  </div>

</td>
</tr>
</table>
</body>
</html>`;
}

/* ---------------------------------------------------------------- */
/* Aviso interno: lo que te llega cuando un concello rellena el form */
/* ---------------------------------------------------------------- */

export function leadAlertEmail(lead: LeadInput): { subject: string; html: string; text: string } {
  const subject = `Novo lead · ${lead.concello} · ${lead.tramo ?? "sen tramo"}`;

  const rows = [
    row("Concello", lead.concello),
    row("Persoa", lead.nome + (lead.cargo ? ` · ${lead.cargo}` : "")),
    row("Correo", lead.email, `mailto:${lead.email}`),
    row("Teléfono", lead.telefono ?? "", lead.telefono ? `tel:${lead.telefono.replace(/\s/g, "")}` : undefined),
    row("Tramo", lead.tramo ?? ""),
    row("Interese", lead.interese ?? ""),
    row("Idioma", lead.idioma ?? ""),
  ]
    .filter(Boolean)
    .join("");

  const message = lead.mensaxe
    ? `<div style="margin-top:22px;padding:16px 18px;background:#f8fafc;border-left:3px solid ${BRAND};border-radius:0 8px 8px 0;">
         <div style="font:bold 11px/1.4 ${FONT};color:${MUTED};letter-spacing:.8px;text-transform:uppercase;">Mensaxe</div>
         <div style="margin-top:6px;font:15px/1.6 ${FONT};color:#334155;">${esc(lead.mensaxe)}</div>
       </div>`
    : "";

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:6px;">
      ${rows}
    </table>
    ${message}
    ${button(`mailto:${lead.email}?subject=${encodeURIComponent(`Re: ${subject}`)}`, "Responder ao concello")}
    <p style="margin:18px 0 0;font:13px/1.6 ${FONT};color:${MUTED};">
      Ou <a href="${SITE}/admin" style="color:${BRAND};text-decoration:none;">abre o panel de contactos</a> para velo xunto ao resto.
    </p>`;

  const text = [
    `Novo contacto desde a landing: ${lead.concello}`,
    `Nome: ${lead.nome}${lead.cargo ? ` (${lead.cargo})` : ""}`,
    `Correo: ${lead.email}`,
    lead.telefono ? `Teléfono: ${lead.telefono}` : null,
    lead.tramo ? `Tramo: ${lead.tramo}` : null,
    lead.interese ? `Interese: ${lead.interese}` : null,
    lead.mensaxe ? `Mensaxe: ${lead.mensaxe}` : null,
    "",
    `Responder: mailto:${lead.email}`,
    `Panel: ${SITE}/admin`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return {
    subject,
    html: layout({
      lang: "gl",
      preheader: `${lead.concello} · ${lead.nome} · ${lead.tramo ?? "sen tramo"}`,
      kicker: "Novo contacto",
      title: lead.concello,
      subtitle: `${lead.nome}${lead.cargo ? ` · ${lead.cargo}` : ""}`,
      body,
      legal: "Aviso automático da landing /ayuntamientos. Os datos do concello gárdanse en Supabase e non se comparten con terceiros.",
      titleTag: subject,
    }),
    text,
  };
}

/* ---------------------------------------------------------------- */
/* Acuse de recibo: lo que recibe el concello tras enviar el formulario */
/* ---------------------------------------------------------------- */

export function leadAckEmail(lead: LeadInput): { subject: string; html: string; text: string } {
  const es = lead.idioma === "es";
  const subject = es
    ? `Solicitud recibida · ${lead.concello}`
    : `Solicitude recibida · ${lead.concello}`;

  const copy = es
    ? {
        kicker: "Solicitud recibida",
        title: `Gracias, ${lead.nome}`,
        subtitle: `Hemos recibido la solicitud de ${lead.concello}. Te respondemos en menos de 24 horas laborables.`,
        rows: [
          row("Ayuntamiento", lead.concello),
          row("Interés", lead.interese ?? ""),
          row("Tamaño", lead.tramo ?? ""),
        ]
          .filter(Boolean)
          .join(""),
        next: [
          "Revisamos tu caso y te escribimos a este mismo correo.",
          "Si prefieres hablar antes, llama al 607 869 278.",
          "Mientras tanto, puedes probar la demo sin registro.",
        ],
        cta: "Probar la demo",
        note: "No compartimos tus datos con terceros. Puedes responder a este correo para añadir información.",
        preheader: "Te respondemos en menos de 24 horas laborables.",
        legal:
          "Este correo confirma tu solicitud. No es un servicio municipal en producción: la demo usa datos sintéticos.",
      }
    : {
        kicker: "Solicitude recibida",
        title: `Grazas, ${lead.nome}`,
        subtitle: `Recibimos a solicitude de ${lead.concello}. Respondémosche en menos de 24 horas laborables.`,
        rows: [
          row("Concello", lead.concello),
          row("Interese", lead.interese ?? ""),
          row("Tamaño", lead.tramo ?? ""),
        ]
          .filter(Boolean)
          .join(""),
        next: [
          "Revisamos o teu caso e escribímosche a este mesmo correo.",
          "Se prefires falar antes, chama ao 607 869 278.",
          "Mentres tanto, podes probar a demo sen rexistro.",
        ],
        cta: "Probar a demo",
        note: "Non compartimos os teus datos con terceiros. Podes responder a este correo para engadir información.",
        preheader: "Respondémosche en menos de 24 horas laborables.",
        legal:
          "Este correo confirma a túa solicitude. Non é un servizo municipal en produción: a demo usa datos sintéticos.",
      };

  const list = copy.next
    .map(
      (item) => `<tr>
        <td style="padding:5px 10px 5px 0;vertical-align:top;font:15px/1.5 ${FONT};color:${BRAND};">✓</td>
        <td style="padding:5px 0;font:15px/1.6 ${FONT};color:#334155;">${esc(item)}</td>
      </tr>`
    )
    .join("");

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:6px;">
      ${copy.rows}
    </table>
    <div style="margin-top:24px;padding:18px 20px;background:#f8fafc;border:1px solid ${LINE};border-radius:10px;">
      <div style="font:bold 11px/1.4 ${FONT};color:${MUTED};letter-spacing:.8px;text-transform:uppercase;">
        ${es ? "Qué pasa ahora" : "Que pasa agora"}
      </div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;">
        ${list}
      </table>
    </div>
    ${button(LANDING, copy.cta)}
    <p style="margin:18px 0 0;font:13px/1.6 ${FONT};color:${MUTED};">${esc(copy.note)}</p>`;

  const text = [
    es ? `Buenos días, ${lead.nome}:` : `Bo día, ${lead.nome}:`,
    "",
    copy.subtitle,
    "",
    es ? "Resumen de lo que nos cuentas:" : "Resumo do que nos contas:",
    `- ${es ? "Ayuntamiento" : "Concello"}: ${lead.concello}`,
    lead.interese ? `- ${es ? "Interés" : "Interese"}: ${lead.interese}` : null,
    lead.tramo ? `- ${es ? "Tamaño" : "Tamaño"}: ${lead.tramo}` : null,
    lead.mensaxe ? `- ${es ? "Mensaje" : "Mensaxe"}: ${lead.mensaxe}` : null,
    "",
    ...copy.next.map((l) => `· ${l}`),
    "",
    `${OWNER}`,
    `${FROM_NAME} · AI · Innovation · Execution`,
    `${PHONE} · ${MAIL}`,
    LANDING,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return {
    subject,
    html: layout({
      lang: es ? "es" : "gl",
      preheader: copy.preheader,
      kicker: copy.kicker,
      title: copy.title,
      subtitle: copy.subtitle,
      body,
      legal: copy.legal,
      titleTag: subject,
    }),
    text,
  };
}

/* ---------------------------------------------------------------- */
/* Versión final: proposta de piloto para un alcalde / concejal       */
/* (texto mínimo: por qué debe contratar y arrancar el proyecto piloto) */
/* ---------------------------------------------------------------- */

export function finalEmail(
  lead: LeadInput,
  opts: { intro?: string } = {}
): { subject: string; html: string; text: string } {
  const es = lead.idioma === "es";
  const subject = es
    ? `Propuesta de piloto · ${lead.concello}`
    : `Proposta de piloto · ${lead.concello}`;

  const intro = es
    ? "Estimados/as responsables del Ayuntamiento de Vigo:"
    : "Estimados/as responsables do Concello de Vigo:";
  const saludo = es
    ? "Desde <b>CHESS AI AGENCY</b>, queremos presentarles una propuesta de colaboración para explorar las posibilidades de la Inteligencia Artificial en la modernización y mejora de los servicios municipales."
    : "Desde <b>CHESS AI AGENCY</b>, queremos presentarlles unha proposta de colaboración para explorar as posibilidades da Intelixencia Artificial na modernización e mellora dos servizos municipais.";
  const piloto = es
    ? "Proponemos la implantación de un proyecto piloto de 6 semanas, con una inversión de <b>12.500 €</b>, orientado a mejorar tres ámbitos fundamentales:"
    : "Propoñemos a implantación dun proxecto piloto de 6 semanas, cun investimento de <b>12.500 €</b>, orientado a mellorar tres ámbitos fundamentais:";
  const scopes: Array<[string, string]> = es
    ? [
        ["Personal municipal", "asistencia en la consulta de documentación, normativa, elaboración de informes, redacción de borradores y transcripción de reuniones."],
        ["Empresas y proveedores", "acceso más ágil a la información pública, procedimientos, contratación y servicios municipales."],
        ["Ciudadanía", "información y orientación sobre servicios, trámites, actividades y recursos municipales."],
      ]
    : [
        ["Persoal municipal", "asistencia na consulta de documentación, normativa, elaboración de informes, redacción de borradores e transcrición de reunións."],
        ["Empresas e provedores", "acceso máis áxil á información pública, procedementos, contratación e servizos municipais."],
        ["Cidadanía", "información e orientación sobre servizos, trámites, actividades e recursos municipais."],
      ];
  const solT = es ? "Una solución de IA especializada" : "Unha solución de IA especializada";
  const sol1 = es
    ? "Nuestra propuesta combina un motor central de Inteligencia Artificial con un equipo de agentes especializados en diferentes áreas de la Administración: información pública, trámites, normativa, urbanismo, actividad empresarial, cultura y servicios sociales."
    : "A nosa proposta combina un motor central de Intelixencia Artificial cun equipo de axentes especializados en diferentes áreas da Administración: información pública, trámites, normativa, urbanismo, actividade empresarial, cultura e servizos sociais.";
  const sol2 = es
    ? "El sistema permite consultar información con referencias a las fuentes, preparar documentos y asistir al personal municipal en sus tareas habituales."
    : "O sistema permite consultar información con referencias ás fontes, preparar documentos e asistir ao persoal municipal nas súas tarefas habituais.";
  const ia = es
    ? "<b>La IA ayuda. Las personas deciden.</b> La supervisión, validación y firma de los documentos permanecen siempre bajo la responsabilidad del personal autorizado."
    : "<b>A IA axuda. As persoas deciden.</b> A supervisión, validación e sinatura dos documentos permanecen sempre baixo responsabilidade do persoal autorizado.";
  const pilotT = es ? "Un piloto práctico, medible y sin permanencia" : "Un piloto práctico, medible e sen permanencia";
  const pilot1 = es
    ? "Proponemos comenzar con una área o unidad municipal concreta, trabajando con documentación y necesidades reales del Concello."
    : "Propoñemos comezar cunha área ou unidade municipal concreta, traballando con documentación e necesidades reais do Concello.";
  const pilotM = es
    ? "Durante las seis semanas se establecerán objetivos e indicadores para evaluar:"
    : "Durante as seis semanas estableceranse obxectivos e indicadores para avaliar:";
  const metrics: string[] = es
    ? [
        "Reducción de los tiempos de consulta y gestión.",
        "Mejora de la productividad administrativa.",
        "Calidad y precisión de las respuestas.",
        "Utilidad para el personal y los usuarios de los servicios municipales.",
      ]
    : [
        "Redución dos tempos de consulta e xestión.",
        "Mellora da produtividade administrativa.",
        "Calidade e precisión das respostas.",
        "Utilidade para o persoal e os usuarios dos servizos municipais.",
      ];
  const seg = es
    ? "El proyecto se incorpora con criterios de seguridad, protección de datos (RGPD), adecuación al Esquema Nacional de Seguridad (ENS) y al Reglamento Europeo de Inteligencia Artificial (AI Act), según el alcance y los requisitos aplicables."
    : "O proxecto incorporarase con criterios de seguridade, protección de datos (RGPD), adecuación ao Esquema Nacional de Seguridade (ENS) e ao Regulamento Europeo de Intelixencia Artificial (AI Act), segundo o alcance e os requisitos aplicables.";
  const cierre = es
    ? "Al finalizar, el Concello dispondrá de una evaluación de los resultados y de una propuesta de posibles fases de ampliación. La continuidad será una decisión municipal, sin compromiso de permanencia."
    : "Ao finalizar, o Concello disporá dunha avaliación dos resultados e dunha proposta de posibles fases de ampliación. A continuidade será unha decisión municipal, sen compromiso de permanencia.";
  const demoT = es ? "Conozca la propuesta" : "Coñeza a proposta";
  const demo = es
    ? "Puede acceder a la presentación interactiva y conocer una demostración del proyecto en esta ligazón:"
    : "Pode acceder á presentación interactiva e coñecer unha demostración do proxecto nesta ligazón:";
  const demoUrl = `${SITE}/ayuntamientos`;
  const cierra2 = es
    ? "Nos gustaría tener la oportunidad de realizar una breve presentación y valorar conjuntamente una primera área de aplicación en el Concello de Vigo."
    : "Gustaríanos ter a oportunidade de realizar unha breve presentación e valorar conxuntamente unha primeira área de aplicación no Concello de Vigo.";
  const cierra3 = es
    ? "Agradecemos su atención y quedamos a su disposición."
    : "Agradecemos a súa atención e quedamos á súa disposición.";
  const atentamente = "Atentamente,";
  const role = es ? "Dirección de proyectos" : "Dirección de proxectos";

  const P = "margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;";
  const H = "margin:18px 0 0;font:16px/1.4 Arial,Helvetica,sans-serif;color:#172052;";
  const UL = "margin:10px 0 0;padding-left:20px;font:15px/1.8 Arial,Helvetica,sans-serif;color:#334155;";

  const body = [
    `<p style='margin:0;font:16px/1.6 Arial,Helvetica,sans-serif;color:#334155;'>${intro}</p>`,
    `<p style='${P}'>${saludo}</p>`,
    ...(opts.intro
      ? [
          `<p style='margin:12px 0 0;padding:12px 14px;background:#eef2f7;border-left:3px solid #2550eb;font:15px/1.6 Arial,Helvetica,sans-serif;color:#334155;'>${esc(
            opts.intro
          )}</p>`,
        ]
      : []),
    `<p style='${P}'>${piloto}</p>`,
    `<ul style='${UL}'>${scopes.map(([t, d]) => `<li><b>${t}:</b> ${d}</li>`).join("")}</ul>`,
    `<p style='${H}'><b>${solT}</b></p>`,
    `<p style='${P}'>${sol1}</p>`,
    `<p style='${P}'>${sol2}</p>`,
    `<p style='${P}'>${ia}</p>`,
    `<p style='${H}'><b>${pilotT}</b></p>`,
    `<p style='${P}'>${pilot1}</p>`,
    `<p style='${P}'>${pilotM}</p>`,
    `<ul style='${UL}'>${metrics.map((m) => `<li>${m}</li>`).join("")}</ul>`,
    `<p style='${P}'>${seg}</p>`,
    `<p style='${P}'>${cierre}</p>`,
    `<p style='${H}'><b>${demoT}</b></p>`,
    `<p style='${P}'>${demo}</p>`,
    `<p style='${P}'><a href='${demoUrl}' style='color:#2550eb;text-decoration:none;'>${demoUrl}</a></p>`,
    `<p style='${P}'>${cierra2}</p>`,
    `<p style='${P}'>${cierra3}</p>`,
    `<p style='margin:18px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>${atentamente}</p>`,
  ].join("\n");

  const copy = {
    legal: es
      ? "Propuesta comercial: VIGO AI ADMINISTRATION · Piloto de 6 semanas · 12.500 EUR · Quiénes somos: https://chess-ai-agency.vercel.app/nosotros.html · 28 proyectos en curso."
      : "Proposta comercial: VIGO AI ADMINISTRATION · Piloto de 6 semanas · 12.500 € · Quen somos: https://chess-ai-agency.vercel.app/nosotros.html · 28 proxectos en curso.",
    preheader: es
      ? "Piloto de 6 semanas con métricas acordadas. Sin compromiso."
      : "Piloto de 6 semanas con métricas acordadas. Sen compromiso.",
  };

  const text = [
    `${es ? "Propuesta comercial" : "Proposta comercial"} — ${lead.concello}`,
    "",
    intro,
    "",
    saludo.replace(/<[^>]+>/g, ""),
    "",
    ...(opts.intro ? [opts.intro, ""] : []),
    piloto.replace(/<[^>]+>/g, ""),
    ...scopes.map(([t, d]) => `- ${t}: ${d}`),
    "",
    solT,
    sol1,
    "",
    sol2,
    "",
    ia.replace(/<[^>]+>/g, ""),
    "",
    pilotT,
    pilot1,
    pilotM,
    ...metrics.map((m) => `- ${m}`),
    "",
    seg,
    "",
    cierre,
    "",
    demoT,
    demo,
    demoUrl,
    "",
    cierra2,
    cierra3,
    "",
    atentamente,
    "",
    FROM_NAME,
    "AI · Innovation · Execution",
    "",
    OWNER,
    role,
    `Tel. ${PHONE}`,
    MAIL,
    "https://chess-ai-agency.vercel.app/nosotros.html",
    "",
    LANDING,
    "",
    copy.legal,
  ].join("\n");

  return {
    subject,
    html: layout({
      lang: es ? "es" : "gl",
      preheader: copy.preheader,
      kicker: es ? "Propuesta de piloto" : "Proposta de piloto",
      title: "VIGO AI ADMINISTRATION",
      subtitle: es
        ? "Inteligencia Artificial al servicio de la Administración local."
        : "Intelixencia Artificial ao servizo da Administración local.",
      body,
      legal: copy.legal,
      titleTag: subject,
      role,
      somos: "https://chess-ai-agency.vercel.app/nosotros.html",
    }),
    text,
  };
}

/* ---------------------------------------------------------------- */
/* Versión primer contacto: solución de modernización IA para la     */
/* Administración Local. Sin nombrar el piloto, sin precio, sin       */
/* producto cerrado. CTA: solicitar demostración.                    */
/* ---------------------------------------------------------------- */

type Solucion = [string, string];

export function firstContactEmail(lead: LeadInput): { subject: string; html: string; text: string } {
  const es = lead.idioma === "es";
  const subject = es
    ? `Propuesta de demostración · ${lead.concello}`
    : `Proposta de demostración · ${lead.concello}`;

  const kicker = es ? "IA PARA LA ADMINISTRACIÓN LOCAL" : "IA PARA A ADMINISTRACIÓN LOCAL";
  const title = "CHESS AI AGENCY";
  const subtitle = es
    ? "Inteligencia Artificial para transformar la gestión municipal y mejorar la atención a la ciudadanía."
    : "Intelixencia Artificial para transformar a xestión municipal e mellorar a atención á cidadanía.";
  const intro = es
    ? "Una nueva forma de trabajar, gestionar y prestar servicios públicos."
    : "Un novo xeito de traballar, xestionar e prestar servizos públicos.";
  const oppT = es ? "La oportunidad" : "A oportunidade";
  const opp1 = es
    ? "Los concellos gestionan diariamente grandes volúmenes de información, documentación, consultas y trámites. El personal municipal dedica una parte importante de su tiempo a tareas administrativas y procesos repetitivos que podrían realizarse de manera más ágil y eficiente."
    : "Os concellos xestionan diariamente grandes volumes de información, documentación, consultas e trámites. O persoal municipal dedica unha parte importante do seu tempo a tarefas administrativas e procesos repetitivos que poderían realizarse de maneira máis áxil e eficiente.";
  const opp2 = es
    ? "La Inteligencia Artificial abre una nueva oportunidad para optimizar recursos, mejorar la productividad y ofrecer servicios públicos más accesibles e inteligentes."
    : "A Intelixencia Artificial abre unha nova oportunidade para optimizar recursos, mellorar a produtividade e ofrecer servizos públicos máis accesibles e intelixentes.";
  const propT = es ? "Nuestra propuesta" : "A nosa proposta";
  const prop1 = es
    ? "En <b>CHESS AI AGENCY</b> desarrollamos soluciones profesionales de Inteligencia Artificial para la Administración Local, mediante una arquitectura avanzada de agentes especializados que colaboran entre sí."
    : "En <b>CHESS AI AGENCY</b> desenvolvemos solucións profesionais de Inteligencia Artificial para a Administración Local, mediante unha arquitectura avanzada de axentes especializados que colaboran entre si.";
  const prop2 = es ? "Una plataforma capaz de:" : "Unha plataforma capaz de:";
  const soluciones: Array<[string, string]> = es
    ? [
        ["Información municipal", "consultar documentación, normativa e información pública con referencias a las fuentes."],
        ["Gestión administrativa", "localizar documentos, analizar información y preparar borradores."],
        ["Asistencia al personal", "resumir expedientes, elaborar informes y optimizar tareas habituales."],
        ["Atención a la ciudadanía", "responder consultas y facilitar el acceso a la información y a los servicios municipales."],
        ["Empresa y comercio", "ofrecer información y asistencia a empresas, autónomos y proveedores."],
        ["Servicios municipales", "apoyar áreas como urbanismo, cultura, servicios sociales y otras unidades administrativas."],
      ]
    : [
        ["Información municipal", "consultar documentación, normativa e información pública con referencias ás fontes."],
        ["Xestión administrativa", "localizar documentos, analizar información e preparar borradores."],
        ["Asistencia ao persoal", "resumir expedientes, elaborar informes e optimizar tarefas habituais."],
        ["Atención á cidadanía", "responder consultas e facilitar o acceso á información e aos servizos municipais."],
        ["Empresa e comercio", "ofrecer información e asistencia a empresas, autónomos e provedores."],
        ["Servizos municipais", "apoiar áreas como urbanismo, cultura, servizos sociais e outras unidades administrativas."],
      ];
  const tecT = es ? "Tecnología avanzada con supervisión humana" : "Tecnoloxía avanzada con supervisión humana";
  const tec1 = es
    ? "Una solución desarrollada con criterios de seguridad, privacidad y protección de datos, contemplando la adecuación al RGPD, al Esquema Nacional de Seguridad (ENS) y al Reglamento Europeo de Inteligencia Artificial (AI Act), según los requisitos aplicables."
    : "Unha solución desenvolvida con criterios de seguridade, privacidade e protección de datos, contemplando a adecuación ao RGPD, ao Esquema Nacional de Seguridade (ENS) e ao Regulamento Europeo de Inteligencia Artificial (AI Act), segundo os requisitos aplicables.";
  const tec2 = es
    ? "<b>La IA analiza, asiste y propone. Las personas supervisan, validan y deciden.</b>"
    : "<b>A IA analiza, asiste e propón. As persoas supervisan, validan e deciden.</b>";
  const tec3 = es
    ? "Las decisiones administrativas, validaciones y firmas permanecen siempre bajo la responsabilidad del personal municipal autorizado."
    : "As decisións administrativas, validacións e sinaturas permanecen sempre baixo a responsabilidade do persoal municipal autorizado.";
  const uniT = es ? "Una propuesta para su Ayuntamiento" : "Unha proposta para o seu Concello";
  const uni1 = es
    ? "Proponemos conocer las posibilidades de la solución mediante una demostración práctica y sin compromiso."
    : "Propoñemos coñecer as posibilidades da solución mediante unha demostración práctica e sen compromiso.";
  const uni2 = es
    ? "A partir de las necesidades identificadas, podremos valorar el alcance y el ritmo de una implantación adaptada a la realidad de cada municipio."
    : "A partir das necesidades identificadas, poderemos valorar o alcance e o ritmo dunha implantación adaptada á realidade de cada municipio.";
  const cta = es ? "SOLICITE UNA DEMOSTRACIÓN" : "SOLICITE UNHA DEMOSTRACIÓN";
  const note = es
    ? "Sin compromiso · Adaptable a cada Ayuntamiento · Implantación progresiva."
    : "Sen compromiso · Adaptable a cada Concello · Implantación progresiva.";
  const tagline = es
    ? "Soluciones profesionales de Inteligencia Artificial para la Administración Local."
    : "Solucións profesionais de Intelixencia Artificial para a Administración Local.";
  const role = es ? "Dirección de proyectos" : "Dirección de proxectos";
  const demoUrl = `${CAMPAIGN_SITE}/campana`;
  const campaignLanding = demoUrl;
  const legal = es
    ? "Propuesta comercial CHESS AI AGENCY · IA para la Administración Local · Demostración sin compromiso · Quiénes somos: https://chess-ai-agency.vercel.app/nosotros.html · 28 proyectos en curso."
    : "Proposta comercial CHESS AI AGENCY · IA para a Administración Local · Demostración sen compromiso · Quen somos: https://chess-ai-agency.vercel.app/nosotros.html · 28 proxectos en curso.";
  const preheader = es
    ? "Una demostración práctica y sin compromiso."
    : "Unha demostración práctica e sen compromiso.";

  const P = "margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;";
  const H = "margin:18px 0 0;font:16px/1.4 Arial,Helvetica,sans-serif;color:#172052;";
  const UL = "margin:10px 0 0;padding-left:20px;font:15px/1.8 Arial,Helvetica,sans-serif;color:#334155;";

  const body = [
    `<p style='margin:0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#475569;font-style:italic;'>${esc(intro)}</p>`,
    `<p style='${H}'><b>${esc(oppT)}</b></p>`,
    `<p style='${P}'>${esc(opp1)}</p>`,
    `<p style='${P}'>${esc(opp2)}</p>`,
    `<p style='${H}'><b>${esc(propT)}</b></p>`,
    `<p style='${P}'>${prop1}</p>`,
    `<p style='${P}'>${esc(prop2)}</p>`,
    `<ul style='${UL}'>${soluciones.map(([t, d]) => `<li><b>${esc(t)}:</b> ${esc(d)}</li>`).join("")}</ul>`,
    `<p style='${H}'><b>${esc(tecT)}</b></p>`,
    `<p style='${P}'>${esc(tec1)}</p>`,
    `<p style='${P}'>${tec2}</p>`,
    `<p style='${P}'>${esc(tec3)}</p>`,
    `<p style='${H}'><b>${esc(uniT)}</b></p>`,
    `<p style='${P}'>${esc(uni1)}</p>`,
    `<p style='${P}'>${esc(uni2)}</p>`,
    button(demoUrl, cta),
    `<p style="margin:14px 0 0;font:13px/1.6 Arial,Helvetica,sans-serif;color:#94a3b8;font-style:italic;">${esc(note)}</p>`,
    `<p style="margin:18px 0 0;font:13px/1.6 Arial,Helvetica,sans-serif;color:#64748b;font-style:italic;">${esc(tagline)}</p>`,
  ].join("\n");

  const text = [
    `${es ? "Propuesta comercial" : "Proposta comercial"} — ${lead.concello}`,
    "",
    subtitle,
    "",
    intro,
    "",
    `${oppT}:`,
    opp1,
    "",
    opp2,
    "",
    `${propT}:`,
    prop1.replace(/<[^>]+>/g, ""),
    "",
    prop2,
    ...soluciones.map(([t, d]) => `- ${t}: ${d}`),
    "",
    `${tecT}:`,
    tec1,
    "",
    tec2.replace(/<[^>]+>/g, ""),
    "",
    tec3,
    "",
    `${uniT}:`,
    uni1,
    "",
    uni2,
    "",
    cta,
    demoUrl,
    "",
    note,
    "",
    tagline,
    "",
    FROM_NAME,
    "AI · Innovation · Execution",
    "",
    OWNER,
    role,
    `Tel. ${PHONE}`,
    MAIL,
    "https://chess-ai-agency.vercel.app/nosotros.html",
    "",
    campaignLanding,
    "",
    legal,
  ].join("\n");

  return {
    subject,
    html: layout({
      lang: es ? "es" : "gl",
      preheader,
      kicker,
      title,
      subtitle,
      body,
      legal,
      titleTag: subject,
      role,
      somos: "https://chess-ai-agency.vercel.app/nosotros.html",
      siteUrl: campaignLanding,
      siteLabel: "ia-administracion-local.vercel.app/campana",
      logo: `${CAMPAIGN_SITE}/logo-email.png`,
    }),
    text,
  };
}

/* ---------------------------------------------------------------- */
/* Toque 3 (día 7): caso de uso concreto para el tamaño del concello */
/* ---------------------------------------------------------------- */

export function followUpEmail(lead: LeadInput): { subject: string; html: string; text: string } {
  const es = lead.idioma === "es";
  const subject = es
    ? `Seguimiento · IA para la Administración Local · ${lead.concello}`
    : `Seguimento · IA para a Administración Local · ${lead.concello}`;

  const kicker = es ? "IA PARA LA ADMINISTRACIÓN LOCAL" : "IA PARA A ADMINISTRACIÓN LOCAL";
  const title = "CHESS AI AGENCY";
  const subtitle = es
    ? "Un caso de uso concreto para un concello de su tamaño."
    : "Un caso de uso concreto para un concello do seu tamaño.";
  const intro = es
    ? "Hace unos días les escribí presentando nuestra propuesta de Inteligencia Artificial para la Administración Local. No quiero ocuparles más tiempo del necesario: les propongo un único ejemplo concreto, adaptado al tamaño de su concello."
    : "Hai uns días escribínvos presentando a nosa proposta de Intelixencia Artificial para a Administración Local. Non quero ocuparvos máis tempo do necesario: propóñovos un único exemplo concreto, adaptado ao tamaño do voso concello.";
  const casoT = es ? "Caso de uso" : "Caso de uso";
  const caso = es
    ? "Un asistente interno que responde en lenguaje natural a las consultas del personal municipal sobre documentación, normativa y procedimientos, con referencias a las fuentes oficiales. Reduce las consultas repetidas y libera tiempo para tareas de mayor valor. La IA asiste; las personas deciden."
    : "Un asistente interno que responde en linguaxe natural ás consultas do persoal municipal sobre documentación, normativa e procedementos, con referencias ás fontes oficiais. Reduce as consultas repetidas e libera tempo para tarefas de maior valor. A IA asiste; as persoas deciden.";
  const demoT = es ? "Demostración de 30 minutos" : "Demostración de 30 minutos";
  const demo = es
    ? "Me gustaría enseñarles una demostración de 30 minutos con información pública de su municipio, sin compromiso. Pueden ver una muestra aquí:"
    : "Gustaríame amosarvos unha demostración de 30 minutos con información pública do voso municipio, sen compromiso. Podedes ver unha mostra aquí:";
  const demoUrl = `${CAMPAIGN_SITE}/campana`;
  const cta = es ? "SOLICITE UNA DEMOSTRACIÓN" : "SOLICITE UNHA DEMOSTRACIÓN";
  const note = es
    ? "Si prefieren que lo dejemos para más adelante, díganmelo y no les insisto."
    : "Se preferides que o deixemos para máis adiante, dicídemolo e non insisto.";
  const legal = es
    ? "Propuesta comercial CHESS AI AGENCY · IA para la Administración Local · Demostración sin compromiso · 28 proyectos en curso."
    : "Proposta comercial CHESS AI AGENCY · IA para a Administración Local · Demostración sen compromiso · 28 proxectos en curso.";
  const preheader = es
    ? "Un caso de uso concreto y una demostración de 30 minutos."
    : "Un caso de uso concreto e unha demostración de 30 minutos.";
  const role = es ? "Dirección de proyectos" : "Dirección de proxectos";

  const P = "margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;";
  const H = "margin:18px 0 0;font:16px/1.4 Arial,Helvetica,sans-serif;color:#172052;";

  const body = [
    `<p style='${P}'>${esc(intro)}</p>`,
    `<p style='${H}'><b>${esc(casoT)}</b></p>`,
    `<p style='${P}'>${esc(caso)}</p>`,
    `<p style='${H}'><b>${esc(demoT)}</b></p>`,
    `<p style='${P}'>${esc(demo)}</p>`,
    button(demoUrl, cta),
    `<p style="margin:14px 0 0;font:13px/1.6 Arial,Helvetica,sans-serif;color:#94a3b8;font-style:italic;">${esc(note)}</p>`,
  ].join("\n");

  const text = [
    `${es ? "Seguimiento" : "Seguimento"} — ${lead.concello}`,
    "",
    intro,
    "",
    `${casoT}:`,
    caso,
    "",
    `${demoT}:`,
    demo,
    demoUrl,
    "",
    note,
    "",
    FROM_NAME,
    "AI · Innovation · Execution",
    "",
    OWNER,
    role,
    `Tel. ${PHONE}`,
    MAIL,
    "https://chess-ai-agency.vercel.app/nosotros.html",
    "",
    legal,
  ].join("\n");

  return {
    subject,
    html: layout({
      lang: es ? "es" : "gl",
      preheader,
      kicker,
      title,
      subtitle,
      body,
      legal,
      titleTag: subject,
      role,
      somos: "https://chess-ai-agency.vercel.app/nosotros.html",
      siteUrl: demoUrl,
      siteLabel: "ia-administracion-local.vercel.app/campana",
      logo: `${CAMPAIGN_SITE}/logo-email.png`,
    }),
    text,
  };
}

/* ---------------------------------------------------------------- */
/* Toque 4 (día 14): cierre de cortesía                              */
/* ---------------------------------------------------------------- */

export function closingEmail(lead: LeadInput): { subject: string; html: string; text: string } {
  const es = lead.idioma === "es";
  const subject = es
    ? `¿Lo dejamos para el próximo trimestre? · ${lead.concello}`
    : `¿Deixámolo para o próximo trimestre? · ${lead.concello}`;

  const kicker = es ? "IA PARA LA ADMINISTRACIÓN LOCAL" : "IA PARA A ADMINISTRACIÓN LOCAL";
  const title = "CHESS AI AGENCY";
  const subtitle = es ? "Cierre de cortesía." : "Pechado de cortesía.";
  const intro = es
    ? "Les escribo por última vez sobre esta propuesta. No quiero ser insistente: si ahora no es el momento, lo entendemos perfectamente."
    : "Escribos por última vez sobre esta proposta. Non quero ser insistente: se agora non é o momento, entendémolo perfectamente.";
  const prop = es
    ? "Dejo la puerta abierta para el próximo trimestre. Si en algún momento quieren ver la demostración o retomar la conversación, estaré encantado de atenderles."
    : "Deixo a porta aberta para o próximo trimestre. Se nalgún momento queredes ver a demostración ou retomar a conversa, estarei encantado de atendervos.";
  const link = es
    ? "Mientras tanto, pueden consultar la muestra en cualquier momento:"
    : "Mentres tanto, podedes consultar a mostra en calquera momento:";
  const demoUrl = `${CAMPAIGN_SITE}/campana`;
  const cta = es ? "VER LA MUESTRA" : "VER A MOSTRA";
  const note = es ? "Gracias por su tiempo y atención." : "Grazas polo voso tempo e atención.";
  const legal = es
    ? "Propuesta comercial CHESS AI AGENCY · IA para la Administración Local · Demostración sin compromiso · 28 proyectos en curso."
    : "Proposta comercial CHESS AI AGENCY · IA para a Administración Local · Demostración sen compromiso · 28 proxectos en curso.";
  const preheader = es
    ? "Cierre de cortesía. Puerta abierta para el próximo trimestre."
    : "Pechado de cortesía. Porta aberta para o próximo trimestre.";
  const role = es ? "Dirección de proyectos" : "Dirección de proxectos";

  const P = "margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;";

  const body = [
    `<p style='${P}'>${esc(intro)}</p>`,
    `<p style='${P}'>${esc(prop)}</p>`,
    `<p style='${P}'>${esc(link)}</p>`,
    button(demoUrl, cta),
    `<p style="margin:14px 0 0;font:13px/1.6 Arial,Helvetica,sans-serif;color:#94a3b8;font-style:italic;">${esc(note)}</p>`,
  ].join("\n");

  const text = [
    `${es ? "Cierre de cortesía" : "Pechado de cortesía"} — ${lead.concello}`,
    "",
    intro,
    "",
    prop,
    "",
    link,
    demoUrl,
    "",
    note,
    "",
    FROM_NAME,
    "AI · Innovation · Execution",
    "",
    OWNER,
    role,
    `Tel. ${PHONE}`,
    MAIL,
    "https://chess-ai-agency.vercel.app/nosotros.html",
    "",
    legal,
  ].join("\n");

  return {
    subject,
    html: layout({
      lang: es ? "es" : "gl",
      preheader,
      kicker,
      title,
      subtitle,
      body,
      legal,
      titleTag: subject,
      role,
      somos: "https://chess-ai-agency.vercel.app/nosotros.html",
      siteUrl: demoUrl,
      siteLabel: "ia-administracion-local.vercel.app/campana",
      logo: `${CAMPAIGN_SITE}/logo-email.png`,
    }),
    text,
  };
}
