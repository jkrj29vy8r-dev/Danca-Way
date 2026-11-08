import Image from "next/image";

/**
 * Logo-ul Danca Way, din fișierele din /public (nu e redesenat în cod):
 * - `alb`  → /danca-way-logo-alb.svg (fundal închis)
 * - `navy` → /danca-way-logo.svg (fundal deschis)
 * Mărimea se dă din CSS prin înălțime (ex. `h-8 md:h-10`); lățimea urmează proporția fișierului.
 */
export const LOGO_WIDTH = 1951;
export const LOGO_HEIGHT = 437;

type Props = {
  variant?: "navy" | "alb";
  className?: string;
  priority?: boolean;
  alt?: string;
};

export function Logo({ variant = "navy", className = "h-8 w-auto", priority = false, alt = "Danca Way" }: Props) {
  return (
    <Image
      src={variant === "alb" ? "/danca-way-logo-alb.svg" : "/danca-way-logo.svg"}
      alt={alt}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      className={className}
    />
  );
}
