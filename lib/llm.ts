// Capa de abstracción de modelos (Megaprompt §9 — AI LAYER)
// Orden de proveedores:
//   1. OpenRouter (modelos ":free")
//   2. Gemini directo (Google AI Studio, nivel gratuito)
//   3. Modo demo local sin LLM (respuestas plantilla a partir de la evidencia)

interface LLMRequest {
  system: string;
  messages: { role: "user" | "assistant"; content: string }[];
  temperature?: number;
  maxTokens?: number;
}

interface LLMResponse {
  text: string;
  provider: string;
  model: string;
}

const TIMEOUT_MS = 45_000;

async function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);
}

// ---------- OpenRouter ----------

async function callOpenRouter(req: LLMRequest, model: string): Promise<LLMResponse> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("OPENROUTER_API_KEY no configurada");

  const res = await withTimeout(
    fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://vigo-ai-demo.vercel.app",
        "X-Title": "VIGO AI ADMINISTRATION DEMO",
      },
      body: JSON.stringify({
        model,
        temperature: req.temperature ?? 0.2,
        max_tokens: req.maxTokens ?? 500,
        messages: [{ role: "system", content: req.system }, ...req.messages],
      }),
    }),
    TIMEOUT_MS
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenRouter ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  const text: string | undefined = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("OpenRouter: respuesta vacía");
  return { text, provider: "openrouter", model: data?.model ?? model };
}

// ---------- Gemini (REST directo, sin dependencias) ----------

interface GeminiPart {
  text?: string;
}
interface GeminiResponseJson {
  candidates?: { content?: { parts?: GeminiPart[] } }[];
}

async function callGemini(req: LLMRequest, model: string): Promise<LLMResponse> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY no configurada");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  const res = await withTimeout(
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: req.system }] },
        contents: req.messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
        generationConfig: {
          temperature: req.temperature ?? 0.2,
          maxOutputTokens: req.maxTokens ?? 500,
        },
      }),
    }),
    TIMEOUT_MS
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gemini ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = (await res.json()) as GeminiResponseJson;
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
  if (!text) throw new Error("Gemini: respuesta vacía");
  return { text, provider: "gemini", model };
}

// ---------- Orquestador con fallbacks ----------

export async function chatLLM(req: LLMRequest): Promise<LLMResponse> {
  const errors: string[] = [];

  const openrouterModel = process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free";
  const openrouterFallback = process.env.OPENROUTER_FALLBACK_MODEL || "google/gemma-3-27b-it:free";
  const geminiModel = process.env.GEMINI_MODEL || "gemini-2.0-flash";

  for (const attempt of [
    { name: "openrouter", model: openrouterModel, fn: callOpenRouter },
    { name: "openrouter-fallback", model: openrouterFallback, fn: callOpenRouter },
    { name: "gemini", model: geminiModel, fn: callGemini },
  ]) {
    try {
      return await attempt.fn(req, attempt.model);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      errors.push(`${attempt.name}[${attempt.model}]: ${msg}`);
      console.warn(`[LLM] fallo ${attempt.name}:`, msg);
    }
  }

  throw new Error(`Todos los proveedores fallaron → ${errors.join(" | ")}`);
}

export function llmConfigured(): boolean {
  return Boolean(process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY);
}
