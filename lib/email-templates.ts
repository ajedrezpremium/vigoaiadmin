// Plantillas de correo — aviso interno y acuse de recibo al concello.
// HTML de correo real: tablas, estilos en línea y nada de flexbox ni JS.
// Gmail, Outlook, Apple Mail y móviles renderizan esto igual (o casi).

import type { LeadInput } from "@/lib/leads";

const SITE = "https://vigo-ai-demo.vercel.app";
const LANDING = `${SITE}/administracion-local`;
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
        <img src="${LOGO}" width="248" height="62" alt="CHESS AI AGENCY"
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
          ${esc(OWNER)} &nbsp;·&nbsp;
          <a href="${PHONE_HREF}" style="color:#cbd5e1;text-decoration:none;">${esc(PHONE)}</a> &nbsp;·&nbsp;
          <a href="mailto:${MAIL}" style="color:#cbd5e1;text-decoration:none;">${esc(MAIL)}</a>
        </div>
        <div style="font:13px/1.7 ${FONT};margin-top:4px;">
          <a href="${LANDING}" style="color:#93b4fd;text-decoration:none;">vigo-ai-demo.vercel.app/administracion-local</a>
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

export function finalEmail(lead: LeadInput): { subject: string; html: string; text: string } {
  const es = lead.idioma === "es";
  const subject = es
    ? `Proposta de pilot · ${lead.concello}`
    : `Proposta de piloto · ${lead.concello}`;

  const copy = es
    ? {
        kicker: "Proposta de piloto",
        title: "VIGO AI ADMINISTRATION",
        subtitle: `Piloto para el Ayuntamiento de ${lead.concello} · 12.500 EUR · 6 semanas`,
        body: [
          "<p style='margin:0;font:16px/1.6 Arial,Helvetica,sans-serif;color:#334155;'>La necesidad:</p>",
          "<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>Un concello atiende a tres perfiles con necesidades distintas: personal municipal, proveedores y ciudadanía. Cada uno con un punto de dolor distinto, y ninguna responde a la duda del otro.</p>",
          "<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>La solución de CHESS AI AGENCY: un motor principal con subagentes especializados — información pública, trámites, normativa, empresa, urbanismo, cultura, social — que redacta, resume y transcribe con fuentes; la revisión humana la hace el personal.</p>",
          "<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>Seguridad y solvencia: respuestas con fuentes verificadas, revisión humana obligatoria, cumplimiento RGPD, ENS y AI Act; no automatizamos lo que no debe.</p>",
          "<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'><b>EL PILOTO · Por qué contratar ahora:</b></p>",
          "<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>Un asistente que responde con fuentes citadas, redacta borradores marcados como Borrador y transcribe reuniones. No sustituye la decisión humana: la revisión y la firma las mantiene el personal del concello.</p>",
          "<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>Empezamos por una unidad real: documentación, expedientes o trámites. Si el piloto no funciona, no se continúa: te quedas con el informe y la experiencia.</p>",
          "<p style='margin:18px 0 0;font:16px/1.4 Arial,Helvetica,sans-serif;color:#172052;'><b>Tarjeta sobre la ciudad:</b></p>",
          "<p style='margin:8px 0 0;font:14px/1.6 Arial,Helvetica,sans-serif;color:#334155;'>📍 Praza do Rei, 1 — 36202 Vigo, Pontevedra, Galicia</p>",
          "<img src=\"https://maps.google.com/maps?q=Praza+do+Rei+Vigo&z=14&ie=UTF8&iwloc=&output=embed\" width=\"552\" alt=\"Mapa de Vigo — Praza do Rei 1\" style=\"display:block;width:100%;max-width:552px;height:auto;border:0;outline:none;text-decoration:none;margin:10px 0;\" />",
          "<p style='margin:12px 0 0;font:14px/1.6 Arial,Helvetica,sans-serif;color:#334155;'>Interés sobre la ciudad (fuentes Wikipedia):</p>",
          "<ol style='margin:10px 0 0;padding-left:20px;font:13px/1.8 Arial,Helvetica,sans-serif;color:#475569;'>" +
          "<li>Extensión / superficie</li>" +
          "<li>Población</li>" +
          "<li>Clima</li>" +
          "<li>Presupuesto municipal</li>" +
          "<li>Gobierno municipal</li>" +
          "<li>Web oficial</li>" +
          "<li>Densidad / demografía</li>" +
          "<li>Distritos administrativos</li>" +
          "</ol>",
        ].join("\n"),
        cta: "Comenzar el piloto",
        note: "Sin compromiso · Sin permanencia · Con datos del concello · Con métricas acordadas por escrito.",
        legal:
          "Proposta comercial CHESS AI AGENCY · VIGO AI ADMINISTRATION · Piloto 6 semanas · 12.500 EUR · Quienes somos: https://chess-ai-agency.vercel.app/nosotros.html · 29 proxectos en curso.",
        preheader: "Comenzamos con una unidad real. Sin compromiso.",
      }
    : {
        kicker: "Proposta de piloto",
        title: "VIGO AI ADMINISTRATION",
        subtitle: `Piloto para o Concello de ${lead.concello} · 12.500 € · 6 semanas`,
        body: [
          "<p style='margin:0;font:16px/1.6 Arial,Helvetica,sans-serif;color:#334155;'>A necesidade:</p>",
          "<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>Un concello atende a tres perfiles con necesidades distintas: persoal municipal, provedores e cidadanía. Cada un un punto de dolor distinto, e ningun responde á duda do outro.</p>",
          "<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>A solución de CHESS AI AGENCY: un motor principal co subequipo de subagentes especializados — información pública, trámites, normativa, empresa, urbanismo, cultura, social — que redacta, resume e transcribe con fontes; a revisión humana faise o persoal.</p>",
          "<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>Segureza e solvencia: respostas con fontes verificadas, revisión humana obrigatoria, cumprimento RGPD, ENS e AI Act; non automaticemos o que non debe.</p>",
          "<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'><b>EL PILOTO · Por que contratar agora:</b></p>",
          "<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>Un asistente que responde con fontes citadas, redacta borradores marcados como Borrador e transcribe reunións. Non sustitúe a decisión humana: a revisión e a firma quedarán sempre co persoal do concello.</p>",
          "<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>Empiezan cunha unidade real: documentación, expedientes ou trámites. Si non funciona, no se continua: quédao co informe e coa aprendizaxe.</p>",
          "<p style='margin:18px 0 0;font:16px/1.4 Arial,Helvetica,sans-serif;color:#172052;'><b>Tarxada sobre a cidade:</b></p>",
          "<p style='margin:8px 0 0;font:14px/1.6 Arial,Helvetica,sans-serif;color:#334155;'>📍 Praza do Rei, 1 — 36202 Vigo, Pontevedra, Galicia</p>",
          "<img src=\"https://maps.google.com/maps?q=Praza+do+Rei+Vigo&z=14&ie=UTF8&iwloc=&output=embed\" width=\"552\" alt=\"Mapa de Vigo — Praza do Rei 1\" style=\"display:block;width:100%;max-width:552px;height:auto;border:0;outline:none;text-decoration:none;margin:10px 0;\" />",
          "<p style='margin:12px 0 0;font:14px/1.6 Arial,Helvetica,sans-serif;color:#334155;'>Interese sobre a cidade (fonte Wikipedia):</p>",
          "<ol style='margin:10px 0 0;padding-left:20px;font:13px/1.8 Arial,Helvetica,sans-serif;color:#475569;'>" +
          "<li>Extensión / superficie</li>" +
          "<li>Población</li>" +
          "<li>Clima</li>" +
          "<li>Presupuesto municipal</li>" +
          "<li>Gobierno municipal</li>" +
          "<li>Web oficial</li>" +
          "<li>Densidade / demografía</li>" +
          "<li>Distritos administrativos</li>" +
          "</ol>",
        ].join("\n"),
        cta: "Comenzar o piloto",
        note: "Sen compromiso · Sen permanencia · Con datos do concello · Con métricas acordadas por escrito.",
        legal:
          "Proposta comercial CHESS AI AGENCY · VIGO AI ADMINISTRATION · Piloto 6 semanas · 12.500 € · Quen somos: https://chess-ai-agency.vercel.app/nosotros.html · 29 proxectos en curso.",
        preheader: "Comenzamos con una unidad real. Sen compromiso.",
      };

  const body = `${copy.body}\n${button(LANDING, copy.cta)}\n<p style="margin:18px 0 0;font:13px/1.6 Arial,Helvetica,sans-serif;color:#94a3b8;">${esc(copy.note)}</p>`;

  const text = [
    `Proposta comercial — ${lead.concello}`,
    "",
    es ? `Piloto para el Ayuntamiento de ${lead.concello} · 12.500 EUR · 6 semanas` : `Piloto para o Concello de ${lead.concello} · 12.500 € · 6 semanas`,
    "",
    es ? "La necesidad:" : "A necessidade:",
    es
      ? "Un concello atiende a tres perfiles con necesidades distintas: personal municipal, proveedores y ciudadanía. Cada uno con un punto de dolor distinto, y ninguna responde a la duda del otro."
      : "Un concello atende a tres perfiles con necesidades distintas: persoal municipal, provedores e cidadanía. Cada un un punto de dolor distinto, e ningun responde á duda do outro.",
    es
      ? "La solución CHESS AI AGENCY: un motor principal con subagentes especializados..."
      : "A solución CHESS AI AGENCY: ...",
    es ? "Seguridad y solvencia: ..." : "Segureza e solvencia: ...",
    "",
    es ? "EL PILOTO · Por qué contratar ahora:" : "EL PILOTO · Por que contratar agora:",
    es
      ? "Un asistente que responde con fuentes citadas, redacta borradores marcados como Borrador y transcribe reuniones. No sustituye la decisión humana: la revisión y la firma las mantiene el personal del concello."
      : "Un asistente que responde con fontes citadas, redacta borradores marcados como Borrador e transcribe reunións. Non sustitúe a decisión humana: a revisión e a firma quedarán sempre co persoal do concello.",
    es
      ? "Empezamos por una unidad real: documentación, expedientes o trámites. Si el piloto no funciona, no se continúa: te quedas con el informe y la experiencia."
      : "Empiezan cunha unidade real: documentación, expedientes ou trámites. Si non funciona, no se continua: quédao co informe e coa aprendizaxe.",
    "",
    copy.cta,
    copy.note,
    "",
    `${FROM_NAME}`,
    `${OWNER}`,
    `${PHONE} · ${MAIL}`,
    LANDING,
    "",
    copy.legal,
  ].join("\n");

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
/* Versión primer contacto: solución de modernización IA para la     */
/* Administración Local. Sin nombrar el piloto, sin precio, sin       */
/* producto cerrado. CTA: solicitar demostración.                    */
/* ---------------------------------------------------------------- */

type Solucion = [string, string];

export function firstContactEmail(lead: LeadInput): { subject: string; html: string; text: string } {
  const es = lead.idioma === "es";
  const subject = es
    ? `Proposta de demo · ${lead.concello}`
    : `Proposta de demostración · ${lead.concello}`;

  const kicker = es ? "IA PARA LA ADMINISTRACIÓN LOCAL" : "IA PARA A ADMINISTRACIÓN LOCAL";
  const title = "CHESS AI AGENCY";
  const subtitle = es
    ? "Inteligencia Artificial para la Administración Local"
    : "Intelixencia Artificial para a Administración Local";
  const intro = es
    ? "Un nuevo modo de trabajar, gestionar y atender a la ciudadanía."
    : "Un novo xeito de traballar, xestionar e atender á cidadanía.";
  const seccionOportunidad = es ? "La oportunidad:" : "A oportunidade:";
  const oportunidad = es
    ? "Los concellos gestionan diariamente grandes volúmenes de información, documentación, consultas y trámites. El personal municipal dedica una parte importante de su tiempo a tareas administrativas que podrían ser más ágiles, eficientes e inteligentes."
    : "Os concellos xestionan diariamente grandes volumes de información, documentación, consultas e trámites. O persoal municipal dedica unha parte importante do seu tempo a tarefas administrativas que poderían ser máis áxiles, eficientes e intelixentes.";
  const ia = es
    ? "La Inteligencia Artificial permite dar un paso adelante en esta transformación."
    : "A Intelixencia Artificial permite dar un paso adiante nesta transformación.";
  const seccionPropuesta = es ? "Nuestra propuesta:" : "A nosa proposta:";
  const proposta = es
    ? "En CHESS AI AGENCY desarrollamos soluciones profesionales de Inteligencia Artificial para la Administración Local, mediante una arquitectura de agentes especializados que colaboran entre sí."
    : "En CHESS AI AGENCY desenvolvemos solucións profesionais de Inteligencia Artificial para a Administración Local, mediante unha arquitectura de axentes especializados que colaboran entre si.";
  const seccionPlataforma = es ? "Una plataforma capaz de:" : "Unha plataforma capaz de:";
  const soluciones: Solucion[] = [
    [
      "Información municipal",
      es
        ? "consultar documentación, normativa e información pública con fuentes de referencia."
        : "consultar documentación, normativa e información pública con fontes de referencia.",
    ],
    [
      "Tramitación administrativa",
      es
        ? "facilitar la localización de documentos y la preparación de borradores."
        : "facilitar a localización de documentos e a preparación de borradores.",
    ],
    [
      "Asistencia al personal",
      es
        ? "resumir expedientes, elaborar informes y optimizar tareas habituales."
        : "resumir expedientes, elaborar informes e optimizar tarefas habituais.",
    ],
    [
      "Atención ciudadana",
      es
        ? "responder consultas y facilitar el acceso a la información municipal."
        : "responder consultas e facilitar o acceso á información municipal.",
    ],
    [
      "Empresa y comercio",
      es
        ? "ofrecer información y asistencia a empresas, autónomos y proveedores."
        : "ofrecer información e asistencia a empresas, autónomos e provedores.",
    ],
    [
      "Servicios municipales",
      es
        ? "apoyar las áreas de urbanismo, cultura, servicios sociales y otras unidades."
        : "apoiar as áreas de urbanismo, cultura, servizos sociais e outras unidades.",
    ],
  ];
  const seccionHumana = es ? "Tecnología con supervisión humana:" : "Tecnoloxía con supervisión humana:";
  const humana = es
    ? "Una solución diseñada con criterios de seguridad, protección de datos y adecuación normativa (RGPD, ENS y AI Act), según el alcance de cada implantación. La IA ayuda, analiza y propone. Las decisiones, validaciones y firmas corresponden siempre al personal autorizado del Concello."
    : "Unha solución deseñada con criterios de segureza, protección de datos e adecuación normativa (RGPD, ENS e AI Act), segundo o alcance de cada implantación. A IA axuda, analiza e propón. As decisións, validacións e sinaturas corresponden sempre ao persoal autorizado do Concello.";
  const seccionPiloto = es ? "Una propuesta para su concejo:" : "UNHA PROPOSTA PARA O SEU CONCELLO:";
  const piloto = es
    ? "Proponemos conocer la solución mediante una demostración práctica, sin compromiso, y valorar posteriormente un posible proyecto piloto adaptado a las necesidades reales del municipio."
    : "Propoñemos coñecer a solución mediante unha demostración práctica, sen compromiso, e valorar posteriormente un posible proxecto piloto adaptado ás necesidades reais do municipio.";
  const cta = es ? "SOLICITAR DEMOSTRACIÓN" : "SOLICITAR UNHA DEMOSTRACIÓN";
  const note = es
    ? "Sin compromiso · Adaptable a cada Concello · Implantación progresiva."
    : "Sen compromiso · Adaptable a cada Concello · Implantación progresiva.";
  const legal = es
    ? "Proposta comercial CHESS AI AGENCY · Solución de IA para la Administración Local · Demostración sin compromiso."
    : "Proposta comercial CHESS AI AGENCY · Solución de IA para a Administración Local · Demostración sen compromiso.";
  const preheader = es
    ? "Una solución de IA para la Administración Local. Sin compromiso."
    : "Unha solución de IA para a Administración Local. Sen compromiso.";

  const body = [
    `<p style='margin:0;font:16px/1.6 Arial,Helvetica,sans-serif;color:#334155;'>${esc(intro)}</p>`,
    `<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>${esc(seccionOportunidad)}</p>`,
    `<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>${esc(oportunidad)}</p>`,
    `<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>${esc(ia)}</p>`,
    `<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'><b>${esc(seccionPropuesta)}</b></p>`,
    `<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>${esc(proposta)}</p>`,
    `<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>${esc(seccionPlataforma)}</p>`,
    `<ul style='margin:10px 0 0;padding-left:20px;font:15px/1.8 Arial,Helvetica,sans-serif;color:#334155;'>` +
      soluciones.map(([t, d]) => `<li><b>${t}:</b> ${d}</li>`).join("") +
      `</ul>`,
    `<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'><b>${esc(seccionHumana)}</b></p>`,
    `<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>${esc(humana)}</p>`,
    `<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>${esc(seccionPiloto)}</p>`,
    `<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>${esc(piloto)}</p>`,
  ].join("\n");

  const fullBody = `${body}\n${button(`${SITE}/demo`, cta)}\n<p style="margin:18px 0 0;font:13px/1.6 Arial,Helvetica,sans-serif;color:#94a3b8;">${esc(note)}</p>`;

  const text = [
    `Proposta comercial — ${lead.concello}`,
    "",
    es ? "Solución de IA para la Administración Local · Demostración sin compromiso." : "Solución de IA para a Administración Local · Demostración sen compromiso.",
    "",
    intro,
    "",
    seccionOportunidad,
    oportunidad,
    "",
    ia,
    "",
    seccionPropuesta,
    proposta,
    "",
    seccionPlataforma,
    ...soluciones.map(([t, d]) => `- ${t}: ${d}`),
    "",
    seccionHumana,
    humana,
    "",
    seccionPiloto,
    piloto,
    "",
    cta,
    note,
    "",
    `${FROM_NAME}`,
    `${OWNER}`,
    `${PHONE} · ${MAIL}`,
    LANDING,
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
      body: fullBody,
      legal,
      titleTag: subject,
    }),
    text,
  };
}
