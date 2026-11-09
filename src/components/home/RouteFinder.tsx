"use client";

import { useState } from "react";
import { CitySelect } from "../CitySelect";
import { ArrowRight } from "../icons";
import { NextDeparture } from "../NextDeparture";
import { destinationsFrom, FINDER_CITIES, type CityId } from "@/data/routes";
import { setFilter } from "@/lib/route-filter";
import { scrollToEl } from "@/lib/scroll";

/**
 * Căutare rapidă, ca pe site-urile aeriene: Din → Spre → „Vezi plecările”, plus următoarea plecare
 * pentru perechea aleasă (se actualizează la fiecare schimbare, fără să apeși butonul).
 * Cu JS: filtrează orarul de pe pagină și derulează la el. Fără JS: trimite formularul la orar.
 */
export function RouteFinder({ withNext = true }: { withNext?: boolean }) {
  const [from, setFrom] = useState<CityId>("roman");
  const [to, setTo] = useState<CityId>("bucuresti");
  const [turns, setTurns] = useState(0);
  const dests = destinationsFrom(from);
  const canSwap = destinationsFrom(to).includes(from);

  const changeFrom = (v: CityId) => {
    setFrom(v);
    const next = destinationsFrom(v);
    if (!next.includes(to)) setTo(next[0]);
  };
  const swap = () => {
    if (!canSwap) return;
    setFrom(to);
    setTo(from);
    setTurns((t) => t + 1);
  };

  return (
    <div className="grid-12 items-start gap-y-8">
      <form
        action="/curse-regulate#plecari"
        method="get"
        aria-label="Caută o cursă regulată"
        className="col-span-12 grid gap-2 lg:col-span-7 lg:grid-cols-[1fr_auto_1fr_auto] lg:items-center"
        onSubmit={(e) => {
          const el = document.getElementById("plecari");
          if (!el) return; // pe paginile fără orar, formularul duce la /curse-regulate
          e.preventDefault();
          setFilter({ from, to });
          scrollToEl(el);
        }}
      >
        <div className="relative grid gap-2 lg:contents">
          <CitySelect id="finder-din" name="din" label="Din" value={from} options={FINDER_CITIES} onChange={changeFrom} className="pr-16 lg:pr-4" />
          <button
            type="button"
            onClick={swap}
            aria-label="Inversează plecarea cu destinația"
            disabled={!canSwap}
            className="press absolute top-1/2 right-4 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line-dark-strong bg-night text-white transition-colors duration-[600ms] ease-[var(--ease-out-expo)] hover:border-white disabled:opacity-32 lg:static lg:translate-y-0"
          >
            {/* Pe mobil câmpurile sunt unul sub altul: săgeți verticale; pe desktop, orizontale */}
            <span aria-hidden className="block lg:rotate-90">
              <svg
                viewBox="0 0 24 24"
                className="size-4 transition-transform duration-[800ms] ease-[var(--ease-out-expo)]"
                style={{ transform: `rotate(${turns * 180}deg)` }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3" />
              </svg>
            </span>
          </button>
          <CitySelect id="finder-spre" name="spre" label="Spre" value={to} options={dests} onChange={setTo} />
        </div>
        <button type="submit" className="btn btn-lg btn-accent min-h-16 lg:ml-2">
          Vezi plecările <ArrowRight />
        </button>
      </form>
      {withNext && (
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <NextDeparture from={from} to={to} />
        </div>
      )}
    </div>
  );
}
