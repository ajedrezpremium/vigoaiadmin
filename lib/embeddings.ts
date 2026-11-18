// Embeddings — VIGO AI ADMINISTRATION (v2.0, preparado para búsqueda híbrida)
// Modo: EMBEDDINGS_ENABLED=true para activar; por defecto desactivado (búsqueda léxica).
// Proveedor: OpenRouter (modelo de embedding configurable por env).
// Si el proveedor no está disponible o falla, se devuelve null y el RAG cae a búsqueda léxica.

const OPENROUTER_URL = "https://openrouter.ai/api/v1/embeddings";
const DEFAULT_MODEL = "openai/text-embedding-3-small";

export function embeddingsEnabled(): boolean {
  return process.env.EMBEDDINGS_ENABLED === "true" && !!process.env.OPENROUTER_API_KEY;
}

export async function embed(text: string): Promise<number[] | null> {
  if (!embeddingsEnabled()) return null;
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return null;
  const model = process.env.OPENROUTER_EMBEDDING_MODEL || DEFAULT_MODEL;
  try {
    const res = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://vigo-ai-demo.vercel.app",
        "X-Title": "VIGO AI ADMINISTRATION",
      },
      body: JSON.stringify({ model, input: text.slice(0, 8000) }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { data?: Array<{ embedding: number[] }> };
    return data?.data?.[0]?.embedding ?? null;
  } catch {
    return null;
  }
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length === 0 || b.length === 0 || a.length !== b.length) return 0;
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return denom === 0 ? 0 : dot / denom;
}

// Caché en memoria de embeddings de documentos (clave: doc id).
const docEmbeddingCache = new Map<string, number[]>();

export async function getDocEmbedding(docId: string, text: string): Promise<number[] | null> {
  const cached = docEmbeddingCache.get(docId);
  if (cached) return cached;
  const emb = await embed(text);
  if (emb) docEmbeddingCache.set(docId, emb);
  return emb;
}

export function clearEmbeddingCache(): void {
  docEmbeddingCache.clear();
}
