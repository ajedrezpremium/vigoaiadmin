// Cliente Supabase — opcional en demo (Megaprompt §9 DATA LAYER)
// Si las variables no están configuradas, la app funciona igualmente
// (sin persistencia ni panel de estadísticas).

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let serverClient: SupabaseClient | null = null;

// Ninguna operación de base de datos puede bloquear la respuesta al ciudadano:
// si Supabase tarda o está caído, se degrada a "sin persistencia" en < 4 s.
const DB_TIMEOUT_MS = 3_500;

function withDbTimeout<T>(p: PromiseLike<T>, ms: number = DB_TIMEOUT_MS): Promise<T> {
  return Promise.race([
    Promise.resolve(p),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("supabase-timeout")), ms)
    ),
  ]);
}

/** Cliente SOLO SERVIDOR (service_role) para auditoría y estadísticas admin */
export function getServerSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (!serverClient) {
    serverClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return serverClient;
}

export function supabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export interface AuditLogInput {
  eventType: string;
  payload: Record<string, unknown>;
}

/** Registro de auditoría "fire and forget" — nunca bloquea la respuesta al ciudadano */
export async function logAudit(input: AuditLogInput): Promise<void> {
  const client = getServerSupabase();
  if (!client) return;
  try {
    await withDbTimeout(
      client.from("audit_events").insert({
        event_type: input.eventType,
        payload: input.payload,
      })
    );
  } catch (e) {
    console.warn("[audit] fallo registro:", e);
  }
}

export interface ConversationLogInput {
  language: string;
  userMessage: string;
  assistantReply: string;
  agent: string;
  provider: string;
  model: string;
  sources: unknown[];
  /** Si se indica, se añaden los mensajes a esa conversación existente (memoria). Si no, se crea una nueva. */
  conversationId?: string;
}

/** Historial de una conversación concreta (memoria entre turnos) */
export async function getConversationHistory(
  conversationId: string
): Promise<Array<{ role: "user" | "assistant"; content: string }>> {
  const client = getServerSupabase();
  if (!client) return [];
  try {
    const { data, error } = await withDbTimeout(
      client
        .from("messages")
        .select("role, content")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true })
        .limit(20),
      2_500
    );
    if (error) return [];
    return (data ?? []).map((m) => ({
      role: (m.role === "assistant" ? "assistant" : "user") as "user" | "assistant",
      content: String(m.content ?? ""),
    }));
  } catch {
    return [];
  }
}

export interface EscalationInput {
  agent?: string;
  context?: Record<string, unknown>;
  language?: string;
}

/** Creación de escalación (Human-in-the-Loop — PRO AGENT) */
export async function createEscalation(
  input: EscalationInput
): Promise<{ id: string; status: string } | null> {
  const client = getServerSupabase();
  if (!client) return null;
  try {
    const { data, error } = await withDbTimeout(
      client
        .from("escalations")
        .insert({
          agent: input.agent ?? "master",
          context: input.context ?? {},
          status: "open",
          language: input.language ?? "es",
        })
        .select("id,status")
        .single()
    );
    if (error) throw error;
    return data;
  } catch (e) {
    console.warn("[escalation] fallo registro:", e);
    return null;
  }
}

/**
 * Persistencia de la interacción (minimización de datos: sin PII).
 * Crea una conversación nueva o, si se indica `conversationId`,
 * la reutiliza (memoria persistente entre turnos).
 * Devuelve el `conversationId` usado.
 */
export async function logConversation(input: ConversationLogInput): Promise<string | null> {
  const client = getServerSupabase();
  if (!client) return null;
  try {
    let conversationId = input.conversationId ?? null;

    if (!conversationId) {
      const { data: conv, error: convErr } = await withDbTimeout(
        client
          .from("conversations")
          .insert({ language: input.language, demo: true })
          .select("id")
          .single()
      );
      if (convErr || !conv) throw convErr ?? new Error("sin id de conversación");
      conversationId = conv.id;
    }

    await withDbTimeout(client.from("messages").insert([
      { conversation_id: conversationId, role: "user", content: input.userMessage },
      {
        conversation_id: conversationId,
        role: "assistant",
        agent: input.agent,
        content: input.assistantReply,
        provider: input.provider,
        model: input.model,
        sources: input.sources,
      },
    ]));

    await logAudit({
      eventType: "chat_interaction",
      payload: { agent: input.agent, provider: input.provider, model: input.model },
    });

    return conversationId;
  } catch (e) {
    console.warn("[supabase] fallo persistencia:", e);
    return null;
  }
}
