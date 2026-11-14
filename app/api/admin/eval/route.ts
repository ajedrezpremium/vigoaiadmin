// API /api/admin/eval — Evaluación de calidad RAG (PRO AGENT / Observabilidad)
// Ejecuta el golden set y devuelve métricas (hit rate, abstención).
// Protegido por ADMIN_TOKEN o Supabase Auth + RBAC.

import { NextRequest, NextResponse } from "next/server";
import { runRagEval } from "@/lib/rag.eval";
import { logAudit } from "@/lib/supabase";
import { checkAdminAuth } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const auth = await checkAdminAuth(req);
  if (!auth.authorized) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const result = runRagEval();
  await logAudit({
    eventType: "rag_eval",
    payload: { hitRate: result.hitRate, hits: result.hits, total: result.total },
  });
  return NextResponse.json(result);
}
