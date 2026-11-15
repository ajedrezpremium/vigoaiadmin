import type { Metadata } from "next";
import AyuntamientosLanding from "@/components/AyuntamientosLanding";

export const metadata: Metadata = {
  title: "IA para concellos — VIGO AI ADMINISTRATION",
  description:
    "Asistente de IA para el personal municipal: respuestas con fuentes citadas, borradores de informes y transcripción de reuniones en gallego y castellano. Pilotos desde 2.900 € para los 61 concellos de Pontevedra.",
  keywords: [
    "IA para concellos",
    "inteligencia artificial ayuntamientos",
    "asistente normativo municipal",
    "contrato menor IA",
    "Pontevedra",
    "Galicia",
  ],
  openGraph: {
    title: "IA para concellos — VIGO AI ADMINISTRATION",
    description:
      "Un asistente municipal que responde con fuentes, redacta borradores y transcribe reuniones. Pilotos desde 2.900 €, sin licitación.",
    type: "website",
    locale: "gl_ES",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "VIGO AI ADMINISTRATION — asistente de IA municipal",
  serviceType: "Asistente de inteligencia artificial para administración local",
  areaServed: { "@type": "AdministrativeArea", name: "Provincia de Pontevedra" },
  provider: {
    "@type": "Organization",
    name: "CHESS AI AGENCY",
    areaServed: "ES",
  },
  offers: [
    { "@type": "Offer", name: "Micro-piloto", price: "2900", priceCurrency: "EUR" },
    { "@type": "Offer", name: "Piloto 3 semanas", price: "4900", priceCurrency: "EUR" },
    { "@type": "Offer", name: "Piloto 4 semanas", price: "7900", priceCurrency: "EUR" },
    { "@type": "Offer", name: "Piloto 6 semanas", price: "12500", priceCurrency: "EUR" },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <AyuntamientosLanding />
    </>
  );
}
