import type { Vehicle } from "@/config/fleet";

/** Câmpurile fișei tehnice care vin din src/config/fleet.ts (cheia = numele câmpului de acolo) */
export type SpecKey = "seats" | "luggage" | "comfort" | "category" | "year" | "euro";

export const SPEC_LABEL: Record<SpecKey, string> = {
  seats: "Locuri pentru pasageri",
  luggage: "Bagaje",
  comfort: "Confort",
  category: "Categoria de confort",
  year: "Anul fabricației",
  euro: "Norma de poluare",
};

/** Valoarea afișată, sau null dacă încă nu e completată în fleet.ts */
export function specValue(v: Vehicle, k: SpecKey): string | null {
  switch (k) {
    case "seats":
      return v.seats ? String(v.seats) : null;
    case "year":
      return v.year ? String(v.year) : null;
    case "comfort":
      return v.comfort?.length ? v.comfort.join(" · ") : null;
    default:
      return v[k];
  }
}
