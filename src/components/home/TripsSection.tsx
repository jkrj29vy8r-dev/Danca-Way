import Link from "next/link";
import { ArrowRight } from "../icons";
import { TripGrid } from "../TripGrid";
import { featuredItems } from "@/data/catalog";

export function TripsSection() {
  const items = featuredItems().slice(0, 6);
  return (
    <section className="section-y bg-light" aria-labelledby="excursii-title" data-bg="light">
      <div className="container-x">
        {/* Titlul la stânga, linkurile la dreapta, pe aceeași linie */}
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
          <h2 id="excursii-title" className="t-48 max-w-[22ch]" data-reveal="lines">
            Ceahlău, Bicaz, Voroneț. <span className="text-muted">Excursii și pelerinaje de una până la cinci zile.</span>
          </h2>
          <div className="t-14 flex shrink-0 gap-8">
            <Link href="/excursii" className="link-arrow text-ink">
              <span className="link-u">Toate excursiile</span> <ArrowRight size={16} />
            </Link>
            <Link href="/pelerinaje" className="link-arrow text-ink">
              <span className="link-u">Toate pelerinajele</span> <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="mt-16 lg:mt-24">
          <TripGrid items={items} />
        </div>
      </div>
    </section>
  );
}
