import Link from "next/link";
import { ArtPhoto } from "../ArtPhoto";
import { ArrowRight } from "../icons";
import { Todo } from "./Todo";
import { SHOW_PLACEHOLDERS, type Vehicle } from "@/config/fleet";
import { SPEC_LABEL, specValue, type SpecKey } from "@/lib/fleet-specs";

/** Ce arată cardul: 3 date esențiale. Restul sunt pe fișa tehnică. */
const CARD_SPECS: SpecKey[] = ["seats", "luggage", "comfort"];

/**
 * Cardul unui vehicul pe /flota: fotografia de studio, numele, 3 date esențiale. Tot cardul deschide fișa vehiculului.
 * `wide`: un singur vehicul în flotă, cardul ocupă toată lățimea.
 */
export function VehicleCard({ v, wide }: { v: Vehicle; wide?: boolean }) {
  const href = `/flota/${v.id}`;
  const specs = CARD_SPECS.map((k) => ({ k, label: SPEC_LABEL[k], value: specValue(v, k) })).filter((s) => s.value || SHOW_PLACEHOLDERS);
  const frame = wide ? "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9]" : "aspect-[4/3]";
  const sizes = wide ? "100vw" : "(min-width: 1024px) 50vw, 100vw";

  // Fotografia de studio a vehiculului (aceeași lumină ca pe prima pagină); modelul „din lut” arăta ca o jucărie
  // lângă ea. Fără fotografie de studio: prima fotografie din fișă.
  const p = v.cover ?? v.photos[0];
  const media = (
    <ArtPhoto
      src={p.src}
      mobileSrc={p.mobileSrc}
      alt={p.alt}
      sizes={sizes}
      className={`overflow-hidden rounded-[var(--radius-card)] ${frame}`}
      position="50% 72%"
      grain
    />
  );

  return (
    <article className="group relative" data-vehicle-card>
      {media}
      <div className="grid-12 mt-8 gap-y-8 lg:mt-10">
        <div className="col-span-12 lg:col-span-5">
          <p className="label text-muted">{v.kind}</p>
          <h2 className="t-48 mt-3">
            <Link href={href} className="after:absolute after:inset-0 after:content-['']">
              {v.name}
            </Link>
          </h2>
          <span className="link-arrow t-14 mt-6" aria-hidden>
            <span className="link-u">Fișa tehnică</span> <ArrowRight size={16} />
          </span>
        </div>
        {specs.length > 0 && (
          <dl className="col-span-12 grid gap-y-6 sm:grid-cols-3 sm:gap-x-8 lg:col-span-6 lg:col-start-7 lg:self-end">
            {specs.map((s) => (
              <div key={s.k} className="flex flex-col border-t border-line pt-4">
                <dt className="t-14 mt-2 text-muted">{s.label}</dt>
                <dd className="order-first font-semibold">{s.value ?? <Todo field={s.k} />}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </article>
  );
}
