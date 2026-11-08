import Image from "next/image";
import Link from "next/link";
import type { CatalogItem } from "@/data/catalog";

/** Card vertical (3:4) cu fotografie; titlul și durata stau peste imagine. Tot cardul e un link. */
export function TripImageCard({ item, sizes = "(min-width: 768px) 22rem, 75vw" }: { item: CatalogItem; sizes?: string }) {
  return (
    <Link
      href={item.href}
      className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-navy text-white"
    >
      <Image
        src={item.image}
        alt=""
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-night/90 via-night/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-sm font-medium text-white/85">
          {item.kind === "pelerinaj" ? "Pelerinaj" : "Excursie"} · {item.duration}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight font-semibold tracking-tight">{item.title}</h3>
      </div>
    </Link>
  );
}
