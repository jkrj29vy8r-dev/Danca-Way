import Link from "next/link";
import { PageHero } from "./PageHero";
import { ArrowRight, Phone } from "../icons";
import { QuoteSection } from "../QuoteSection";
import { JsonLd } from "../JsonLd";
import { site, telHref } from "@/config/site";
import { serviceById } from "@/data/services";
import type { ServicePageContent } from "@/data/service-pages";

type Props = { page: ServicePageContent; /** Bloc special între situații și pași (ex. orele de la Otopeni) */ extra?: React.ReactNode };

export function ServicePage({ page, extra }: Props) {
  const url = `${site.url}/${page.slug}`;
  // Dacă există un bloc închis la culoare înainte (ex. orele de la Otopeni), pașii trec pe fundal deschis.
  const dark = !extra;
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.h1}
        intro={<p>{page.intro}</p>}
        facts={page.facts}
        image={page.image}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#oferta" className="btn btn-primary">
            Cere ofertă <ArrowRight />
          </a>
          <a href={telHref} className="btn btn-ghost-light">
            <Phone size={18} /> {site.contact.phoneDisplay}
          </a>
        </div>
      </PageHero>

      {/* Situații concrete */}
      <section className="section-y bg-white" aria-labelledby="situatii-title" data-bg="white">
        <div className="container-x">
          <h2 id="situatii-title" className="eyebrow text-muted">
            Când ne chemi
          </h2>
          <ul className="mt-10 border-b border-line">
            {page.uses.map((u) => (
              <li key={u.title} className="grid gap-3 border-t border-line py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10">
                <h3 className="font-display text-3xl font-semibold tracking-tight md:col-span-5 md:text-[2.5rem] md:leading-none">
                  {u.title}
                </h3>
                <p className="text-lg leading-relaxed text-muted md:col-span-7">{u.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {extra}

      {/* Cum rezervi */}
      <section
        className={`section-y ${dark ? "bg-navy text-white" : "bg-light text-ink"}`}
        aria-labelledby="pasi-title"
        data-bg={dark ? "navy" : "light"}
      >
        <div className="container-x">
          <p className={`eyebrow ${dark ? "text-mist" : "text-muted"}`}>Cum rezervi</p>
          <h2 id="pasi-title" className="display-md mt-6 max-w-3xl" data-reveal="lines">
            Trei pași, fără surprize la preț.
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
            {page.steps.map((s, i) => (
              <li key={s.title} className={`border-t pt-6 ${dark ? "border-white/20" : "border-line"}`}>
                <p className={`font-mono text-sm ${dark ? "text-accent" : "text-muted"}`}>Pasul {i + 1}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{s.title}</h3>
                <p className={`mt-2 leading-relaxed ${dark ? "text-mist" : "text-muted"}`}>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Întrebări */}
      <section className="section-y bg-white" aria-labelledby="faq-title" data-bg="white">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 id="faq-title" className="display-md lg:col-span-4" data-reveal="lines">
            Întrebări frecvente
          </h2>
          <div className="lg:col-span-8">
            {page.faq.map((f) => (
              <details key={f.q} className="faq group border-t border-line last:border-b">
                <summary className="press flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-xl font-semibold tracking-tight">
                  {f.q}
                  <span aria-hidden className="text-2xl leading-none text-muted transition-transform duration-500 ease-[var(--ease-out-expo)] group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 text-lg leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <QuoteSection
        title={`Ofertă pentru ${page.eyebrow.charAt(0).toLowerCase()}${page.eyebrow.slice(1)}`}
        intro="Scrie plecarea, destinația, data, ora și numărul de pasageri; îți răspundem cu prețul total."
        defaultService={page.id}
      />

      {/* Alte servicii */}
      <section className="section-y bg-white" aria-labelledby="alte-title" data-bg="white">
        <div className="container-x">
          <h2 id="alte-title" className="eyebrow text-muted">
            Alte servicii
          </h2>
          <ul className="mt-8 border-b border-line">
            {page.related.map((id) => {
              const s = serviceById(id)!;
              return (
                <li key={id} className="group relative border-t border-line">
                  <div className="grid gap-3 py-7 md:grid-cols-12 md:items-center md:gap-8">
                    <h3 className="font-display text-2xl font-semibold tracking-tight transition-transform duration-700 ease-[var(--ease-out-expo)] md:col-span-5 md:text-3xl md:group-hover:translate-x-2">
                      {s.title}
                    </h3>
                    <p className="leading-relaxed text-muted md:col-span-5">{s.short}</p>
                    <div className="md:col-span-2 md:text-right">
                      <Link href={s.href} className="link-arrow link-u text-ink after:absolute after:inset-0 after:content-['']" aria-label={`Detalii: ${s.title}`}>
                        Detalii <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
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
