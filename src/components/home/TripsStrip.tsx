import Link from "next/link";
import { ArrowRight } from "../icons";
import { SnapStrip } from "../SnapStrip";
import { TripImageCard } from "../TripImageCard";
import { featuredItems } from "@/data/catalog";

export function TripsStrip() {
  const items = featuredItems();
  return (
    <section
      className="overflow-hidden bg-light py-[5.5rem] md:py-[8.5rem] lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-16"
      aria-labelledby="excursii-title"
      data-bg="light"
    >
      <div className="container-x flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow text-muted">Excursii și pelerinaje</p>
          <h2 id="excursii-title" className="display-lg mt-6 max-w-3xl" data-reveal="lines">
            Ceahlău, Bicaz, Voroneț.
          </h2>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/excursii" className="link-arrow link-u text-ink">
            Toate excursiile <ArrowRight />
          </Link>
          <Link href="/pelerinaje" className="link-arrow link-u text-ink">
            Toate pelerinajele <ArrowRight />
          </Link>
        </div>
      </div>
      <div className="mt-12 lg:mt-14">
        <SnapStrip label="Excursii și pelerinaje recomandate" tone="light" variant="tall" pinOnDesktop>
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
