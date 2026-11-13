"use client";

// Landing comercial + demo — CHESS AI AGENCY · VIGO AI ADMINISTRATION DEMO v1.0

import Link from "next/link";
import type { AgentId } from "@/types";
import { AGENTS } from "@/lib/agents";
import AssistantWidget from "@/components/AssistantWidget";

const AGENT_ORDER: AgentId[] = [
  "citizen","admin","legal","document","urban","business","social","culture","language",
];

const PIPELINE = [
  "1 · Ingesta y validación documental",
  "2 · Metadatos (título, depto, fechas, vigencia)",
  "3 · Segmentación y indexación",
  "4 · Búsqueda híbrida / recuperación",
  "5 · Respuesta fundamentada con citas [S1][S2]",
  "6 · Auditoría y supervisión humana",
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Fondo decorativo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,80,235,0.18),transparent)]"
      />

      {/* HERO */}
      <section className="relative mx-auto max-w-5xl px-6 pt-20 pb-16 text-center">
        <p className="mx-auto mb-4 w-fit rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-1 text-xs font-medium text-brand-300">
          CHESS AI AGENCY · AI · Innovation · Execution
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 bg-clip-text text-transparent">
            VIGO AI ADMINISTRATION
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          Plataforma multiagente de IA para servicios públicos municipales.
          <br className="hidden sm:block" />
          <span className="text-slate-400">
            9 agentes especializados · RAG con citas verificables · galego / español / english · supervisión humana
          </span>
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-300">
            ⚠️ DEMO GRATUITA v1.0 — datos 100% sintéticos, no oficiales
          </span>
        </div>
        <p className="mx-auto mt-8 max-w-xl rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-400">
          👉 <strong className="text-slate-200">Prueba la demo ahora:</strong> abre el asistente flotante
          (esquina inferior derecha) y pregunta por horarios, trámites, ordenanzas, subvenciones o cultura.
          Sin registro, sin datos personales.
        </p>
      </section>

      {/* ARQUITECTURA MULTIAGENTE */}
      <section className="relative mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-8 text-center text-2xl font-semibold">
          Ecosistema multiagente <span className="text-slate-500">(Megaprompt §2)</span>
        </h2>
        <div className="mb-8 rounded-2xl border border-slate-700 bg-slate-900/60 p-4 text-center text-sm text-slate-300">
          <code className="text-brand-300">
            MASTER AGENT → AGENTE ESPECIALIZADO → RAG (evidencia) → VALIDACIÓN → MASTER → CIUDADANÍA
          </code>
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
            <p className="mt-1 font-semibold text-slate-100">Seguridad y Cumplimiento</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Control de permisos, mínimos datos, defensa ante prompt injection, auditoría, abstención
              y revisión humana obligatoria (Megaprompt §3).
            </p>
          </div>
        </div>
      </section>

      {/* RAG */}
      <section className="relative mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-8 text-center text-2xl font-semibold">
          Motor RAG con citas <span className="text-slate-500">(Megaprompt §7)</span>
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PIPELINE.map((step) => (
            <div
              key={step}
              className="rounded-lg border border-slate-700/70 bg-slate-900/40 px-4 py-3 text-sm text-slate-300"
            >
              {step}
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-slate-500">
          La demo usa 12 documentos sintéticos con metadatos completos. Si no hay evidencia suficiente,
          el sistema se abstiene y no inventa información — igual que haría con corpus municipal real.
        </p>
      </section>

      {/* STACK */}
      <section className="relative mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-8 text-center text-2xl font-semibold">Stack de la demo gratuita</h2>
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

      {/* PROPUESTA COMERCIAL */}
      <section className="relative mx-auto max-w-6xl px-6 py-10 pb-16">
        <div className="rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950 p-8">
          <h2 className="text-2xl font-semibold">¿Siguiente paso? Piloto real con la Administración</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">
            Esta demo es la carta de presentación de la propuesta de CHESS AI AGENCY: un
            <strong className="text-slate-200"> piloto de Asistente Documental Interno (VIGO DOCS AI)</strong> de
            6–8 semanas con corpus autorizado, respuestas con fuentes, evaluación de calidad y transferencia.
            Los servicios de prototipo (OpenRouter, Supabase, Vercel) <strong>no se presuponen aptos para
            producción pública</strong>: cualquier servicio externo superará la evaluación de seguridad,
            RGPD, ENS y Reglamento (UE) 2024/1689 de la entidad antes de tratar datos reales.
          </p>
          <div className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
            <div className="rounded-xl border border-brand-500/30 bg-brand-500/5 p-4">
              <p className="font-semibold text-brand-300">Descubrimiento</p>
              <p className="mt-1 text-xs text-slate-400">Talleres, mapa de proceso, evaluación de datos</p>
              <p className="mt-2 text-xs font-medium text-slate-300">3.000 – 6.000 €</p>
            </div>
            <div className="rounded-xl border border-brand-500/30 bg-brand-500/5 p-4">
              <p className="font-semibold text-brand-300">Piloto documental</p>
              <p className="mt-1 text-xs text-slate-400">Prototipo, corpus autorizado, pruebas y formación</p>
              <p className="mt-2 text-xs font-medium text-slate-300">18.000 – 35.000 €</p>
            </div>
            <div className="rounded-xl border border-brand-500/30 bg-brand-500/5 p-4">
              <p className="font-semibold text-brand-300">Ampliación y soporte</p>
              <p className="mt-1 text-xs text-slate-400">Nuevos departamentos, integraciones, SLA</p>
              <p className="mt-2 text-xs font-medium text-slate-300">A definir tras evaluación</p>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-slate-500">
            Bandas orientativas sin IVA (propuesta comercial preliminar, no vinculante). La contratación
            pública exige definir prestaciones y presupuesto conforme al procedimiento aplicable.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-brand-400 hover:text-brand-200"
            >
              🧭 Panel interno de demo (auth simple)
            </Link>
            <a
              href="https://www.vigo.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-400 transition hover:text-slate-200"
            >
              Concello de Vigo — canles oficiales ↗
            </a>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-400">CHESS AI AGENCY</p>
        <p>AI · Innovation · Execution</p>
        <p className="mt-2">
          VIGO AI ADMINISTRATION — DEMO GRATUITA v1.0 · Noviembre 2026 · Servicio de demostración con IA;
          no representa a la Administración municipal ni ofrece información oficial.
        </p>
      </footer>

      {/* Widget flotante — punto de entrada del asistente (Megaprompt §4) */}
      <AssistantWidget />
    </main>
  );
}
