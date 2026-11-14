// API /api/admin/knowledge — Gestión de conocimiento (PRO AGENT / Semana 2 v1.2)
// CRUD básico de documentos del corpus de demostración.
// Requiere header x-admin-key === ADMIN_TOKEN (si configurado; en demo abierto).

import { NextRequest, NextResponse } from "next/server";
import { DEMO_CORPUS } from "@/data/demo-corpus";
import type { DemoDoc } from "@/types";

// Almacén en memoria para la demo (no persiste entre deploys)
const runtimeCorpus: DemoDoc[] = [...DEMO_CORPUS];

export const runtime = "nodejs";

function isAuthorized(req: NextRequest): boolean {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken || adminToken.startsWith("TU_TOKEN")) return true;
  const provided = req.headers.get("x-admin-key") ?? req.nextUrl.searchParams.get("token");
  return provided === adminToken;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ total: runtimeCorpus.length, documents: runtimeCorpus });
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const doc: DemoDoc = {
      id: body.id || `DOC-${Date.now()}`,
      title: body.title || "Sin título",
      dept: body.dept || "General",
      type: body.type || "información",
      lang: body.lang || "multi",
      published: body.published || new Date().toISOString().slice(0, 10),
      effective: body.effective || new Date().toISOString().slice(0, 10),
      content: body.content || "",
    };
    runtimeCorpus.push(doc);
    return NextResponse.json({ ok: true, document: doc }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Cuerpo JSON inválido" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id requerido" }, { status: 400 });
  }
  const idx = runtimeCorpus.findIndex((d) => d.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "documento no encontrado" }, { status: 404 });
  }
  const removed = runtimeCorpus.splice(idx, 1)[0];
  return NextResponse.json({ ok: true, removed });
}
