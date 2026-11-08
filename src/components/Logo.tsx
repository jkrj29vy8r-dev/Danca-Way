/* eslint-disable @next/next/no-img-element -- SVG static, nu are nevoie de optimizare */
import { readFileSync } from "node:fs";
import path from "node:path";

type Props = { variant?: "navy" | "alb"; className?: string; inline?: boolean };

const files = { navy: "danca-way-logo.svg", alb: "danca-way-logo-alb.svg" } as const;

function readSvg(file: string) {
  return readFileSync(path.join(process.cwd(), "public", "brand", file), "utf8")
    .replace(/<\?xml[^>]*\?>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();
}

/**
 * Logo-ul din /public/brand. Pentru a schimba logo-ul, înlocuiește fișierele SVG (același nume).
 * `inline` îl include direct în HTML (fără cerere suplimentară) — folosit în header, pentru viteză.
 */
export function Logo({ variant = "navy", className = "h-8 w-auto", inline = false }: Props) {
  if (inline) {
    return (
      <span
        role="img"
        aria-label="Danca Way"
        className={`inline-block [&>svg]:h-full [&>svg]:w-auto ${className}`}
        dangerouslySetInnerHTML={{ __html: readSvg(files[variant]) }}
      />
    );
  }
  return <img src={`/brand/${files[variant]}`} alt="Danca Way" width={140} height={30} className={className} />;
}
