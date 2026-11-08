import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Statement } from "@/components/home/Statement";
import { RoutesPreview } from "@/components/home/RoutesPreview";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TripsStrip } from "@/components/home/TripsStrip";
import { WhyUs } from "@/components/home/WhyUs";
import { QuoteSection } from "@/components/QuoteSection";
import { JsonLd } from "@/components/JsonLd";
import { busTripsJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Danca Way — Transport persoane Neamț – București, Otopeni, Constanța",
    description:
      "Transport persoane Piatra Neamț – București și Aeroport Otopeni, zilnic. Microbuz Otopeni – Roman, cursă Roman – Constanța, transfer privat 8+1, închiriere microbuz cu șofer, excursii și pelerinaje.",
    path: "/",
  }),
  title: { absolute: "Danca Way — Transport persoane Neamț – București, Otopeni, Constanța" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <RoutesPreview />
      <ServicesGrid />
      <TripsStrip />
      <WhyUs />
      <QuoteSection />
      <JsonLd data={busTripsJsonLd()} />
    </>
  );
}
