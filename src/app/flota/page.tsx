import type { Metadata } from "next";
import Link from "next/link";
import { ArtPhoto } from "@/components/ArtPhoto";
import { ArrowRight, Check } from "@/components/icons";
import { PageHero } from "@/components/pages/PageHero";
import { QuoteLink } from "@/components/QuoteLink";
import { JsonLd } from "@/components/JsonLd";
import { coach, SHOW_PLACEHOLDERS } from "@/config/fleet";
import { site } from "@/config/site";
import { cityName, routes, stopAt, stopName } from "@/data/routes";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `Flota: autocar ${coach.name}`,
  description: `Autocarul ${coach.name} al Danca Way: fotografii reale și datele tehnice, pe cursele regulate dintre Neamț, Otopeni și București.`,
  path: "/flota",
});

/** Cursele regulate făcute cu autocarul, cu capetele și orele lor (din orar) */
const coachTrips = routes
  .filter((r) => r.vehicle === "Autocar")
  .map((r) => {
    const a = r.stops[0];
    const b = r.stops[r.stops.length - 1];
    return { code: r.code, from: cityName(a.city), dep: a.time, to: stopName(b), arr: b.time, otopeni: stopAt(r, "otopeni")?.time };
  });

type Spec = { label: string; value: string | null; big?: boolean };

/**
 * Fișa tehnică, ca pe paginile de model: o fotografie mare, apoi o coloană de valori mari cu eticheta dedesubt,
 * lângă o a doua fotografie. Toate valorile vin din src/config/fleet.ts; cele goale nu apar în producție.
 */
export default function FlotaPage() {
  const [main, side, ...gallery] = coach.photos;
  const specs: Spec[] = [
    { label: "locuri pentru pasageri", value: coach.seats ? String(coach.seats) : null, big: true },
    { label: "bagaje", value: coach.luggage },
    { label: "categoria de confort", value: coach.category },
    { label: "anul fabricației", value: coach.year ? String(coach.year) : null, big: true },
    { label: "norma de poluare", value: coach.euro },
  ];
  const shown = specs.filter((s) => s.value !== null || SHOW_PLACEHOLDERS);
  const comfort = coach.comfort ?? (SHOW_PLACEHOLDERS ? [] : null);

  return (
    <>
      <PageHero
        eyebrow="Flota"
        title={`${coach.name}.`}
        intro={<p>{coach.kind}ul curselor regulate dintre Neamț, Otopeni și București. Fotografiile sunt ale autocarului nostru.</p>}
        image={{ src: main.src, mobileSrc: main.mobileSrc, alt: main.alt, transitionName: "fleet-coach", position: "50% 70%" }}
      />

      {/* Fișa tehnică */}
      <section className="section-y bg-white" data-bg="white" aria-labelledby="date-title">
        <div className="container-x grid-12 gap-y-16">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="date-title" className="t-48" data-reveal="lines">
              Date tehnice.
            </h2>
            <dl className="mt-12 border-b border-line lg:mt-16">
              <Row label="tip de vehicul" value={coach.kind} />
              <Row label="cursele regulate" value={coachTrips.map((t) => t.code).join(" · ")} mono />
              {shown.map((s) => (
                <Row key={s.label} label={s.label} value={s.value} big={s.big} />
              ))}
            </dl>

            {comfort && (
              <div className="mt-12">
                <h3 className="label text-muted">Confort</h3>
                {comfort.length ? (
                  <ul className="mt-4 grid gap-3">
                    {comfort.map((c) => (
                      <li key={c} className="flex items-baseline gap-3">
                        <Check size={16} className="shrink-0 translate-y-0.5" />
                        {c}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Todo field="comfort" />
                )}
              </div>
            )}
            <p className="t-14 mt-12 text-muted">Datele sunt cele ale operatorului, {site.legalName}. Le confirmăm și la rezervare.</p>
          </div>

          {side && (
            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <ArtPhoto src={side.src} alt={side.alt} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] w-full lg:sticky lg:top-32" />
            </div>
          )}
        </div>
      </section>

      {/* Pe ce curse circulă */}
      <section className="section-y bg-light" data-bg="light" aria-labelledby="curse-title">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
            <h2 id="curse-title" className="t-48 max-w-[22ch]" data-reveal="lines">
              Pe ce curse circulă. <span className="text-muted">În fiecare zi, după orar.</span>
            </h2>
            <Link href="/curse-regulate" className="link-arrow t-14 shrink-0">
              <span className="link-u">Orarul complet</span> <ArrowRight size={16} />
            </Link>
          </div>
          <ul className="mt-16 border-t border-line lg:mt-24">
            {coachTrips.map((t) => (
              <li key={t.code} className="grid-12 items-baseline gap-y-2 border-b border-line py-6">
                <span className="col-span-3 font-mono text-muted lg:col-span-1">{t.code}</span>
                <span className="t-32 col-span-9 font-mono tabular-nums lg:col-span-3">
                  {t.dep} → {t.arr}
                </span>
                <span className="col-span-12 font-semibold lg:col-span-5">
                  {t.from} → {t.to}
                </span>
                <span className="t-14 col-span-12 text-muted lg:col-span-3 lg:text-right">
                  {t.otopeni ? (
                    <>
                      Terminal Plecări Otopeni, <span className="font-mono">{t.otopeni}</span>
                    </>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fotografii */}
      {gallery.length > 0 && (
        <section className="bg-night py-2 text-white" data-bg="night" aria-label="Fotografii cu autocarul">
          <div className="grid gap-2 sm:grid-cols-3">
            {gallery.map((g) => (
              <ArtPhoto key={g.src} src={g.src} alt={g.alt} sizes="(min-width: 640px) 33vw, 100vw" parallax className="aspect-[3/4] w-full" />
            ))}
          </div>
        </section>
      )}

      {/* Închiriere */}
      <section className="section-y bg-white" data-bg="white" aria-labelledby="inchiriere-title">
        <div className="container-x grid-12 gap-y-8">
          <h2 id="inchiriere-title" className="t-48 col-span-12 lg:col-span-7" data-reveal="lines">
            Autocarul, pentru grupul tău. <span className="text-muted">Excursii, evenimente, firme.</span>
          </h2>
          <div className="col-span-12 flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9 lg:justify-end">
            <p className="text-muted">Scrie-ne traseul, data și numărul de pasageri. Primești prețul total înainte să confirmi.</p>
            <QuoteLink service="grup" subject={`Autocar ${coach.name}`} className="btn btn-lg btn-accent">
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

function Row({ label, value, big, mono }: { label: string; value: string | null; big?: boolean; mono?: boolean }) {
  return (
    <div className="flex flex-col border-t border-line py-6">
      <dt className="t-14 mt-2 text-muted">{label}</dt>
      <dd className={`order-first ${big ? "t-72 font-mono font-normal tabular-nums" : `t-32 ${mono ? "font-mono" : "font-semibold"}`}`}>
        {value ?? <Todo field={label} />}
      </dd>
    </div>
  );
}

/** Doar în dezvoltare: arată unde lipsește o valoare din src/config/fleet.ts */
function Todo({ field }: { field: string }) {
  return (
    <span className="t-14 inline-flex items-center gap-2 rounded-full border border-dashed border-line-strong px-3 py-1 font-sans font-normal tracking-normal text-muted">
      de completat în src/config/fleet.ts ({field})
    </span>
  );
}
