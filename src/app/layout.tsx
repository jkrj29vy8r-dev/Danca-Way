import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MotionController } from "@/components/MotionController";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";
import { localBusinessJsonLd } from "@/lib/seo";

// Fontul de text nu se preîncarcă: fotografia din hero (LCP pe mobil) primește banda întâi.
// next/font generează un font de rezervă cu aceleași metrici, deci schimbarea nu mișcă layout-ul.
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter-tight",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Danca Way — Transport persoane Neamț, curse București, Otopeni, Constanța",
    template: "%s | Danca Way",
  },
  description:
    "Curse Târgu Neamț – Piatra Neamț – Roman – Bacău – București Obor la 05:00 și 09:00, preluare de la Aeroportul Otopeni la 12:00 și 16:00, Roman – Constanța la 07:00. Transfer privat 8+1, închiriere microbuz cu șofer, excursii și pelerinaje.",
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  formatDetection: { telephone: false },
  openGraph: { type: "website", locale: site.locale, siteName: site.name },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/danca-way-simbol.svg", type: "image/svg+xml" }] },
};

export const viewport: Viewport = {
  themeColor: "#0B1426",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${inter.variable} ${interTight.variable}`} suppressHydrationWarning>
      <head>
        {/* Marchează că JS rulează: animațiile care ascund inițial conținut se activează doar atunci. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <div id="scroll-progress" className="scroll-progress" aria-hidden />
        {/* Straturile fundalului care se schimbă lin între secțiuni (vezi MotionController) */}
        <div className="bg-layers" aria-hidden>
          <div data-bg-layer="night" className="bg-night" />
          <div data-bg-layer="navy" className="bg-navy" />
          <div data-bg-layer="light" className="bg-light" />
          <div data-bg-layer="white" className="bg-white" />
        </div>
        <Header />
        <main id="continut">{children}</main>
        <Footer />
        <WhatsAppButton />
        <SmoothScroll />
        <MotionController />
        <JsonLd data={localBusinessJsonLd()} />
      </body>
    </html>
  );
}
