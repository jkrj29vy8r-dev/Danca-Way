/**
 * Dimensiunile reale ale fotografiilor din /public/images (necesare pentru srcset și pentru a rezerva spațiul,
 * fără layout shift). Adaugă aici orice fotografie nouă.
 */
export const imageSizes: Record<string, { width: number; height: number }> = {
  "/images/hero-autocar-piata.jpg": { width: 2400, height: 1357 },
  "/images/hero-autocar-piata-4x3.jpg": { width: 2027, height: 1520 },
  "/images/hero-rindunica-panou.jpg": { width: 2400, height: 1357 },
  "/images/setra-fata-strada.jpg": { width: 1600, height: 1200 },
  "/images/setra-lateral-strada.jpg": { width: 1600, height: 1200 },
  "/images/setra-fata-apus-vertical.jpg": { width: 900, height: 1600 },
  "/images/setra-fata-vertical.jpg": { width: 900, height: 1600 },
  "/images/setra-autogara-vertical.jpg": { width: 900, height: 1600 },
};

export function sizeOf(src: string) {
  const s = imageSizes[src];
  if (!s) throw new Error(`Dimensiunile lipsesc pentru ${src} (src/data/images.ts)`);
  return s;
}
