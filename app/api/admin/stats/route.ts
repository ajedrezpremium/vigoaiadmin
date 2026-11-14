// API /api/admin/stats — Panel interno de demo (Megaprompt §6)
// Requiere header x-admin-key === ADMIN_TOKEN. Solo service_role Supabase.

import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase, supabaseConfigured } from "@/lib/supabase";
import { checkAdminAuth, hasRole } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const auth = await checkAdminAuth(req);
  if (!auth.authorized) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!hasRole(auth, "viewer")) {
    return NextResponse.json({ error: "Permisos insuficientes" }, { status: 403 });
  }

  const client = getServerSupabase();
  if (!client) {
    return NextResponse.json(
      { error: "Supabase no configurado. Configura NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY." },
      { status: 503 }
    );
  }

  const { data: messages, error } = await client
    .from("messages")
    .select("role, agent, provider, model, content, created_at")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const assistant = (messages ?? []).filter((m) => m.role === "assistant");
  const agentCounts: Record<string, number> = {};
  const providerCounts: Record<string, number> = {};
  for (const m of assistant) {
    agentCounts[m.agent ?? "desconocido"] = (agentCounts[m.agent ?? "desconocido"] ?? 0) + 1;
    providerCounts[m.provider ?? "—"] = (providerCounts[m.provider ?? "—"] ?? 0) + 1;
  }

  const recentQuestions = (messages ?? [])
    .filter((m) => m.role === "user")
    .slice(0, 10)
    .map((m) => ({ content: m.content, created_at: m.created_at }));

  return NextResponse.json({
    totalMessages: messages?.length ?? 0,
    totalAssistant: assistant.length,
    agentCounts,
    providerCounts,
    recentQuestions,
    supabase: true,
  });
}
