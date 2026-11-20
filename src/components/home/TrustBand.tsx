import { ratingDisplay, site, withDe } from "@/config/site";

const dateRo = (iso: string) => new Date(iso).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });

/** Anii împliniți de la înregistrare până azi (la build) */
function yearsSince(iso: string) {
  const from = new Date(iso);
  const now = new Date();
  let y = now.getFullYear() - from.getFullYear();
  if (now.getMonth() < from.getMonth() || (now.getMonth() === from.getMonth() && now.getDate() < from.getDate())) y--;
  return y;
}

/**
 * O bandă liniștită cu fapte verificabile, fiecare cu sursa ei (toate valorile vin din src/config/site.ts).
 * Ce nu e completat în config nu apare.
 */
export function TrustBand() {
  const { company, license, payments, rating } = site;
  const years = yearsSince(company.registeredOn);
  const items = [
    {
      label: "Operator licențiat",
      value: "Transport de persoane",
      detail: license.number ? `Licența ${license.authority} ${license.number}` : `${site.legalName} · ${site.regCom}`,
    },
    {
      label: `Din ${new Date(company.registeredOn).getFullYear()}`,
      value: `${withDe(years, years === 1 ? "an" : "ani")} de activitate`,
      detail: `Firmă înregistrată pe ${dateRo(company.registeredOn)} (ANAF)`,
    },
    {
      label: `Nota pe ${rating.source}`,
      value: `${ratingDisplay} din ${rating.best}`,
      detail: (
        <>
          {withDe(rating.count, "recenzii")}, verificat pe {dateRo(rating.checkedOn)} ·{" "}
          <a href={rating.sourceUrl} target="_blank" rel="noopener" className="link-u text-ink">
            sursa
          </a>
        </>
      ),
    },
    {
      label: "Plată",
      value: `Card, online`,
      detail: [`${payments.online.join(" și ")}, pe autogari.ro`, payments.onboard, payments.services].filter(Boolean).join(" · "),
    },
  ];

  return (
    <section className="border-b border-line bg-white" data-bg="white" aria-label="Despre Danca Way, pe scurt">
      <dl className="container-x grid-12 gap-y-8 py-12 lg:py-16">
        {items.map((it, i) => (
          <div key={it.label} className={`col-span-12 sm:col-span-6 lg:col-span-3 ${i ? "lg:border-l lg:border-line lg:pl-6" : ""}`}>
            <dt className="label text-muted">{it.label}</dt>
            <dd className="mt-3">
              <span className="t-21 block font-semibold">{it.value}</span>
              <span className="t-14 mt-1 block text-muted">{it.detail}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
