import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VIGO AI ADMINISTRATION — DEMO GRATUITA v1.0 | CHESS AI AGENCY",
  description:
    "Plataforma multiagente de IA para servicios públicos municipales. Demo con agentes especializados, RAG con citas, multilingüe (galego/español/english). CHESS AI AGENCY.",
  keywords: [
    "IA municipal",
    "inteligencia artificial administración pública",
    "multiagente",
    "RAG",
    "Vigo",
    "CHESS AI AGENCY",
  ],
  authors: [{ name: "CHESS AI AGENCY" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
