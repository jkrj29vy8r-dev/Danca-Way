"use client";

import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { CitySelect } from "../CitySelect";
import { FlapText } from "../FlapText";
import { RouteMap } from "../RouteMap";
import { ArrowRight, ArrowUpRight, ChevronDown } from "../icons";
import { site } from "@/config/site";
import {
  cities,
  cityName,
  destinationsFrom,
  directionFor,
  directions,
  FINDER_CITIES,
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
import { bucharestNow, formatCountdown } from "@/lib/bucharest-time";
import { FILTER_EVENT, readFilter, setFilter, type RouteFilter } from "@/lib/route-filter";
import { flipDigits } from "@/lib/flap";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

/** Perechea implicită pentru „Următoarea plecare”, pe fiecare tab. */
const DEFAULT_PAIR: Record<Direction, { from: CityId; to: CityId }> = {
  "spre-bucuresti": { from: "roman", to: "bucuresti" },
  "spre-moldova": { from: "bucuresti", to: "roman" },
  litoral: { from: "roman", to: "constanta" },
};

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

/** Ora României, actualizată la fiecare minut întreg (doar în browser). */
function useBucharestMinutes() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const { minutes, seconds } = bucharestNow();
      setNow(minutes);
      timer = setTimeout(tick, (60 - seconds) * 1000 + 50);
    };
    timer = setTimeout(tick, 0);
    return () => clearTimeout(timer);
  }, []);
  return now;
}

/** Cifrele care se schimbă se întorc (animație CSS doar pe transform). */
function FlipString({ value }: { value: string }) {
  return (
    <span aria-hidden className="inline-flex">
      {Array.from(value).map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={`${i}-${ch}`} className="flip-in inline-block tabular-nums">
            {ch}
          </span>
        ) : (
          <span key={`${i}-${ch}`} className="whitespace-pre">
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

/** `full`: pe pagina Curse regulate (fără linkul „Orarul complet”). */
export function Timetable({ full = false }: { full?: boolean } = {}) {
  const uid = useId();
  const filter = parse(useSyncExternalStore(subscribe, snapshot, () => ""));
  const [tabState, setTabState] = useState<Direction>("spre-bucuresti");
  const tab: Direction = filter ? directionFor(filter.from, filter.to) : tabState;
  const pair = filter ?? DEFAULT_PAIR[tab];
  const [hover, setHover] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const now = useBucharestMinutes();
  const listRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Rândurile: perechea căutată sau toate cursele din tab.
  const rows: Trip[] = useMemo(
    () => (filter ? tripsBetween(filter.from, filter.to) : routes.filter((r) => r.direction === tab).map(routeTrip)),
    [filter, tab],
  );

  // Următoarea plecare pentru perechea selectată, în ora României.
  const next = useMemo(() => {
    if (now === null) return null;
    const trips = tripsBetween(pair.from, pair.to);
    if (!trips.length) return null;
    const today = trips.find((t) => t.depMin > now);
    if (today) return { trip: today, day: "azi", wait: today.depMin - now };
    const t = trips[0];
    return { trip: t, day: "mâine", wait: 24 * 60 - now + t.depMin };
  }, [now, pair.from, pair.to]);

  // La schimbarea tab-ului sau a perechii, orele din tabel se întorc ca pe o tabelă de plecări.
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

  const changeFrom = (v: CityId) => {
    const dests = destinationsFrom(v);
    setFilter({ from: v, to: dests.includes(pair.to) ? pair.to : dests[0] });
  };

  const activeIndex = directions.findIndex((d) => d.id === tab);

  return (
    <section
      id="curse"
      className="section-y scroll-mt-16 bg-navy text-white"
      aria-labelledby="curse-title"
      data-bg="navy"
    >
      <div className="container-x grid gap-x-10 gap-y-10 lg:grid-cols-12">
        {/* Titlu */}
        <div className="lg:col-span-7 lg:row-start-1">
          <p className="eyebrow text-mist">Curse regulate</p>
          <h2 id="curse-title" className="display-lg mt-6" data-reveal="lines">
            Opt curse, trei direcții.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-mist">
            Trei curse pleacă din Neamț spre București Obor, trei se întorc de la Obor spre Neamț și Roman, iar
            două leagă Roman de Constanța Autogara Sud.
          </p>
        </div>

        {/* Tab-uri + următoarea plecare (ținta butonului „Vezi plecările” din hero) */}
        <div id="plecari" className="scroll-mt-24 lg:col-span-7 lg:row-start-2">
          <div ref={tabsRef} role="tablist" aria-label="Direcția" className="relative flex gap-1 rounded-full bg-white/[0.06] p-1">
            <span
              aria-hidden
              className="absolute inset-y-1 left-1 rounded-full bg-white transition-transform duration-700 ease-[var(--ease-out-expo)]"
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
                className={`press relative z-10 min-h-11 flex-1 rounded-full px-1.5 text-[0.8rem] font-semibold whitespace-nowrap transition-colors duration-500 sm:px-2 sm:text-[0.95rem] ${
                  tab === d.id ? "text-night" : "text-white/75 hover:text-white"
                }`}
              >
                <span className="sm:hidden">{d.short}</span>
                <span className="hidden sm:inline">{d.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-night/40 p-5 md:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <p className="eyebrow text-accent">Următoarea plecare</p>
              <p className="text-xs text-mist">Ora României</p>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <CitySelect
                id={`${uid}-din`}
                name="din"
                label="Din"
                value={pair.from}
                options={FINDER_CITIES}
                onChange={changeFrom}
              />
              <CitySelect
                id={`${uid}-spre`}
                name="spre"
                label="Spre"
                value={pair.to}
                options={destinationsFrom(pair.from)}
                onChange={(v) => setFilter({ from: pair.from, to: v })}
              />
            </div>
            <div className="mt-5 min-h-[4.75rem]" aria-live="polite">
              {next ? (
                <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
                  <p className="font-mono text-5xl leading-none font-semibold tracking-tight tabular-nums">
                    {next.trip.dep.time}
                  </p>
                  <div className="pb-0.5">
                    <p className="font-semibold">
                      {cityName(pair.from)} → {stopName(next.trip.arr)} · {next.day} la {next.trip.dep.time}
                    </p>
                    <p className="text-sm text-mist">
                      <span className="sr-only">Pleacă în {formatCountdown(next.wait)}.</span>
                      <span aria-hidden>
                        în <FlipString value={formatCountdown(next.wait)} />
                      </span>
                      {" · "}
                      {next.trip.route.code} · {next.trip.route.vehicle}
                      {next.trip.price ? ` · ${next.trip.price} lei` : ""}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-mist">Se calculează ora următoarei plecări…</p>
              )}
            </div>
          </div>
        </div>

        {/* Harta */}
        <div className="lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1">
          <div className="mx-auto max-w-[19rem] lg:sticky lg:top-28 lg:max-w-sm">
            <RouteMap activeLine={tab === "litoral" ? "constanta" : "bucuresti"} highlight={highlight} />
          </div>
        </div>

        {/* Orarul */}
        <div
          ref={listRef}
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${tab}`}
          className="lg:col-span-7 lg:row-start-3"
        >
          {filter && (
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
              <span className="text-mist">
                {rows.length} {rows.length === 1 ? "cursă" : "curse"} {cityName(filter.from)} → {cityName(filter.to)}
              </span>
              <button type="button" onClick={() => setFilter(null)} className="press link-u font-semibold text-white">
                Arată toate cursele
              </button>
            </div>
          )}
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {rows.map((t) => {
              const code = t.route.code;
              const isOpen = open === code;
              return (
                <li
                  key={code + t.dep.time}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setHover(code)}
                  onPointerLeave={() => setHover(null)}
                  className={`transition-colors duration-300 ${focusCode === code ? "bg-white/[0.04]" : ""}`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-stops-${code}`}
                    onClick={() => setOpen(isOpen ? null : code)}
                    onFocus={() => setHover(code)}
                    onBlur={() => setHover(null)}
                    className="press grid w-full grid-cols-[4.75rem_1fr] items-start gap-x-4 gap-y-1 px-1 py-4 text-left sm:grid-cols-[6rem_1fr_auto_auto] sm:items-center"
                  >
                    <span className="font-mono text-xl font-semibold sm:text-2xl">
                      <FlapText value={t.dep.time} />
                    </span>
                    <span className="min-w-0">
                      {/* Numele nu se trunchiază: pe mobil textul trece pe rândul următor */}
                      <span className="block font-medium">
                        {stopName(t.dep)} → {stopName(t.arr)}
                      </span>
                      <span className="block text-sm text-mist">
                        {code} · {t.route.vehicle} · sosire {t.arr.time} · {formatDuration(t.arrMin - t.depMin)}
                        {t.price ? <span className="font-mono text-white sm:hidden"> · {t.price} lei</span> : null}
                      </span>
                    </span>
                    <span className="hidden text-right font-mono text-sm font-medium whitespace-nowrap sm:block">
                      {t.price ? `${t.price} lei` : ""}
                    </span>
                    <ChevronDown
                      className={`hidden text-white/50 transition-transform duration-500 ease-[var(--ease-out-expo)] sm:block ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div id={`${uid}-stops-${code}`} hidden={!isOpen} className="pb-5 pl-1 sm:pl-[7rem]">
                    {isOpen && (
                    <ol className="grid gap-x-8 gap-y-1.5 text-sm sm:grid-cols-2">
                      {t.route.stops.map((s) => {
                        const inTrip = s === t.dep || s === t.arr;
                        return (
                          <li key={s.city + s.time} className={inTrip ? "text-white" : "text-mist"}>
                            <span className="inline-block w-12 font-mono tabular-nums">{s.time}</span>
                            <span className={inTrip ? "font-semibold" : ""}>{cities[s.city].name}</span>
                            <span className="text-white/45"> · {s.station}</span>
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
          <p className="mt-6 text-sm text-mist">
            {TIMETABLE_DISCLAIMER}. Prețurile sunt pentru biletul întreg. Cursele circulă zilnic, conform orarului
            publicat de operator.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={site.ticketsUrl} target="_blank" rel="noopener" className="btn btn-primary">
              Cumpără bilet online <ArrowUpRight />
            </a>
            {full ? (
              <a href="#opriri" className="btn btn-ghost-light">
                Toate opririle și tarifele <ArrowRight />
              </a>
            ) : (
              <a href="/curse-regulate" className="btn btn-ghost-light">
                Orarul complet <ArrowRight />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
