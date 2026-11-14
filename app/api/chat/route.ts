// API /api/chat — Orquestación MASTER AGENT (Megaprompt §2, §8)
// MASTER → clasificación → agente especializado → recuperación RAG →
// → generación con evidencia → validación → respuesta al ciudadano.

import { NextRequest, NextResponse } from "next/server";
import type { ChatResponse, Lang, SourceRef } from "@/types";
import { AGENTS as FALLBACK_AGENTS, buildSystemPrompt, agentLabel } from "@/lib/agents";
import { loadAgentConfig } from "@/lib/agents.loader";

// Agentes: config externa (config/agents.json) con fallback hardcodeado
const AGENTS = loadAgentConfig() ?? FALLBACK_AGENTS;
import { classify, detectLanguage } from "@/lib/router";
import { retrieve, evidenceBlock } from "@/lib/rag";
import { chatLLM, llmConfigured } from "@/lib/llm";
import { rateLimit } from "@/lib/rate-limit";
import { getConversationHistory, logAudit, logConversation } from "@/lib/supabase";
import { startSpan, endSpan } from "@/lib/observability";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_HISTORY = 8; // límite de contexto (privacidad + coste)
const MAX_LEN = 2000; // validación de entrada

interface ChatBody {
  message?: string;
  history?: { role: "user" | "assistant"; content: string }[];
  language?: Lang;
  conversationId?: string;
}

/** Respuesta local sin LLM: siempre disponible, muestra el flujo completo */
function localFallbackReply(
  query: string,
  lang: Lang,
  sources: SourceRef[],
  hasEvidence: boolean,
  agentLabelStr: string
): string {
  const head =
    lang === "gl"
      ? `[MODO DEMO LOCAL — sen modelo de IA conectado · ${agentLabelStr}]`
      : lang === "en"
      ? `[LOCAL DEMO MODE — no AI model connected · ${agentLabelStr}]`
      : `[MODO DEMO LOCAL — sin modelo de IA conectado · ${agentLabelStr}]`;

  if (!hasEvidence || sources.length === 0) {
    const none =
      lang === "gl"
        ? "Non atopo información suficiente nos documentos de demostración dispoñibles para responder con garantías. Non vou inventar datos.\n\nPodes:\n• reformular a pregunta con outros termos,\n• consultar as canles oficiais do concello,\n• ou solicitar axuda humana co botón «Axuda humana»."
        : lang === "en"
        ? "I cannot find enough information in the available demo documents to answer reliably. I will not invent data.\n\nYou can:\n• rephrase your question,\n• check the official municipal channels,\n• or request human assistance with the «Human help» button."
        : "No encuentro información suficiente en los documentos de demostración disponibles para responder con garantías. No voy a inventar datos.\n\nPuedes:\n• reformular la pregunta con otros términos,\n• consultar los canales oficiales del ayuntamiento,\n• o solicitar ayuda humana con el botón «Ayuda humana».";
    return `${head}\n\n${none}`;
  }

  const bullets = sources
    .map(
      (s) =>
        `• [${s.ref}] ${s.title} (${s.dept}, vixente/publicado ${s.effective}): ${s.snippet}`
    )
    .join("\n");

  const body =
    lang === "gl"
      ? `Atopéi isto nos documentos de demostración:\n\n${bullets}\n\nComproba os detalles nas canles oficiais antes de actuar.`
      : lang === "en"
      ? `I found this in the demo documents:\n\n${bullets}\n\nVerify details through official channels before acting.`
      : `Esto es lo que encontré en los documentos de demostración:\n\n${bullets}\n\nVerifica los detalles en los canales oficiales antes de actuar.`;

  return `${head}\n\n${body}`;
}

export async function POST(req: NextRequest) {
  // --- Rate limiting (seguridad transversal) ---
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "local";
  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `Demasiadas peticiones. Reintenta en ${rl.retryAfterSec}s.` },
      { status: 429 }
    );
  }

  // --- Validación de entrada ---
  let body: ChatBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo JSON inválido" }, { status: 400 });
  }

  const message = (body.message ?? "").toString().trim();
  if (!message) {
    return NextResponse.json({ error: "Mensaje vacío" }, { status: 400 });
  }
  if (message.length > MAX_LEN) {
    return NextResponse.json(
      { error: `Mensaje demasiado largo (máx. ${MAX_LEN} caracteres)` },
      { status: 400 }
    );
  }

  const history = (body.history ?? [])
    .filter((m) => m && typeof m.content === "string")
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: (m.role === "assistant" ? "assistant" : "user") as "user" | "assistant",
      content: m.content.slice(0, MAX_LEN),
    }));

  // --- Memoria persistente: reutilizar conversación existente o empezar nueva ---
  let conversationId: string | undefined;
  let effectiveHistory: { role: "user" | "assistant"; content: string }[] = [];

  if (typeof body.conversationId === "string" && body.conversationId.length > 0) {
    conversationId = body.conversationId;
    effectiveHistory = await getConversationHistory(body.conversationId);
  } else {
    effectiveHistory = [];
  }

  // --- MASTER AGENT: idioma + clasificación de intención ---
  const lang: Lang =
    body.language && ["gl", "es", "en"].includes(body.language)
      ? body.language
      : detectLanguage(message, "es");

  const rootSpan = startSpan("chat.request", {
    ip,
    messageLen: message.length,
    language: lang,
  });

  const route = classify(message, AGENTS);
  const agent = AGENTS[route.agent];
  const agentLabelStr = agentLabel(route.agent, lang);

  void endSpan(startSpan("chat.classify", { agent: route.agent, score: route.score }));

  // --- RAG: recuperación de evidencia ---
  const { sources, hasEvidence } = retrieve(message, lang);
  void endSpan(startSpan("chat.retrieve", { hasEvidence, sources: sources.length }));
  const system = buildSystemPrompt(agent, lang, evidenceBlock(sources));

  // --- Generación (OpenRouter → Gemini → modo local) ---
  let reply: string;
  let provider = "demo-local";
  let model = "template-rag";
  let demoMode = true;
  let escalated = false;

  if (llmConfigured()) {
    const llmStart = Date.now();
    try {
      const out = await chatLLM({
        system,
        messages: [...effectiveHistory, { role: "user", content: message }],
        temperature: 0.2,
        maxTokens: 600,
      });
      reply = out.text;
      provider = out.provider;
      model = out.model;
      demoMode = false;
      escalated = Boolean(out.escalated);
      void endSpan(
        startSpan("chat.llm", {
          provider,
          model,
          demoMode,
          escalated,
          durationMs: Date.now() - llmStart,
        })
      );
    } catch {
      reply = localFallbackReply(message, lang, sources, hasEvidence, agentLabelStr);
      void endSpan(
        startSpan("chat.llm", {
          provider: "demo-local",
          model: "template-rag",
          demoMode: true,
          durationMs: Date.now() - llmStart,
          error: "fallback",
        })
      );
    }
  } else {
    reply = localFallbackReply(message, lang, sources, hasEvidence, agentLabelStr);
    void endSpan(startSpan("chat.llm", { provider: "demo-local", model: "template-rag", demoMode: true }));
  }

  // --- Validación básica de salida (Megaprompt §8) ---
  if (!hasEvidence && sources.length === 0 && provider === "demo-local") {
    // abstención ya marcada en la plantilla
  }

  const result: ChatResponse = {
    reply,
    agent: route.agent,
    agentLabel: agentLabelStr,
    sources,
    provider,
    model,
    demoMode,
    conversationId: conversationId ?? undefined,
    escalated,
  };

  // --- Auditoría y persistencia (no bloquean) ---
  await logAudit({
    eventType: "chat_request",
    payload: { agent: route.agent, routed_score: route.score, hasEvidence, provider, model },
  });
  const persistedConversationId = await logConversation({
    conversationId,
    language: lang,
    userMessage: message,
    assistantReply: reply,
    agent: route.agent,
    provider,
    model,
    sources,
  });

  rootSpan.attributes.provider = provider;
  rootSpan.attributes.model = model;
  rootSpan.attributes.demoMode = demoMode;
  rootSpan.attributes.escalated = escalated;
  rootSpan.attributes.hasEvidence = hasEvidence;
  void endSpan(rootSpan);

  return NextResponse.json({ ...result, conversationId: persistedConversationId ?? conversationId ?? undefined });
}
