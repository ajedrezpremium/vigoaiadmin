import { describe, it, expect, vi, afterEach } from "vitest";
import { normalizeTramo, notifyLead, validateLead } from "@/lib/leads";
import { finalEmail, firstContactEmail, leadAckEmail, leadAlertEmail } from "@/lib/email-templates";

const base = {
  concello: "Concello de Moaña",
  nome: "Ana Pérez",
  email: "Ana.Perez@Concello.gal",
  consent: true,
};

describe("validateLead", () => {
  it("acepta un lead completo y normaliza el correo", () => {
    const r = validateLead(base);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.lead.email).toBe("ana.perez@concello.gal");
      expect(r.lead.concello).toBe("Concello de Moaña");
      expect(r.lead.orixe).toBe("landing_ayuntamientos");
    }
  });

  it("rechaza si falta el consentimiento", () => {
    const r = validateLead({ ...base, consent: false });
    expect(r.ok).toBe(false);
  });

  it("rechaza un correo inválido", () => {
    const r = validateLead({ ...base, email: "ana.perez" });
    expect(r.ok).toBe(false);
  });

  it("rechaza el honeypot relleno", () => {
    const r = validateLead({ ...base, website: "http://spam.example" });
    expect(r.ok).toBe(false);
  });

  it("recorta textos largos y elimina saltos de línea", () => {
    const r = validateLead({ ...base, mensaxe: "a\n\nb " + "x".repeat(2000) });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.lead.mensaxe?.length).toBe(1500);
      expect(r.lead.mensaxe).not.toContain("\n");
    }
  });

  it("descarta un tramo que no existe", () => {
    const r = validateLead({ ...base, tramo: "Z" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.lead.tramo).toBeUndefined();
  });
});

describe("normalizeTramo", () => {
  it.each([
    ["A", "A"],
    ["  c  ", "C"],
    ["D", "D"],
    ["outro", "outro"],
    ["Menos de 5.000 habitantes", "D"],
    ["5.000 – 10.000", "C"],
    ["10.000 – 20.000", "B"],
    ["Máis de 20.000", "A"],
    ["Más de 20.000", "A"],
    ["Mancomunidade ou outro", "outro"],
    ["Mancomunidad u otro", "outro"],
    ["Z", undefined],
  ])("%s → %s", (input, expected) => {
    expect(normalizeTramo(input as string)).toBe(expected);
  });

  it("validateLead convierte la etiqueta del formulario en código", () => {
    const r = validateLead({ ...base, tramo: "10.000 – 20.000" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.lead.tramo).toBe("B");
  });
});

describe("plantillas de correo", () => {
  const lead = {
    concello: "Concello de Moaña",
    nome: "Ana Pérez",
    cargo: "Secretaría Xeral",
    email: "ana.perez@concellodemoana.org",
    telefono: "986 310 100",
    tramo: "B",
    interese: "Borradores e informes",
    mensaxe: "Temos expedientes sen indexar.",
    idioma: "gl",
  } as const;

  it("el aviso interno lleva logo, marca, lema y los datos del lead", () => {
    const { html, subject } = leadAlertEmail(lead);
    expect(subject).toContain("Moaña");
    expect(html).toContain("logo-email.png");
    expect(html).toContain("CHESS AI AGENCY");
    expect(html).toContain("AI · Innovation · Execution");
    expect(html).toContain("Ana Pérez");
    expect(html).toContain("986 310 100");
    expect(html).toContain("mailto:ana.perez@concellodemoana.org");
    expect(html).toContain('<html lang="gl">');
  });

  it("el acuse cambia de idioma y mantiene el compromiso de 24 h", () => {
    const gl = leadAckEmail({ ...lead, idioma: "gl" });
    expect(gl.subject).toBe("Solicitude recibida · Concello de Moaña");
    expect(gl.html).toContain("Grazas, Ana Pérez");
    expect(gl.html).toContain("24 horas laborables");

    const es = leadAckEmail({ ...lead, idioma: "es" });
    expect(es.subject).toBe("Solicitud recibida · Concello de Moaña");
    expect(es.html).toContain("Gracias, Ana Pérez");
    expect(es.html).toContain('<html lang="es">');
  });

  it("escapa el HTML del usuario: no se inyecta nada en el correo", () => {
    const { html } = leadAlertEmail({
      ...lead,
      nome: '<script>alert("x")</script>',
      mensaxe: '<img src=x onerror="alert(1)">',
      concello: "Moaña & Cía",
    });
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img src=x");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&lt;img src=x");
    expect(html).toContain("Moaña &amp; Cía");
  });

  it("el texto plano sigue siendo legible sin HTML", () => {
    const { text } = leadAckEmail(lead);
    expect(text).toContain("Bo día, Ana Pérez:");
    expect(text).toContain("607 869 278");
    expect(text).toContain("https://vigo-ai-demo.vercel.app/administracion-local");
    expect(text).not.toContain("<");
  });
});

describe("finalEmail", () => {
  const lead = {
    concello: "Concello de Moaña",
    nome: "Ana Pérez",
    cargo: "Secretaría Xeral",
    email: "ana.perez@concellodemoana.org",
    telefono: "986 310 100",
    tramo: "B",
    interese: "Borradores e informes",
    mensaxe: "Temos expedientes sen indexar.",
    idioma: "gl",
  } as const;

  it("es la version final del piloto con por que contratar y proyecto", () => {
    const { html, subject, text } = finalEmail(lead);
    expect(subject).toContain("Concello de Moaña");
    expect(html).toContain("VIGO AI ADMINISTRATION");
    expect(html).toContain("12.500");
    expect(html).toContain("https://vigo-ai-demo.vercel.app/administracion-local");
    expect(html).toContain("https://chess-ai-agency.vercel.app/nosotros.html");
    expect(html).toContain("29 proxectos en curso");
    expect(html).toContain("Por que contratar agora");
    expect(html).toContain("Borrador");
    expect(html).toContain("CHESS AI AGENCY");
    expect(html).toContain("IA PARA CONCELLOS");
    expect(html).toContain("Praza do Rei");
    expect(html).toContain("maps.google.com/maps");
    expect(html).toContain("Tarxada sobre a cidade");
    expect(html).toContain("Interese sobre a cidade");
    expect(text).toContain("12.500 €");
    expect(text).toContain("https://chess-ai-agency.vercel.app/nosotros.html");
  });
});

describe("firstContactEmail", () => {
  const lead = {
    concello: "Concello de Moaña",
    nome: "Ana Pérez",
    cargo: "Secretaría Xeral",
    email: "ana.perez@concellodemoana.org",
    telefono: "986 310 100",
    tramo: "B",
    interese: "Borradores e informes",
    mensaxe: "Temos expedientes sen indexar.",
    idioma: "gl",
  } as const;

  it("es el primer contacto sin nombrar el piloto, sin producto cerrado ni precio", () => {
    const { html, subject, text } = firstContactEmail(lead);
    expect(subject).toContain("Concello de Moaña");
    expect(html).toContain("CHESS AI AGENCY");
    expect(html).toContain("IA PARA");
    expect(html).toContain("SOLICITAR UNHA DEMOSTRACIÓN");
    expect(html).toContain("https://vigo-ai-demo.vercel.app/demo");
    expect(html).toContain("A oportunidade");
    expect(html).toContain("A nosa proposta");
    expect(html).toContain("Tecnoloxía con supervisión humana");
    expect(html).toContain("UNHA PROPOSTA PARA O SEU CONCELLO:");
    expect(html).not.toContain("12.500");
    expect(html).not.toContain("VIGO AI ADMINISTRATION");
    expect(text).not.toContain("<");
    expect(text).toContain("Concello de Moaña");
  });
});

describe("notifyLead", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.RESEND_API_KEY;
    delete process.env.LEAD_NOTIFY_EMAIL;
    delete process.env.LEAD_FROM_EMAIL;
    delete process.env.LEAD_WEBHOOK_URL;
  });

  function leadOk(extra: Record<string, unknown> = {}) {
    const r = validateLead({ ...base, ...extra });
    if (!r.ok) throw new Error("lead de prueba inválido");
    return r.lead;
  }

  it("sin clave de Resend no llama a la red y no rompe el alta", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    await expect(notifyLead(leadOk())).resolves.toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("con clave envía dos correos: aviso interno y acuse al concello", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.LEAD_NOTIFY_EMAIL = "chessagencyai@gmail.com";
    process.env.LEAD_FROM_EMAIL = "VIGO AI <leads@ajedrezpremium.com>";

    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(notifyLead(leadOk({ mensaxe: "Queremos probar o asistente" }))).resolves.toBe(true);

    expect(fetchMock).toHaveBeenCalledTimes(2);
    const bodies = fetchMock.mock.calls.map((c) =>
      JSON.parse((c[1] as RequestInit).body as string)
    );

    const interno = bodies.find((b) => b.to[0] === "chessagencyai@gmail.com");
    expect(interno.subject).toContain("Novo lead");
    expect(interno.reply_to).toBe("ana.perez@concello.gal");
    expect(interno.text).toContain("Queremos probar o asistente");

    const acuse = bodies.find((b) => b.to[0] === "ana.perez@concello.gal");
    expect(acuse.from).toBe("VIGO AI <leads@ajedrezpremium.com>");
    expect(acuse.subject).toContain("Moaña");
    expect(acuse.text).toContain("Recibimos a solicitude");
    expect(acuse.text).toContain("24 horas laborables");
    expect(acuse.text).toContain("607 869 278");
  });

  it("el acuse va en castellano si el lead llegó en castellano", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.LEAD_NOTIFY_EMAIL = "chessagencyai@gmail.com";
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await notifyLead(leadOk({ idioma: "es" }));
    const acuse = fetchMock.mock.calls
      .map((c) => JSON.parse((c[1] as RequestInit).body as string))
      .find((b) => b.to[0] === "ana.perez@concello.gal");

    expect(acuse.text).toContain("Hemos recibido la solicitud");
    expect(acuse.text).not.toContain("Recibimos a solicitude");
  });

  it("un error de Resend no lanza: devuelve false", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.LEAD_NOTIFY_EMAIL = "chessagencyai@gmail.com";
    vi.stubGlobal("fetch", vi.fn(async () => new Response("boom", { status: 500 })));
    await expect(notifyLead(leadOk())).resolves.toBe(false);
  });

  it("el webhook también cuenta como aviso enviado", async () => {
    process.env.LEAD_WEBHOOK_URL = "https://hooks.example/test";
    const fetchMock = vi.fn(async () => new Response("ok", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    await expect(notifyLead(leadOk())).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
