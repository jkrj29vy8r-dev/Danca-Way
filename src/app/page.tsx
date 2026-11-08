import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Statement } from "@/components/home/Statement";
import { RoutesPreview } from "@/components/home/RoutesPreview";
import { ServicesList } from "@/components/home/ServicesList";
import { TripsStrip } from "@/components/home/TripsStrip";
import { WhyUs } from "@/components/home/WhyUs";
import { ScaleImage } from "@/components/ScaleImage";
import { QuoteSection } from "@/components/QuoteSection";
import { JsonLd } from "@/components/JsonLd";
import { photos } from "@/data/photos";
import { busTripsJsonLd, pageMeta } from "@/lib/seo";

const title = "Danca Way — Transport persoane Neamț – București, Otopeni, Constanța";

export const metadata: Metadata = {
  ...pageMeta({
    title,
    description:
      "Transport persoane Piatra Neamț – București: autocar din Târgu Neamț la 05:00 și 09:00, preluare de la Aeroportul Otopeni la 12:00 și 16:00 spre Roman, Roman – Constanța la 07:00. Bilete de la 120 lei.",
    path: "/",
  }),
  title: { absolute: title },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <ScaleImage photo={photos.road} className="aspect-[4/3] md:aspect-[21/9]" />
      <RoutesPreview />
      <ServicesList />
      <TripsStrip />
      <WhyUs />
      <QuoteSection />
      <JsonLd data={busTripsJsonLd()} />
    </>
  );
}
