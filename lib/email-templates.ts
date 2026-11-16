// Plantillas de correo — aviso interno y acuse de recibo al concello.
// HTML de correo real: tablas, estilos en línea y nada de flexbox ni JS.
// Gmail, Outlook, Apple Mail y móviles renderizan esto igual (o casi).

import type { LeadInput } from "@/lib/leads";

const SITE = "https://vigo-ai-demo.vercel.app";
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
          VIGO AI ADMINISTRATION &nbsp;·&nbsp; IA para concellos
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
          <a href="${LANDING}" style="color:#93b4fd;text-decoration:none;">vigo-ai-demo.vercel.app/ayuntamientos</a>
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
        kicker: "Propuesta de piloto",
        title: "VIGO AI ADMINISTRATION",
        subtitle: `Piloto para el Ayuntamiento de ${lead.concello} · 12.500 EUR · 6 semanas`,
        body:
          "<p style='margin:0;font:16px/1.6 Arial,Helvetica,sans-serif;color:#334155;'>Por qué contratar ahora:</p>" +
          "<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>Un asistente que responde con fuentes citadas, redacta borradores marcados como Borrador y transcribe reuniones. No sustituye la decisión humana: la revisión y la firma las mantiene el personal del concello.</p>" +
          "<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>Empezamos por una unidad real: documentación, expedientes o trámites. Si el piloto no funciona, no se continúa: te quedas con el informe y la experiencia.</p>",
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
        body:
          "<p style='margin:0;font:16px/1.6 Arial,Helvetica,sans-serif;color:#334155;'>Por que contratar agora:</p>" +
          "<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>Un asistente que responde con fontes citadas, redacta borradores marcados como Borrador e transcribe reunións. Non sustitúe a decisión humana: a revisión e a firma quedarán sempre co persoal do concello.</p>" +
          "<p style='margin:10px 0 0;font:15px/1.65 Arial,Helvetica,sans-serif;color:#334155;'>Empiezan cunha unidade real: documentación, expedientes ou trámites. Si no funciona, no se continua: quédao co informe e coa aprendizaxe.</p>",
        cta: "Comenzar o piloto",
        note: "Sen compromiso · Sen permanencia · Con datos do concello · Con métricas acordadas por escrito.",
        legal:
          "Proposta comercial CHESS AI AGENCY · VIGO AI ADMINISTRATION · Piloto 6 semanas · 12.500 EUR · Quen somos: https://chess-ai-agency.vercel.app/nosotros.html · 29 proxectos en curso.",
        preheader: "Comenzamos cunha unidade real. Sen compromiso.",
      };

  const body = `
    ${copy.body}
    ${button(LANDING, copy.cta)}
    <p style="margin:18px 0 0;font:13px/1.6 Arial,Helvetica,sans-serif;color:#94a3b8;">${esc(copy.note)}</p>`;

  const text = [
    `Proposta comercial — ${lead.concello}`,
    "",
    es ? `Piloto para el Ayuntamiento de ${lead.concello} · 12.500 EUR · 6 semanas` : `Piloto para o Concello de ${lead.concello} · 12.500 € · 6 semanas`,
    "",
    es ? "Por qué contratar ahora:" : "Por que contratar agora:",
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
