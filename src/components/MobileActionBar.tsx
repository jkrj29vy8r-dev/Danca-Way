"use client";

import { ArrowUpRight } from "./icons";
import { site, telHref, whatsappHref } from "@/config/site";
import { useContactZone } from "@/lib/useContactZone";

/**
 * Bară fixă, doar pe mobil: Sună · WhatsApp · Bilet. Monocromă (accentul galben rămâne pentru
 * acțiunea principală a fiecărui ecran), cu linie de 1 px deasupra.
 * Coboară din ecran deasupra formularului de ofertă și a subsolului (au aceleași contacte) și cât timp scrii.
 */
export function MobileActionBar() {
  const hidden = useContactZone();
  const item =
    "press t-14 flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-[600ms] ease-[var(--ease-out-expo)]";
  return (
    <nav
      aria-label="Acțiuni rapide"
      inert={hidden}
      className={`on-dark fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-night px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-transform duration-500 ease-[var(--ease-out-expo)] md:hidden ${hidden ? "translate-y-full" : ""}`}
    >
      <ul className="flex gap-2">
        <li className="flex flex-1">
          <a href={telHref} className={`${item} text-white hover:bg-white/[0.08]`}>
            Sună
          </a>
        </li>
        <li className="flex flex-1">
          <a href={whatsappHref} target="_blank" rel="noopener" className={`${item} text-white hover:bg-white/[0.08]`}>
            WhatsApp
          </a>
        </li>
        <li className="flex flex-1">
          <a href={site.ticketsUrl} target="_blank" rel="noopener" className={`${item} bg-white text-night`}>
            Bilet <ArrowUpRight size={16} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
