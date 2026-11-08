import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "../icons";
import { RouteMap } from "../RouteMap";
import { site } from "@/config/site";
import {
  directions,
  firstStop,
  formatPrice,
  lastStop,
  routes,
  stopName,
  TIMETABLE_DISCLAIMER,
} from "@/data/routes";

export function RoutesPreview() {
  return (
    <section className="section-y bg-navy text-white" aria-labelledby="curse-title" data-surface="dark">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow text-mist">Curse regulate</p>
          <h2 id="curse-title" className="display-lg mt-6">
            Șapte curse,
            <br />
            trei direcții.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-mist">
            Două curse pleacă din Târgu Neamț spre București Obor, trei se întorc de la Obor spre Neamț și
            Roman, iar două leagă Roman de Constanța Autogara Sud.
          </p>

          <div className="mt-12 space-y-10">
            {directions.map((dir) => (
              <div key={dir.id}>
                <h3 className="eyebrow text-accent">{dir.label}</h3>
                <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                  {routes
                    .filter((r) => r.direction === dir.id)
                    .map((r) => {
                      const from = firstStop(r);
                      const to = lastStop(r);
                      return (
                        <li key={r.code} className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 py-4">
                          <span className="font-display text-2xl font-semibold tabular-nums">{from.time}</span>
                          <span className="min-w-0">
                            <span className="block truncate font-medium">
                              {stopName(from)} → {stopName(to)}
                            </span>
                            <span className="block text-sm text-mist">
                              {r.code} · {r.vehicle}
                              {to.time ? ` · sosire ${to.time}` : ""}
                            </span>
                          </span>
                          <span className="text-right text-sm font-medium whitespace-nowrap">{formatPrice(r.price)}</span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-mist">{TIMETABLE_DISCLAIMER}.</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/curse-regulate" className="btn btn-light">
              Vezi orarul complet <ArrowRight />
            </Link>
            <a href={site.ticketsUrl} target="_blank" rel="noopener" className="btn btn-ghost-light">
              Cumpără bilet online <ArrowUpRight />
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="mx-auto max-w-sm lg:sticky lg:top-28">
            <RouteMap
              path={routes[0].mapPath}
              title="Harta traseului Târgu Neamț – Piatra Neamț – Roman – Bacău – Focșani – Buzău – București"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
