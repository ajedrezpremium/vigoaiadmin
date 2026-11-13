"use client";

// Widget flotante de asistente municipal — Megaprompt §4
// Componentes: conversación, entrada, idiomas, voz (STT/TTS), sugerencias,
// fuentes citadas, escalación humana, privacidad, accesibilidad.

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

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("es");
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tts, setTts] = useState(false);
  const [showHuman, setShowHuman] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = I18N[lang];

  const pushWelcome = useCallback((l: Lang) => {
    setMessages([{ role: "assistant", content: I18N[l].welcome }]);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) pushWelcome(lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const speak = (text: string, l: Lang) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/\[S\d\]/g, "").slice(0, 600);
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = SPEECH_LANG[l];
    u.rate = 1.02;
    window.speechSynthesis.speak(u);
  };

  async function send(text: string) {
    const query = text.trim();
    if (!query || loading) return;
    setError(null);
    setInput("");
    const history = messages.slice(1).map((m) => ({ role: m.role, content: m.content }));
    setMessages((prev) => [...prev, { role: "user", content: query }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, history, language: lang }),
      });
      const data: ChatResponse & { error?: string } = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? `HTTP ${res.status}`);
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
      setError(e instanceof Error ? e.message : t.errorGeneric);
    } finally {
      setLoading(false);
    }
  }

  /** Reconocimiento de voz (AGENT 10 — VOICE AI, opcional) */
  function startListening() {
    const w = window as unknown as Record<string, unknown>;
    const SR = (w.SpeechRecognition ?? w.webkitSpeechRecognition) as
      | (new () => {
          lang: string;
          interimResults: boolean;
          onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
          onerror: (() => void) | null;
          start: () => void;
        })
      | undefined;
    if (!SR) {
      setError("Voice recognition not available in this browser / navegador sin voz");
      return;
    }
    const rec = new SR();
    rec.lang = SPEECH_LANG[lang];
    rec.interimResults = false;
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput((prev) => (prev ? prev + " " : "") + transcript);
    };
    rec.onerror = () => setError("Voice error / erro de voz");
    rec.start();
  }

  function resetChat() {
    setMessages([]);
    setShowHuman(false);
    setError(null);
    pushWelcome(lang);
  }

  function changeLang(l: Lang) {
    setLang(l);
    if (messages.length <= 1) pushWelcome(l);
  }

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

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Asistente VIGO AI"
          className="fixed bottom-5 right-5 z-50 flex h-[min(640px,85vh)] w-[min(420px,calc(100vw-2.5rem))]
            animate-fade-up flex-col overflow-hidden rounded-2xl border border-slate-700
            bg-slate-900 shadow-2xl shadow-black/50"
        >
          {/* Cabecera */}
          <div className="flex items-center gap-2 border-b border-slate-700 bg-gradient-to-r from-brand-900 to-slate-900 px-3 py-2.5">
            <span className="text-xl">🏛️</span>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold">VIGO AI ADMINISTRATION</p>
              <p className="truncate text-[10px] text-slate-400">
                <span className="rounded bg-amber-500/15 px-1 py-px text-amber-300 font-medium">
                  {t.demoBadge}
                </span>{" "}
                · CHESS AI AGENCY
              </p>
            </div>
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
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {renderContent(m.content, m.sources)}
                    </p>
                  </div>

                  {/* Fuentes citadas */}
                  {m.role === "assistant" && m.sources && m.sources.length > 0 && (
                    <details className="rounded-lg border border-slate-700 bg-slate-850 bg-slate-800/60 px-2.5 py-1.5">
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

            {error && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {t.errorGeneric} <span className="block truncate text-red-400/70">({error})</span>
              </div>
            )}

            {/* Escalación humana (simulada en demo) */}
            {showHuman && (
              <div className="animate-fade-up rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2.5 text-xs text-emerald-200">
                <p className="font-semibold">🙋 {t.humanHelpTitle}</p>
                <p className="mt-1 leading-snug text-emerald-300/90">{t.humanHelpBody}</p>
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

          {/* Pie: privacidad + entrada */}
          <div className="border-t border-slate-700 bg-slate-900/95">
            <div className="flex items-center justify-between gap-2 px-3 pt-2 text-[10px] text-slate-500">
              <p className="truncate">🔒 {t.privacy}</p>
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  onClick={() => setTts((v) => !v)}
                  title={t.speak}
                  className="rounded p-1 hover:bg-slate-800"
                  aria-label={t.speak}
                >
                  {tts ? t.ttsOn : t.ttsOff}
                </button>
                <button
                  onClick={resetChat}
                  title={t.newChat}
                  className="rounded p-1 hover:bg-slate-800"
                  aria-label={t.newChat}
                >
                  🔄
                </button>
                <button
                  onClick={() => setShowHuman(true)}
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
              <button
                type="button"
                onClick={startListening}
                aria-label={t.listen}
                className="shrink-0 rounded-lg border border-slate-600 bg-slate-800 px-2 py-2 text-sm hover:border-brand-400"
              >
                {t.listen}
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
