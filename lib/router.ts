// Router de intenciones — MASTER AGENT (Megaprompt §2, §5)
// Demo: clasificación por reglas (latencia cero, coste cero, auditable).
// En producción: clasificador semántico + LLM con validación de salida.

import type { AgentId, Lang } from "@/types";
import { AGENTS } from "./agents";
import type { AgentDef } from "./agents";

// Stopwords multi-idioma mínimas para el router
const STOP = new Set([
  "el","la","los","las","un","una","unos","unas","de","del","para","por","con","que","como","cómo",
  "cual","cuál","cuando","cuándo","donde","dónde","es","son","está","estan","hay","mi","mis","y","o",
  "the","a","an","of","for","with","what","when","where","is","are","how","my","and","or","to","in",
  "o","os","as","do","da","dos","das","no","na","en","unha","cal","cando","cando","podo","preciso",
  "preciso","necesito","necesita","quiero","puedo","pode","axuda",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quitar acentos
    .replace(/[^a-z0-9ñ\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP.has(t));
}

/** Detecta el idioma por marcadores gallegos; defecto: es */
export function detectLanguage(text: string, fallback: Lang = "es"): Lang {
  const t = text.toLowerCase();
  const glMarkers = /\b(cal|cando|precisto|podo|axudarche|servizos|galego|mañá|obradoiro|atén|dispoñibles|decalaración)\b/;
  const enMarkers = /\b(what|when|where|how|open|need|can i|library|opening hours|documents)\b/;
  const esMarkers = /\b(cuál|cuando|cómo|qué|necesito|puedo|horario|biblioteca|servicios|galego)\b/;
  if (t.includes("galego") || glMarkers.test(t)) return "gl";
  if (enMarkers.test(t) && !esMarkers.test(t)) return "en";
  return fallback;
}

export interface RouteResult {
  agent: AgentId;
  score: number;
  matched: string[];
}

/**
 * Clasifica la consulta al agente especializado (reglas por keywords).
 * Empate → prioridad declarada en AGENT_PRIORITY.
 */
const AGENT_PRIORITY: AgentId[] = [
  "social", // consultas sensibles primero
  "legal",
  "urban",
  "business",
  "admin",
  "document",
  "culture",
  "history",
  "language",
  "citizen",
];

export function classify(query: string, agents: Record<AgentId, AgentDef> = AGENTS): RouteResult {
  const tokens = tokenize(query);
  const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  let best: { agent: AgentId; score: number; matched: string[] } | null = null;

  for (const agentId of AGENT_PRIORITY) {
    const agent = AGENTS[agentId];
    const matched: string[] = [];
    let score = 0;
    for (const kw of agent.keywords) {
      const k = kw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (k.includes(" ")) {
        if (q.includes(k)) {
          score += 3;
          matched.push(kw);
        }
      } else if (tokens.includes(k) || q.includes(k)) {
        score += 1;
        matched.push(kw);
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { agent: agentId, score, matched };
    }
  }

  if (!best) {
    return { agent: "citizen", score: 0, matched: [] }; // MASTER → AGENT 01 por defecto
  }
  return best;
}
