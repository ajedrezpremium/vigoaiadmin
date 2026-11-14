// Embeddings y búsqueda híbrida — VIGO AI ADMINISTRATION DEMO (Semana 3 v1.2)
// Fundación para búsqueda semántica (pgvector en producción).
// En demo: fallback a búsqueda léxica (lib/rag.ts). Si se configura
// OPENROUTER_EMBEDDING_MODEL o OPENAI_API_KEY, se intenta embedding real.

export interface EmbeddingResult {
  vector: number[];
  model: string;
  provider: string;
}

export function embeddingsConfigured(): boolean {
  return Boolean(
    process.env.OPENROUTER_EMBEDDING_MODEL ||
      process.env.OPENAI_API_KEY ||
      process.env.GEMINI_API_KEY
  );
}

/**
 * Genera un embedding para un texto. En demo devuelve null (fallback léxico).
 * En producción: llamar a OpenAI/OpenRouter/Gemini embeddings API.
 */
export async function embed(_text: string): Promise<EmbeddingResult | null> {
  // Demo: sin embedding real (fallback a búsqueda léxica)
  // Producción: implementar llamada a API de embeddings
  return null;
}

/**
 * Búsqueda híbrida: combina léxico (siempre) + semántico (si disponible).
 * En demo: solo léxico.
 */
export async function hybridSearch(
  query: string,
  lexicalResults: { id: string; score: number }[]
): Promise<{ id: string; score: number }[]> {
  // Demo: solo léxico
  const embedding = await embed(query);
  if (!embedding) {
    return lexicalResults;
  }
  // Producción: combinar lexical + cosine similarity
  return lexicalResults;
}
