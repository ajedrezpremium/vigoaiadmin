"use client";

// Hero de portada — VIGO AI ADMINISTRATION DEMO v1.0
// Una gran foto a pantalla completa, luminosa y nítida.
// Puntos (dots) abajo-izquierda para cambiar de imagen + descarga.

import { useEffect, useState } from "react";
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
  const [index, setIndex] = useState(0);
  const t = I18N[lang];
  const isDark = theme === "dark";
  const current = images[index];

  // Precarga de la siguiente imagen para transición suave
  useEffect(() => {
    const next = images[(index + 1) % images.length];
    const img = new Image();
    img.src = next.src;
  }, [index, images]);

  const textMuted = isDark ? "text-white" : "text-slate-900";

  return (
    <section className={`relative min-h-screen w-full overflow-hidden ${isDark ? "bg-slate-950" : "bg-white"}`}>
      {/* Gran foto principal (pantalla completa, luminosa) */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={index}
          src={current.src}
          alt={current.alt}
          className="h-full w-full object-cover brightness-110 contrast-105"
          loading="eager"
        />
        {/* Overlay suave solo en la parte inferior para legibilidad del texto */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Contenido superpuesto (centro) */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="animate-fade-up max-w-3xl rounded-2xl bg-black/40 px-6 py-8 backdrop-blur-md">
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
        </div>
      </div>

      {/* Puntos (dots) abajo-izquierda + nombre + descarga */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ver foto: ${img.name}`}
              title={img.name}
              className={`h-4 w-4 rounded-full border-2 shadow-lg transition-all ${
                i === index
                  ? "scale-125 border-white bg-brand-400"
                  : "border-white/80 bg-black/50 hover:border-white hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        <span className="ml-2 inline-block rounded-md bg-black/60 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm sm:text-sm">
          {current.name} ({index + 1}/{images.length})
        </span>

        <a
          href={current.link}
          download
          target="_blank"
          rel="noopener noreferrer"
          title="Descargar foto a tamaño completo"
          className="ml-2 inline-flex items-center gap-1 rounded-lg bg-white/20 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/40"
        >
          ⬇ Descargar
        </a>
      </div>
    </section>
  );
}
