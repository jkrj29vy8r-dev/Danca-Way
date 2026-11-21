"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "./icons";
import { site, telHref, whatsappHref } from "@/config/site";
import { useContactZone } from "@/lib/useContactZone";

/**
 * Bară fixă, doar pe mobil: Sună · WhatsApp · Rezervă. Monocromă (accentul galben rămâne pentru
 * acțiunea principală a fiecărui ecran), cu linie de 1 px deasupra și 16 px de margine laterală (plus zonele sigure).
 * Apare abia după ce ai trecut de prima secțiune (hero-ul); coboară din ecran deasupra formularului de ofertă și a
 * subsolului (au aceleași contacte) și cât timp scrii. Locul ei e rezervat sub subsol, ca să nu acopere nimic.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const inZone = useContactZone();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("main section");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(hero);
    return () => {
      io.disconnect();
      setPastHero(false);
    };
  }, [pathname]);

  const hidden = inZone || !pastHero;
  const item =
    "lift t-14 flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full font-semibold";
  return (
    <nav
      aria-label="Acțiuni rapide"
      inert={hidden}
      className={`on-dark fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-night pt-2 pr-[calc(1rem+env(safe-area-inset-right))] pb-[max(0.5rem,env(safe-area-inset-bottom))] pl-[calc(1rem+env(safe-area-inset-left))] transition-transform duration-500 ease-[var(--ease-out-expo)] md:hidden ${hidden ? "translate-y-full" : ""}`}
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
            Rezervă <ArrowUpRight size={16} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
