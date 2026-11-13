// Motor de flujos (Workflow Engine) — VIGO AI ADMINISTRATION DEMO (PRO AGENT)
// Orquesta secuencias de pasos (recuperación, registro, escalada) con
// trazabilidad y auditoría por paso.

import { retrieve } from "@/lib/rag";
import { executeTool } from "@/lib/llm";
import { logAudit } from "@/lib/supabase";

export interface WorkflowStepResult {
  name: string;
  status: "ok" | "error" | "skipped";
  output?: unknown;
  error?: string;
  startedAt: string;
  endedAt: string;
}

export interface WorkflowRun {
  id: string;
  flowId: string;
  status: "ok" | "error" | "partial";
  steps: WorkflowStepResult[];
  startedAt: string;
  endedAt: string;
  context: Record<string, unknown>;
}

type StepOutput = {
  status: "ok" | "error" | "skipped";
  output?: unknown;
  error?: string;
  ctx?: Record<string, unknown>;
};

type StepFn = (ctx: Record<string, unknown>) => Promise<StepOutput>;

export interface WorkflowStep {
  name: string;
  fn: StepFn;
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
}

const FLOWS: Record<string, WorkflowDefinition> = {};

export function registerFlow(flow: WorkflowDefinition) {
  FLOWS[flow.id] = flow;
}

export function listFlows(): WorkflowDefinition[] {
  return Object.values(FLOWS);
}

function safeParse(s: string): Record<string, unknown> | null {
  try {
    const v = JSON.parse(s);
    return v && typeof v === "object" ? (v as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

export async function runWorkflow(
  flowId: string,
  input: Record<string, unknown> = {}
): Promise<WorkflowRun> {
  const runId = `RUN-${Date.now().toString(36).toUpperCase()}`;
  const startedAt = new Date().toISOString();
  const ctx: Record<string, unknown> = { ...input };
  const steps: WorkflowStepResult[] = [];

  const flow = FLOWS[flowId];
  if (!flow) {
    return {
      id: runId,
      flowId,
      status: "error",
      steps,
      startedAt,
      endedAt: new Date().toISOString(),
      context: ctx,
    };
  }

  let status: "ok" | "error" | "partial" = "ok";

  for (const step of flow.steps) {
    const sStart = new Date().toISOString();
    let result: StepOutput;
    try {
      result = await step.fn(ctx);
    } catch (e) {
      result = {
        status: "error",
        error: e instanceof Error ? e.message : String(e),
      };
    }
    if (result.ctx) Object.assign(ctx, result.ctx);
    const sEnd = new Date().toISOString();
    steps.push({
      name: step.name,
      status: result.status,
      output: result.output,
      error: result.error,
      startedAt: sStart,
      endedAt: sEnd,
    });
    await logAudit({
      eventType: "workflow_step",
      payload: { runId, flowId, step: step.name, status: result.status },
    });
    if (result.status === "error") status = "partial";
  }

  // si todos los pasos críticos fallan → error
  if (steps.length > 0 && steps.every((s) => s.status === "error")) status = "error";

  const endedAt = new Date().toISOString();
  await logAudit({
    eventType: "workflow_run",
    payload: { runId, flowId, status, steps: steps.length },
  });

  return { id: runId, flowId, status, steps, startedAt, endedAt, context: ctx };
}

// ---------- Flujos registrados ----------

registerFlow({
  id: "cita-previa",
  name: "Solicitud de cita previa",
  description:
    "Flujo completo: recuperación de información → registro de cita → (opcional) escalada humana.",
  steps: [
    {
      name: "recuperar-conocimiento",
      fn: async (ctx) => {
        const q = String(ctx.query ?? "cita previa sede electrónica");
        const r = retrieve(q, "es");
        return {
          status: r.hasEvidence ? "ok" : "skipped",
          output: { sources: r.sources, hasEvidence: r.hasEvidence },
          ctx: { sources: r.sources, hasEvidence: r.hasEvidence },
        };
      },
    },
    {
      name: "registrar-cita",
      fn: async (ctx) => {
        const toolRes = await executeTool("solicitar_cita_previa", {
          motivo: String(ctx.motivo ?? "Consulta general"),
        });
        const parsed = safeParse(toolRes);
        return {
          status: parsed?.ok ? "ok" : "error",
          output: parsed,
          error: parsed?.ok ? undefined : "fallo al registrar cita",
          ctx: { cita: parsed },
        };
      },
    },
    {
      name: "escalada-opcional",
      fn: async (ctx) => {
        if (!ctx.escalate) {
          return { status: "skipped", output: { skipped: true } };
        }
        const toolRes = await executeTool("escalate_to_human", {
          reason: String(ctx.escalateReason ?? "Atención personalizada"),
        });
        const parsed = safeParse(toolRes);
        return {
          status: parsed?.ok ? "ok" : "error",
          output: parsed,
          error: parsed?.ok ? undefined : "fallo al escalar",
          ctx: { escalation: parsed },
        };
      },
    },
  ],
});

registerFlow({
  id: "info-tramite",
  name: "Información de trámite",
  description: "Recupera documentación y pasos del trámite solicitado.",
  steps: [
    {
      name: "recuperar-conocimiento",
      fn: async (ctx) => {
        const q = String(ctx.query ?? "");
        const r = retrieve(q, "es");
        return {
          status: r.hasEvidence ? "ok" : "skipped",
          output: { sources: r.sources, hasEvidence: r.hasEvidence },
          ctx: { sources: r.sources, hasEvidence: r.hasEvidence },
        };
      },
    },
  ],
});
