import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/pages/PageHero";
import { AllStops, FareTable, Stations } from "@/components/pages/RouteDetails";
import { Timetable } from "@/components/home/Timetable";
import { RouteFinder } from "@/components/home/RouteFinder";
import { ArrowUpRight } from "@/components/icons";
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
            {routes.length} curse, cu plecări din Târgu Neamț la 05:00 și 09:00, oprire la Terminalul Plecări din Otopeni
            și întoarcere de la București Obor la 11:30 și 15:30. Spre Constanța pleacă microbuzul din Roman, la 07:00.
          </p>
        }
        facts={[
          { label: "Prima plecare", value: "05:00, Târgu Neamț" },
          { label: "Oprire la aeroport", value: "Terminal Plecări" },
          { label: "Roman → București", value: "120 lei" },
          { label: "Roman → Constanța", value: "160 lei" },
        ]}
      >
        <div className="max-w-4xl">
          <Suspense>
            <RouteFinder />
          </Suspense>
          <a href={site.ticketsUrl} target="_blank" rel="noopener" className="link-arrow link-u mt-4 inline-flex text-sm text-white/85">
            Cumpără biletul online, pe autogari.ro <ArrowUpRight size={15} />
          </a>
        </div>
      </PageHero>
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
