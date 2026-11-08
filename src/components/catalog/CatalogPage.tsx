import { CatalogCard } from "./CatalogCard";
import { QuoteSection } from "../QuoteSection";
import type { CatalogItem, CatalogKind } from "@/data/catalog";

type Props = {
  kind: CatalogKind;
  title: string;
  intro: string;
  groups: { id: string; label: string; items: CatalogItem[] }[];
};

/** Pagina de listă pentru excursii sau pelerinaje, grupate pe categorii. */
export function CatalogPage({ kind, title, intro, groups }: Props) {
  return (
    <>
      <section className="bg-night text-white" data-bg="night">
        <div className="container-x pt-36 pb-16 md:pt-44 md:pb-24">
          <p className="eyebrow text-mist">{kind === "pelerinaj" ? "Pelerinaje" : "Excursii"}</p>
          <h1 className="display-lg mt-6 max-w-4xl" data-reveal="lines">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{intro}</p>
          <nav aria-label="Categorii" className="mt-10">
            <ul className="flex flex-wrap gap-2">
              {groups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="inline-flex rounded-full border border-white/25 px-4 py-2 text-sm font-medium">
                    {g.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {groups.map((g, i) => (
        <section
          key={g.id}
          id={g.id}
          className={`section-y scroll-mt-16 ${i % 2 ? "bg-light" : "bg-white"}`}
          aria-labelledby={`${g.id}-title`}
          data-bg={i % 2 ? "light" : "white"}
        >
          <div className="container-x">
            <h2 id={`${g.id}-title`} className="display-md" data-reveal="lines">
              {g.label}
            </h2>
            <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((item) => (
                <li key={item.slug}>
                  <CatalogCard item={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <QuoteSection defaultService={kind} />
    </>
  );
}
