"use client";

// Header con navegación por iconos + tooltips + selector de idioma
// Inspirado en https://vigo-ai-campus.vercel.app/ y https://vigo-port.vercel.app/es

import { LANGUAGES } from "@/lib/i18n";
import type { Lang } from "@/types";

interface SiteHeaderProps {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  theme?: "light" | "dark";
  onThemeChange?: (t: "light" | "dark") => void;
}

const NAV_LABELS: Record<string, { gl: string; es: string; en: string }> = {
  inicio: { gl: "Inicio", es: "Inicio", en: "Home" },
  plataforma: { gl: "Plataforma", es: "Plataforma", en: "Platform" },
  demo: { gl: "Demo", es: "Demo", en: "Demo" },
  seguridad: { gl: "Seguridade", es: "Seguridad", en: "Security" },
  precios: { gl: "Prezos", es: "Precios", en: "Pricing" },
};

export default function SiteHeader({ lang, onLangChange, theme = "dark", onThemeChange }: SiteHeaderProps) {
  const t = (key: string) => NAV_LABELS[key]?.[lang as "gl" | "es" | "en"] ?? key;
  const navItems = [
    { id: "inicio", icon: "🏛️" },
    { id: "plataforma", icon: "🤖" },
    { id: "demo", icon: "💬" },
    { id: "seguridad", icon: "🔒" },
    { id: "precios", icon: "💰" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3">
        <a href="#inicio" title="Inicio" className="flex flex-col items-start gap-0.5 font-bold leading-tight">
          <span className="flex items-center gap-2">
            <span className="text-xl">🏛️</span>
            <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
              VIGO AI
            </span>
            <span className="text-slate-400">ADMINISTRATION</span>
          </span>
          <span className="ml-7 text-[10px] font-medium text-slate-400">
            Plataforma inteligente para servizos públicos
          </span>
        </a>

        <nav className="ml-6 hidden items-center gap-1 md:flex" aria-label="Navegación principal">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              title={t(item.id)}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-brand-200"
            >
              <span aria-hidden>{item.icon}</span>
              <span className="hidden lg:inline">{t(item.id)}</span>
            </a>
          ))}
          <a
            href="/administracion-local"
            title="Para concellos"
            className="flex items-center gap-1.5 rounded-lg border border-brand-500/40 px-2.5 py-1.5 text-sm text-brand-200 transition hover:bg-brand-500/10"
          >
            <span aria-hidden>🏘️</span>
            <span className="hidden lg:inline">Concellos</span>
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => onThemeChange?.(theme === "dark" ? "light" : "dark")}
            title={theme === "dark" ? "Tema claro / Light theme" : "Tema oscuro / Dark theme"}
            aria-label={theme === "dark" ? "Tema claro / Light theme" : "Tema oscuro / Dark theme"}
            className="rounded-lg border border-slate-600 bg-slate-800 px-2 py-1.5 text-sm text-slate-200 transition hover:border-brand-400"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <select
            value={lang}
            onChange={(e) => onLangChange(e.target.value as Lang)}
            aria-label="Idioma"
            title="Idioma / Language"
            className="rounded-md border border-slate-600 bg-slate-800 px-1.5 py-1 text-xs text-slate-200 outline-none focus:border-brand-400"
          >
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}
