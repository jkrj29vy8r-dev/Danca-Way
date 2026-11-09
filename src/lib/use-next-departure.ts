"use client";

import { useEffect, useMemo, useState } from "react";
import { bucharestNow } from "./bucharest-time";
import { tripsBetween, type CityId, type Trip } from "@/data/routes";

/** Ora României în minute de la miezul nopții, actualizată la fiecare minut întreg (doar în browser). */
export function useBucharestMinutes() {
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

export type Departure = { trip: Trip; day: "azi" | "mâine"; wait: number };

/** Următoarea plecare între două orașe, față de ora dată (minute). */
export function nextDepartureAt(from: CityId, to: CityId, now: number): Departure | null {
  const trips = tripsBetween(from, to);
  if (!trips.length) return null;
  const today = trips.find((t) => t.depMin > now);
  if (today) return { trip: today, day: "azi", wait: today.depMin - now };
  const t = trips[0];
  return { trip: t, day: "mâine", wait: 24 * 60 - now + t.depMin };
}

/** Următoarea plecare (null înainte de hidratare) și prima cursă a zilei (pentru randarea fără JavaScript). */
export function useNextDeparture(from: CityId, to: CityId) {
  const now = useBucharestMinutes();
  const first = useMemo(() => tripsBetween(from, to)[0] ?? null, [from, to]);
  const next = useMemo(() => (now === null ? null : nextDepartureAt(from, to, now)), [from, to, now]);
  return { now, next, first };
}
