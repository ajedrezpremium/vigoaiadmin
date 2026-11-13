// Evaluación de calidad RAG — VIGO AI ADMINISTRATION DEMO (PRO AGENT / Observabilidad)
// Golden set de preguntas con documentos esperados y métricas de recuperación.

import { retrieve } from "@/lib/rag";

export interface RagEvalCase {
  query: string;
  expectedDocIds: string[];
  shouldAbstain?: boolean;
}

export const RAG_GOLDEN_SET: RagEvalCase[] = [
  { query: "horario atención público OAC", expectedDocIds: ["DOC-001"] },
  { query: "licencia apertura actividad comercial", expectedDocIds: ["DOC-003"] },
  { query: "subvenciones emprendedores", expectedDocIds: ["DOC-004"] },
  { query: "licencia obra menor urbanismo", expectedDocIds: ["DOC-007"] },
  { query: "sede electrónica registro", expectedDocIds: ["DOC-008", "DOC-013"] },
  { query: "cita previa", expectedDocIds: ["DOC-013", "DOC-001"] },
  { query: "ordenanza convivencia espacio público", expectedDocIds: ["DOC-010"] },
  { query: "biblioteca municipal horario", expectedDocIds: ["DOC-006"] },
  { query: "servicios sociales cita", expectedDocIds: ["DOC-005"] },
  { query: "turismo oficina", expectedDocIds: ["DOC-009"] },
  { query: "deporte instalaciones", expectedDocIds: ["DOC-011"] },
  { query: "terrazas hostelería", expectedDocIds: ["DOC-002"] },
  { query: "xyzqwerty nonsense no match", expectedDocIds: [], shouldAbstain: true },
];

export interface RagEvalDetail {
  query: string;
  hit: boolean;
  abstained: boolean;
  expected: string[];
  got: string[];
  hasEvidence: boolean;
}

export interface RagEvalResult {
  total: number;
  hits: number;
  hitRate: number;
  abstentionsCorrect: number;
  abstentionTotal: number;
  abstentionAccuracy: number;
  details: RagEvalDetail[];
}

export function runRagEval(): RagEvalResult {
  const details: RagEvalDetail[] = RAG_GOLDEN_SET.map((c) => {
    const { sources, hasEvidence } = retrieve(c.query, "es");
    const got = sources.map((s) => s.id);
    const hit =
      c.expectedDocIds.length === 0
        ? !hasEvidence || Boolean(c.shouldAbstain)
        : c.expectedDocIds.some((id) => got.includes(id));
    const abstained = !hasEvidence;
    return { query: c.query, hit, abstained, expected: c.expectedDocIds, got, hasEvidence };
  });

  const total = details.length;
  const hits = details.filter((d) => d.hit).length;
  const abstentionCases = details.filter((d) =>
    RAG_GOLDEN_SET.find((c) => c.query === d.query)?.shouldAbstain
  );
  const abstentionsCorrect = abstentionCases.filter((d) => d.abstained).length;

  return {
    total,
    hits,
    hitRate: total > 0 ? hits / total : 0,
    abstentionsCorrect,
    abstentionTotal: abstentionCases.length,
    abstentionAccuracy:
      abstentionCases.length > 0 ? abstentionsCorrect / abstentionCases.length : 1,
    details,
  };
}
