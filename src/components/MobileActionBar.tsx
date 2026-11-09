import { site, telHref, whatsappHref } from "@/config/site";
import { ArrowUpRight } from "./icons";

/**
 * Bară fixă, doar pe mobil: Sună · WhatsApp · Bilet. Monocromă (accentul galben rămâne pentru
 * acțiunea principală a fiecărui ecran), cu linie de 1 px deasupra.
 */
export function MobileActionBar() {
  const item =
    "press t-14 flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-[600ms] ease-[var(--ease-out-expo)]";
  return (
    <nav
      aria-label="Acțiuni rapide"
      className="on-dark fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-night px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden"
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
