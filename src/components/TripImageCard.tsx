import Link from "next/link";
import { Photo } from "./Photo";
import type { CatalogItem } from "@/data/catalog";

/**
 * Card pentru banda de excursii. Cu fotografie: vertical 3:4, titlul și durata peste imagine.
 * Fără fotografie: card tipografic, fără casetă goală. Tot cardul este un link.
 */
export function TripImageCard({ item, sizes = "(min-width: 768px) 22rem, 75vw" }: { item: CatalogItem; sizes?: string }) {
  const label = `${item.kind === "pelerinaj" ? "Pelerinaj" : "Excursie"} · ${item.duration}`;

  if (!item.image) {
    return (
      <Link
        href={item.href}
        className="press group flex h-full min-h-[16rem] flex-col justify-between gap-8 rounded-2xl border border-line bg-white p-7 text-ink transition-[border-color,transform] duration-500 hover:border-night/25"
      >
        <p className="text-sm font-medium text-muted">{label}</p>
        <div className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1">
          {/* Titlu pe cel mult două rânduri, cu înălțime rezervată: toate cardurile aliniate */}
          <h3 className="line-clamp-2 min-h-[2.1em] font-display text-[1.6rem] leading-[1.05] font-semibold tracking-tight">
            {item.title}
          </h3>
          <p className="mt-3 line-clamp-2 min-h-[3.25em] text-sm leading-relaxed text-muted">{item.places.join(" · ")}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={item.href} className="press group relative block overflow-hidden rounded-2xl text-white">
      <Photo src={item.image} alt="" sizes={sizes} radius={16} hoverZoom className="aspect-[3/4]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 rounded-b-2xl bg-gradient-to-t from-night/90 via-night/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1">
        <p className="text-sm font-medium text-white/85">{label}</p>
        <h3 className="mt-2 line-clamp-2 font-display text-2xl leading-tight font-semibold tracking-tight">{item.title}</h3>
      </div>
    </Link>
  );
}
