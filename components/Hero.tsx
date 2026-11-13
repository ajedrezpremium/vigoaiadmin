"use client";

// Hero con carrusel de fotos de Vigo (Concello / Castro / Samil / Puerto) — Megaprompt §4

import { useEffect, useState } from "react";
import { I18N } from "@/lib/i18n";
import type { Lang } from "@/types";

export interface HeroImage {
  src: string;
  alt: string;
  caption: string;
}

interface HeroProps {
  lang: Lang;
  images: HeroImage[];
}

export default function Hero({ lang, images }: HeroProps) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  const t = I18N[lang];

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => clearInterval(id);
  }, [count]);

  const current = images[index];

  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1500 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />
      </div>

      {/* Contenido */}
      <div className="relative mx-auto flex max-w-5xl flex-col justify-end px-6 pb-24 pt-32 sm:pb-32">
        <div className="animate-fade-up">
          <p className="mb-3 inline-block rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-300">
            🏛️ {t.landingBadge}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 bg-clip-text text-transparent">
              {t.landingTitle}
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{t.landingSubtitle}</p>
          <p className="mt-3 text-sm font-medium text-amber-300">{t.landingDemoBadge}</p>
          <p className="mt-4 text-slate-300">{t.landingCtaBody}</p>
          <a
            href="#demo"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-500"
          >
            {t.landingCta} →
          </a>
        </div>
      </div>

      {/* Caption del slide actual */}
      <div className="absolute bottom-24 left-6 right-6 sm:bottom-28">
        <p className="text-sm font-medium text-slate-200 drop-shadow-lg">
          {current.caption} · {t.landingTitle}
        </p>
      </div>

      {/* Flechas */}
      <button
        onClick={() => setIndex((index - 1 + count) % count)}
        aria-label="Anterior / Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-slate-700 bg-slate-900/70 p-2 text-slate-200 transition hover:border-brand-400 hover:text-brand-300"
      >
        ‹
      </button>
      <button
        onClick={() => setIndex((index + 1) % count)}
        aria-label="Siguiente / Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-slate-700 bg-slate-900/70 p-2 text-slate-200 transition hover:border-brand-400 hover:text-brand-300"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === index ? "bg-brand-400" : "bg-slate-400/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
