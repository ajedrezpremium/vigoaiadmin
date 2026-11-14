import { describe, it, expect } from "vitest";
import { retrieve } from "@/lib/rag";

describe("RAG retrieve", () => {
  it("devuelve evidencia para horario de atención", () => {
    const { sources, hasEvidence } = retrieve("horario de atención al público", "es");
    expect(hasEvidence).toBe(true);
    expect(sources.length).toBeGreaterThan(0);
    expect(sources[0].id).toBe("DOC-001");
  });

  it("devuelve evidencia para licencia de apertura", () => {
    const { sources, hasEvidence } = retrieve("licencia de apertura de actividad comercial", "es");
    expect(hasEvidence).toBe(true);
    expect(sources.some((s) => s.id === "DOC-003")).toBe(true);
  });

  it("devuelve evidencia para subvenciones", () => {
    const { sources, hasEvidence } = retrieve("subvenciones para emprendedores", "es");
    expect(hasEvidence).toBe(true);
    expect(sources.some((s) => s.id === "DOC-004")).toBe(true);
  });

  it("devuelve evidencia para cita previa", () => {
    const { sources, hasEvidence } = retrieve("cita previa sede electrónica", "es");
    expect(hasEvidence).toBe(true);
    expect(sources.some((s) => s.id === "DOC-013")).toBe(true);
  });

  it("devuelve evidencia para historia de Vigo (Rande)", () => {
    const { sources, hasEvidence } = retrieve("batalla de Rande 1702", "es");
    expect(hasEvidence).toBe(true);
    expect(sources.some((s) => s.id === "DOC-016")).toBe(true);
  });

  it("se abstiene cuando no hay evidencia (consulta sin sentido)", () => {
    const { sources, hasEvidence } = retrieve("xyzqwerty nonsense no match", "es");
    expect(hasEvidence).toBe(false);
    expect(sources.length).toBe(0);
  });

  it("devuelve evidencia para terrazas", () => {
    const { sources, hasEvidence } = retrieve("ordenanza terrazas hostelería", "es");
    expect(hasEvidence).toBe(true);
    expect(sources.some((s) => s.id === "DOC-002")).toBe(true);
  });

  it("devuelve evidencia para biblioteca", () => {
    const { sources, hasEvidence } = retrieve("biblioteca municipal horario", "es");
    expect(hasEvidence).toBe(true);
    expect(sources.some((s) => s.id === "DOC-006")).toBe(true);
  });

  it("fuentes incluyen ref S1, S2...", () => {
    const { sources } = retrieve("horario de atención al público", "es");
    expect(sources[0].ref).toBe("S1");
    expect(sources.every((s) => /^S\d$/.test(s.ref))).toBe(true);
  });

  it("cada fuente tiene snippet no vacío", () => {
    const { sources } = retrieve("licencia de obra menor", "es");
    for (const s of sources) {
      expect(s.snippet.length).toBeGreaterThan(0);
    }
  });
});
