import type { Metadata } from "next";
import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { Facts } from "@/components/home/Facts";
import { Journey } from "@/components/home/Journey";
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
 * O idee pe ecran: titlul și căutarea; cifrele; o cursă stație cu stație; orarul; serviciile;
 * excursiile; cererea de ofertă.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Facts />
      {/* Granițe Suspense: React hidratează secțiunile pe rând, în sarcini mici, fără să blocheze pagina */}
      <Suspense>
        <Journey />
      </Suspense>
      <Suspense>
        <Timetable />
      </Suspense>
      <ServicesList />
      <TripsSection />
      <Suspense>
        <QuoteSection />
      </Suspense>
      <JsonLd data={busTripsJsonLd()} />
    </>
  );
}
