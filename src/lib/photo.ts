import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Verifică la build dacă fotografia există în /public. Dacă lipsește, componentele
 * ascund zona de imagine și lasă textul pe toată lățimea (fără casete goale).
 * Doar pentru componente server.
 */
const cache = new Map<string, boolean>();
export function hasPhoto(src: string | null | undefined): src is string {
  if (!src) return false;
  let ok = cache.get(src);
  if (ok === undefined) {
    ok = existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
    cache.set(src, ok);
  }
  return ok;
}

/** Returnează calea doar dacă fișierul există. */
export const photoOrNull = (src: string | null | undefined) => (hasPhoto(src) ? src : null);
