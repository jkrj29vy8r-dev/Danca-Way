import type { Metadata } from "next";
import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { Statement } from "@/components/home/Statement";
import { Timetable } from "@/components/home/Timetable";
import { ServicesList } from "@/components/home/ServicesList";
import { TripsStrip } from "@/components/home/TripsStrip";
import { WhyUs } from "@/components/home/WhyUs";
import { Photo } from "@/components/Photo";
import { QuoteSection } from "@/components/QuoteSection";
import { JsonLd } from "@/components/JsonLd";
import { photos } from "@/data/photos";
import { busTripsJsonLd, pageMeta } from "@/lib/seo";
import { hasPhoto } from "@/lib/photo";

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

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      {hasPhoto(photos.road.src) && (
        <Photo
          src={photos.road.src}
          alt={photos.road.alt}
          sizes="100vw"
          scaleOnScroll
          className="aspect-[4/3] w-full md:aspect-[21/9]"
        />
      )}
      {/* Granițe Suspense: React hidratează secțiunile pe rând, în sarcini mici, fără să blocheze pagina */}
      <Suspense>
        <Timetable />
      </Suspense>
      <ServicesList />
      <Suspense>
        <TripsStrip />
      </Suspense>
      <WhyUs />
      <Suspense>
        <QuoteSection />
      </Suspense>
      <JsonLd data={busTripsJsonLd()} />
    </>
  );
}
