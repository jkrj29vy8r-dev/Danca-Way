import Link from "next/link";
import { ArrowRight } from "./icons";
import { Photo } from "./Photo";
import type { CatalogItem } from "@/data/catalog";

/**
 * Grilă de excursii și pelerinaje despărțite prin linii de 1 px (fără carduri, fără colțuri rotunjite).
 * Fiecare celulă are aceeași structură: eticheta, titlul, locurile, săgeata în același colț.
 * Fotografia (4:3) apare deasupra textului doar dacă fișierul există.
 */
export function TripGrid({ items, tone = "light", columns = 3 }: { items: CatalogItem[]; tone?: "light" | "white"; columns?: 2 | 3 }) {
  const cell = tone === "light" ? "bg-light hover:bg-white" : "bg-white hover:bg-light";
  return (
    <ul className={`grid gap-px border-y border-line bg-line sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {items.map((item) => (
        <li key={item.href} className="flex">
          <Link
            href={item.href}
            className={`group flex w-full flex-col p-6 transition-colors duration-[600ms] ease-[var(--ease-out-expo)] lg:p-8 ${cell}`}
          >
            {item.image && (
              <Photo src={item.image} alt="" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="-mx-6 -mt-6 mb-6 aspect-[4/3] lg:-mx-8 lg:-mt-8 lg:mb-8" />
            )}
            <p className="label text-muted">
              {item.kind === "pelerinaj" ? "Pelerinaj" : "Excursie"} · {item.duration}
            </p>
            <h3 className="t-32 mt-4 font-semibold">{item.title}</h3>
            <p className="t-14 mt-2 line-clamp-2 text-muted">
              <span className="sr-only">Locuri vizitate: </span>
              {item.places.join(" · ")}
            </p>
            <span className="mt-auto flex justify-end pt-8">
              <ArrowRight size={20} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
