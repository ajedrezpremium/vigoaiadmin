// API /api/mcp — Fachada MCP (Model Context Protocol) — VIGO AI ADMINISTRATION DEMO
// Implementa el subset JSON-RPC 2.0 sobre HTTP POST:
//   - tools/list   → lista herramientas del agente
//   - tools/call   → ejecuta herramienta (search_knowledge | escalate_to_human | solicitar_cita_previa)
//   - ping         → keep-alive
// Documentación MCP: https://modelcontextprotocol.io

import { NextRequest, NextResponse } from "next/server";
import { listMcpTools, callMcpTool } from "@/lib/mcp";

export const runtime = "nodejs";
export const maxDuration = 30;

function jsonRpc(id: unknown, result?: unknown, error?: unknown) {
  if (error) {
    return NextResponse.json({ jsonrpc: "2.0", id, error });
  }
  return NextResponse.json({ jsonrpc: "2.0", id, result });
}

export async function POST(req: NextRequest) {
  let body: { method?: string; id?: unknown; params?: { name?: string; arguments?: Record<string, unknown> } } = {};
  try {
    body = await req.json().catch(() => ({}));
    const method = typeof body?.method === "string" ? body.method : "";
    const id = body?.id ?? null;

    if (method === "ping") {
      return jsonRpc(id, { ok: true });
    }

    if (method === "tools/list") {
      const tools = await listMcpTools();
      return jsonRpc(id, { tools });
    }

    if (method === "tools/call") {
      const params = (body?.params ?? {}) as { name?: string; arguments?: Record<string, unknown> };
      const name = params?.name;
      const args = params?.arguments ?? {};
      if (!name) {
        return jsonRpc(id, undefined, { code: -32602, message: "Invalid params: missing tool name" });
      }
      const res = await callMcpTool(name, args);
      return jsonRpc(id, {
        content: [{ type: "text" as const, text: res.content }],
        isError: res.isError,
      });
    }

    return jsonRpc(id, undefined, { code: -32601, message: `Method not found: ${method}` });
  } catch {
    return jsonRpc(body?.id ?? null, undefined, { code: -32603, message: "Internal error" });
  }
}

export async function GET() {
  const tools = await listMcpTools();
  return NextResponse.json({ jsonrpc: "2.0", id: null, result: { tools } });
}
