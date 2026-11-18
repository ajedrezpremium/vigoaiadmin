// Motor RAG de demostración — recuperación léxica con scoring (Megaprompt §7)
// Demo: corpus sintético en memoria + scoring TF por título y contenido.
// Producción: extracción → segmentación → embeddings → búsqueda híbrida → permisos.

import type { DemoDoc, Lang, SourceRef } from "@/types";
import { DEMO_CORPUS } from "@/data/demo-corpus";
import { embed, cosineSimilarity, getDocEmbedding, embeddingsEnabled } from "./embeddings";

const STOPWORDS = new Set([
  "el","la","los","las","un","una","de","del","para","por","con","que","como","cual","cuando",
  "donde","es","son","esta","hay","y","o","the","a","an","of","for","with","what","when","where",
  "is","are","how","and","or","to","in","os","as","do","da","dos","das","na","no","en","unha",
  "cal","podo","preciso","necesito","quiero","puedo","pode","axuda","me","mi","mis",
]);

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function terms(text: string): string[] {
  return normalize(text)
    .split(" ")
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
}

/** Expansión ligera de sinónimos gl/es/en (demo; producción: embeddings) */
const SYNONYMS: Record<string, string[]> = {
  comercio: ["comercial", "tienda", "shop"],
  tienda: ["comercio", "comercial"],
  negocio: ["empresa", "comercial"],
  empresa: ["negocio", "business"],
  business: ["empresa", "comercio"],
  abrir: ["apertura"],
  abertura: ["apertura"],
  licencia: ["licenza"],
  licenza: ["licencia"],
  permiso: ["licencia", "licenza"],
  ayuda: ["axuda", "subvencion", "grant"],
  axuda: ["ayuda", "subvencion"],
  subvencion: ["ayuda", "axuda", "grant"],
  horario: ["hours"],
  hours: ["horario"],
  documentacion: ["documentos", "documents", "papeles"],
  biblioteca: ["library"],
  library: ["biblioteca"],
  obra: ["obras"],
};

function expand(roots: string[]): string[] {
  return [...roots, ...roots.flatMap((t) => SYNONYMS[t] ?? [])];
}

function bestSnippet(doc: DemoDoc, queryTerms: string[]): string {
  const sentences = doc.content.split(/(?<=[.!?])\s+/);
  let best = sentences[0] ?? doc.content.slice(0, 220);
  let bestScore = -1;
  for (const s of sentences) {
    const st = normalize(s);
    const score = queryTerms.reduce((acc, t) => (st.includes(t) ? acc + 1 : acc), 0);
    if (score > bestScore) {
      bestScore = score;
      best = s.trim();
    }
  }
  return best.length > 260 ? best.slice(0, 257) + "…" : best;
}

export interface RetrievalResult {
  sources: SourceRef[];
  hasEvidence: boolean;
}

function hasWord(field: string, term: string): boolean {
  // coincidencia exacta por palabra (evita que "horario" case con "horarios" a igual peso)
  return new RegExp(`(^|\\s)${term}(\\s|$)`, "i").test(field);
}

/**
 * Recuperación híbrida simple:
 *  - título: palabra exacta +4 · substring +2
 *  - departamento/tipo: palabra exacta +2 · substring +1
 *  - contenido: palabra exacta +1
 * Umbral mínimo de evidencia para abstenerse (Megaprompt §5: abstention quality).
 * Desempate por fecha de vigencia más reciente.
 */
export function retrieve(query: string, _lang: Lang, topK = 3, minScore = 4): RetrievalResult {
  const qTerms = expand(terms(query));
  if (qTerms.length === 0) return { sources: [], hasEvidence: false };

  const scored = DEMO_CORPUS.map((doc) => {
    const title = normalize(doc.title);
    const content = normalize(doc.content);
    const dept = normalize(doc.dept);
    const type = normalize(doc.type);
    let score = 0;
    for (const t of qTerms) {
      if (hasWord(title, t)) score += 4;
      else if (title.includes(t)) score += 2;
      if (hasWord(dept, t) || hasWord(type, t)) score += 2;
      else if (dept.includes(t) || type.includes(t)) score += 1;
      if (hasWord(content, t)) score += 1;
    }
    return { doc, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || b.doc.effective.localeCompare(a.doc.effective))
    .slice(0, topK);

  const hasEvidence = scored.length > 0 && scored[0].score >= minScore;

  const sources: SourceRef[] = scored.map((r, i) => ({
    ref: `S${i + 1}`,
    id: r.doc.id,
    title: r.doc.title,
    dept: r.doc.dept,
    type: r.doc.type,
    published: r.doc.published,
    effective: r.doc.effective,
    snippet: bestSnippet(r.doc, qTerms),
  }));

  return { sources, hasEvidence };
}

/**
 * Búsqueda híbrida (v2.0): embeddings + léxico.
 * Si los embeddings no están habilitados o fallan, cae a retrieve() (léxico).
 * Async porque los embeddings requieren llamada a API.
 */
export async function retrieveAsync(
  query: string,
  lang: Lang,
  topK = 3,
  minScore = 4
): Promise<RetrievalResult> {
  // Fallback inmediato si embeddings desactivados
  if (!embeddingsEnabled()) {
    return retrieve(query, lang, topK, minScore);
  }

  const qTerms = expand(terms(query));
  if (qTerms.length === 0) return { sources: [], hasEvidence: false };

  const queryEmb = await embed(query);
  if (!queryEmb) {
    return retrieve(query, lang, topK, minScore);
  }

  // Calcular similitud coseno para cada documento
  const scored: Array<{ doc: DemoDoc; score: number; cosSim: number }> = [];
  for (const doc of DEMO_CORPUS) {
    const docText = `${doc.title}. ${doc.dept}. ${doc.type}. ${doc.content}`;
    const docEmb = await getDocEmbedding(doc.id, docText);
    if (!docEmb) {
      // Si falla un documento, caer a léxico completo
      return retrieve(query, lang, topK, minScore);
    }
    const cosSim = cosineSimilarity(queryEmb, docEmb);
    // Combinar: 60% coseno + 40% léxico (normalizado)
    const lexicalScore = (() => {
      const title = normalize(doc.title);
      const content = normalize(doc.content);
      const dept = normalize(doc.dept);
      const type = normalize(doc.type);
      let s = 0;
      for (const t of qTerms) {
        if (hasWord(title, t)) s += 4;
        else if (title.includes(t)) s += 2;
        if (hasWord(dept, t) || hasWord(type, t)) s += 2;
        else if (dept.includes(t) || type.includes(t)) s += 1;
        if (hasWord(content, t)) s += 1;
      }
      return s;
    })();
    const combined = cosSim * 0.6 + (lexicalScore / 20) * 0.4;
    scored.push({ doc, score: combined, cosSim });
  }

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, topK);
  const hasEvidence = top.length > 0 && (top[0].cosSim >= 0.3 || top[0].score >= minScore / 20);

  const sources: SourceRef[] = top.map((r, i) => ({
    ref: `S${i + 1}`,
    id: r.doc.id,
    title: r.doc.title,
    dept: r.doc.dept,
    type: r.doc.type,
    published: r.doc.published,
    effective: r.doc.effective,
    snippet: bestSnippet(r.doc, qTerms),
  }));

  return { sources, hasEvidence };
}

/** Bloque de evidencia formateado para el system prompt */
export function evidenceBlock(sources: SourceRef[]): string {
  if (sources.length === 0) return "(none)";
  return sources
    .map(
      (s) =>
        `[${s.ref}] id=${s.id} · "${s.title}" · ${s.type} · Dept: ${s.dept} · published ${s.published} · effective ${s.effective}\n    excerpt: "${s.snippet}"`
    )
    .join("\n");
}
