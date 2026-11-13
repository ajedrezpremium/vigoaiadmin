"use client";

// Landing pública — VIGO AI ADMINISTRATION DEMO v1.0
// CHESS AI AGENCY · AI · Innovation · Execution

import { useEffect, useState } from "react";
import AssistantWidget from "@/components/AssistantWidget";
import Hero from "@/components/Hero";
import SiteHeader from "@/components/SiteHeader";
import { AGENTS } from "@/lib/agents";
import { I18N } from "@/lib/i18n";
import type { AgentId, Lang } from "@/types";

export const dynamic = "force-dynamic";

const HERO_IMAGES = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Vigo_%2820363053434%29.jpg",
    alt: "Puerto de Vigo y la ría",
    name: "Puerto / Ría de Vigo",
    caption: "Puerto / Ría de Vigo",
    wiki: "https://commons.wikimedia.org/wiki/File:Vigo_(20363053434).jpg",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Paseo_samil%2C_Vigo.jpg",
    alt: "Paseo marítimo de Samil",
    name: "Samil",
    caption: "Samil",
    wiki: "https://commons.wikimedia.org/wiki/File:Paseo_samil,_Vigo.jpg",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Illas_C%C3%ADes_dende_Patos_16VIII2015.jpg",
    alt: "Islas Cíes",
    name: "Illas Cíes",
    caption: "Illas Cíes",
    wiki: "https://commons.wikimedia.org/wiki/File:Illas_C%C3%ADes_dende_Patos_16VIII2015.jpg",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/3/39/Vigo_collage.jpg",
    alt: "Concello / Centro urbano",
    name: "Concello / Centro urbano",
    caption: "Concello / Centro urbano",
    wiki: "https://commons.wikimedia.org/wiki/File:Vigo_collage.jpg",
  },
];

const AGENT_ORDER: AgentId[] = [
  "citizen",
  "admin",
  "legal",
  "document",
  "urban",
  "business",
  "social",
  "culture",
  "language",
];

export default function Home() {
  const [lang, setLang] = useState<Lang>("gl");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const t = I18N[lang];
  const isDark = theme === "dark";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const cardCls = isDark ? "border-slate-700 bg-slate-900/60" : "border-slate-200 bg-white";
  const bodyCls = isDark ? "text-slate-300" : "text-slate-700";
  const headingCls = isDark ? "text-slate-100" : "text-slate-900";
  const mutedCls = isDark ? "text-slate-400" : "text-slate-600";
  const linkCls = isDark ? "border-slate-600 bg-slate-800 text-slate-200" : "border-slate-300 bg-white text-slate-700";

  return (
    <main
      className={`relative overflow-hidden ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,80,235,0.18),transparent)]"
      />

      <SiteHeader lang={lang} onLangChange={setLang} theme={theme} onThemeChange={setTheme} />

      {/* Hero */}
      <div id="inicio">
        <Hero lang={lang} images={HERO_IMAGES} theme={theme} />
      </div>

      {/* FIN HERO */}

      {/* Demo */}
      <section id="demo" className="relative mx-auto max-w-6xl px-6 py-16">
        <div
          className={`rounded-2xl border p-8 text-center ${cardCls}`}
        >
          <p className={`text-amber-300 ${isDark ? "" : "text-amber-600"}`}>{t.landingDemoBadge}</p>
          <h2 className="mt-3 text-3xl font-semibold">{t.landingRagTitle}</h2>
          <p className={`mt-3 mx-auto max-w-3xl ${bodyCls}`}>{t.landingRagNote}</p>
          <p className={`mt-4 ${bodyCls}`}>{t.landingCtaBody}</p>
          <a
            href="#demo"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-500"
          >
            {t.landingCta} →
          </a>
        </div>
      </section>

      {/* Ecosistema multiagente + seguridad */}
      <section id="plataforma" className="relative mx-auto max-w-6xl px-6 py-16">
        <h2 className={`mb-8 text-center text-2xl font-semibold ${headingCls}`}>
          {t.landingEcosystemTitle}
        </h2>
        <div
          className={`mb-8 rounded-2xl border p-4 text-center text-sm ${cardCls} ${bodyCls}`}
        >
          <code className={`text-sm ${isDark ? "text-brand-300" : "text-brand-700"}`}>
            {t.landingMasterFlow}
          </code>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AGENT_ORDER.map((id) => {
            const a = AGENTS[id];
            return (
              <div
                key={id}
                className={`rounded-xl border p-4 transition hover:border-brand-500/50 ${
                  isDark ? "border-slate-700/80 bg-slate-900/50 hover:bg-slate-900" : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400">
                  {a.code}
                </p>
                <p className={`mt-1 font-semibold ${headingCls}`}>{a.label.es}</p>
                <p className={`mt-2 text-xs leading-relaxed ${mutedCls}`}>{a.mission}</p>
              </div>
            );
          })}
          <div
            className={`rounded-xl border p-4 ${isDark ? "border-emerald-600/40 bg-emerald-950/30" : "border-emerald-600/40 bg-emerald-50"}`}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              CAPA TRANSVERSAL
            </p>
            <p className={`mt-1 font-semibold ${headingCls}`}>{t.landingSecurityTitle}</p>
            <p className={`mt-2 text-xs leading-relaxed ${mutedCls}`}>
              Control de permisos, mínimos datos, defensa ante prompt injection, auditoría, abstención
              y revisión humana obligatoria (Megaprompt §3).
            </p>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <h2 className={`mb-8 text-center text-2xl font-semibold ${headingCls}`}>
          {t.landingStackTitle}
        </h2>
        <div className="grid gap-4 text-center sm:grid-cols-2 lg:grid-cols-5">
          {[
            { n: "Next.js + React", d: "Frontend y API en un solo proyecto" },
            { n: "OpenRouter", d: "Modelos free (Llama 3.3, Gemma 3…)" },
            { n: "Gemini API", d: "Fallback directo de Google AI Studio" },
            { n: "Supabase", d: "PostgreSQL: conversaciones + auditoría" },
            { n: "Vercel + GitHub", d: "Deploy gratuito y CI/CD en Git" },
          ].map((s) => (
            <div
              key={s.n}
              className={`rounded-xl border p-4 ${isDark ? "border-slate-700/70 bg-slate-900/50" : "border-slate-200 bg-white"}`}
            >
              <p className={`font-semibold ${headingCls}`}>{s.n}</p>
              <p className={`mt-1 text-xs ${mutedCls}`}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next step / proposal */}
      <section id="precios" className="relative mx-auto max-w-6xl px-6 py-16 pb-16">
        <div
          className={`rounded-2xl border p-8 ${cardCls} ${
            isDark ? "bg-gradient-to-b from-slate-900 to-slate-950" : "bg-white"
          }`}
        >
          <h2 className={`text-2xl font-semibold ${headingCls}`}>{t.landingNextTitle}</h2>
          <p className={`mt-3 max-w-3xl text-sm leading-relaxed ${bodyCls}`}>{t.landingNextBody}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/admin"
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${linkCls}`}
            >
              {t.landingNextCta1}
            </a>
            <a
              href="https://www.vigo.org/"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-lg border px-4 py-2 text-sm transition ${linkCls}`}
            >
              {t.landingNextCta2}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`relative border-t py-8 text-center text-xs ${isDark ? "border-slate-800" : "border-slate-200"} ${mutedCls}`}
      >
        <p className={`font-semibold ${headingCls}`}>CHESS AI AGENCY</p>
        <p>AI · Innovation · Execution</p>
        <p className="mt-2">{t.landingFooter}</p>
        <p className="mt-3">
          <a href="/aviso-legal" className={linkCls}>
            Aviso legal / Disclaimer
          </a>
        </p>
      </footer>

      <AssistantWidget />
    </main>
  );
}
