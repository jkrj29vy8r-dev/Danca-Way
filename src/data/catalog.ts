/**
 * Vedere comună peste excursii și pelerinaje, folosită de carduri și de paginile de detaliu.
 * Doar pentru componente server (verifică existența fotografiilor pe disc).
 */
import { photoOrNull } from "@/lib/photo";
import { trips, tripHref, tripImage, tripCategoryLabel, type Trip } from "./trips";
import {
  pilgrimages,
  pilgrimageHref,
  pilgrimageImage,
  pilgrimageCategoryLabel,
  type Pilgrimage,
} from "./pilgrimages";

export type CatalogKind = "excursie" | "pelerinaj";

export type CatalogItem = {
  kind: CatalogKind;
  slug: string;
  title: string;
  duration: string;
  places: string[];
  description: string;
  /** Sezon (excursii) sau data sărbătorii (pelerinaje) */
  when?: string;
  category: string;
  href: string;
  /** null dacă fotografia nu există încă în /public/images */
  image: string | null;
  featured: boolean;
};

export const fromTrip = (t: Trip): CatalogItem => ({
  kind: "excursie",
  slug: t.slug,
  title: t.title,
  duration: t.duration,
  places: t.places,
  description: t.description,
  when: t.season,
  category: tripCategoryLabel(t.category),
  href: tripHref(t),
  image: photoOrNull(tripImage(t)),
  featured: !!t.featured,
});

export const fromPilgrimage = (p: Pilgrimage): CatalogItem => ({
  kind: "pelerinaj",
  slug: p.slug,
  title: p.title,
  duration: p.duration,
  places: p.places,
  description: p.description,
  when: p.date,
  category: pilgrimageCategoryLabel(p.category),
  href: pilgrimageHref(p),
  image: photoOrNull(pilgrimageImage(p)),
  featured: !!p.featured,
});

export const tripItems = trips.map(fromTrip);
export const pilgrimageItems = pilgrimages.map(fromPilgrimage);

/** Excursiile și pelerinajele recomandate, alternate. */
export function featuredItems(): CatalogItem[] {
  const exc = tripItems.filter((i) => i.featured);
  const pil = pilgrimageItems.filter((i) => i.featured);
  return Array.from({ length: Math.max(exc.length, pil.length) }).flatMap((_, i) =>
    [exc[i], pil[i]].filter((x): x is CatalogItem => Boolean(x)),
  );
}
