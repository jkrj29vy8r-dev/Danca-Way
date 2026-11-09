import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/pages/PageHero";
import { AllStops, FareTable, Stations } from "@/components/pages/RouteDetails";
import { Timetable } from "@/components/home/Timetable";
import { RouteFinder } from "@/components/home/RouteFinder";
import { Facts } from "@/components/home/Facts";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";
import { routes } from "@/data/routes";
import { busTripsJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Curse regulate Târgu Neamț, Piatra Neamț, Roman – București, Otopeni, Constanța | orar și prețuri",
  description:
    "Orarul curselor Danca: Târgu Neamț 05:00 și 09:00 spre București Obor cu oprire la Otopeni, Otopeni – Piatra Neamț – Roman la 12:00 și 16:00, Roman – Constanța la 07:00. Toate opririle și tarifele.",
  path: "/curse-regulate",
});

export default function CurseRegulatePage() {
  return (
    <>
      <PageHero
        eyebrow="Curse regulate"
        title="Neamț – București, Otopeni și Constanța."
        intro={
          <p>
            {routes.length} curse pe zi: din Târgu Neamț la 05:00 și 09:00, cu oprire la Terminalul Plecări din Otopeni, înapoi
            de la București Obor la 11:30 și 15:30, iar spre Constanța din Roman, la 07:00.
          </p>
        }
      >
        <Suspense>
          <RouteFinder />
        </Suspense>
      </PageHero>
      <Facts />
      <Suspense>
        <Timetable full />
      </Suspense>
      <AllStops />
      <FareTable />
      <Stations />
      <JsonLd
        data={[
          busTripsJsonLd(),
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Acasă", item: site.url },
              { "@type": "ListItem", position: 2, name: "Curse regulate", item: `${site.url}/curse-regulate` },
            ],
          },
        ]}
      />
    </>
  );
}
