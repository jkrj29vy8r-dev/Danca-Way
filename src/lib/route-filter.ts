"use client";

import { cities, type CityId } from "@/data/routes";

/** Perechea de orașe căutată (din hero sau din orar), sincronizată prin URL (?din=…&spre=…) și un eveniment. */
export type RouteFilter = { from: CityId; to: CityId } | null;
export const FILTER_EVENT = "route:filter";

const isCity = (v: string | null): v is CityId => !!v && v in cities;

export function readFilter(): RouteFilter {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const from = p.get("din");
  const to = p.get("spre");
  return isCity(from) && isCity(to) && from !== to ? { from, to } : null;
}

export function setFilter(f: RouteFilter) {
  const url = new URL(window.location.href);
  if (f) {
    url.searchParams.set("din", f.from);
    url.searchParams.set("spre", f.to);
  } else {
    url.searchParams.delete("din");
    url.searchParams.delete("spre");
  }
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new CustomEvent<RouteFilter>(FILTER_EVENT, { detail: f }));
}
