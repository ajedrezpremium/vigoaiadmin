// Capa de abstracción de modelos (Megaprompt §9 — AI LAYER)
// Orden de proveedores (catálogo FREE en lib/providers.ts, fuente:
// github.com/mnfst/awesome-free-llm-apis). Los proveedores sin claves en .env
// se saltan automáticamente:
//   1. OpenRouter (modelos ":free", selección dinámica)
//   2. OpenRouter (fallback)
//   3. Groq (inferencia LPU, 1.000 req/día free)
//   4. Gemini directo (Google AI Studio)
//   5. Cohere (1.000 llamadas/mes free)
//   6. Cloudflare Workers AI (10.000 neurons/día free)
//   7. OVHcloud AI Endpoints (anónimo, hosting UE, 2 RPM)
//   8. Modo demo local sin LLM (respuestas plantilla a partir de la evidencia)
//
// Nivel PRO implementado (CHESS AI AGENCY · XG AI AGENT ENGINE):
//   - LLM Router con fallback automático entre modelos/proveedores.
//   - Caller genérico OpenAI-compatible: añadir un proveedor nuevo es solo
//     añadir su entrada a lib/providers.ts (endpoint + key + modelo).
//   - Tool Calling: el agente decide cuándo buscar en la base de conocimiento
//     (tool `search_knowledge`) y ejecuta la búsqueda, iterando hasta responder.

import { retrieve } from "@/lib/rag";
import { createEscalation } from "@/lib/supabase";
import { getSedeElectronicaAdapter } from "@/lib/sede-electronica";
import {
  PROVIDERS,
  keyConfiguredProviders,
  providerConfigured,
  providerEndpoint,
  providerModel,
} from "@/lib/providers";
import type { OpenAICompatProvider } from "@/lib/providers";

export interface ToolDef {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
}

export interface LLMRequest {
  system: string;
  messages: { role: "user" | "assistant"; content: string }[];
  temperature?: number;
  maxTokens?: number;
  tools?: ToolDef[];
}

export interface LLMResponse {
  text: string;
  provider: string;
  model: string;
  toolCalls?: Array<{
    id: string;
    name: string;
    arguments: string;
  }>;
  /** true cuando la respuesta final implica escalación a personal municipal (HIT) */
  escalated?: boolean;
}

// Presupuesto de tiempo: la función serverless de Vercel corta a los 60 s.
// Cada llamada individual y el conjunto deben quedar MUY por debajo para
// poder devolver JSON (nunca un 504 en texto plano).
const TIMEOUT_MS = 7_000; // por llamada a un proveedor
const TOTAL_BUDGET_MS = 16_000; // suma de todos los proveedores
const MAX_AGENT_ITERATIONS = 2;

async function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);
}

// ---------- Formato conversación interno → formato por proveedor ----------

interface ToolCall {
  id: string;
  name: string;
  arguments: string;
}

interface ConvMessage {
  role: "user" | "assistant" | "tool";
  content: string;
  toolCallId?: string;
  toolName?: string;
  toolArgs?: Record<string, unknown>;
  toolCalls?: ToolCall[];
}

export const DEFAULT_TOOLS: ToolDef[] = [
  {
    name: "search_knowledge",
    description:
      "Busca fragmentos relevantes en la base de conocimiento municipal y devuelve citas y respuestas.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Pregunta o término de búsqueda" },
      },
      required: ["query"],
    },
  },
  {
    name: "escalate_to_human",
    description:
      "Escala la consulta a un agente humano municipal cuando la atención requiere revisión personal, respuesta fuera del alcance automatizable o caso sensible. Debe usarse cuando el ciudadano lo solicite o la respuesta no pueda completarse de forma autónoma.",
    parameters: {
      type: "object",
      properties: {
        reason: { type: "string", description: "Motivo breve de la escalación" },
      },
      required: ["reason"],
    },
  },
  {
    name: "solicitar_cita_previa",
    description:
      "Solicita cita previa en el Registro Municipal / Sede Electrónica (simulación de integración con el gestor de citas). Cuando el ciudadano lo necesite, registra la solicitud y devuelve la referencia.",
    parameters: {
      type: "object",
      properties: {
        motivo: { type: "string", description: "Motivo breve de la cita (opcional)" },
      },
      required: ["motivo"],
    },
  },
];

function toOpenAiMessages(messages: ConvMessage[]): object[] {
  const out: object[] = [];
  for (const m of messages) {
    if (m.role === "tool") {
      out.push({
        role: "tool",
        tool_call_id: m.toolCallId ?? "",
        content: m.content,
      });
      continue;
    }
    if (m.role === "assistant" && m.toolCalls && m.toolCalls.length > 0) {
      out.push({
        role: "assistant",
        content: m.content || "",
        tool_calls: m.toolCalls.map((tc) => ({
          id: tc.id,
          type: "function",
          function: { name: tc.name, arguments: tc.arguments },
        })),
      });
      continue;
    }
    out.push({ role: m.role === "assistant" ? "assistant" : m.role, content: m.content });
  }
  return out;
}

function toGeminiContents(messages: ConvMessage[]): { role: string; parts: object[] }[] {
  const out: { role: string; parts: object[] }[] = [];
  for (const m of messages) {
    if (m.role === "tool") {
      out.push({
        role: "user",
        parts: [
          {
            functionResponse: {
              name: m.toolName ?? "search_knowledge",
              args: m.toolArgs ?? {},
              response: { result: m.content },
            },
          },
        ],
      });
      continue;
    }
    if (m.role === "assistant" && m.toolCalls && m.toolCalls.length > 0) {
      out.push({
        role: "model",
        parts: m.toolCalls.map((tc) => ({
          functionCall: { name: tc.name, args: safeJsonParse(tc.arguments) ?? {} },
        })),
      });
      if (m.content) out[out.length - 1].parts.push({ text: m.content });
      continue;
    }
    out.push({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    });
  }
  return out;
}

function safeJsonParse(s: string): Record<string, unknown> | undefined {
  try {
    const v = JSON.parse(s);
    return v && typeof v === "object" ? (v as Record<string, unknown>) : undefined;
  } catch {
    return undefined;
  }
}

// ---------- Caller genérico OpenAI-compatible (OpenRouter, Groq, Cohere, Cloudflare, OVH…) ----------

async function callOpenAICompat(
  prov: OpenAICompatProvider,
  model: string,
  req: AgentTurn,
  tools: ToolDef[],
  messages: ConvMessage[]
): Promise<LLMResponse> {
  const key = prov.envKeyVar ? process.env[prov.envKeyVar] : undefined;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(prov.headers ?? {}),
  };
  if (key) headers.Authorization = `Bearer ${key}`;

  const res = await withTimeout(
    fetch(providerEndpoint(prov), {
      method: "POST",
      headers,
      signal: AbortSignal.timeout(TIMEOUT_MS),
      body: JSON.stringify({
        model,
        temperature: req.temperature ?? 0.2,
        max_tokens: req.maxTokens ?? 500,
        tools: tools.map((t) => ({
          type: "function",
          function: { name: t.name, description: t.description, parameters: t.parameters },
        })),
        messages: [
          { role: "system", content: req.system },
          ...toOpenAiMessages(messages),
        ],
      }),
    }),
    TIMEOUT_MS
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${prov.name} ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  const message = data?.choices?.[0]?.message;
  const text: string | undefined = message?.content;
  const toolCalls: LLMResponse["toolCalls"] = (message?.tool_calls ?? []).map(
    (tc: { id: string; type: string; function: { name: string; arguments: string } }) => ({
      id: tc.id,
      name: tc.function?.name,
      arguments: tc.function?.arguments ?? "{}",
    })
  );
  if (!text && (!toolCalls || toolCalls.length === 0)) {
    throw new Error(`${prov.name}: respuesta vacía`);
  }
  return { text: text ?? "", provider: prov.name, model: data?.model ?? model, toolCalls };
}

// ---------- Gemini (REST directo, sin dependencias) ----------

interface GeminiPart {
  text?: string;
  functionCall?: { name: string; args?: Record<string, unknown> };
  functionResponse?: { name: string; args: Record<string, unknown>; response: Record<string, unknown> };
}
interface GeminiResponseJson {
  candidates?: { content?: { parts?: GeminiPart[] } }[];
}

async function callGemini(
  req: AgentTurn,
  model: string,
  tools: ToolDef[],
  messages: ConvMessage[]
): Promise<LLMResponse> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY no configurada");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  const res = await withTimeout(
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      body: JSON.stringify({
        system_instruction: { parts: [{ text: req.system }] },
        contents: toGeminiContents(messages),
        tools: tools
          ? [
              {
                functionDeclarations: tools.map((t) => ({
                  name: t.name,
                  description: t.description,
                  parameters: t.parameters,
                })),
              },
            ]
          : undefined,
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
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const text = parts.map((p) => p.text ?? "").join("");
  const functionCalls = parts
    .filter((p) => p.functionCall)
    .map((p) => ({
      id: `gemini_${Math.random().toString(36).slice(2, 10)}`,
      name: p.functionCall!.name,
      arguments: JSON.stringify(p.functionCall!.args ?? {}),
    }));
  if (!text && functionCalls.length === 0) throw new Error("Gemini: respuesta vacía");
  return { text, provider: "gemini", model, toolCalls: functionCalls };
}

// ---------- Tool execution: Búsqueda en conocimiento (RAG) ----------

export async function executeTool(
  name: string,
  args: Record<string, unknown>
): Promise<string> {
  if (name === "escalate_to_human") {
    const reason = String(args?.reason ?? args?.query ?? "Consulta ciudadana");
    const created = await createEscalation({
      agent: "master",
      context: { reason, source: "agent_loop" },
      language: "es",
    });
    const id = created?.id ?? null;
    const status = created?.status ?? "open";
    return JSON.stringify({
      ok: true,
      escalated: true,
      escalationId: id,
      status,
      message: `Caso escalado con el equipo municipal. Referencia: ${id ?? "PENDIENTE"}. Un especialista humano se pondrá en contacto a través de los canales oficiales.`,
    });
  }
  if (name === "solicitar_cita_previa") {
    const motivo = String(args?.motivo ?? args?.reason ?? "Trámite general");
    const adapter = getSedeElectronicaAdapter();
    const result = await adapter.solicitarCita(motivo, "es");
    return JSON.stringify({
      ok: result.ok,
      tool: "solicitar_cita_previa",
      requested: result.ok,
      reference: result.reference,
      motivo,
      message: result.message,
    });
  }
  if (name !== "search_knowledge") {
    return JSON.stringify({ ok: false, error: `Herramienta desconocida: ${name}` });
  }
  const query = String(args?.query ?? "");
  const { sources, hasEvidence } = retrieve(query, "es");
  if (!hasEvidence || sources.length === 0) {
    return JSON.stringify({
      ok: true,
      found: false,
      answer:
        "No se encontraron fragmentos relevantes en la base de conocimiento para esa consulta.",
    });
  }
  const evidence = sources
    .map((s) => `• [${s.ref}] ${s.title} (${s.dept}, vixente/publicado ${s.effective}): ${s.snippet}`)
    .join("\n");
  return JSON.stringify({ ok: true, found: true, evidence });
}

// ---------- Bucle agéntico: decisión → tool → razonamiento → respuesta ----------

type AgentTurn = Omit<LLMRequest, "messages"> & { messages: ConvMessage[] };

async function runAgentLoop(
  fn: (req: AgentTurn) => Promise<LLMResponse>,
  req: AgentTurn,
  tools: ToolDef[],
  maxIterations: number = MAX_AGENT_ITERATIONS
): Promise<LLMResponse> {
  const messages: ConvMessage[] = req.messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));
  let out = await fn({ ...req, messages, tools });

  for (let i = 0; i < maxIterations; i++) {
    if (!out.toolCalls || out.toolCalls.length === 0) break;

    const toolCall = out.toolCalls[0];
    const args = safeJsonParse(toolCall.arguments) ?? {};
    const result = await executeTool(toolCall.name, args);

    // Human-in-the-Loop / Registro: si la herramienta termina la interacción
    // (escalar o registrar cita), finalizamos la respuesta (no seguimos al LLM).
    if (toolCall.name === "escalate_to_human" || toolCall.name === "solicitar_cita_previa") {
      let parsed: Record<string, unknown> = {};
      try {
        parsed = JSON.parse(result) as Record<string, unknown>;
      } catch {
        /* respuesta sin JSON estructurado → usamos el texto previo */
      }
      const finalText = typeof parsed.message === "string" ? parsed.message : out.text;
      return {
        text: finalText,
        provider: out.provider,
        model: out.model,
        toolCalls: undefined,
        escalated: toolCall.name === "escalate_to_human",
      };
    }

    const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant") ?? {
      role: "assistant" as const,
      content: "",
    };
    messages.push({
      role: "assistant",
      content: lastAssistant.content,
      toolCalls: out.toolCalls,
      toolCallId: toolCall.id,
      toolName: toolCall.name,
      toolArgs: args,
    });
    messages.push({ role: "tool", content: result, toolCallId: toolCall.id, toolName: toolCall.name });

    out = await fn({ ...req, messages, tools });
  }

  if (out.toolCalls && out.toolCalls.length > 0) {
    // Límite de iteraciones alcanzado: sintetizamos una respuesta a partir de la evidencia.
    const lastToolMsg = [...messages].reverse().find((m) => m.role === "tool");
    out = {
      ...out,
      text: lastToolMsg?.content ?? out.text,
      toolCalls: undefined,
    };
  }

  return out;
}

// ---------- Selección dinámica de modelos FREE de OpenRouter ----------

const FREE_MODEL_TTL_MS = 60_000; // caché de 60s para no saturar el endpoint
let freeModelCache: { model: string; ts: number } | null = null;

export async function getBestFreeModel(): Promise<string> {
  const now = Date.now();
  if (freeModelCache && now - freeModelCache.ts < FREE_MODEL_TTL_MS) {
    return freeModelCache.model;
  }
  try {
    const res = await fetch("https://openrouter.ai/api/v1/models?limit=100", {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY ?? ""}`,
      },
      signal: AbortSignal.timeout(3_000),
    });
    if (res.ok) {
      const data = (await res.json()) as { data?: Array<{ id: string; pricing?: { prompt?: number; completion?: number } }> };
      const freeModels = (data.data ?? []).filter(
        (m) => m.id.endsWith(":free") && (m.pricing?.prompt ?? 0) === 0 && (m.pricing?.completion ?? 0) === 0
      );
      const chatLike = freeModels.filter((m) => /instruct|chat|gemma|llama|qwen|deepseek|mistral|phi|glm/i.test(m.id));
      const best = chatLike[0]?.id ?? freeModels[0]?.id;
      if (best) {
        freeModelCache = { model: best, ts: now };
        return best;
      }
    }
  } catch {
    // si falla la consulta, usamos el fallback estático
  }
  const fallback = process.env.OPENROUTER_MODEL || "google/gemma-4-31b-it:free";
  freeModelCache = { model: fallback, ts: now };
  return fallback;
}

// ---------- Orquestador con fallbacks ----------

interface LLMAttempt {
  name: string;
  model: string;
  fn: (r: AgentTurn) => Promise<LLMResponse>;
}

/** Intento para un proveedor OpenAI-compatible del catálogo (null si no está configurado) */
function compatAttempt(provName: string, modelOverride?: string): LLMAttempt | null {
  const prov = PROVIDERS[provName];
  if (!prov || !providerConfigured(prov)) return null;
  const model = modelOverride ?? providerModel(prov);
  return {
    name: prov.name,
    model,
    fn: (r: AgentTurn) =>
      runAgentLoop(
        (turn) => callOpenAICompat(prov, model, turn, turn.tools ?? DEFAULT_TOOLS, turn.messages),
        r,
        r.tools ?? DEFAULT_TOOLS
      ),
  };
}

export async function chatLLM(req: LLMRequest): Promise<LLMResponse> {
  const errors: string[] = [];

  // 1) Modelo fijo de .env (verificado que responde en la fecha actual)
  const openrouterModel = process.env.OPENROUTER_MODEL || "particle-ai/particle-1:free";
  // 2) Rotacion dinamica entre los ":free" disponibles (cache 60s)
  const openrouterDynamic = await getBestFreeModel();
  // 3) Respaldo fijo
  const openrouterFallback = process.env.OPENROUTER_FALLBACK_MODEL || "baidu/ernie-5.5-flash-preview:free";
  const geminiModel = process.env.GEMINI_MODEL || "gemini-3.8-flash";

  // Cadena de fallbacks: cada intento sin claves en .env se salta automaticamente
  const geminiAttempt: LLMAttempt | null = process.env.GEMINI_API_KEY
    ? {
        name: "gemini",
        model: geminiModel,
        fn: (r) =>
          runAgentLoop(
            (turn) => callGemini(turn, geminiModel, turn.tools ?? DEFAULT_TOOLS, turn.messages),
            r,
            r.tools ?? DEFAULT_TOOLS
          ),
      }
    : null;

  const attempts: LLMAttempt[] = [
    // 1. OpenRouter — modelo fijo configurado (verificado que responde)
    compatAttempt("openrouter", openrouterModel),
    // 2. OpenRouter — rotacion dinamica entre modelos :free
    compatAttempt("openrouter", openrouterDynamic),
    // 3. OpenRouter — modelo de respaldo fijo
    compatAttempt("openrouter", openrouterFallback),
    // 4. Groq — inferencia LPU ultra-rapida (30 RPM · 1.000 req/dia)
    compatAttempt("groq"),
    // 5. Gemini — respaldo directo nativo (Google AI Studio)
    geminiAttempt,
    // 6. Cohere — 1.000 llamadas/mes, buen multilingue (gl/es/en)
    compatAttempt("cohere"),
    // 7. Cloudflare Workers AI — 10.000 neurons/dia compartidas
    compatAttempt("cloudflare"),
    // 8. OVHcloud AI — anonimo, hosting UE (2 RPM), ultimo recurso sin claves
    compatAttempt("ovh"),
  ].filter((a): a is LLMAttempt => a !== null);

  // Presupuesto global: si el reloj se agota, dejamos de intentar proveedores
  // y lanzamos el fallback local (respuesta JSON en < 25 s, nunca un 504).
  const deadline = Date.now() + TOTAL_BUDGET_MS;

  for (const attempt of attempts) {
    const remaining = deadline - Date.now();
    if (remaining < 1_500) {
      errors.push(`${attempt.name}: omitido por presupuesto de tiempo`);
      break;
    }
    try {
      const out = await withTimeout(attempt.fn(req), remaining);
      return out;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      errors.push(`${attempt.name}[${attempt.model}]: ${msg}`);
      console.warn(`[LLM] fallo ${attempt.name}:`, msg);
    }
  }

  throw new Error(`Todos los proveedores fallaron → ${errors.join(" | ")}`);
}

export function llmConfigured(): boolean {
  return keyConfiguredProviders().length > 0 || Boolean(process.env.GEMINI_API_KEY);
}
