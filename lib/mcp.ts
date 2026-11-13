// Fachada MCP (Model Context Protocol) — VIGO AI ADMINISTRATION DEMO
// Expone las herramientas del agente (RAG, escalada, registro de cita) al
// ecosistema MCP: clientes/agentes externos pueden listar herramientas y
// ejecutarlas vía JSON-RPC (`tools/list`, `tools/call`).
//
// Nota demo: los handlers de escritura (escalada, registro de cita) persisten
// vía capa Supabase (service role) cuando está disponible.

import { DEFAULT_TOOLS, executeTool } from "@/lib/llm";
import type { ToolDef } from "@/lib/llm";

export async function listMcpTools(): Promise<ToolDef[]> {
  // En demo todas las herramientas del agente PRO son consumibles vía MCP.
  return DEFAULT_TOOLS;
}

export async function callMcpTool(
  name: string,
  args: Record<string, unknown>
): Promise<{ content: string; isError: boolean }> {
  const result = await executeTool(name, args);
  let isError = false;
  try {
    const parsed = JSON.parse(result);
    if (parsed && parsed.ok === false) isError = true;
  } catch {
    /* sin JSON → no error estructurado */
  }
  return { content: result, isError };
}
