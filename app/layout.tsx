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
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Saltar al contenido / Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
