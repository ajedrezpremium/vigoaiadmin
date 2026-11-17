"use client";

// Widget flotante de asistente municipal — Megaprompt §4
// Componentes: conversación, entrada, idiomas, voz (STT/TTS) con voces
// masculina/femenina, sugerencias, fuentes citadas, escalación humana,
// compartir en RRSS, copiar/pegar, privacidad, accesibilidad.
// Nivel PRO: tarjeta ampliada + acciones por mensaje (copiar, hablar, compartir).

import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatResponse, Lang, SourceRef } from "@/types";
import { I18N, LANGUAGES } from "@/lib/i18n";
import { SUGGESTED_QUESTIONS } from "@/data/demo-corpus";

interface UIMessage {
  role: "user" | "assistant";
  content: string;
  agentLabel?: string;
  sources?: SourceRef[];
  provider?: string;
  demoMode?: boolean;
}

const SPEECH_LANG: Record<Lang, string> = { gl: "gl-ES", es: "es-ES", en: "en-US" };
const BCP47: Record<Lang, string> = { gl: "gl-ES", es: "es-ES", en: "en-US" };

/** Renderiza [S1]/[S2] como citas con tooltip hacia la fuente */
function renderContent(content: string, sources?: SourceRef[]) {
  const parts = content.split(/(\[S\d\])/g);
  return parts.map((p, i) => {
    const m = p.match(/^\[S(\d)\]$/);
    if (m && sources) {
      const src = sources.find((s) => s.ref === p);
      return (
        <span key={i} className="cite" title={src ? `${src.title} — ${src.dept} (${src.effective})` : p}>
          {p.slice(1, -1)}
        </span>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

function cleanForSpeech(text: string): string {
  return text
    .replace(/\[S\d\]/g, "")
    .replace(/[⚠️✅❌🙋📚🔒🏛️👉⬇️🔄🎤🔊]/g, "")
    .replace(/[*_`#>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 900);
}

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("es");
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tts, setTts] = useState(false);
  const [voiceGender, setVoiceGender] = useState<"female" | "male">("female");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [listening, setListening] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [showHuman, setShowHuman] = useState(false);
  const [escalation, setEscalation] = useState<{ id: string; status: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Errores de acciones (voz, copia, TTS) — se muestran aparte para no
  // enmascararlos con el genérico «Hubo un problema al generar la respuesta».
  const [actionError, setActionError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [lastQuery, setLastQuery] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const t = I18N[lang];

  const pushWelcome = useCallback((l: Lang) => {
    setMessages([{ role: "assistant", content: I18N[l].welcome }]);
  }, []);

  // Cargar voces del sistema (async)
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) pushWelcome(lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("open-assistant", onOpen);
    return () => window.removeEventListener("open-assistant", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  /** Selecciona una voz del sistema según idioma y género preferido */
  function pickVoice(l: Lang): SpeechSynthesisVoice | undefined {
    const langTag = BCP47[l];
    const langVoices = voices.filter((v) => v.lang?.toLowerCase().startsWith(l.slice(0, 2)));
    if (langVoices.length === 0) return undefined;
    const femaleHints = /female|mujer|femenino|maria|elena|monica|paulina|samantha|victoria|zira|helena|female/i;
    const maleHints = /male|hombre|masculino|jorge|diego|carlos|pablo|enrique|daniel|alex|fred|male/i;
    const preferred = voiceGender === "female" ? femaleHints : maleHints;
    const other = voiceGender === "female" ? maleHints : femaleHints;
    return (
      langVoices.find((v) => preferred.test(v.name)) ??
      langVoices.find((v) => !other.test(v.name)) ??
      langVoices[0]
    );
  }

  const speak = useCallback(
    (text: string, l: Lang) => {
      if (typeof window === "undefined" || !window.speechSynthesis) {
        setActionError("Síntesis de voz no disponible en este navegador");
        return;
      }
      window.speechSynthesis.cancel();
      const clean = cleanForSpeech(text);
      if (!clean) return;
      const u = new SpeechSynthesisUtterance(clean);
      u.lang = SPEECH_LANG[l];
      u.rate = 1.0;
      u.pitch = voiceGender === "female" ? 1.1 : 0.9;
      const v = pickVoice(l);
      if (v) u.voice = v;
      window.speechSynthesis.speak(u);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [voiceGender, voices]
  );

  async function send(text: string) {
    const query = text.trim();
    if (!query || loading) return;
    setError(null);
    setActionError(null);
    setInput("");
    setLastQuery(query);
    const history = messages.slice(1).map((m) => ({ role: m.role, content: m.content }));
    setMessages((prev) => [...prev, { role: "user", content: query }]);
    setLoading(true);

    try {
      // Tope de cliente: si el servidor no contesta en 50 s, cortamos y avisamos
      // (el backend ya está limitado a ~35 s para devolver siempre JSON).
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 50_000);
      let res: Response;
      try {
        res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: ctrl.signal,
          body: JSON.stringify({ message: query, history, language: lang, conversationId: conversationId ?? undefined }),
        });
      } finally {
        clearTimeout(timer);
      }

      // Nunca asumimos JSON: Vercel devuelve texto plano en 502/504.
      const raw = await res.text();
      let data: (ChatResponse & { error?: string }) | null = null;
      try {
        data = raw ? (JSON.parse(raw) as ChatResponse & { error?: string }) : null;
      } catch {
        data = null;
      }

      if (!data) {
        if (res.status === 504 || res.status === 502 || res.status === 408) {
          throw new Error("El servidor tardó demasiado (timeout). Reintenta en unos segundos.");
        }
        throw new Error(`Respuesta no válida del servidor (HTTP ${res.status}). Reintenta.`);
      }
      if (!res.ok || data.error) throw new Error(data.error ?? `HTTP ${res.status}`);
      if (data.conversationId) setConversationId(data.conversationId);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
          agentLabel: data.agentLabel,
          sources: data.sources,
          provider: data.provider,
          demoMode: data.demoMode,
        },
      ]);
      if (tts) speak(data.reply, lang);
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        setError("Tiempo de espera agotado. Reintenta o acorta la pregunta.");
      } else {
        setError(e instanceof Error ? e.message : t.errorGeneric);
      }
    } finally {
      setLoading(false);
    }
  }

  /** Copiar al portapapeles */
  async function copyText(text: string, idx: number) {
    try {
      await navigator.clipboard.writeText(text.replace(/\[S\d\]/g, ""));
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    } catch {
      setActionError("No se pudo copiar (permiso denegado)");
    }
  }

  /** Compartir en RRSS */
  function shareTo(network: "whatsapp" | "x" | "linkedin" | "copy") {
    const url = typeof window !== "undefined" ? window.location.href : "https://vigo-ai-demo.vercel.app";
    const text = "VIGO AI ADMINISTRATION — Asistente municipal de IA (demo gratuita) 🏛️";
    const enc = encodeURIComponent;
    let shareUrl = "";
    if (network === "whatsapp") shareUrl = `https://wa.me/?text=${enc(text + " " + url)}`;
    if (network === "x") shareUrl = `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}`;
    if (network === "linkedin")
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`;
    if (network === "copy") {
      navigator.clipboard?.writeText(url).then(() => {
        setCopiedIdx(-1);
        setTimeout(() => setCopiedIdx(null), 2000);
      });
      setShareOpen(false);
      return;
    }
    if (shareUrl) window.open(shareUrl, "_blank", "noopener,noreferrer");
    setShareOpen(false);
  }

  /** Reconocimiento de voz (STT) mejorado */
  function startListening() {
    const w = window as unknown as Record<string, any>;
    const SR = (w.SpeechRecognition ?? w.webkitSpeechRecognition) as
      | (new () => any)
      | undefined;
    if (!SR) {
      setActionError(
        "Voz a texto no soportada en este navegador. Usa Chrome, Edge o Safari (Firefox no soporta Web Speech API). / Voice input not supported in this browser."
      );
      return;
    }
    setError(null);
    setActionError(null);
    try {
      const rec = new SR();
      recognitionRef.current = rec;
      rec.lang = SPEECH_LANG[lang];
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onstart = () => setListening(true);
      rec.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript as string;
        setInput((prev) => (prev ? prev + " " : "") + transcript);
      };
      rec.onerror = (e: any) => {
        setListening(false);
        if (e?.error === "not-allowed" || e?.error === "service-not-allowed") {
          setActionError(
            "Micrófono bloqueado. Pulsa el candado 🔒 de la barra de direcciones → Permisos del sitio → Micrófono → Permitir, y reintenta."
          );
        } else if (e?.error === "no-speech") {
          setActionError("No se detectó voz. Acércate al micrófono e inténtalo de nuevo.");
        } else if (e?.error === "audio-capture") {
          setActionError("No se encontró ningún micrófono conectado.");
        } else if (e?.error === "network") {
          setActionError("Error de red al reconocer voz. Revisa la conexión.");
        } else {
          setActionError(`Error de voz: ${e?.error ?? "desconocido"}`);
        }
      };
      rec.onend = () => setListening(false);
      rec.start();
    } catch {
      setListening(false);
      setActionError("No se pudo iniciar el reconocimiento de voz.");
    }
  }

  function stopListening() {
    try {
      recognitionRef.current?.stop();
    } catch {
      /* noop */
    }
    setListening(false);
  }

  function resetChat() {
    setMessages([]);
    setShowHuman(false);
    setEscalation(null);
    setError(null);
    setConversationId(null);
    setShareOpen(false);
    pushWelcome(lang);
  }

  function changeLang(l: Lang) {
    setLang(l);
    if (messages.length <= 1) pushWelcome(l);
  }

  const isSupportedSTT =
    typeof window !== "undefined" &&
    Boolean((window as unknown as Record<string, any>).SpeechRecognition || (window as unknown as Record<string, any>).webkitSpeechRecognition);

  return (
    <>
      {/* Botón flotante */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir asistente VIGO AI / Open VIGO AI assistant"
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full
            bg-gradient-to-br from-brand-500 to-brand-800 shadow-xl shadow-brand-900/40
            ring-2 ring-brand-400/40 transition hover:scale-105 active:scale-95"
        >
          <span className="text-2xl">🏛️</span>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
          </span>
        </button>
      )}

      {/* Panel (tarjeta ampliada / expandible) */}
      {open && (
        <div
          role="dialog"
          aria-label="Asistente VIGO AI"
          className={`fixed z-50 flex animate-fade-up flex-col overflow-hidden rounded-2xl border border-slate-700
            bg-slate-900 text-slate-100 shadow-2xl shadow-black/50 transition-all duration-300
            ${
              expanded
                ? "inset-4 h-auto w-auto"
                : "bottom-5 right-5 h-[min(760px,92vh)] w-[min(520px,calc(100vw-2rem))]"
            }`}
        >
          {/* Cabecera */}
          <div className="flex items-center gap-2 border-b border-slate-700 bg-gradient-to-r from-brand-900 to-slate-900 px-3 py-2.5">
            <span className="text-xl">🏛️</span>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-white">VIGO AI ADMINISTRATION</p>
              <p className="truncate text-[10px] text-slate-400">
                <span className="rounded bg-amber-500/15 px-1 py-px text-amber-300 font-medium">
                  {t.demoBadge}
                </span>{" "}
                · CHESS AI AGENCY
              </p>
            </div>
            {/* Expandir / contraer */}
            <button
              onClick={() => setExpanded((v) => !v)}
              aria-label={expanded ? "Contraer" : "Expandir"}
              title={expanded ? "Contraer" : "Expandir a pantalla completa"}
              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              {expanded ? "🗗" : "⛶"}
            </button>
            {/* Selector de género de voz (TTS) */}
            <select
              value={voiceGender}
              onChange={(e) => setVoiceGender(e.target.value as "female" | "male")}
              aria-label="Género de voz / Voice gender"
              title="Género de voz (texto a voz)"
              className="rounded-md border border-slate-600 bg-slate-800 px-1.5 py-1 text-xs text-slate-200 outline-none focus:border-brand-400"
            >
              <option value="female">👩 Femenina</option>
              <option value="male">👨 Masculina</option>
            </select>
            <select
              value={lang}
              onChange={(e) => changeLang(e.target.value as Lang)}
              aria-label="Idioma / Language"
              className="rounded-md border border-slate-600 bg-slate-800 px-1.5 py-1 text-xs text-slate-200 outline-none focus:border-brand-400"
            >
              {LANGUAGES.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar / Close"
              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Mensajes */}
          <div ref={scrollRef} className="chat-scroll flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[92%] space-y-1.5">
                  {m.role === "assistant" && m.agentLabel && (
                    <p className="pl-1 text-[10px] font-medium uppercase tracking-wide text-brand-300">
                      {t.agentPrefix}: {m.agentLabel}
                    </p>
                  )}
                  <div className={m.role === "user" ? "bubble-user" : "bubble-ai"}>
                    <p className={`whitespace-pre-wrap text-sm leading-relaxed ${m.role === "assistant" ? "text-slate-100" : "text-white"}`}>
                      {renderContent(m.content, m.sources)}
                    </p>
                  </div>

                  {/* Acciones por mensaje (copiar / hablar / compartir) */}
                  <div className="flex flex-wrap items-center gap-1 pl-1">
                    <button
                      onClick={() => copyText(m.content, i)}
                      title="Copiar mensaje"
                      aria-label="Copiar mensaje"
                      className="rounded p-1 text-[10px] text-slate-400 hover:bg-slate-800 hover:text-white"
                    >
                      {copiedIdx === i ? "✅ Copiado" : "📋 Copiar"}
                    </button>
                    {m.role === "assistant" && (
                      <button
                        onClick={() => speak(m.content, lang)}
                        title="Escuchar en voz alta (texto a voz)"
                        aria-label="Escuchar mensaje"
                        className="rounded p-1 text-[10px] text-slate-400 hover:bg-slate-800 hover:text-white"
                      >
                        🔊 Escuchar
                      </button>
                    )}
                    <button
                      onClick={() => setShareOpen((v) => !v)}
                      title="Compartir"
                      aria-label="Compartir"
                      className="rounded p-1 text-[10px] text-slate-400 hover:bg-slate-800 hover:text-white"
                    >
                      🔗 Compartir
                    </button>
                  </div>

                  {/* Menú de compartir RRSS */}
                  {shareOpen && (
                    <div className="flex flex-wrap gap-1 rounded-lg border border-slate-700 bg-slate-800/70 p-1.5">
                      <button
                        onClick={() => shareTo("whatsapp")}
                        className="rounded px-2 py-1 text-[11px] text-emerald-300 hover:bg-slate-700"
                      >
                        🟢 WhatsApp
                      </button>
                      <button
                        onClick={() => shareTo("x")}
                        className="rounded px-2 py-1 text-[11px] text-slate-200 hover:bg-slate-700"
                      >
                        ✖ X / Twitter
                      </button>
                      <button
                        onClick={() => shareTo("linkedin")}
                        className="rounded px-2 py-1 text-[11px] text-blue-300 hover:bg-slate-700"
                      >
                        💼 LinkedIn
                      </button>
                      <button
                        onClick={() => shareTo("copy")}
                        className="rounded px-2 py-1 text-[11px] text-slate-200 hover:bg-slate-700"
                      >
                        {copiedIdx === -1 ? "✅ Enlace copiado" : "🔗 Copiar enlace"}
                      </button>
                    </div>
                  )}

                  {/* Fuentes citadas */}
                  {m.role === "assistant" && m.sources && m.sources.length > 0 && (
                    <details className="rounded-lg border border-slate-700 bg-slate-800/60 px-2.5 py-1.5">
                      <summary className="cursor-pointer text-[11px] font-medium text-slate-300">
                        📚 {t.sources} ({m.sources.length})
                      </summary>
                      <ul className="mt-1.5 space-y-1.5">
                        {m.sources.map((s) => (
                          <li key={s.ref} className="text-[11px] leading-snug text-slate-400">
                            <span className="font-semibold text-slate-200">[{s.ref}]</span>{" "}
                            <span className="text-slate-200">{s.title}</span>
                            <br />
                            {s.type} · {s.dept} · publicado {s.published} · vixente {s.effective}
                            <br />
                            <span className="italic">“{s.snippet}”</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}

                  {m.role === "assistant" && m.provider === "demo-local" && (
                    <p className="pl-1 text-[10px] text-amber-400/80">
                      ⚠️ local RAG template · sin modelo de IA configurado
                    </p>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bubble-ai text-sm text-slate-400">
                  <span className="animate-pulse">{t.thinking}</span>
                </div>
              </div>
            )}

            {listening && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                  <span className="inline-block h-2.5 w-2.5 animate-ping rounded-full bg-red-500" />
                  🎤 Escuchando… habla ahora
                </div>
              </div>
            )}

            {actionError && (
              <div className="flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                <span aria-hidden>⚠️</span>
                <div className="flex-1">
                  <p className="break-words leading-snug">{actionError}</p>
                  <button
                    type="button"
                    onClick={() => setActionError(null)}
                    className="mt-1.5 text-[11px] font-semibold text-amber-100/80 underline hover:text-amber-50"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {t.errorGeneric} <span className="block break-words text-red-400/70">({error})</span>
                {lastQuery && (
                  <button
                    type="button"
                    onClick={() => send(lastQuery)}
                    disabled={loading}
                    className="mt-2 rounded-md border border-red-400/50 bg-red-500/20 px-2.5 py-1 text-[11px] font-semibold text-red-100 hover:bg-red-500/30 disabled:opacity-40"
                  >
                    🔄 Reintentar
                  </button>
                )}
              </div>
            )}

            {/* Escalación humana (Human-in-the-Loop real vía /api/escalate) */}
            {showHuman && (
              <div className="animate-fade-up rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2.5 text-xs text-emerald-200">
                {escalation ? (
                  <>
                    <p className="font-semibold">🙋 {t.humanHelpTitle}</p>
                    <p className="mt-1 leading-snug text-emerald-300/90">
                      {t.humanHelpBody} · ID: {escalation.id.slice(0, 8)}… · {t.tryAgain}:{" "}
                      <button className="underline" onClick={() => setShowHuman(false)} type="button">
                        {t.tryAgain}
                      </button>
                    </p>
                  </>
                ) : (
                  <p className="font-semibold">🙋 {t.humanHelpTitle}</p>
                )}
                {!escalation && <p className="mt-1 leading-snug text-emerald-300/90">{t.humanHelpBody}</p>}
                {escalation && (
                  <p className="mt-1 text-[10px] text-emerald-300/70">
                    Status: {escalation.status} · registered at {new Date().toLocaleTimeString()}
                  </p>
                )}
              </div>
            )}

            {/* Sugerencias solo al inicio */}
            {messages.length <= 1 && !loading && (
              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] uppercase tracking-wide text-slate-500">{t.suggested}</p>
                <div className="flex flex-wrap gap-1.5">
                  {(SUGGESTED_QUESTIONS[lang] ?? SUGGESTED_QUESTIONS.es).map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-slate-600 bg-slate-800/70 px-2.5 py-1 text-[11px]
                        text-slate-300 transition hover:border-brand-400 hover:text-brand-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pie: privacidad + acciones + entrada */}
          <div className="border-t border-slate-700 bg-slate-900/95">
            <div className="flex items-center justify-between gap-2 px-3 pt-2 text-[10px] text-slate-500">
              <p className="truncate">🔒 {t.privacy}</p>
              <div className="flex shrink-0 items-center gap-1.5">
                {/* TTS on/off */}
                <button
                  onClick={() => {
                    if (tts) {
                      window.speechSynthesis?.cancel();
                    }
                    setTts((v) => !v);
                  }}
                  title={t.speak}
                  aria-label={t.speak}
                  className="rounded p-1 hover:bg-slate-800"
                >
                  {tts ? t.ttsOn : t.ttsOff}
                </button>
                {/* Nuevo chat */}
                <button
                  onClick={resetChat}
                  title={t.newChat}
                  className="rounded p-1 hover:bg-slate-800"
                  aria-label={t.newChat}
                >
                  🔄
                </button>
                {/* Escalación humana */}
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch("/api/escalate", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ context: { lastMessages: messages.slice(-4) }, conversationId }),
                      });
                      const data = await res.json();
                      if (res.ok && data.escalationId)
                        setEscalation({ id: data.escalationId, status: data.status ?? "open" });
                    } catch {
                      /* fallback silencioso */
                    }
                  }}
                  title={t.humanHelp}
                  className="rounded p-1 hover:bg-slate-800"
                  aria-label={t.humanHelp}
                >
                  🙋
                </button>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 px-3 pb-3 pt-1.5"
            >
              {/* Micrófono: voz a texto */}
              <button
                type="button"
                onClick={listening ? stopListening : startListening}
                title={
                  isSupportedSTT
                    ? listening
                      ? "Detener dictado"
                      : "Dictar por voz (voz a texto)"
                    : "Voz no soportada en este navegador (usa Chrome/Edge/Safari)"
                }
                aria-label={t.listen}
                className={`shrink-0 rounded-lg border px-2 py-2 text-sm transition ${
                  listening
                    ? "animate-pulse border-red-500 bg-red-500/20 text-red-200"
                    : isSupportedSTT
                    ? "border-slate-600 bg-slate-800 hover:border-brand-400"
                    : "cursor-not-allowed border-slate-700 bg-slate-800/50 text-slate-500"
                }`}
              >
                {listening ? "⏹" : "🎤"}
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                maxLength={2000}
                aria-label={t.placeholder}
                className="min-w-0 flex-1 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm
                  text-slate-100 placeholder-slate-500 outline-none focus:border-brand-400"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="shrink-0 rounded-lg bg-brand-600 px-3.5 py-2 text-sm font-semibold text-white
                  transition hover:bg-brand-500 disabled:opacity-40"
                aria-label={t.send}
              >
                ➤
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}