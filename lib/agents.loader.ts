// Loader de configuración de agentes desde config/agents.json (v1.2, B1)
// Solo servidor (usa fs). Devuelve null si el archivo no está disponible.
// El fallback hardcodeado está en lib/agents.ts.

import type { AgentDef } from "@/lib/agents";
import type { AgentId } from "@/types";
import { readFileSync } from "fs";
import path from "path";

export function loadAgentConfig(): Record<AgentId, AgentDef> | null {
  try {
    const configPath = path.join(process.cwd(), "config", "agents.json");
    const raw = readFileSync(configPath, "utf-8");
    const parsed = JSON.parse(raw) as { agents: AgentDef[] };
    if (!parsed.agents || !Array.isArray(parsed.agents)) return null;
    const map = {} as Record<AgentId, AgentDef>;
    for (const a of parsed.agents) {
      map[a.id] = a;
    }
    return map;
  } catch {
    return null;
  }
}
