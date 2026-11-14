import { describe, it, expect } from "vitest";
import { runRagEval } from "@/lib/rag.eval";

describe("RAG Eval", () => {
  it("hit rate >= 90%", () => {
    const result = runRagEval();
    expect(result.hitRate).toBeGreaterThanOrEqual(0.9);
  });

  it("total de casos es 13", () => {
    const result = runRagEval();
    expect(result.total).toBe(13);
  });

  it("abstención correcta para consulta sin sentido", () => {
    const result = runRagEval();
    const nonsense = result.details.find((d) => d.query.includes("xyzqwerty"));
    expect(nonsense).toBeDefined();
    expect(nonsense!.abstained).toBe(true);
  });

  it("cada detalle tiene query, hit, abstained, expected, got", () => {
    const result = runRagEval();
    for (const d of result.details) {
      expect(typeof d.query).toBe("string");
      expect(typeof d.hit).toBe("boolean");
      expect(typeof d.abstained).toBe("boolean");
      expect(Array.isArray(d.expected)).toBe(true);
      expect(Array.isArray(d.got)).toBe(true);
    }
  });
});
