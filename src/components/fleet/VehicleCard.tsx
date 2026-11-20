import { getImageProps } from "next/image";
import Link from "next/link";
import { ArtPhoto } from "../ArtPhoto";
import { ArrowRight } from "../icons";
import { Todo } from "./Todo";
import { VehicleModel } from "./VehicleModel";
import { SHOW_PLACEHOLDERS, type Vehicle } from "@/config/fleet";
import { sizeOf } from "@/data/images";
import { SPEC_LABEL, specValue, type SpecKey } from "@/lib/fleet-specs";

/** Ce arată cardul: 3 date esențiale. Restul sunt pe fișa tehnică. */
const CARD_SPECS: SpecKey[] = ["seats", "luggage", "comfort"];

/**
 * Cardul unui vehicul pe /flota: modelul 3D (sau fotografia, dacă vehiculul nu are model), numele, 3 date esențiale.
 * Tot cardul deschide fișa vehiculului; pe model, doar o atingere scurtă (tragerea îl rotește).
 * `wide`: un singur vehicul în flotă, cardul ocupă toată lățimea.
 */
export function VehicleCard({ v, wide }: { v: Vehicle; wide?: boolean }) {
  const href = `/flota/${v.id}`;
  const specs = CARD_SPECS.map((k) => ({ k, label: SPEC_LABEL[k], value: specValue(v, k) })).filter((s) => s.value || SHOW_PLACEHOLDERS);
  const frame = wide ? "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9]" : "aspect-[4/3]";
  const sizes = wide ? "100vw" : "(min-width: 1024px) 50vw, 100vw";

  let media: React.ReactNode;
  if (v.model3d) {
    const poster = getImageProps({ src: v.model3d.poster, ...sizeOf(v.model3d.poster), alt: "", sizes, quality: 80 }).props;
    media = (
      <VehicleModel glb={v.model3d.glb} orbit={v.model3d.orbit} scale={v.model3d.scale} alt={`Modelul 3D al vehiculului ${v.name}. Trage pentru a-l roti.`} href={href} className={`bg-light ${frame}`}>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- srcset din getImageProps; decorativă, numele e în link */}
        <img {...poster} className="size-full object-contain px-[8%] py-[6%]" />
      </VehicleModel>
    );
  } else {
    const p = v.photos[0];
    media = <ArtPhoto src={p.src} mobileSrc={p.mobileSrc} alt={p.alt} sizes={sizes} className={frame} />;
  }

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
