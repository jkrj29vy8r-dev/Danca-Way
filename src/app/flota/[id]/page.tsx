import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { Todo } from "@/components/fleet/Todo";
import { PageHero } from "@/components/pages/PageHero";
import { QuoteLink } from "@/components/QuoteLink";
import { Viewer360 } from "@/components/Viewer360";
import { fleet, SHOW_PLACEHOLDERS, type Vehicle } from "@/config/fleet";
import { site } from "@/config/site";
import { cityName, routes, stopAt, stopName } from "@/data/routes";
import { SPEC_LABEL, specValue, type SpecKey } from "@/lib/fleet-specs";
import { pageMeta } from "@/lib/seo";
import { view360 } from "@/lib/view360";

type Params = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return fleet.map((v) => ({ id: v.id }));
}

const find = async ({ params }: Params) => {
  const { id } = await params;
  return fleet.find((v) => v.id === id);
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const v = await find(props);
  if (!v) return {};
  return pageMeta({
    title: `${v.name}: fișa tehnică`,
    description: `${v.kind}ul ${v.name} al Danca Way: vedere din toate unghiurile, datele tehnice și cursele pe care circulă.`,
    path: `/flota/${v.id}`,
  });
}

/** Cursele regulate făcute cu acest tip de vehicul, cu capetele și orele lor (din orar) */
function tripsFor(v: Vehicle) {
  return routes
    .filter((r) => r.vehicle === v.kind)
    .map((r) => {
      const a = r.stops[0];
      const b = r.stops[r.stops.length - 1];
      return { code: r.code, from: cityName(a.city), dep: a.time, to: stopName(b), arr: b.time, otopeni: stopAt(r, "otopeni")?.time };
    });
}

type Row = { label: string; value: string | null; field?: SpecKey; mono?: boolean };

/**
 * Fișa vehiculului: vederea 360° sus (sau fotografia de studio, până există cadrele), apoi datele tehnice ca pe paginile
 * de model: trei valori mari, apoi tabelul pe grupe. Toate valorile vin din src/config/fleet.ts; cele goale nu apar în
 * producție, iar în dezvoltare sunt marcate „de completat”.
 */
export default async function VehiclePage(props: Params) {
  const v = await find(props);
  if (!v) notFound();
  const v3 = view360(v);
  const trips = tripsFor(v);
  const spec = (k: SpecKey): Row => ({ label: SPEC_LABEL[k], value: specValue(v, k), field: k });

  const figures = (["seats", "year", "euro"] as const).map(spec).filter((r) => r.value || SHOW_PLACEHOLDERS);
  const groups: { title: string; rows: Row[] }[] = [
    { title: "Pasageri", rows: [spec("seats"), spec("category"), spec("luggage")] },
    { title: "Confort", rows: (v.comfort?.length ? v.comfort.map((c) => ({ label: c, value: "inclus" })) : [spec("comfort")]) as Row[] },
    { title: "Vehicul", rows: [{ label: "Marca și modelul", value: v.name }, { label: "Tipul", value: v.kind }, spec("year"), spec("euro")] },
    {
      title: "Pe drum",
      rows: [
        ...(trips.length ? [{ label: "Cursele regulate", value: trips.map((t) => t.code).join(" · "), mono: true }] : []),
        { label: "Operator", value: site.legalName },
      ],
    },
  ]
    .map((g) => ({ ...g, rows: g.rows.filter((r) => r.value || SHOW_PLACEHOLDERS) }))
    .filter((g) => g.rows.length);
  const cover = v.cover ?? v.photos[0];

  return (
    <>
      <PageHero
        eyebrow={v.name}
        trail={[{ href: "/flota", label: "Flota" }]}
        title={`${v.name}.`}
        image={v3 ? undefined : { src: cover.src, mobileSrc: cover.mobileSrc, alt: cover.alt, position: "50% 80%", mobilePosition: "50% 96%" }}
      />

      {v3 && (
        <section className="bg-night pb-12 text-white lg:pb-16" data-bg="night" aria-label={`${v.name}, din toate unghiurile`}>
          <div className="mx-auto max-w-[96rem]">
            <Viewer360 base={v3.base} count={v3.count} ratio={v3.ratio} hotspots={v3.hotspots} label={`${v.name}, vedere 360°`} showTodo={SHOW_PLACEHOLDERS} />
          </div>
        </section>
      )}

      {/* Date tehnice */}
      <section className="section-y bg-white" data-bg="white" aria-labelledby="date-title">
        <div className="container-x">
          <h2 id="date-title" className="t-48" data-reveal="lines">
            Date tehnice.
          </h2>

          {figures.length > 0 && (
            <dl className="mt-16 grid gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:mt-24">
              {figures.map((f) => (
                <div key={f.label} className="flex flex-col border-t border-line pt-6">
                  <dt className="t-14 mt-3 text-muted">{f.label}</dt>
                  <dd className="t-72 order-first font-mono font-normal tabular-nums">{f.value ?? "—"}</dd>
                  {!f.value && (
                    <dd className="mt-4">
                      <Todo field={f.field!} />
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          )}

          <div className="mt-24 grid gap-y-16 lg:mt-32">
            {groups.map((g) => (
              <div key={g.title} className="grid-12 gap-y-6">
                <h3 className="t-32 col-span-12 font-semibold lg:col-span-4">{g.title}</h3>
                <dl className="col-span-12 border-t border-line lg:col-span-8">
                  {g.rows.map((r) => (
                    <div key={r.label} className="flex items-baseline justify-between gap-8 border-b border-line py-5">
                      <dt className="text-muted">{r.label}</dt>
                      <dd className={`text-right font-semibold ${r.mono ? "font-mono" : ""}`}>{r.value ?? <Todo field={r.field ?? r.label} />}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <p className="t-14 mt-16 text-muted">Datele sunt cele ale operatorului, {site.legalName}. Le confirmăm și la rezervare.</p>
        </div>
      </section>

      {/* Pe ce curse circulă */}
      {trips.length > 0 && (
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
              {trips.map((t) => (
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
      )}

      <section className="section-y bg-white" data-bg="white" aria-labelledby="inchiriere-title">
        <div className="container-x grid-12 gap-y-8">
          <h2 id="inchiriere-title" className="t-48 col-span-12 lg:col-span-7" data-reveal="lines">
            {v.kind}ul, pentru grupul tău. <span className="text-muted">Excursii, evenimente, firme.</span>
          </h2>
          <div className="col-span-12 flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9 lg:justify-end">
            <p className="text-muted">Scrie-ne traseul, data și numărul de pasageri. Primești prețul total înainte să confirmi.</p>
            <QuoteLink service="grup" subject={`${v.kind} ${v.name}`} className="btn btn-lg btn-accent">
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
            { "@type": "ListItem", position: 3, name: v.name, item: `${site.url}/flota/${v.id}` },
          ],
        }}
      />
    </>
  );
}
