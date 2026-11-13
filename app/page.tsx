"use client";

// Landing pública — VIGO AI ADMINISTRATION DEMO v1.0
// CHESS AI AGENCY · AI · Innovation · Execution

import { useState } from "react";
import AssistantWidget from "@/components/AssistantWidget";
import Hero from "@/components/Hero";
import SiteHeader from "@/components/SiteHeader";
import { AGENTS } from "@/lib/agents";
import { I18N } from "@/lib/i18n";
import type { AgentId } from "@/types";

const HERO_IMAGES = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Vigo_%2820363053434%29.jpg",
    alt: "Puerto de Vigo",
    caption: "Puerto / Ría de Vigo",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/97/El_centro_urbano_de_Vigo_a_oscuras-_Rosal%C3%ADa_de_Castro_sin_alumbrado_p%C3%BAblico.jpg",
    alt: "Centro urbano de Vigo",
    caption: "Castro",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Paseo_samil%2C_Vigo.jpg",
    alt: "Paseo de Samil",
    caption: "Samil",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Vigo_%2820363076034%29.jpg",
    alt: "Puerto de Vigo",
    caption: "Mariscada / Puerto",
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
  const [lang, setLang] = useState<"gl" | "es" | "en">("gl");
  const t = I18N[lang];

  return (
    <main className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,80,235,0.18),transparent)]"
      />

      <SiteHeader lang={lang} onLangChange={setLang} />

      {/* Hero */}
      <div id="inicio">
        <Hero lang={lang} images={HERO_IMAGES} />
      </div>

      {/* Demo */}
      <section id="demo" className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-8 text-center">
          <p className="text-amber-300">{t.landingDemoBadge}</p>
          <h2 className="mt-3 text-3xl font-semibold">{t.landingRagTitle}</h2>
          <p className="mt-3 mx-auto max-w-3xl text-slate-300">{t.landingRagNote}</p>
          <p className="mt-4 text-slate-300">{t.landingCtaBody}</p>
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
        <h2 className="mb-8 text-center text-2xl font-semibold">{t.landingEcosystemTitle}</h2>
        <div className="mb-8 rounded-2xl border border-slate-700 bg-slate-900/60 p-4 text-center text-sm text-slate-300">
          <code className="text-brand-300">{t.landingMasterFlow}</code>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AGENT_ORDER.map((id) => {
            const a = AGENTS[id];
            return (
              <div
                key={id}
                className="rounded-xl border border-slate-700/80 bg-slate-900/50 p-4 transition hover:border-brand-500/50 hover:bg-slate-900"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400">
                  {a.code}
                </p>
                <p className="mt-1 font-semibold text-slate-100">{a.label.es}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{a.mission}</p>
              </div>
            );
          })}
          <div className="rounded-xl border border-emerald-600/40 bg-emerald-950/30 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              CAPA TRANSVERSAL
            </p>
            <p className="mt-1 font-semibold text-slate-100">{t.landingSecurityTitle}</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Control de permisos, mínimos datos, defensa ante prompt injection, auditoría, abstención
              y revisión humana obligatoria (Megaprompt §3).
            </p>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-center text-2xl font-semibold">{t.landingStackTitle}</h2>
        <div className="grid gap-4 text-center sm:grid-cols-2 lg:grid-cols-5">
          {[
            { n: "Next.js + React", d: "Frontend y API en un solo proyecto" },
            { n: "OpenRouter", d: "Modelos free (Llama 3.3, Gemma 3…)" },
            { n: "Gemini API", d: "Fallback directo de Google AI Studio" },
            { n: "Supabase", d: "PostgreSQL: conversaciones + auditoría" },
            { n: "Vercel + GitHub", d: "Deploy gratuito y CI/CD en Git" },
          ].map((s) => (
            <div key={s.n} className="rounded-xl border border-slate-700/70 bg-slate-900/50 p-4">
              <p className="font-semibold text-slate-100">{s.n}</p>
              <p className="mt-1 text-xs text-slate-400">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next step / proposal */}
      <section id="precios" className="relative mx-auto max-w-6xl px-6 py-16 pb-16">
        <div className="rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950 p-8">
          <h2 className="text-2xl font-semibold">{t.landingNextTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">
            {t.landingNextBody}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/admin"
              className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-brand-400 hover:text-brand-200"
            >
              {t.landingNextCta1}
            </a>
            <a
              href="https://www.vigo.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-400 transition hover:text-slate-200"
            >
              {t.landingNextCta2}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-400">CHESS AI AGENCY</p>
        <p>AI · Innovation · Execution</p>
        <p className="mt-2">{t.landingFooter}</p>
      </footer>

      <AssistantWidget />
    </main>
  );
}
