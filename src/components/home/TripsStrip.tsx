import Link from "next/link";
import { ArrowRight } from "../icons";
import { SnapStrip } from "../SnapStrip";
import { TripImageCard } from "../TripImageCard";
import { featuredItems } from "@/data/catalog";

export function TripsStrip() {
  const items = featuredItems();
  return (
    <section className="section-y overflow-hidden bg-light" aria-labelledby="excursii-title" data-surface="light">
      <div className="container-x flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow text-muted">Excursii și pelerinaje</p>
          <h2 id="excursii-title" className="display-lg mt-6 max-w-3xl">
            Voroneț, Prislop,
            <br />
            Budapesta.
          </h2>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/excursii" className="link-arrow text-ink">
            Toate excursiile <ArrowRight />
          </Link>
          <Link href="/pelerinaje" className="link-arrow text-ink">
            Toate pelerinajele <ArrowRight />
          </Link>
        </div>
      </div>
      <div className="mt-12">
        <SnapStrip label="Excursii și pelerinaje recomandate" tone="light" variant="tall">
          {items.map((t) => (
            <li key={t.href}>
              <TripImageCard item={t} />
            </li>
          ))}
        </SnapStrip>
      </div>
    </section>
  );
}
