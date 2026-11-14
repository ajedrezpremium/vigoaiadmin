// Catálogo de proveedores LLM con nivel gratuito permanente — VIGO AI ADMINISTRATION
// Fuente: github.com/mnfst/awesome-free-llm-apis (CC0-1.0)
//
// Casi todos los proveedores gratuitos exponen un endpoint OpenAI-compatible
// (/chat/completions), por lo que un único caller genérico (lib/llm.ts) los cubre.
// Este fichero solo contiene CONFIGURACIÓN (sin lógica): cada entrada describe
// endpoint, clave(s) de entorno, modelo por defecto y condiciones del free tier.
//
// ⚠️ Los niveles gratuitos son para DEMO y desarrollo. Varios proveedores
// registran los prompts para entrenar sus modelos (ver freeTierNotes). Para
// producción municipal con datos de ciudadanos reales: modelo según la política
// de la entidad (Megaprompt §489) — no usar free tiers con datos personales.

export interface OpenAICompatProvider {
  /** Identificador interno (aparece en logs, trazas y panel admin) */
  name: string;
  /** URL completa del endpoint /chat/completions.
   *  Admite placeholders {ENV_VAR} resueltos en runtime (p. ej. account id). */
  endpoint: string;
  /** Variable de entorno con la API key. undefined = acceso anónimo (sin key). */
  envKeyVar?: string;
  /** Variables de entorno adicionales requeridas (p. ej. CLOUDFLARE_ACCOUNT_ID). */
  requiredEnvVars?: string[];
  /** Modelo por defecto si no hay override en .env */
  defaultModel: string;
  /** Variable de entorno para fijar el modelo manualmente */
  envModelVar?: string;
  /** Headers extra (identificación de la app, auth adicional, …) */
  headers?: Record<string, string>;
  /** Límites y condiciones del nivel gratuito (resumen de la fuente) */
  freeTierNotes: string;
}

export const PROVIDERS: Record<string, OpenAICompatProvider> = {
  // ---- OpenRouter: 17+ modelos ":free", selección dinámica en runtime ----
  // 20 RPM / 50 RPD (free). Los proveedores free pueden registrar prompts.
  openrouter: {
    name: "openrouter",
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    envKeyVar: "OPENROUTER_API_KEY",
    defaultModel: "google/gemma-4-31b-it:free",
    envModelVar: "OPENROUTER_FALLBACK_MODEL",
    headers: {
      "HTTP-Referer": "https://vigo-ai-demo.vercel.app",
      "X-Title": "VIGO AI ADMINISTRATION DEMO",
    },
    freeTierNotes:
      "20 RPM · 50 req/día (todas las :free). Cuentas con ≥10 créditos: 1.000 RPD. Puede registrar prompts para entrenamiento.",
  },

  // ---- Groq: inferencia LPU ultra-rápida, sin tarjeta ----
  // 30 RPM · 1.000 RPD · 8.000 TPM · 200.000 TPD (modelos de chat listados).
  groq: {
    name: "groq",
    endpoint: "https://api.groq.com/openai/v1/chat/completions",
    envKeyVar: "GROQ_API_KEY",
    defaultModel: "openai/gpt-oss-120b",
    envModelVar: "GROQ_MODEL",
    freeTierNotes:
      "30 RPM · 1.000 req/día · 200.000 tokens/día. Sin tarjeta. El catálogo rota (ver console.groq.com/docs/deprecations).",
  },

  // ---- Cohere: clave "Trial" gratuita, 1.000 llamadas/mes, buen gl/es ----
  // Endpoint de compatibilidad OpenAI. Solo uso no comercial en Trial.
  cohere: {
    name: "cohere",
    endpoint: "https://api.cohere.ai/compatibility/v1/chat/completions",
    envKeyVar: "COHERE_API_KEY",
    defaultModel: "command-r7b-12-2024",
    envModelVar: "COHERE_MODEL",
    freeTierNotes:
      "1.000 llamadas/mes · 20 RPM. Sin tarjeta. Uso NO comercial en clave Trial.",
  },

  // ---- Cloudflare Workers AI: 10.000 "neurons"/día, 60+ modelos ----
  // Requiere API token + account id. Sin tarjeta; exceder cuota falla (no factura).
  cloudflare: {
    name: "cloudflare",
    endpoint:
      "https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/v1/chat/completions",
    envKeyVar: "CLOUDFLARE_API_KEY",
    requiredEnvVars: ["CLOUDFLARE_ACCOUNT_ID"],
    defaultModel: "@cf/openai/gpt-oss-120b",
    envModelVar: "CLOUDFLARE_MODEL",
    freeTierNotes:
      "10.000 neurons/día compartidas, reset 00:00 UTC. Sin tarjeta. Modelos excluidos del free: kimi-*, glm-5.*, deepseek-v4-* (ver docs Cloudflare).",
  },

  // ---- OVHcloud AI Endpoints: tier anónimo permanente, hosting UE (Francia) ----
  // Sin API key ni registro: 2 RPM por IP y modelo. Interesante como respaldo
  // por soberanía (RGPD) aunque el límite es bajo.
  ovh: {
    name: "ovh",
    endpoint: "https://oai.endpoints.kepler.ai.cloud.ovh.net/v1/chat/completions",
    defaultModel: "gpt-oss-120b",
    envModelVar: "OVHAI_MODEL",
    freeTierNotes:
      "Anónimo: 2 RPM por IP y modelo, sin registro. Hosting UE. Limites altos (400 RPM) requieren proyecto Public Cloud de pago.",
  },
};

/** true si todas las variables de entorno requeridas del proveedor están definidas */
export function providerConfigured(p: OpenAICompatProvider): boolean {
  const vars = [p.envKeyVar, ...(p.requiredEnvVars ?? [])].filter(
    (v): v is string => Boolean(v)
  );
  return vars.every((v) => Boolean(process.env[v]));
}

/** Modelo efectivo del proveedor: override .env o default del catálogo */
export function providerModel(p: OpenAICompatProvider): string {
  const override = p.envModelVar ? process.env[p.envModelVar] : undefined;
  return override || p.defaultModel;
}

/** Resuelve placeholders {ENV_VAR} en la URL del endpoint */
export function providerEndpoint(p: OpenAICompatProvider): string {
  return p.endpoint.replace(/\{([A-Z_][A-Z0-9_]*)\}/g, (m, v: string) =>
    process.env[v] || m
  );
}

/** Proveedores OpenAI-compatibles configurados con API key (para llmConfigured) */
export function keyConfiguredProviders(): OpenAICompatProvider[] {
  return Object.values(PROVIDERS).filter(
    (p) => p.envKeyVar !== undefined && providerConfigured(p)
  );
}
