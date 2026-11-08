import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "../icons";
import { QuoteLink } from "../QuoteLink";
import type { CatalogItem } from "@/data/catalog";

/** Card pentru paginile de listă: imagine 4:3, titlu, durată, locuri vizitate, „Cere ofertă”. */
export function CatalogCard({ item }: { item: CatalogItem }) {
  return (
    <article className="group flex h-full flex-col">
      <Link href={item.href} tabIndex={-1} aria-hidden className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-navy">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
        />
      </Link>
      <p className="mt-5 text-sm font-medium text-muted">
        {item.duration}
        {item.when ? ` · ${item.when}` : ""}
      </p>
      <h3 className="mt-1.5 font-display text-2xl leading-tight font-semibold tracking-tight">
        <Link href={item.href} className="hover:underline hover:underline-offset-4">
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
        <Link href={item.href} className="link-arrow text-sm text-ink" aria-label={`Detalii: ${item.title}`}>
          Detalii <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
