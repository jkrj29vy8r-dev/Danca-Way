import Image from "next/image";

/**
 * Logo-ul din /public/brand, randat ca <Image>.
 * - `alb`  (danca-way-logo-alb.svg): pe fundal închis
 * - `navy` (danca-way-logo.svg): pe fundal deschis
 * Pentru a schimba logo-ul, înlocuiește fișierele SVG păstrând aceleași nume.
 * LOGO_RATIO = lățime / înălțime a fișierului (2000 × 456 pentru logo-ul actual).
 */
export const LOGO_RATIO = 2000 / 456;

type Props = {
  variant?: "navy" | "alb";
  /** Înălțimea în pixeli (lățimea rezultă din proporții) */
  height?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
};

export function Logo({ variant = "navy", height = 32, className = "", priority = false, alt = "Danca Way" }: Props) {
  const src = variant === "alb" ? "/brand/danca-way-logo-alb.svg" : "/brand/danca-way-logo.svg";
  return (
    <Image
      src={src}
      alt={alt}
      width={Math.round(height * LOGO_RATIO)}
      height={height}
      priority={priority}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
