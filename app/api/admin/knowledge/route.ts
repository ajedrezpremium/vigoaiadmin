// API /api/admin/knowledge — Gestión de conocimiento (PRO AGENT / Semana 2 v1.2)
// CRUD básico de documentos del corpus de demostración.
// Protegido por ADMIN_TOKEN o Supabase Auth + RBAC.

import { NextRequest, NextResponse } from "next/server";
import { DEMO_CORPUS } from "@/data/demo-corpus";
import type { DemoDoc } from "@/types";
import { checkAdminAuth, hasRole } from "@/lib/admin-auth";

// Almacén en memoria para la demo (no persiste entre deploys)
const runtimeCorpus: DemoDoc[] = [...DEMO_CORPUS];

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const auth = await checkAdminAuth(req);
  if (!auth.authorized) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  return NextResponse.json({ total: runtimeCorpus.length, documents: runtimeCorpus });
}

export async function POST(req: NextRequest) {
  const auth = await checkAdminAuth(req);
  if (!auth.authorized) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!hasRole(auth, "editor")) {
    return NextResponse.json({ error: "Permisos insuficientes (editor requerido)" }, { status: 403 });
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
  const auth = await checkAdminAuth(req);
  if (!auth.authorized) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!hasRole(auth, "admin")) {
    return NextResponse.json({ error: "Permisos insuficientes (admin requerido)" }, { status: 403 });
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
