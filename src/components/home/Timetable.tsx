"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { FlapText } from "../FlapText";
import { RouteMap } from "../RouteMap";
import { ArrowRight, ArrowUpRight, ChevronDown } from "../icons";
import { site } from "@/config/site";
import {
  cities,
  cityName,
  directionFor,
  directions,
  formatDuration,
  routes,
  routeTrip,
  stopName,
  TIMETABLE_DISCLAIMER,
  tripsBetween,
  type CityId,
  type Direction,
  type Trip,
} from "@/data/routes";
import { FILTER_EVENT, readFilter, setFilter, type RouteFilter } from "@/lib/route-filter";
import { flipDigits } from "@/lib/flap";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";
import { useBucharestMinutes } from "@/lib/use-next-departure";

/* Filtrul din URL, citit fără nepotriviri la hidratare */
const subscribe = (cb: () => void) => {
  window.addEventListener(FILTER_EVENT, cb);
  window.addEventListener("popstate", cb);
  return () => {
    window.removeEventListener(FILTER_EVENT, cb);
    window.removeEventListener("popstate", cb);
  };
};
const snapshot = () => {
  const f = readFilter();
  return f ? `${f.from}|${f.to}` : "";
};
const parse = (s: string): RouteFilter => (s ? { from: s.split("|")[0] as CityId, to: s.split("|")[1] as CityId } : null);

/**
 * Orarul, ca o tabelă de plecări: ora, traseul și prețul se citesc în trei secunde; codul cursei, vehiculul,
 * sosirea și durata stau pe un rând discret dedesubt. Harta din dreapta (singurul accent galben al secțiunii)
 * arată linia direcției alese și segmentul rândului de sub cursor.
 * `full`: pe pagina Curse regulate (fără linkul spre orarul complet).
 */
export function Timetable({ full = false }: { full?: boolean } = {}) {
  const uid = useId();
  const filter = parse(useSyncExternalStore(subscribe, snapshot, () => ""));
  const [tabState, setTabState] = useState<Direction>("spre-bucuresti");
  const tab: Direction = filter ? directionFor(filter.from, filter.to) : tabState;
  const [hover, setHover] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const now = useBucharestMinutes();
  const listRef = useRef<HTMLUListElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Rândurile: perechea căutată sau toate cursele din tab.
  const rows: Trip[] = useMemo(
    () => (filter ? tripsBetween(filter.from, filter.to) : routes.filter((r) => r.direction === tab).map(routeTrip)),
    [filter, tab],
  );
  // Primul rând care n-a plecat încă (ora României) primește eticheta „următoarea”.
  const nextKey = useMemo(() => {
    if (now === null) return null;
    const t = rows.find((r) => r.depMin > now) ?? rows[0];
    return t ? t.route.code + t.dep.time : null;
  }, [rows, now]);

  // La schimbarea tab-ului sau a perechii, orele se întorc ca pe o tabelă de plecări.
  const firstRender = useRef(true);
  const rowsKey = rows.map((r) => r.route.code + r.dep.time).join(",");
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = listRef.current;
    if (!el || prefersReducedMotion()) return;
    loadGsap().then(({ gsap }) => el.querySelectorAll("[data-flap]").forEach((f) => flipDigits(gsap, f)));
  }, [rowsKey]);

  // Segmentul de pe hartă: rândul de sub cursor / deschis, altfel perechea căutată.
  const focusCode = hover ?? open;
  const highlight = useMemo(() => {
    const trip = rows.find((r) => r.route.code === focusCode) ?? (filter ? rows[0] : undefined);
    if (!trip) return null;
    const path = trip.route.mapPath;
    const a = path.indexOf(trip.dep.city);
    const b = path.indexOf(trip.arr.city);
    const slice = a >= 0 && b >= 0 && b > a ? path.slice(a, b + 1) : path;
    return { line: trip.route.line, path: slice };
  }, [rows, focusCode, filter]);

  const chooseTab = (d: Direction) => {
    setFilter(null);
    setTabState(d);
    setOpen(null);
  };

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const n = directions.length;
    const go = (j: number) => {
      chooseTab(directions[j].id);
      tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[j]?.focus();
    };
    if (e.key === "ArrowRight") go((i + 1) % n);
    else if (e.key === "ArrowLeft") go((i - 1 + n) % n);
  };

  const activeIndex = directions.findIndex((d) => d.id === tab);

  return (
    <section id="curse" className="section-y scroll-mt-16 bg-night text-white" aria-labelledby="curse-title" data-bg="night">
      <div className="container-x">
        {/* Titlul la stânga, un singur link discret la dreapta, pe aceeași linie */}
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
          <h2 id="curse-title" className="t-48 max-w-[22ch]">
            Opt curse, trei direcții. <span className="text-mist">Același preț pe toate cursele dintre două orașe.</span>
          </h2>
          {!full && (
            <Link href="/curse-regulate" className="link-arrow t-14 shrink-0 text-white">
              <span className="link-u">Toate opririle și tarifele</span> <ArrowRight size={16} />
            </Link>
          )}
        </div>

        <div className="grid-12 mt-16 gap-y-16 lg:mt-24">
          <div id="plecari" className="col-span-12 scroll-mt-32 lg:col-span-7">
            {/* Direcția: control segmentat */}
            <div ref={tabsRef} role="tablist" aria-label="Direcția" className="relative grid grid-cols-3 rounded-full border border-line-dark p-1">
              <span
                aria-hidden
                className="absolute inset-y-1 left-1 rounded-full bg-white transition-transform duration-[800ms] ease-[var(--ease-out-expo)]"
                style={{ width: `calc((100% - 0.5rem) / ${directions.length})`, transform: `translateX(${activeIndex * 100}%)` }}
              />
              {directions.map((d, i) => (
                <button
                  key={d.id}
                  id={`${uid}-tab-${d.id}`}
                  role="tab"
                  type="button"
                  aria-selected={tab === d.id}
                  aria-controls={`${uid}-panel`}
                  tabIndex={tab === d.id ? 0 : -1}
                  onClick={() => chooseTab(d.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`press t-14 relative z-10 min-h-10 rounded-full px-2 font-semibold whitespace-nowrap transition-colors duration-[600ms] ease-[var(--ease-out-expo)] ${
                    tab === d.id ? "text-night" : "text-mist hover:text-white"
                  }`}
                >
                  <span className="sm:hidden">{d.short}</span>
                  <span className="hidden sm:inline">{d.label}</span>
                </button>
              ))}
            </div>

            <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${tab}`} className="mt-8">
              {filter && (
                <div className="t-14 mb-4 flex flex-wrap items-center gap-4">
                  <span className="text-mist">
                    {rows.length} {rows.length === 1 ? "cursă" : "curse"} {cityName(filter.from)} → {cityName(filter.to)}
                  </span>
                  <button type="button" onClick={() => setFilter(null)} className="press link-u font-semibold text-white">
                    Arată toate cursele
                  </button>
                </div>
              )}

              {/* Capul tabelului */}
              <div aria-hidden className="label grid grid-cols-[5rem_1fr_auto] gap-x-4 pb-4 text-mist sm:grid-cols-[7rem_1fr_6rem_1.5rem] sm:gap-x-6">
                <span>Plecare</span>
                <span>Traseu</span>
                <span className="text-right">Preț</span>
              </div>
              <ul ref={listRef} className="border-y border-line-dark">
                {rows.map((t) => {
                  const code = t.route.code;
                  const key = code + t.dep.time;
                  const isOpen = open === code;
                  return (
                    <li
                      key={key}
                      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(code)}
                      onPointerLeave={() => setHover(null)}
                      className={`border-t border-line-dark first:border-t-0 transition-colors duration-[600ms] ease-[var(--ease-out-expo)] ${
                        focusCode === code ? "bg-white/[0.04]" : ""
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`${uid}-stops-${code}`}
                        onClick={() => setOpen(isOpen ? null : code)}
                        onFocus={() => setHover(code)}
                        onBlur={() => setHover(null)}
                        className="press grid w-full grid-cols-[5rem_1fr_auto] items-baseline gap-x-4 py-6 text-left sm:grid-cols-[7rem_1fr_6rem_1.5rem] sm:gap-x-6"
                      >
                        <span className="t-32 font-mono tabular-nums">
                          <FlapText value={t.dep.time} />
                        </span>
                        <span className="min-w-0">
                          <span className="t-21 block font-semibold">
                            {stopName(t.dep)} → {stopName(t.arr)}
                          </span>
                          <span className="t-14 mt-2 block text-mist">
                            {key === nextKey && <span className="label mr-2 text-white">Următoarea</span>}
                            <span className="font-mono">{code}</span> · sosire <span className="font-mono">{t.arr.time}</span>
                            <span className="hidden sm:inline">
                              {" "}
                              · {t.route.vehicle} · {formatDuration(t.arrMin - t.depMin)}
                            </span>
                          </span>
                        </span>
                        <span className="t-21 text-right font-mono tabular-nums">{t.price ? `${t.price} lei` : "—"}</span>
                        <ChevronDown
                          className={`hidden self-center text-mist transition-transform duration-[600ms] ease-[var(--ease-out-expo)] sm:block ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <div id={`${uid}-stops-${code}`} hidden={!isOpen} className="pb-8 sm:pl-[8.5rem]">
                        {isOpen && (
                          <ol className="relative">
                            <span aria-hidden className="absolute top-[18px] bottom-[18px] left-[3.5px] w-px bg-line-dark" />
                            {t.route.stops.map((s) => {
                              const inTrip = s === t.dep || s === t.arr;
                              return (
                                <li key={s.city + s.time} className={`t-14 relative grid grid-cols-[8px_3.5rem_1fr] items-baseline gap-x-4 py-2 ${inTrip ? "text-white" : "text-mist"}`}>
                                  <span aria-hidden className={`size-2 self-center rounded-full border ${inTrip ? "border-white bg-white" : "border-line-dark-strong bg-night"}`} />
                                  <span className="font-mono tabular-nums">{s.time}</span>
                                  <span>
                                    <span className={inTrip ? "font-semibold" : ""}>{cities[s.city].name}</span> · {s.station}
                                  </span>
                                </li>
                              );
                            })}
                          </ol>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="t-14 mt-6 text-mist">
                {TIMETABLE_DISCLAIMER}. Prețurile sunt pentru biletul întreg. Cursele circulă zilnic, după orarul publicat de operator.
              </p>
              <div className="mt-8 flex flex-col gap-2 sm:flex-row">
                <a href={site.ticketsUrl} target="_blank" rel="noopener" className="btn btn-lg btn-light">
                  Cumpără bilet online <ArrowUpRight />
                </a>
                {full && (
                  <a href="#opriri" className="btn btn-lg btn-line-light">
                    Toate opririle și tarifele <ArrowRight />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Harta */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="mx-auto max-w-[20rem] lg:sticky lg:top-32 lg:max-w-none">
              <RouteMap activeLine={tab === "litoral" ? "constanta" : "bucuresti"} highlight={highlight} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
