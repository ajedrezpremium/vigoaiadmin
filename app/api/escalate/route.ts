// API /api/escalate — Human-in-the-Loop (PRO AGENT)
// Crea una escalación a personal municipal cuando la ciudadanía lo solicita
// o cuando el agente lo considera necesario (p. ej. caso complejo / sensibilidad).

import { NextRequest, NextResponse } from "next/server";
import { createEscalation } from "@/lib/supabase";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const escalation = await createEscalation({
      agent: typeof body.agent === "string" ? body.agent : undefined,
      context: body.context ?? undefined,
      language: typeof body.language === "string" ? body.language : undefined,
    });

    if (!escalation) {
      return NextResponse.json(
        { error: "Persistencia no disponible (modo demo sin Supabase)" },
        { status: 503 }
      );
    }

    return NextResponse.json({ escalationId: escalation.id, status: escalation.status });
  } catch {
    return NextResponse.json({ error: "Error al crear la escalación" }, { status: 500 });
  }
}
