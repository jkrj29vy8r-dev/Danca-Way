import { PageHero } from "./PageHero";
import { ArrowRight } from "../icons";
import { QuoteSection } from "../QuoteSection";
import { ServiceLinkList } from "../home/ServicesList";
import { JsonLd } from "../JsonLd";
import { site, telHref } from "@/config/site";
import type { ServicePageContent } from "@/data/service-pages";

type Props = { page: ServicePageContent; /** Bloc special între situații și pași (ex. orele de la Otopeni) */ extra?: React.ReactNode };

/**
 * Pagina unui serviciu: hero cu date tehnice, situațiile concrete, cum rezervi, întrebări, ofertă, alte servicii.
 * Secțiunile alternează night / white / light; nu există două secțiuni la rând cu același fundal.
 */
export function ServicePage({ page, extra }: Props) {
  const url = `${site.url}/${page.slug}`;
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.h1} intro={<p>{page.intro}</p>} facts={page.facts} image={page.image}>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a href="#oferta" className="btn btn-lg btn-accent">
            Cere ofertă <ArrowRight />
          </a>
          <a href={telHref} className="btn btn-lg btn-line-light">
            Sună la {site.contact.phoneDisplay}
          </a>
        </div>
      </PageHero>

      {/* Situații concrete: titlu mare la stânga, explicația la dreapta, linii de 1 px */}
      <section className="section-y bg-white" aria-labelledby="situatii-title" data-bg="white">
        <div className="container-x">
          <h2 id="situatii-title" className="t-48" data-reveal="lines">
            Când ne chemi.
          </h2>
          <ul className="mt-16 border-b border-line lg:mt-24">
            {page.uses.map((u) => (
              <li key={u.title} className="grid-12 gap-y-2 border-t border-line py-8">
                <h3 className="t-32 col-span-12 font-semibold lg:col-span-5">{u.title}</h3>
                <p className="measure col-span-12 text-muted lg:col-span-6 lg:col-start-7">{u.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {extra}

      {/* Cum rezervi: trei coloane cu linie deasupra, fără numere */}
      <section className="section-y bg-light" aria-labelledby="pasi-title" data-bg="light">
        <div className="container-x">
          <h2 id="pasi-title" className="t-48 max-w-[22ch]" data-reveal="lines">
            Cum rezervi. <span className="text-muted">Prețul îl afli înainte să confirmi.</span>
          </h2>
          <ol className="grid-12 mt-16 gap-y-8 lg:mt-24">
            {page.steps.map((s) => (
              <li key={s.title} className="col-span-12 border-t border-line-strong pt-6 md:col-span-4">
                <h3 className="t-21 font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Întrebări */}
      <section className="section-y bg-white" aria-labelledby="faq-title" data-bg="white">
        <div className="container-x grid-12 gap-y-12">
          <h2 id="faq-title" className="t-48 col-span-12 lg:col-span-4" data-reveal="lines">
            Întrebări frecvente.
          </h2>
          <div className="col-span-12 border-b border-line lg:col-span-7 lg:col-start-6">
            {page.faq.map((f) => (
              <details key={f.q} className="faq group border-t border-line">
                <summary className="press t-21 flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-semibold transition-opacity hover:opacity-64">
                  {f.q}
                  <span aria-hidden className="faq-plus t-32 leading-none font-normal text-muted">
                    +
                  </span>
                </summary>
                <p className="measure pb-8 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <QuoteSection
        title={`Ofertă pentru ${page.eyebrow.charAt(0).toLowerCase()}${page.eyebrow.slice(1)}.`}
        lead="Răspundem cu prețul total."
        intro="Scrie plecarea, destinația, data, ora și numărul de pasageri."
        defaultService={page.id}
        tone="light"
      />

      {/* Alte servicii */}
      <section className="section-y bg-white" aria-labelledby="alte-title" data-bg="white">
        <div className="container-x">
          <h2 id="alte-title" className="t-32 font-semibold">
            Alte servicii
          </h2>
          <div className="mt-12">
            <ServiceLinkList ids={page.related} />
          </div>
        </div>
      </section>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: page.eyebrow,
            serviceType: page.serviceType,
            description: page.intro,
            url,
            provider: { "@id": `${site.url}/#firma` },
            areaServed: site.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Acasă", item: site.url },
              { "@type": "ListItem", position: 2, name: page.eyebrow, item: url },
            ],
          },
        ]}
      />
    </>
  );
}
