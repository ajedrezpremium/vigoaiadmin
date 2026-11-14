"use client";

// Hero de portada — VIGO AI ADMINISTRATION DEMO v1.0
// Una gran foto a pantalla completa (sin texto). Puntos (dots) abajo-izquierda.
// 8 fotografías de turismo de Vigo (Wikimedia Commons, CC).

import { useEffect, useState } from "react";
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
  const isDark = theme === "dark";
  const current = images[index];

  useEffect(() => {
    const next = images[(index + 1) % images.length];
    const img = new Image();
    img.src = next.src;
  }, [index, images]);

  return (
    <section className={`relative min-h-screen w-full overflow-hidden ${isDark ? "bg-slate-950" : "bg-white"}`}>
      {/* Gran foto principal (pantalla completa) */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={index}
          src={current.src}
          alt={current.alt}
          className="h-full w-full object-cover brightness-110 contrast-105"
          loading="eager"
        />
        {/* Overlay suave solo en la parte inferior */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
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
