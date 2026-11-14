// API /api/docs — Documentación OpenAPI 3.0 (PRO AGENT)
// Sirve la especificación de la API en formato OpenAPI 3.0.

import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import path from "path";

export const runtime = "nodejs";

export async function GET() {
  try {
    const spec = readFileSync(path.join(process.cwd(), "public", "openapi.json"), "utf-8");
    return new NextResponse(spec, {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return NextResponse.json({ error: "OpenAPI spec not found" }, { status: 404 });
  }
}
