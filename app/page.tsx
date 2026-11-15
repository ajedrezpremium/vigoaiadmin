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
    src: "/Vigo_vista_aerea.jpg",
    alt: "Vigo — vista aérea",
    name: "Vigo — vista aérea",
    caption: "Vigo — vista aérea",
    link: "/Vigo_vista_aerea.jpg",
    filterClass: "brightness-115 contrast-105 saturate-110",
  },
  {
    src: "/Vista%20Aerea%20Cies.png",
    alt: "Islas Cíes — vista aérea",
    name: "Illas Cíes",
    caption: "Illas Cíes",
    link: "/Vista%20Aerea%20Cies.png",
    filterClass: "brightness-115 contrast-105 saturate-110",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Paseo_samil%2C_Vigo.jpg",
    alt: "Playa de Samil",
    name: "Samil",
    caption: "Playa de Samil",
    link: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Paseo_samil%2C_Vigo.jpg",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d4/O_Castro%2C_Vigo.jpg",
    alt: "Monte do Castro — panorámica",
    name: "Monte do Castro",
    caption: "Monte do Castro",
    link: "https://upload.wikimedia.org/wikipedia/commons/d/d4/O_Castro%2C_Vigo.jpg",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Ponte_de_Rande_desde_A_Gu%C3%ADa_%28Teis%2C_Vigo%29.jpg",
    alt: "Puente de Rande",
    name: "Puente de Rande",
    caption: "Puente de Rande",
    link: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Ponte_de_Rande_desde_A_Gu%C3%ADa_%28Teis%2C_Vigo%29.jpg",
    filterClass: "brightness-125 contrast-110 saturate-150",
    tintClass: "bg-blue-500/25",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Puerto_de_Vigo.jpg",
    alt: "Puerto de Vigo",
    name: "Puerto de Vigo",
    caption: "Puerto de Vigo",
    link: "https://upload.wikimedia.org/wikipedia/commons/0/08/Puerto_de_Vigo.jpg",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/1/10/Vigo_puesta_de_Sol.jpg",
    alt: "Puesta de sol en Vigo",
    name: "Puesta de sol",
    caption: "Puesta de sol",
    link: "https://upload.wikimedia.org/wikipedia/commons/1/10/Vigo_puesta_de_Sol.jpg",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9b/R%C3%ADa_de_Vigo_e_islas_C%C3%ADes.jpg",
    alt: "Ría de Vigo e Islas Cíes",
    name: "Ría de Vigo",
    caption: "Ría de Vigo",
    link: "https://upload.wikimedia.org/wikipedia/commons/9/9b/R%C3%ADa_de_Vigo_e_islas_C%C3%ADes.jpg",
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
  "history",
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
      id="main-content"
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
          <h2 className="mt-3 text-3xl font-semibold">{t.landingRagTitle}</h2>
          <p className={`mt-3 mx-auto max-w-3xl ${bodyCls}`}>{t.landingRagNote}</p>
          <p className={`mt-4 ${bodyCls}`}>{t.landingCtaBody}</p>
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


      {/* Ubicación / VIGO + mapa */}
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <div
          className={`rounded-2xl border p-8 ${cardCls} ${
            isDark ? "bg-gradient-to-b from-slate-900 to-slate-950" : "bg-white"
          }`}
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className={`text-2xl font-bold ${headingCls}`}>VIGO</h2>
              <p className={`mt-2 text-lg font-medium ${bodyCls}`}>
                CHESS AI AGENCY · AI · Innovation · Execution
              </p>
              <p className={`mt-4 text-sm leading-relaxed ${bodyCls}`}>
                Plataforma multiagente de Inteligencia Artificial para servizos públicos municipais.
                Demo con agentes especializados, RAG con citas, multilingüe (galego/español/english).
              </p>
              <p className={`mt-4 text-sm ${mutedCls}`}>
                📍 Praza do Rei, 1 — 36202 Vigo, Pontevedra, Galicia
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-300 dark:border-slate-700">
              <iframe
                title="Mapa de Vigo"
                src="https://maps.google.com/maps?q=42.2406,-8.7207&z=14&output=embed"
                className="h-64 w-full border-0 md:h-96"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="md:col-span-2">
              <a
                href="https://www.google.com/maps?q=42.2406,-8.7207&z=14"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              >
                🗺️ Abrir mapa en pantalla completa (Google Maps)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`relative border-t py-8 text-center text-xs ${isDark ? "border-slate-800" : "border-slate-200"} ${mutedCls}`}
      >
        {/* Logo + nombre + lema */}
        <div className="mb-4 flex flex-col items-center gap-1">
          <span className="text-2xl">🏛️</span>
          <p className={`text-sm font-bold ${headingCls}`}>VIGO AI ADMINISTRATION</p>
          <p className="text-[11px] font-medium tracking-wide">CHESS AI AGENCY · AI · Innovation · Execution</p>
        </div>
        {/* Disclaimer */}
        <p className="mx-auto max-w-2xl leading-relaxed">{t.landingFooter}</p>
        {/* Cierre + aviso legal + versión */}
        <p className="mt-4">
          <a href="/aviso-legal" className={linkCls}>
            Aviso legal / Disclaimer
          </a>
        </p>
        <p className="mt-3 text-[10px] opacity-60">v1.1 — portada turismo PRO · {new Date().getFullYear()}</p>
      </footer>

      <AssistantWidget />
    </main>
  );
}
