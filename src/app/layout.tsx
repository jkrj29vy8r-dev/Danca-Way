import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MotionController } from "@/components/MotionController";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MobileActionBar } from "@/components/MobileActionBar";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";
import { localBusinessJsonLd } from "@/lib/seo";

// Geist pentru tot textul (400 și 600), Geist Mono pentru ore, prețuri și coduri de cursă (400 și 600).
// Servite din același domeniu prin next/font, preîncărcate, cu font de rezervă cu aceleași metrici (fără CLS).
const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
  display: "swap",
});

/** Orele de plecare, prețurile și codurile de cursă */
const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: ["400", "600"],
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
    <html lang="ro" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Marchează că JS rulează: animațiile care ascund inițial conținut se activează doar atunci. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      {/* Pe mobil, spațiu sub conținut pentru bara fixă Sună · WhatsApp · Bilet */}
      <body className="pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <Suspense>
          <Header />
        </Suspense>
        <main id="continut">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileActionBar />
        <MotionController />
        <JsonLd data={localBusinessJsonLd()} />
      </body>
    </html>
  );
}
