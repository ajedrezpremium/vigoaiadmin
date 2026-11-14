// Tipos compartidos — VIGO AI ADMINISTRATION DEMO v1.0

export type Lang = "gl" | "es" | "en";

export type AgentId =
  | "master"
  | "citizen"
  | "admin"
  | "legal"
  | "document"
  | "urban"
  | "business"
  | "social"
  | "culture"
  | "language"
  | "history";

export interface DemoDoc {
  id: string;
  title: string;
  dept: string;
  type: "ordenanza" | "trámite" | "guía" | "agenda" | "información" | "subvención";
  lang: Lang | "multi";
  published: string; // ISO date
  effective: string; // ISO date
  content: string;
}

export interface SourceRef {
  ref: string; // S1, S2…
  id: string;
  title: string;
  dept: string;
  type: string;
  published: string;
  effective: string;
  snippet: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  agent?: AgentId;
  sources?: SourceRef[];
  provider?: string;
}

export interface ChatResponse {
  reply: string;
  agent: AgentId;
  agentLabel: string;
  sources: SourceRef[];
  provider: string;
  model: string;
  demoMode: boolean;
  /** ID de conversación (Supabase) para continuar la memoria entre turnos */
  conversationId?: string;
  /** true cuando el agente decidió escalar a personal municipal (Human-in-the-Loop) */
  escalated?: boolean;
}
