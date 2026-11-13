// i18n de la interfaz (gl · es · en) — Megaprompt §4, §9 FRONTEND

import type { Lang } from "@/types";

export const LANGUAGES: { id: Lang; label: string; flag: string }[] = [
  { id: "gl", label: "Galego", flag: "🗣" },
  { id: "es", label: "Español", flag: "🇪🇸" },
  { id: "en", label: "English", flag: "🌐" },
];

type Dict = {
  // Widget
  welcome: string;
  disclaimer: string;
  demoBadge: string;
  placeholder: string;
  send: string;
  newChat: string;
  clear: string;
  speak: string;
  listen: string;
  humanHelp: string;
  humanHelpTitle: string;
  humanHelpBody: string;
  privacy: string;
  sources: string;
  noSources: string;
  agentPrefix: string;
  thinking: string;
  suggested: string;
  tryAgain: string;
  errorGeneric: string;
  ttsOn: string;
  ttsOff: string;
  // Landing / web completa
  landingBadge: string;
  landingTitle: string;
  landingSubtitle: string;
  landingDemoBadge: string;
  landingCta: string;
  landingCtaBody: string;
  landingEcosystemTitle: string;
  landingMasterFlow: string;
  landingAgentsTitle: string;
  landingSecurityTitle: string;
  landingRagTitle: string;
  landingRagStepsTitle: string;
  landingRagNote: string;
  landingStackTitle: string;
  landingNextTitle: string;
  landingNextBody: string;
  landingNextCta1: string;
  landingNextCta2: string;
  landingFooter: string;
};

export const I18N: Record<Lang, Dict> = {
  gl: {
    // ── Widget ─────────────────────────────────────────────
    welcome:
      "Bo día! Son o asistente dixital de información municipal (IA de demostración). En que podo axudarche?",
    disclaimer:
      "Asistente IA de demostración. Non son un empregado municipal. Non tomo decisións administrativas. Comproba sempre a información nas canles oficiais.",
    demoBadge: "DEMO · datos sintéticos",
    placeholder: "Escribe a túa pregunta…",
    send: "Enviar",
    newChat: "Nova conversa",
    clear: "Limpar",
    speak: "Escoitar resposta",
    listen: "🎤 Falar",
    humanHelp: "Axuda humana",
    humanHelpTitle: "Derivación a persoal municipal",
    humanHelpBody:
      "Nesta demo, a escalación é simulada. Nun servizo real, a conversa derivaríase ao Servizo de Atención ao Cidadán (OAC) co contexto completo.",
    privacy:
      "Demo con minimización de datos: non envíes datos persoais (DNI, contas, saúde).",
    sources: "Fontes citadas",
    noSources: "Sen fontes suficientes nesta resposta",
    agentPrefix: "Responde",
    thinking: "Pensando…",
    suggested: "Preguntas suxeridas",
    tryAgain: "Reintentar",
    errorGeneric: "Houbo un problema ao xerar a resposta. Téntao de novo.",
    ttsOn: "🔊 Voz activada",
    ttsOff: "🔇 Voz desactivada",
    // ── Landing / web completa ─────────────────────────────
    landingBadge: "CHESS AI AGENCY · IA · Innovación · Execución",
    landingTitle: "VIGO AI ADMINISTRATION",
    landingSubtitle:
      "Plataforma multiagente de Intelixencia Artificial para servizos públicos municipais.",
    landingDemoBadge: "⚠️ DEMO GRATUITA v1.0 — datos 100% sintéticos, non oficiais",
    landingCta: "👉 Prueba a demo agora:",
    landingCtaBody:
      "Abre o asistente flotante (esquina inferior dereita) e pregunta por horarios, trámites, ordenanzas, subvenciones ou cultura. Sen rexistro, sen datos persoais.",
    landingEcosystemTitle: "Ecosistema multiagente",
    landingMasterFlow:
      "MASTER AGENT → AGENTE ESPECIALIZADO → RAG (evidencia) → VALIDACIÓN → MASTER → CIUDADANÍA",
    landingAgentsTitle: "Os nove agentes especializados",
    landingSecurityTitle: "Capa transversal de seguridade e cumprimento",
    landingRagTitle: "Motor RAG con citas",
    landingRagStepsTitle: "Fluxo de recuperación",
    landingRagNote:
      "A demo utiliza 12 documentos sintéticos con metadatos completos. Se non hai evidencia suficiente, o sistema abstén e non inventa información.",
    landingStackTitle: "Stack da demo gratuita",
    landingNextTitle: "Próximo paso? O piloto real co Concello",
    landingNextBody:
      "Esta demo é a súa carta de presentación da propuesta de CHESS AI AGENCY: un piloto de Asistente Documental Interno (VIGO DOCS AI) de 6–8 semanas, limitado a un conxunto de documentos autorizados.",
    landingNextCta1: "🧭 Panel interno de demo (auth simple)",
    landingNextCta2: "Concello de Vigo — canles oficiais ↗",
    landingFooter:
      "CHESS AI AGENCY · IA · Innovation · Execution · VIGO AI ADMINISTRATION — DEMO GRATUITA v1.0 · Novembro 2026 · Servizo de demostración con IA; non representa o Concello de Vigo nin ofrece información oficial.",
  },

  es: {
    // ── Widget ─────────────────────────────────────────────
    welcome:
      "¡Hola! Soy el asistente digital de información municipal (IA de demostración). ¿En qué puedo ayudarte?",
    disclaimer:
      "Asistente IA de demostración. No soy un empleado municipal. No tomo decisiones administrativas. Comprueba siempre la información en los canales oficiales.",
    demoBadge: "DEMO · datos sintéticos",
    placeholder: "Escribe tu pregunta…",
    send: "Enviar",
    newChat: "Nueva conversa",
    clear: "Limpiar",
    speak: "Escuchar respuesta",
    listen: "🎤 Hablar",
    humanHelp: "Ayuda humana",
    humanHelpTitle: "Derivación a personal municipal",
    humanHelpBody:
      "En esta demo, la escalación es simulada. En un servicio real, la conversa se derivaría al Servicio de Atención al Ciudadano (OAC) con el contexto completo.",
    privacy:
      "Demo con minimización de datos: no envíes datos personales (DNI, cuentas, salud).",
    sources: "Fuentes citadas",
    noSources: "Sin fuentes suficientes en esta respuesta",
    agentPrefix: "Responde",
    thinking: "Pensando…",
    suggested: "Preguntas sugeridas",
    tryAgain: "Reintentar",
    errorGeneric: "Hubo un problema al generar la respuesta. Inténtalo de nuevo.",
    ttsOn: "🔊 Voz activada",
    ttsOff: "🔇 Voz desactivada",
    // ── Landing / web completa ─────────────────────────────
    landingBadge: "CHESS AI AGENCY · IA · Innovación · Ejecución",
    landingTitle: "VIGO AI ADMINISTRATION",
    landingSubtitle:
      "Plataforma multiagente de Inteligencia Artificial para servicios públicos municipales.",
    landingDemoBadge: "⚠️ DEMO GRATUITA v1.0 — datos 100% sintéticos, no oficiales",
    landingCta: "👉 Prueba la demo ahora:",
    landingCtaBody:
      "Abre el asistente flotante (esquina inferior derecha) y pregunta por horarios, trámites, ordenanzas, subvenciones o cultura. Sin registro, sin datos personales.",
    landingEcosystemTitle: "Ecosistema multiagente",
    landingMasterFlow:
      "MASTER AGENT → AGENTE ESPECIALIZADO → RAG (evidencia) → VALIDACIÓN → MASTER → CIUDADANÍA",
    landingAgentsTitle: "Los nueve agentes especializados",
    landingSecurityTitle: "Capa transversal de seguridad y cumplimiento",
    landingRagTitle: "Motor RAG con citas",
    landingRagStepsTitle: "Flujo de recuperación",
    landingRagNote:
      "La demo utiliza 12 documentos sintéticos con metadatos completos. Si no hay evidencia suficiente, el sistema se abstiene y no inventa información.",
    landingStackTitle: "Stack de la demo gratuita",
    landingNextTitle: "Siguiente paso? El piloto real con el Concello",
    landingNextBody:
      "Esta demo es la carta de presentación de la propuesta de CHESS AI AGENCY: un piloto de Asistente Documental Interno (VIGO DOCS AI) de 6–8 semanas, limitado a un conjunto de documentos autorizados.",
    landingNextCta1: "🧭 Panel interno de demo (auth simple)",
    landingNextCta2: "Concello de Vigo — canales oficiales ↗",
    landingFooter:
      "CHESS AI AGENCY · IA · Innovation · Execution · VIGO AI ADMINISTRATION — DEMO GRATUITA v1.0 · Noviembre 2026 · Servicio de demostración con IA; no representa el Concello de Vigo ni ofrece información oficial.",
  },

  en: {
    // ── Widget ─────────────────────────────────────────────
    welcome:
      "Hello! I'm the municipal digital information assistant (demo AI). How can I help you?",
    disclaimer:
      "Demo AI assistant. I am not a municipal employee. I do not make administrative decisions. Always verify information through official channels.",
    demoBadge: "DEMO · synthetic data",
    placeholder: "Type your question…",
    send: "Send",
    newChat: "New chat",
    clear: "Clear",
    speak: "Listen to answer",
    listen: "🎤 Speak",
    humanHelp: "Human help",
    humanHelpTitle: "Escalation to municipal staff",
    humanHelpBody:
      "In this demo, escalation is simulated. In a real service, the conversation would be handed over to the Citizen Service Office (OAC) with full context.",
    privacy:
      "Demo with data minimization: do not send personal data (ID, accounts, health).",
    sources: "Cited sources",
    noSources: "Not enough sources for this answer",
    agentPrefix: "Answered by",
    thinking: "Thinking…",
    suggested: "Suggested questions",
    tryAgain: "Retry",
    errorGeneric: "Something went wrong generating the answer. Please try again.",
    ttsOn: "🔊 Voice on",
    ttsOff: "🔇 Voice off",
    // ── Landing / web completa ─────────────────────────────
    landingBadge: "CHESS AI AGENCY · AI · Innovation · Execution",
    landingTitle: "VIGO AI ADMINISTRATION",
    landingSubtitle:
      "Multi-agent AI platform for municipal public services.",
    landingDemoBadge: "⚠️ FREE DEMO v1.0 — 100% synthetic data, not official",
    landingCta: "👉 Try the demo now:",
    landingCtaBody:
      "Open the floating assistant (bottom-right corner) and ask about opening hours, procedures, ordinances, grants or culture. No registration, no personal data.",
    landingEcosystemTitle: "Multi-agent ecosystem",
    landingMasterFlow:
      "MASTER AGENT → SPECIALIZED AGENT → RAG (evidence) → VALIDATION → MASTER → CITIZEN",
    landingAgentsTitle: "The nine specialized agents",
    landingSecurityTitle: "Security and compliance layer",
    landingRagTitle: "RAG engine with citations",
    landingRagStepsTitle: "Retrieval flow",
    landingRagNote:
      "The demo uses 12 synthetic documents with full metadata. If there is not enough evidence, the system abstains and does not invent information.",
    landingStackTitle: "Free demo stack",
    landingNextTitle: "Next step? The real pilot with the City Council",
    landingNextBody:
      "This demo is the business card of CHESS AI AGENCY: a Document Internal Assistant pilot (VIGO DOCS AI) of 6–8 weeks, limited to a set of authorized documents.",
    landingNextCta1: "🧭 Internal demo dashboard (simple auth)",
    landingNextCta2: "Vigo City Council — official channels ↗",
    landingFooter:
      "CHESS AI AGENCY · AI · Innovation · Execution · VIGO AI ADMINISTRATION — FREE DEMO v1.0 · November 2026 · AI demo service; it does not represent the Vigo City Council nor provide official information.",
  },
};

export function getLangFromCode(code: string | undefined): Lang {
  const found = ["gl", "es", "en"].find((l) => l === code);
  return (found as Lang) ?? "es";
}
