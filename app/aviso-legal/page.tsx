"use client";

// Página de Aviso Legal / Disclaimer — VIGO AI ADMINISTRATION DEMO v1.0
// CHESS AI AGENCY · AI · Innovation · Execution

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AvisoLegalPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const isDark = theme === "dark";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const pageCls = isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900";
  const cardCls = isDark ? "border-slate-700 bg-slate-900/60" : "border-slate-200 bg-slate-50";
  const mutedCls = isDark ? "text-slate-300" : "text-slate-700";
  const headingCls = isDark ? "text-slate-100" : "text-slate-900";
  const linkCls = isDark ? "text-brand-300 hover:text-brand-200" : "text-brand-700 hover:text-brand-600";

  return (
    <main className={`min-h-screen ${pageCls}`}>
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Cabecera */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className={`text-sm font-medium ${linkCls}`}>
            ← Volver a la portada / Voltar á portada
          </Link>
          <button
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            aria-label="Cambiar tema / Change theme"
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
              isDark
                ? "border-slate-600 bg-slate-800 text-slate-200 hover:border-brand-400"
                : "border-slate-300 bg-white text-slate-700 hover:border-brand-500"
            }`}
          >
            {isDark ? "☀️ Claro" : "🌙 Oscuro"}
          </button>
        </div>

        <h1 className={`text-3xl font-bold tracking-tight ${headingCls}`}>
          Aviso legal y disclaimer
        </h1>
        <p className={`mt-2 text-sm ${mutedCls}`}>
          VIGO AI ADMINISTRATION — DEMO GRATUITA v1.0 · CHESS AI AGENCY
        </p>

        <div className={`mt-8 space-y-6 rounded-2xl border p-6 ${cardCls}`}>
          <section>
            <h2 className={`text-lg font-semibold ${headingCls}`}>1. Identificación</h2>
            <p className={`mt-2 text-sm leading-relaxed ${mutedCls}`}>
              VIGO AI ADMINISTRATION — DEMO GRATUITA v1.0 es una <strong>demostración técnica</strong>{" "}
              desarrollada por CHESS AI AGENCY. <strong>No es un servicio oficial del Concello de Vigo
              ni de ninguna administración pública.</strong> No está afiliada, avalada ni operada por
              el Concello de Vigo.
            </p>
          </section>

          <section>
            <h2 className={`text-lg font-semibold ${headingCls}`}>2. Naturaleza de la demostración</h2>
            <p className={`mt-2 text-sm leading-relaxed ${mutedCls}`}>
              Esta demostración utiliza <strong>datos sintéticos</strong> y respuestas generadas por
              modelos de inteligencia artificial. La información mostrada <strong>no tiene validez
              oficial</strong> y puede contener errores, omisiones o datos desactualizados. Antes de
              tomar cualquier decisión administrativa, verifique siempre la información en los{" "}
              <strong>canales oficiales del Concello de Vigo</strong> (sede electrónica, oficinas de
              atención al ciudadano, teléfono municipal).
            </p>
          </section>

          <section>
            <h2 className={`text-lg font-semibold ${headingCls}`}>3. Privacidad y datos personales</h2>
            <p className={`mt-2 text-sm leading-relaxed ${mutedCls}`}>
              Esta demostración <strong>no solicita ni recoge datos personales identificativos</strong>{" "}
              (DNI, teléfono, dirección postal, datos bancarios, datos de salud). Las conversaciones
              que se persisten lo hacen de forma <strong>anonimizada y sin PII</strong>, únicamente
              con fines de demostración y mejora del servicio. No comparta datos personales sensibles
              en el chat.
            </p>
          </section>

          <section>
            <h2 className={`text-lg font-semibold ${headingCls}`}>4. Límites del asistente de IA</h2>
            <p className={`mt-2 text-sm leading-relaxed ${mutedCls}`}>
              El asistente de IA es una herramienta de <strong>información</strong>, no un empleado
              municipal ni un asesor legal. No decide casos administrativos, no otorga ni deniega
              solicitudes, no firma, no sanciona y no emite interpretaciones vinculantes. Las
              respuestas se basan en documentos de demostración y deben verificarse en los canales
              oficiales. Los borradores y plantillas generados se marcan como{" "}
              <strong>BORRADOR — requieren revisión humana</strong>.
            </p>
          </section>

          <section>
            <h2 className={`text-lg font-semibold ${headingCls}`}>5. Propiedad intelectual</h2>
            <p className={`mt-2 text-sm leading-relaxed ${mutedCls}`}>
              Las imágenes utilizadas en la portada provienen de{" "}
              <a
                href="https://commons.wikimedia.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkCls}
              >
                Wikimedia Commons
              </a>{" "}
              bajo licencias libres (ver créditos en cada imagen). El código, la marca y el diseño de
              VIGO AI ADMINISTRATION son propiedad de CHESS AI AGENCY.
            </p>
          </section>

          <section>
            <h2 className={`text-lg font-semibold ${headingCls}`}>6. Normativa aplicable</h2>
            <p className={`mt-2 text-sm leading-relaxed ${mutedCls}`}>
              Esta demostración <strong>no ha pasado revisión de seguridad ni auditoría</strong>{" "}
              (GDPR, ENS, AI Act). No debe utilizarse en producción ni para trámites reales sin una
              revisión de seguridad previa. La integración con sistemas oficiales (sede electrónica,
              registro, etc.) se realiza en modo simulado.
            </p>
          </section>

          <section>
            <h2 className={`text-lg font-semibold ${headingCls}`}>7. Contacto</h2>
            <p className={`mt-2 text-sm leading-relaxed ${mutedCls}`}>
              Para consultas sobre esta demostración: <strong>CHESS AI AGENCY</strong> (AI ·
              Innovation · Execution) · Roberto Páramos ·{" "}
              <a href="mailto:chessagencyai@gmail.com" className="underline">
                chessagencyai@gmail.com
              </a>{" "}
              · 607 869 278. Para trámites oficiales del Concello de Vigo, diríjase a la Oficina de
              Atención al Ciudadano (OAC) o a la sede electrónica municipal.
            </p>
          </section>
        </div>

        <p className={`mt-8 text-center text-xs ${mutedCls}`}>
          © {new Date().getFullYear()} CHESS AI AGENCY · VIGO AI ADMINISTRATION — DEMO GRATUITA v1.0
        </p>
      </div>
    </main>
  );
}
