"use client";

import Link from "next/link";
import { useMemo } from "react";
import { RollingDigits } from "../RollingDigits";
import { ArrowRight } from "../icons";
import { routes, routeTrip, stopName, TIMETABLE_DISCLAIMER, type Trip } from "@/data/routes";
import { useBucharestClock } from "@/lib/use-next-departure";

const DAY = 24 * 3600;
const pad = (n: number) => String(n).padStart(2, "0");

type Row = { trip: Trip; wait: number | null; tomorrow: boolean };

/** Următoarele `n` plecări din orar (capetele curselor), față de ora României în secunde. */
function nextDepartures(now: number | null, n = 3): Row[] {
  const trips = routes.map(routeTrip);
  if (now === null) return [...trips].sort((a, b) => a.depMin - b.depMin).slice(0, n).map((trip) => ({ trip, wait: null, tomorrow: false }));
  return trips
    .map((trip) => {
      let wait = trip.depMin * 60 - now;
      const tomorrow = wait <= 0;
      if (tomorrow) wait += DAY;
      return { trip, wait, tomorrow };
    })
    .sort((a, b) => a.wait! - b.wait!)
    .slice(0, n);
}

/** „2 h 14 min 05 s”: ca text pentru cititoarele de ecran și ca cifre care se rotesc. */
function parts(wait: number) {
  const h = Math.floor(wait / 3600);
  const m = Math.floor((wait % 3600) / 60);
  const s = wait % 60;
  return { h, m, s };
}

/**
 * Tabela de plecări: următoarele trei curse din orarul publicat (src/data/routes.ts), cu timpul rămas până la
 * plecare, la fiecare secundă; cifrele se rotesc discret când se schimbă. E marcată „după orar”: nu e o poziție
 * în timp real a autocarelor (nu avem așa ceva și nu o simulăm).
 */
export function Departures() {
  const now = useBucharestClock();
  const rows = useMemo(() => nextDepartures(now), [now]);

  return (
    <section className="section-y bg-night text-white" aria-labelledby="plecari-titlu" data-bg="night">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
          <div>
            <p className="label flex items-center gap-2 text-mist">
              <span className="live-dot" aria-hidden />
              După orar · ora României
            </p>
            <h2 id="plecari-titlu" className="t-48 mt-4" data-reveal="lines">
              Următoarele plecări.
            </h2>
          </div>
          <Link href="#curse" className="link-arrow t-14 shrink-0 text-white">
            <span className="link-u">Vezi orarul</span> <ArrowRight size={16} />
          </Link>
        </div>

        <ol className="board mt-12 lg:mt-16" aria-live="off">
          {rows.map(({ trip, wait, tomorrow }, i) => {
            const p = wait === null ? null : parts(wait);
            const spoken = p ? `pleacă în ${p.h ? `${p.h} ore ` : ""}${p.m} minute` : "";
            return (
              <li key={i} className="board-row">
                <span className="board-time">{trip.dep.time}</span>
                <span className="min-w-0">
                  <span className="t-21 block font-semibold">
                    {stopName(trip.dep)} → {stopName(trip.arr)}
                  </span>
                  <span className="t-14 mt-1 block text-mist">
                    {trip.route.code} · {trip.route.vehicle} · {tomorrow ? "mâine" : "azi"}
                  </span>
                </span>
                <span className="board-wait">
                  {p ? (
                    <>
                      {/* Vizual: cifre care se rotesc; pentru cititoarele de ecran, o frază simplă (fără secunde) */}
                      <span aria-hidden>
                        <span className="text-mist">pleacă în </span>
                        {p.h > 0 && (
                          <>
                            <RollingDigits value={String(p.h)} /> h{" "}
                          </>
                        )}
                        <RollingDigits value={pad(p.m)} /> min{" "}
                        <span className="text-mist">
                          <RollingDigits value={pad(p.s)} /> s
                        </span>
                      </span>
                      <span className="sr-only">{spoken}</span>
                    </>
                  ) : (
                    <span className="text-mist">—</span>
                  )}
                </span>
                <span className="board-price">{trip.price ? `${trip.price} lei` : ""}</span>
              </li>
            );
          })}
        </ol>
        <p className="t-14 mt-6 text-mist">
          {TIMETABLE_DISCLAIMER}. Orele sunt cele din orar, nu poziția reală a autocarelor.
        </p>
      </div>
    </section>
  );
}
