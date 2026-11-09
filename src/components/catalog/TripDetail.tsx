import Link from "next/link";
import { ArrowRight } from "../icons";
import { PageHero } from "../pages/PageHero";
import { QuoteLink } from "../QuoteLink";
import { QuoteSection } from "../QuoteSection";
import { TripGrid } from "../TripGrid";
import { JsonLd } from "../JsonLd";
import { site, telHref } from "@/config/site";
import type { CatalogItem } from "@/data/catalog";

type Props = { item: CatalogItem; related: CatalogItem[] };

const kindLabel = { excursie: "Excursii", pelerinaj: "Pelerinaje" } as const;
const kindHref = { excursie: "/excursii", pelerinaj: "/pelerinaje" } as const;

export function TripDetail({ item, related }: Props) {
  const facts = [
    { label: "Durată", value: item.duration },
    item.when ? { label: item.kind === "pelerinaj" ? "Data" : "Perioadă", value: item.when } : null,
    { label: "Opriri", value: `${item.places.length} ${item.places.length === 1 ? "loc" : "locuri"}` },
  ].filter((f): f is { label: string; value: string } => Boolean(f));

  return (
    <>
      <PageHero
        eyebrow={item.title}
        trail={[{ href: kindHref[item.kind], label: kindLabel[item.kind] }]}
        title={item.title}
        intro={<p>{item.description}</p>}
        image={item.image ? { src: item.image, alt: `${item.title}: ${item.places[0]}` } : undefined}
      />

      <section className="section-y bg-white" aria-labelledby="program-title" data-bg="white">
        <div className="container-x grid-12 gap-y-16">
          {/* Locurile vizitate, ca o cronologie verticală */}
          <div className="col-span-12 lg:col-span-7">
            <h2 id="program-title" className="t-48" data-reveal="lines">
              Ce vizităm.
            </h2>
            <ol className="relative mt-12 lg:mt-16">
              <span aria-hidden className="absolute top-8 bottom-8 left-[3.5px] w-px bg-line-strong" />
              {item.places.map((p) => (
                <li key={p} className="relative grid grid-cols-[8px_1fr] items-center gap-x-6 py-4">
                  <span aria-hidden className="size-2 rounded-full bg-night" />
                  <span className="t-32 font-semibold">{p}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Fișa: date tehnice + acțiuni */}
          <aside className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-32">
              <dl className="border-b border-line">
                {facts.map((f) => (
                  <div key={f.label} className="flex items-baseline justify-between gap-6 border-t border-line py-4">
                    <dt className="label text-muted">{f.label}</dt>
                    <dd className="text-right font-semibold">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 grid gap-2">
                <QuoteLink service={item.kind} subject={item.title} className="btn btn-lg btn-accent w-full">
                  Cere ofertă <ArrowRight />
                </QuoteLink>
                <a href={telHref} className="btn btn-lg btn-line-dark w-full">
                  Sună la {site.contact.phoneDisplay}
                </a>
              </div>
              <p className="t-14 mt-6 text-muted">
                Prețul depinde de numărul de pasageri, de orașul de plecare și de data aleasă; îl primești în oferta scrisă.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <QuoteSection
        title={`Ofertă pentru ${item.title}.`}
        lead="Numele e deja completat în formular."
        intro="Scrie orașul de plecare, data și câți pasageri sunteți."
        defaultService={item.kind}
        defaultSubject={item.title}
        tone="light"
      />

      {related.length > 0 && (
        <section className="section-y bg-white" aria-labelledby="related-title" data-bg="white">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="related-title" className="t-32 font-semibold">
                {item.kind === "pelerinaj" ? "Alte pelerinaje" : "Alte excursii"}
              </h2>
              <Link href={kindHref[item.kind]} className="link-arrow t-14 text-ink">
                <span className="link-u">Vezi toate</span> <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-12">
              <TripGrid items={related.slice(0, 3)} tone="white" showKind={false} />
            </div>
          </div>
        </section>
      )}

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: item.title,
            description: item.description,
            url: `${site.url}${item.href}`,
            ...(item.image ? { image: `${site.url}${item.image}` } : {}),
            touristType: item.kind === "pelerinaj" ? "Pelerini" : "Turiști",
            provider: { "@id": `${site.url}/#firma` },
            itinerary: {
              "@type": "ItemList",
              itemListElement: item.places.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: { "@type": "TouristAttraction", name: p },
              })),
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Acasă", item: site.url },
              { "@type": "ListItem", position: 2, name: kindLabel[item.kind], item: `${site.url}${kindHref[item.kind]}` },
              { "@type": "ListItem", position: 3, name: item.title, item: `${site.url}${item.href}` },
            ],
          },
        ]}
      />
    </>
  );
}
