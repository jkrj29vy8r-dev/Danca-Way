import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { Vehicle } from "@/config/fleet";
import type { ResolvedHotspot } from "@/components/Viewer360";

type Manifest = { count: number; width: number; height: number };

/**
 * Datele vederii 360° pentru un vehicul, doar dacă există cadrele (public/360/<id>/manifest.json).
 * Fără cadre: null, iar secțiunea nu apare. Doar pentru componente server (citește la build).
 */
export function view360(v: Vehicle) {
  const base = `/360/${v.id}`;
  const file = path.join(process.cwd(), "public", "360", v.id, "manifest.json");
  if (!existsSync(file)) return null;
  const m = JSON.parse(readFileSync(file, "utf8")) as Manifest;
  const value = (spec: "seats" | "luggage" | "comfort") =>
    spec === "seats" ? (v.seats ? `${v.seats} locuri pentru pasageri` : null) : spec === "luggage" ? v.luggage : v.comfort?.length ? v.comfort.join(" · ") : null;
  const hotspots: ResolvedHotspot[] = (v.view360?.hotspots ?? []).map((h) => ({ id: h.id, title: h.title, frame: h.frame, x: h.x, y: h.y, value: value(h.spec) }));
  return { base, count: m.count, ratio: m.width / m.height, hotspots };
}
