import { describe, it, expect } from "vitest";
import { classify, detectLanguage } from "@/lib/router";

describe("Router classify", () => {
  it("clasifica horario → citizen", () => {
    const r = classify("¿Cuál es el horario de atención al público?");
    expect(r.agent).toBe("citizen");
    expect(r.score).toBeGreaterThan(0);
  });

  it("clasifica trámite → admin", () => {
    const r = classify("¿Qué documentación necesito para abrir un comercio?");
    expect(r.agent).toBe("admin");
  });

  it("clasifica ordenanza → legal", () => {
    const r = classify("¿Qué dice la ordenanza de terrazas?");
    expect(r.agent).toBe("legal");
  });

  it("clasifica subvención → business", () => {
    const r = classify("¿Qué ayudas hay para emprendedores?");
    expect(r.agent).toBe("business");
  });

  it("clasifica biblioteca → culture", () => {
    const r = classify("¿Cuándo abre la biblioteca municipal?");
    expect(r.agent).toBe("culture");
  });

  it("clasifica obra → urban", () => {
    const r = classify("¿Puedo hacer obras en la fachada?");
    expect(r.agent).toBe("urban");
  });

  it("clasifica historia de Vigo → history", () => {
    const r = classify("¿Cuál fue la batalla de Rande?");
    expect(r.agent).toBe("history");
  });

  it("clasifica traducción → language", () => {
    const r = classify("Traduce esto al inglés");
    expect(r.agent).toBe("language");
  });

  it("devuelve citizen por defecto sin coincidencias", () => {
    const r = classify("xyzqwerty nonsense");
    expect(r.agent).toBe("citizen");
    expect(r.score).toBe(0);
  });

  it("matched contiene keywords encontradas", () => {
    const r = classify("horario de atención");
    expect(r.matched.length).toBeGreaterThan(0);
  });
});

describe("detectLanguage", () => {
  it("detecta gallego", () => {
    expect(detectLanguage("Cal é o horario de atención?")).toBe("gl");
  });

  it("detecta inglés", () => {
    expect(detectLanguage("What are the opening hours?")).toBe("en");
  });

  it("default es español", () => {
    expect(detectLanguage("¿Cuál es el horario?")).toBe("es");
  });
});
