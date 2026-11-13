// API /api/workflow — Workflow Engine (PRO AGENT)
// Ejecuta flujos multi-paso (cita-previa, info-tramite) con trazabilidad
// por paso y auditoría en Supabase.

import { NextRequest, NextResponse } from "next/server";
import { runWorkflow, listFlows } from "@/lib/workflow";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET() {
  const flows = listFlows().map((f) => ({
    id: f.id,
    name: f.name,
    description: f.description,
  }));
  return NextResponse.json({ flows });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const flowId = typeof body?.flowId === "string" ? body.flowId : "";
  const input =
    body?.input && typeof body.input === "object" && !Array.isArray(body.input)
      ? (body.input as Record<string, unknown>)
      : {};

  if (!flowId) {
    return NextResponse.json({ error: "flowId requerido" }, { status: 400 });
  }

  const run = await runWorkflow(flowId, input);
  return NextResponse.json(run);
}
