// API /api/admin/leads — listado de solicitudes de concellos para el panel interno.

import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth, hasRole } from "@/lib/admin-auth";
import { listLeads } from "@/lib/leads";

export const runtime = "nodejs";
export const maxDuration = 20;

export async function GET(req: NextRequest) {
  const auth = await checkAdminAuth(req);
  if (!hasRole(auth, "viewer")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const leads = await listLeads(200);
  return NextResponse.json({ leads });
}
