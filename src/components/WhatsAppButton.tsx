"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { whatsappHref } from "@/config/site";
import { WhatsApp } from "./icons";

/**
 * Buton WhatsApp fix, bleumarin. Pe mobil e mereu vizibil; pe desktop apare după ce treci de hero
 * (primul element <section> al paginii). Fără JavaScript rămâne vizibil peste tot.
 */
export function WhatsAppButton() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);

  // Observă hero-ul: butonul apare când marginea lui de jos urcă peste 40% din înălțimea ecranului.
  useEffect(() => {
    const hero = document.querySelector("main section");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0),
      { rootMargin: "-40% 0px 0px 0px" },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener"
      aria-label="Scrie-ne pe WhatsApp"
      data-visible={pastHero ? "" : undefined}
      className="wa-fab fixed right-4 bottom-4 z-30 grid size-12 place-items-center rounded-full bg-navy text-white shadow-[0_8px_24px_-6px_rgb(11_20_38/0.5)] ring-1 ring-white/20 md:right-6 md:bottom-6"
    >
      <WhatsApp size={22} />
    </a>
  );
}
