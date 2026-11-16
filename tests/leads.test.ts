import { describe, it, expect, vi, afterEach } from "vitest";
import { normalizeTramo, notifyLead, validateLead } from "@/lib/leads";

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
    expect(acuse.text).toContain("Recibimos a túa solicitude");
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

    expect(acuse.text).toContain("Hemos recibido tu solicitud");
    expect(acuse.text).not.toContain("Recibimos a túa");
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
