import { describe, it, expect } from "vitest";
import { validateLead } from "@/lib/leads";

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
