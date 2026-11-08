import Link from "next/link";
import { ArrowRight, Phone } from "../icons";
import { Photo } from "../Photo";
import { QuoteLink } from "../QuoteLink";
import { QuoteSection } from "../QuoteSection";
import { SnapStrip } from "../SnapStrip";
import { TripImageCard } from "../TripImageCard";
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
      <section className="relative bg-night text-white" data-bg="night">
        <div className="container-x pt-32 pb-12 md:pt-40 md:pb-16">
          <nav aria-label="Navigare ierarhică" className="text-sm text-mist">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="link-u hover:text-white">
                  Acasă
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={kindHref[item.kind]} className="link-u hover:text-white">
                  {kindLabel[item.kind]}
                </Link>
              </li>
            </ol>
          </nav>
          <p className="eyebrow mt-10 text-mist">
            {item.category} · {item.duration}
          </p>
          <h1 className="display-lg mt-5 max-w-5xl" data-reveal="lines">
            {item.title}
          </h1>
        </div>
        {item.image && (
          <Photo
            src={item.image}
            alt={`${item.title}: ${item.places[0]}`}
            sizes="100vw"
            priority
            className="aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]"
          />
        )}
      </section>

      <section className="section-y bg-white" data-bg="white">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="display-md max-w-3xl text-ink">{item.description}</p>

            <h2 className="eyebrow mt-16 text-muted">Ce vizităm</h2>
            <ol className="relative mt-6 space-y-5">
              <span aria-hidden className="absolute top-3 bottom-3 left-[5px] border-l-2 border-dotted border-night/20" />
              {item.places.map((p) => (
                <li key={p} className="relative flex items-center gap-5">
                  <span aria-hidden className="size-3 shrink-0 rounded-full bg-accent ring-4 ring-white" />
                  <span className="font-display text-xl font-semibold tracking-tight md:text-2xl">{p}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-2xl bg-light p-6 md:p-8 lg:sticky lg:top-28">
              <dl className="divide-y divide-line">
                {facts.map((f) => (
                  <div key={f.label} className="flex justify-between gap-6 py-4 first:pt-0">
                    <dt className="text-muted">{f.label}</dt>
                    <dd className="text-right font-semibold">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <QuoteLink service={item.kind} subject={item.title} className="btn btn-dark mt-6 w-full">
                Cere ofertă <ArrowRight />
              </QuoteLink>
              <a href={telHref} className="btn btn-ghost-dark mt-3 w-full">
                <Phone size={18} /> {site.contact.phoneDisplay}
              </a>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Prețul depinde de numărul de pasageri, de orașul de plecare și de data aleasă; îl primești în
                oferta scrisă.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <QuoteSection
        title={`Ofertă pentru ${item.title}`}
        intro="Scrie orașul de plecare, data și câți pasageri sunteți; numele excursiei este deja completat în formular."
        defaultService={item.kind}
        defaultSubject={item.title}
      />

      {related.length > 0 && (
        <section className="section-y overflow-hidden bg-white" aria-labelledby="related-title" data-bg="white">
          <div className="container-x flex items-end justify-between gap-6">
            <h2 id="related-title" className="display-md" data-reveal="lines">
              {item.kind === "pelerinaj" ? "Alte pelerinaje" : "Alte excursii"}
            </h2>
            <Link href={kindHref[item.kind]} className="link-arrow link-u hidden text-ink sm:inline-flex">
              Vezi toate <ArrowRight />
            </Link>
          </div>
          <div className="mt-10">
            <SnapStrip label={item.kind === "pelerinaj" ? "Alte pelerinaje" : "Alte excursii"} tone="light" variant="tall">
              {related.map((r) => (
                <li key={r.href}>
                  <TripImageCard item={r} />
                </li>
              ))}
            </SnapStrip>
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
