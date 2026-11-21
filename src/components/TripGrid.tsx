import Link from "next/link";
import { ArrowRight } from "./icons";
import { Photo } from "./Photo";
import type { CatalogItem } from "@/data/catalog";

/**
 * Grilă de excursii și pelerinaje despărțite prin linii de 1 px (fără carduri, fără colțuri rotunjite).
 * Fiecare celulă are aceeași structură: eticheta, titlul, locurile, săgeata în același colț.
 * Fotografia (4:3) apare deasupra textului doar dacă fișierul există.
 */
export function TripGrid({
  items,
  columns = 3,
  showKind = true,
}: {
  items: CatalogItem[];
  /** Păstrat pentru compatibilitate: celulele au același fundal pe toate paginile */
  tone?: "light" | "white";
  columns?: 2 | 3;
  /** Pe paginile cu un singur tip, eticheta arată perioada în loc de tip */
  showKind?: boolean;
}) {
  // Pe fundalul off-white, celula se luminează la alb sub cursor
  const cell = "bg-light hover:bg-white";
  return (
    <ul className={`grid border-t border-line sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {items.map((item) => (
        <li
          key={item.href}
          className={`flex border-b border-line sm:[&:nth-child(2n)]:border-l ${
            columns === 3 ? "lg:[&:nth-child(2n)]:border-l-0 lg:[&:not(:nth-child(3n+1))]:border-l" : ""
          }`}
        >
          <Link
            href={item.href}
            className={`group flex w-full flex-col p-6 transition-colors duration-[600ms] ease-[var(--ease-out-expo)] lg:p-8 ${cell}`}
          >
            {item.image && (
              <Photo src={item.image} alt="" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="-mx-6 -mt-6 mb-6 aspect-[4/3] lg:-mx-8 lg:-mt-8 lg:mb-8" />
            )}
            <p className="label text-muted">
              {showKind ? `${item.kind === "pelerinaj" ? "Pelerinaj" : "Excursie"} · ${item.duration}` : [item.duration, item.when].filter(Boolean).join(" · ")}
            </p>
            {/* Săgeata stă lângă titlu (nu singură într-un colț): rândul se citește ca un link */}
            <h3 className="t-32 mt-4 flex items-start justify-between gap-6 font-semibold">
              <span>{item.title}</span>
              <ArrowRight size={20} className="arrow mt-[0.35em] shrink-0" />
            </h3>
            <p className="t-14 mt-2 line-clamp-2 text-muted">
              <span className="sr-only">Locuri vizitate: </span>
              {item.places.join(" · ")}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
