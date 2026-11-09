"use client";

import { useState } from "react";
import { CitySelect } from "../CitySelect";
import { ArrowRight } from "../icons";
import { destinationsFrom, FINDER_CITIES, type CityId } from "@/data/routes";
import { setFilter } from "@/lib/route-filter";

/**
 * Căutare rapidă, ca pe site-urile aeriene: Din → Spre → „Vezi plecările”.
 * Cu JS: filtrează orarul de pe pagină și derulează la el. Fără JS: trimite formularul la #curse.
 */
export function RouteFinder() {
  const [from, setFrom] = useState<CityId>("roman");
  const [to, setTo] = useState<CityId>("bucuresti");
  const [turns, setTurns] = useState(0);
  const dests = destinationsFrom(from);

  const changeFrom = (v: CityId) => {
    setFrom(v);
    const next = destinationsFrom(v);
    if (!next.includes(to)) setTo(next[0]);
  };
  const swap = () => {
    if (!destinationsFrom(to).includes(from)) return;
    setFrom(to);
    setTo(from);
    setTurns((t) => t + 1);
  };

  return (
    <form
      action="/#plecari"
      method="get"
      aria-label="Caută o cursă regulată"
      className="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur-sm sm:grid-cols-[1fr_auto_1fr_auto] sm:items-center"
      onSubmit={(e) => {
        e.preventDefault();
        setFilter({ from, to });
        const el = document.getElementById("plecari") ?? document.getElementById("curse");
        if (!el) return;
        if (window.__lenis) window.__lenis.scrollTo(el, { offset: -96 });
        else el.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      <CitySelect id="finder-din" name="din" label="Din" value={from} options={FINDER_CITIES} onChange={changeFrom} />
      <button
        type="button"
        onClick={swap}
        aria-label="Inversează plecarea cu destinația"
        className="press mx-auto grid size-10 place-items-center rounded-full border border-white/15 text-white hover:bg-white/10 disabled:opacity-30"
        disabled={!destinationsFrom(to).includes(from)}
      >
        {/* Pe mobil săgețile sunt verticale (câmpurile sunt unul sub altul), pe desktop orizontale */}
        <span aria-hidden className="block sm:rotate-90">
          <svg
            viewBox="0 0 24 24"
            className="size-4 transition-transform duration-700 ease-[var(--ease-out-expo)]"
            style={{ transform: `rotate(${turns * 180}deg)` }}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3" />
          </svg>
        </span>
      </button>
      <CitySelect id="finder-spre" name="spre" label="Spre" value={to} options={dests} onChange={setTo} />
      <button type="submit" className="btn btn-primary min-h-16 rounded-xl px-6">
        Vezi plecările <ArrowRight />
      </button>
    </form>
  );
}
