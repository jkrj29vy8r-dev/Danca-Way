import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  /** Clase pentru cadru (aspect, rotunjire etc.) */
  className?: string;
  priority?: boolean;
  /** Rotunjirea colțurilor în px (folosită și de animația clip-path) */
  radius?: number;
  /** Mărire ușoară la scroll, pe lângă parallax */
  scaleOnScroll?: boolean;
  /** Zoom 4% la hover pe părintele `.group` */
  hoverZoom?: boolean;
};

/**
 * Fotografie cu animații aplicate de MotionController:
 * - apare cu un clip-path inset la intrarea în ecran;
 * - parallax lent (stratul interior se mișcă ~9% mai încet decât pagina).
 * Fără JavaScript sau cu „reduced motion”, imaginea este pur și simplu afișată.
 * Folosește-o doar după ce ai verificat cu `hasPhoto()` că fișierul există.
 */
export function Photo({ src, alt, sizes, className = "", priority, radius = 0, scaleOnScroll, hoverZoom }: Props) {
  return (
    <div
      data-photo=""
      data-photo-radius={radius}
      data-photo-scale={scaleOnScroll ? "" : undefined}
      className={`relative overflow-hidden bg-navy ${className}`}
      style={radius ? { borderRadius: radius } : undefined}
    >
      <div data-photo-layer="" className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${hoverZoom ? "transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" : ""}`}
        />
      </div>
    </div>
  );
}
