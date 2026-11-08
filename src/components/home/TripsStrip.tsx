import Link from "next/link";
import { ArrowRight } from "../icons";
import { SnapStrip } from "../SnapStrip";
import { TripCard } from "../TripCard";
import { trips } from "@/data/trips";
import { pilgrimages } from "@/data/pilgrimages";

export function TripsStrip() {
  const items = [
    ...pilgrimages.filter((p) => p.featured).map((p) => ({ ...p, service: "pelerinaj" as const, meta: p.date })),
    ...trips.filter((t) => t.featured).map((t) => ({ ...t, service: "excursie" as const, meta: t.season })),
  ];
  // Alternăm pelerinajele cu excursiile pentru varietate.
  const pil = items.filter((i) => i.service === "pelerinaj");
  const exc = items.filter((i) => i.service === "excursie");
  const mixed = Array.from({ length: Math.max(pil.length, exc.length) }).flatMap((_, i) =>
    [exc[i], pil[i]].filter(Boolean),
  );

  return (
    <section className="section-y overflow-hidden bg-night text-white" aria-labelledby="excursii-title">
      <div className="container-x flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow text-mist">Excursii și pelerinaje</p>
          <h2 id="excursii-title" className="display-lg mt-6 max-w-3xl">
            Locuri care
            <br />
            merită drumul.
          </h2>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/excursii" className="link-arrow text-white hover:text-accent">
            Toate excursiile <ArrowRight />
          </Link>
          <Link href="/pelerinaje" className="link-arrow text-white hover:text-accent">
            Toate pelerinajele <ArrowRight />
          </Link>
        </div>
      </div>
      <div className="mt-12">
        <SnapStrip label="Excursii și pelerinaje recomandate">
          {mixed.map((t) => (
            <li key={t.slug}>
              <TripCard
                title={t.title}
                duration={t.duration}
                places={t.places}
                description={t.description}
                meta={t.meta}
                service={t.service}
              />
            </li>
          ))}
        </SnapStrip>
      </div>
    </section>
  );
}
