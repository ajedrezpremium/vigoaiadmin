"use client";

// Hero de portada — VIGO AI ADMINISTRATION DEMO v1.0
// 4 fotos estáticas de turismo (sin carrusel), fuente: Turismo de Vigo (oficial).
// Cada foto enlaza a la página oficial de turismo de Vigo.
// Fotos a pantalla completa, nítidas y brillantes.

import { I18N } from "@/lib/i18n";
import type { Lang } from "@/types";

export interface HeroImage {
  src: string;
  alt: string;
  name: string;
  caption: string;
  link: string;
}

interface HeroProps {
  lang: Lang;
  images: HeroImage[];
  theme?: "light" | "dark";
}

export default function Hero({ lang, images, theme = "dark" }: HeroProps) {
  const t = I18N[lang];
  const isDark = theme === "dark";

  const textMuted = isDark ? "text-slate-100" : "text-slate-900";
  const overlayCls = isDark
    ? "bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-slate-950/20"
    : "bg-gradient-to-t from-white/85 via-white/40 to-white/15";

  return (
    <section className={`relative min-h-screen w-full overflow-hidden ${isDark ? "bg-slate-950" : "bg-white"}`}>
      {/* Grid de 4 fotos a pantalla completa (sin carrusel) */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4">
        {images.map((img, i) => (
          <a
            key={i}
            href={img.link}
            target="_blank"
            rel="noopener noreferrer"
            title={`Ver en Turismo de Vigo: ${img.name}`}
            className="group relative block h-full w-full overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-105 saturate-110 transition-transform duration-700 group-hover:scale-110"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 transition-opacity group-hover:opacity-80" />
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-xs font-semibold text-white drop-shadow-md sm:text-sm">
                {img.caption}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Contenido superpuesto */}
      <div className={`relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center ${overlayCls}`}>
        <div className="animate-fade-up max-w-3xl">
          <p
            className={`mb-3 inline-block rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm ${
              isDark
                ? "border-brand-500/40 bg-brand-500/10 text-brand-300"
                : "border-brand-500/40 bg-white/80 text-brand-800"
            }`}
          >
            🏛️ {t.landingBadge}
          </p>
          <h1 className="text-3xl font-bold tracking-tight drop-shadow-lg sm:text-5xl md:text-6xl">
            <span
              className={`bg-gradient-to-r bg-clip-text font-bold text-transparent drop-shadow-lg ${
                isDark
                  ? "from-brand-300 via-brand-400 to-brand-600"
                  : "from-brand-700 via-brand-500 to-brand-600"
              }`}
            >
              {t.landingTitle}
            </span>
          </h1>
          <p className={`mt-4 text-base font-medium drop-shadow-md sm:text-lg ${textMuted}`}>
            {t.landingSubtitle}
          </p>
          <p className={`mt-4 text-sm ${textMuted}`}>{t.landingCtaBody}</p>
          <a
            href="#demo"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-500"
          >
            {t.landingCta} →
          </a>
        </div>
      </div>
    </section>
  );
}
