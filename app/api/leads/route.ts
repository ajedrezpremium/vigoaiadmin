// API /api/leads — solicitudes de concellos desde la landing /ayuntamientos.
// Nunca falla en silencio: devuelve JSON con el estado del almacenamiento y del aviso.

import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { notifyLead, saveLead, validateLead } from "@/lib/leads";

export const runtime = "nodejs";
export const maxDuration = 20;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
    const limit = rateLimit(`lead:${ip}`);
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Téntao de novo nun minuto." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const result = validateLead(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const lead = {
      ...result.lead,
      userAgent: result.lead.userAgent ?? req.headers.get("user-agent") ?? undefined,
    };

    const [stored, notified] = await Promise.all([saveLead(lead), notifyLead(lead)]);

    return NextResponse.json({ ok: true, stored, notified });
  } catch (e) {
    console.error("[api/leads] error:", e);
    return NextResponse.json(
      { error: "Non puidemos rexistrar a solicitude. Escríbenos por correo." },
      { status: 500 }
    );
  }
}
