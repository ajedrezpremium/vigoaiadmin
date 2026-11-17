import type { Metadata } from "next";
import CampanaLanding from "@/components/CampanaLanding";

// Página neutra para los correos de campaña: sin marca de Vigo, sin precios.
// No se indexa para no competir con /ayuntamientos en buscadores.

export const metadata: Metadata = {
  title: "IA para la Administración Local · CHESS AI AGENCY",
  description:
    "Asistencia de inteligencia artificial para el personal municipal: consultas con fuentes citadas, borradores de informes y transcripción de reuniones.",
  keywords: [
    "inteligencia artificial",
    "administración local",
    "ayuntamiento",
    "concello",
    "RGPD",
    "ENS",
    "AI Act",
    "CHESS AI AGENCY",
  ],
  robots: { index: false, follow: false },
};

export default function CampanaPage() {
  return <CampanaLanding />;
}
