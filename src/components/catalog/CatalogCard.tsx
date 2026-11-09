import Link from "next/link";
import { ArrowRight } from "../icons";
import { Photo } from "../Photo";
import { QuoteLink } from "../QuoteLink";
import type { CatalogItem } from "@/data/catalog";

/**
 * Card pentru paginile de listă: titlu, durată, locuri vizitate, „Cere ofertă”.
 * Imaginea 4:3 apare doar dacă fotografia există.
 */
export function CatalogCard({ item }: { item: CatalogItem }) {
  return (
    <article className={`group flex h-full flex-col ${item.image ? "" : "rounded-2xl border border-line bg-white p-7"}`}>
      {item.image && (
        <Link href={item.href} tabIndex={-1} aria-hidden className="mb-5 block">
          <Photo
            src={item.image}
            alt=""
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="aspect-[4/3]"
          />
        </Link>
      )}
      <p className="text-sm font-medium text-muted">
        {item.duration}
        {item.when ? ` · ${item.when}` : ""}
      </p>
      <h3 className="mt-1.5 font-display text-2xl leading-tight font-semibold tracking-tight transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1">
        <Link href={item.href} className="link-u">
          {item.title}
        </Link>
      </h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
        <span className="sr-only">Locuri vizitate: </span>
        {item.places.join(" · ")}
      </p>
      <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-6">
        <QuoteLink service={item.kind} subject={item.title} className="btn btn-dark min-h-11 px-5 text-sm" aria-label={`Cere ofertă: ${item.title}`}>
          Cere ofertă <ArrowRight size={16} />
        </QuoteLink>
        <Link href={item.href} className="link-arrow link-u text-sm text-ink" aria-label={`Detalii: ${item.title}`}>
          Detalii <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
