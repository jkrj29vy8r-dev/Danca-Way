import type { Metadata } from "next";
import { ArrowRight } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { PageHero } from "@/components/pages/PageHero";
import { QuoteLink } from "@/components/QuoteLink";
import { fleet } from "@/config/fleet";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Flota",
  description: `Vehiculele Danca Way și fișa lor tehnică: ${fleet.map((v) => v.name).join(", ")}.`,
  path: "/flota",
});

/** Flota: câte un card pentru fiecare vehicul din src/config/fleet.ts. Fișa tehnică e pe /flota/<id>. */
export default function FlotaPage() {
  const wide = fleet.length === 1;
  return (
    <>
      <PageHero eyebrow="Flota" title="Flota." intro={<p>Vehiculele cu care circulăm. Apasă pe vehicul pentru fișa tehnică.</p>} compact />

      <section className="bg-light pt-8 pb-24 lg:pt-12 lg:pb-40" data-bg="light" aria-label="Vehiculele">
        <div className={`container-x grid gap-x-8 gap-y-24 ${wide ? "" : "lg:grid-cols-2"}`}>
          {fleet.map((v) => (
            <VehicleCard key={v.id} v={v} wide={wide} />
          ))}
        </div>
      </section>

      <section className="section-y bg-light" data-bg="light" aria-labelledby="inchiriere-title">
        <div className="container-x grid-12 gap-y-8">
          <h2 id="inchiriere-title" className="t-48 col-span-12 lg:col-span-7" data-reveal="lines">
            Pentru grupul tău. <span className="text-muted">Excursii, evenimente, firme.</span>
          </h2>
          <div className="col-span-12 flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9 lg:justify-end">
            <p className="text-muted">Scrie-ne traseul, data și numărul de pasageri. Primești prețul total înainte să confirmi.</p>
            <QuoteLink service="grup" className="btn btn-lg btn-accent">
              Cere ofertă <ArrowRight />
            </QuoteLink>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Acasă", item: site.url },
            { "@type": "ListItem", position: 2, name: "Flota", item: `${site.url}/flota` },
          ],
        }}
      />
    </>
  );
}
