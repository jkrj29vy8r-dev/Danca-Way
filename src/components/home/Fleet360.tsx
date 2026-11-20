import Link from "next/link";
import { ArrowRight } from "../icons";
import { Viewer360 } from "../Viewer360";
import { FleetTeaser } from "./FleetTeaser";
import { coach, SHOW_PLACEHOLDERS } from "@/config/fleet";
import { view360 } from "@/lib/view360";

/**
 * „Autocarul tău, din toate unghiurile”: vederea 360° a autocarului, cu punctele de pe caroserie.
 * Până există cadrele (public/360/<id>/), pagina principală arată cardul Flota cu fotografia.
 */
export function Fleet360() {
  const v = view360(coach);
  if (!v) return <FleetTeaser />;
  return (
    <section className="section-y bg-night text-white" data-bg="night" aria-labelledby="v360-title">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
          <h2 id="v360-title" className="t-48 max-w-[18ch]" data-reveal="lines">
            Autocarul tău, din toate unghiurile.
          </h2>
          <Link href={`/flota/${coach.id}`} className="link-arrow t-14 shrink-0">
            <span className="link-u">Fișa tehnică {coach.name}</span> <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[96rem] lg:mt-16">
        <Viewer360 base={v.base} count={v.count} ratio={v.ratio} hotspots={v.hotspots} label={`${coach.name}, vedere 360°`} showTodo={SHOW_PLACEHOLDERS} />
      </div>
    </section>
  );
}
