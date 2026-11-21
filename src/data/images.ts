/**
 * Dimensiunile reale ale fotografiilor din /public/images (necesare pentru srcset și pentru a rezerva spațiul,
 * fără layout shift). Adaugă aici orice fotografie nouă.
 */
export const imageSizes: Record<string, { width: number; height: number }> = {
  "/images/hero-setra-studio.jpg": { width: 3200, height: 3584 },
  "/images/hero-setra-studio-portrait.jpg": { width: 1500, height: 2775 },
  "/images/setra-fata-strada.jpg": { width: 1600, height: 1200 },
  "/images/setra-lateral-strada.jpg": { width: 1600, height: 1200 },
  // Imaginea de rezervă a modelului 3D (PNG transparent), pentru browserele fără WebGL
  "/3d/setra-s517hd_clay.png": { width: 1843, height: 1208 },
};

export function sizeOf(src: string) {
  const s = imageSizes[src];
  if (!s) throw new Error(`Dimensiunile lipsesc pentru ${src} (src/data/images.ts)`);
  return s;
}
