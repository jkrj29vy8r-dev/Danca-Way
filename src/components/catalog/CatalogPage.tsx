import { QuoteSection } from "../QuoteSection";
import { TripGrid } from "../TripGrid";
import { PageHero } from "../pages/PageHero";
import type { CatalogItem, CatalogKind } from "@/data/catalog";

type Props = {
  kind: CatalogKind;
  title: string;
  intro: string;
  groups: { id: string; label: string; items: CatalogItem[] }[];
};

/** Pagina de listă pentru excursii sau pelerinaje, grupate pe categorii, cu grile despărțite prin linii de 1 px. */
export function CatalogPage({ kind, title, intro, groups }: Props) {
  return (
    <>
      <PageHero eyebrow={kind === "pelerinaj" ? "Pelerinaje" : "Excursii"} title={title} intro={<p>{intro}</p>}>
        <nav aria-label="Categorii">
          <ul className="flex flex-wrap gap-2">
            {groups.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="btn btn-line-light min-h-10 px-4 font-normal">
                  {g.label} <span className="font-mono text-mist">{g.items.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {groups.map((g, i) => {
        const tone = i % 2 ? "light" : "white";
        return (
          <section
            key={g.id}
            id={g.id}
            className={`section-y scroll-mt-16 ${tone === "light" ? "bg-light" : "bg-white"}`}
            aria-labelledby={`${g.id}-title`}
            data-bg={tone}
          >
            <div className="container-x">
              <h2 id={`${g.id}-title`} className="t-48" data-reveal="lines">
                {g.label}
              </h2>
              <div className="mt-12 lg:mt-16">
                <TripGrid items={g.items} tone={tone} showKind={false} />
              </div>
            </div>
          </section>
        );
      })}

      <QuoteSection
        title={kind === "pelerinaj" ? "Ofertă pentru un pelerinaj." : "Ofertă pentru o excursie."}
        lead="Răspundem cu prețul total."
        intro="Scrie destinația, data, orașul de plecare și câți pasageri sunteți."
        defaultService={kind}
        tone={groups.length % 2 ? "light" : "white"}
      />
    </>
  );
}
