// Observabilidad (OTEL-style + Langfuse opcional) — VIGO AI ADMINISTRATION DEMO
// Capa de trazas/métricas sin dependencias externas. Si Langfuse está configurado
// (LANGFUSE_PUBLIC_KEY + LANGFUSE_SECRET_KEY), los spans se envían a la API de
// ingesta de Langfuse; además se persisten en Supabase (audit_events) para
// disponibilidad offline y panel admin.

import { logAudit } from "@/lib/supabase";

export interface SpanAttributes {
  [key: string]: string | number | boolean | null | undefined;
}

export interface Span {
  id: string;
  traceId: string;
  name: string;
  parentId?: string;
  attributes: SpanAttributes;
  startedAt: number;
  endedAt?: number;
  status: "ok" | "error";
  error?: string;
}

const LANGFUSE_HOST = process.env.LANGFUSE_HOST || "https://cloud.langfuse.com";
const LANGFUSE_PUBLIC = process.env.LANGFUSE_PUBLIC_KEY;
const LANGFUSE_SECRET = process.env.LANGFUSE_SECRET_KEY;

function genId(prefix = "sp"): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

function langfuseConfigured(): boolean {
  return Boolean(LANGFUSE_PUBLIC && LANGFUSE_SECRET);
}

/** Envía un lote de eventos a Langfuse (fire-and-forget). */
async function sendToLangfuse(events: unknown[]): Promise<void> {
  if (!langfuseConfigured()) return;
  try {
    const auth = Buffer.from(`${LANGFUSE_PUBLIC}:${LANGFUSE_SECRET}`).toString("base64");
    await fetch(`${LANGFUSE_HOST}/api/public/ingestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({ batch: events }),
    });
  } catch {
    /* silencioso: no bloquear la respuesta al ciudadano */
  }
}

/** Crea un span (no lo finaliza). Llamar a endSpan() para cerrarlo. */
export function startSpan(
  name: string,
  attributes: SpanAttributes = {},
  parentId?: string
): Span {
  return {
    id: genId("sp"),
    traceId: genId("tr"),
    name,
    parentId,
    attributes: { ...attributes },
    startedAt: Date.now(),
    status: "ok",
  };
}

/** Finaliza un span y lo persiste (Supabase + Langfuse opcional). */
export async function endSpan(span: Span, error?: unknown): Promise<void> {
  span.endedAt = Date.now();
  if (error) {
    span.status = "error";
    span.error = error instanceof Error ? error.message : String(error);
  }
  const durationMs = span.endedAt - span.startedAt;

  // Persistencia local (Supabase audit_events)
  await logAudit({
    eventType: "span",
    payload: {
      spanId: span.id,
      traceId: span.traceId,
      parentId: span.parentId ?? null,
      name: span.name,
      status: span.status,
      durationMs,
      error: span.error ?? null,
      attributes: span.attributes,
    },
  });

  // Exportación opcional a Langfuse
  if (langfuseConfigured()) {
    const events: unknown[] = [
      {
        id: genId("ev"),
        type: "span-create",
        timestamp: new Date(span.startedAt).toISOString(),
        body: {
          id: span.id,
          traceId: span.traceId,
          parentObservationId: span.parentId ?? null,
          name: span.name,
          startTime: new Date(span.startedAt).toISOString(),
          endTime: new Date(span.endedAt).toISOString(),
          level: span.status === "error" ? "ERROR" : "DEFAULT",
          statusMessage: span.error ?? undefined,
          metadata: span.attributes,
        },
      },
    ];
    void sendToLangfuse(events);
  }
}

/** Wrapper conveniente: ejecuta fn dentro de un span y lo cierra. */
export async function trace<T>(
  name: string,
  attributes: SpanAttributes,
  fn: (span: Span) => Promise<T>,
  parentId?: string
): Promise<T> {
  const span = startSpan(name, attributes, parentId);
  try {
    const result = await fn(span);
    await endSpan(span);
    return result;
  } catch (e) {
    await endSpan(span, e);
    throw e;
  }
}

export function observabilityConfigured(): boolean {
  return langfuseConfigured();
}
