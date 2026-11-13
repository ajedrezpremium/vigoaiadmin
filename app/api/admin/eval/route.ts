// API /api/admin/eval — Evaluación de calidad RAG (PRO AGENT / Observabilidad)
// Ejecuta el golden set y devuelve métricas (hit rate, abstención).
// Protegido por ADMIN_TOKEN (si está configurado; en demo abierto).

import { NextRequest, NextResponse } from "next/server";
import { runRagEval } from "@/lib/rag.eval";
import { logAudit } from "@/lib/supabase";

export const runtime = "nodejs";
export const maxDuration = 60;

function isAuthorized(req: NextRequest): boolean {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken || adminToken.startsWith("TU_TOKEN")) return true; // demo abierto
  const provided =
    req.headers.get("x-admin-token") ?? req.nextUrl.searchParams.get("token");
  return provided === adminToken;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const result = runRagEval();
  await logAudit({
    eventType: "rag_eval",
    payload: { hitRate: result.hitRate, hits: result.hits, total: result.total },
  });
  return NextResponse.json(result);
}
