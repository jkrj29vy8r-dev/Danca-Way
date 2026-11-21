import type { Metadata } from "next";
import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { BookingBar } from "@/components/home/BookingBar";
import { TrustBand } from "@/components/home/TrustBand";
import { OrbitSection } from "@/components/home/OrbitSection";
import { Facts } from "@/components/home/Facts";
import { Timetable } from "@/components/home/Timetable";
import { ServicesList } from "@/components/home/ServicesList";
import { TripsSection } from "@/components/home/TripsSection";
import { QuoteSection } from "@/components/QuoteSection";
import { JsonLd } from "@/components/JsonLd";
import { busTripsJsonLd, pageMeta } from "@/lib/seo";

const title = "Danca Way — Transport persoane Neamț – București, Otopeni, Constanța";

export const metadata: Metadata = {
  ...pageMeta({
    title,
    description:
      "Transport persoane Piatra Neamț – București și Otopeni: autocar din Târgu Neamț la 05:00 și 09:00, microbuz Otopeni – Roman la 12:00 și 16:00, Roman – Constanța la 07:00. Roman – București 120 lei.",
    path: "/",
  }),
  title: { absolute: title },
};

/**
 * O idee pe ecran: hero-ul (autocarul în studio); bara de rezervare; faptele verificabile; cifrele; orarul cu harta;
 * autocarul din toate unghiurile; serviciile; excursiile; cererea de ofertă. Toate opririle sunt pe /curse-regulate.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <BookingBar />
      <TrustBand />
      <Facts />
      {/* Granițe Suspense: React hidratează secțiunile pe rând, în sarcini mici, fără să blocheze pagina */}
      <Suspense>
        <Timetable />
      </Suspense>
      <OrbitSection />
      <ServicesList />
      <TripsSection />
      <Suspense>
        <QuoteSection />
      </Suspense>
      <JsonLd data={busTripsJsonLd()} />
    </>
  );
}
