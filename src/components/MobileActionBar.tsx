import { site, telHref, whatsappHref } from "@/config/site";
import { ArrowUpRight, Phone, WhatsApp } from "./icons";

/**
 * Bară fixă, subțire, doar pe mobil: Sună · WhatsApp · Bilet.
 * Pe mobil înlocuiește butonul plutitor de WhatsApp (care rămâne doar pe desktop).
 */
export function MobileActionBar() {
  const item =
    "press flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors duration-300";
  return (
    <nav
      aria-label="Acțiuni rapide"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-night/90 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
    >
      <ul className="flex gap-2">
        <li className="flex flex-1">
          <a href={telHref} className={`${item} text-white hover:bg-white/10`}>
            <Phone size={18} /> Sună
          </a>
        </li>
        <li className="flex flex-1">
          <a href={whatsappHref} target="_blank" rel="noopener" className={`${item} text-white hover:bg-white/10`}>
            <WhatsApp size={18} /> WhatsApp
          </a>
        </li>
        <li className="flex flex-1">
          <a href={site.ticketsUrl} target="_blank" rel="noopener" className={`${item} bg-accent text-night`}>
            Bilet <ArrowUpRight size={16} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
