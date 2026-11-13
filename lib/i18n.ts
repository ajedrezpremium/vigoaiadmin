// i18n de la interfaz (gl · es · en) — Megaprompt §4, §9 FRONTEND

import type { Lang } from "@/types";

export const LANGUAGES: { id: Lang; label: string; flag: string }[] = [
  { id: "gl", label: "Galego", flag: "🗣" },
  { id: "es", label: "Español", flag: "🇪🇸" },
  { id: "en", label: "English", flag: "🌐" },
];

type Dict = {
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
};

export const I18N: Record<Lang, Dict> = {
  gl: {
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
  },
  es: {
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
  },
  en: {
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
  },
};
