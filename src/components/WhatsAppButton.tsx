"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { whatsappHref } from "@/config/site";
import { WhatsApp } from "./icons";

/**
 * Buton WhatsApp fix, doar pe desktop (pe mobil e în bara de jos). Apare după ce treci de prima secțiune.
 * Pastilă night cu linie de 1 px, fără umbră.
 */
export function WhatsAppButton() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("main section");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0), {
      rootMargin: "-40% 0px 0px 0px",
    });
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener"
      data-visible={pastHero ? "" : undefined}
      className="wa-fab press on-dark t-14 fixed right-8 bottom-8 z-30 hidden min-h-12 items-center gap-2 rounded-full border border-line-dark-strong bg-night px-6 font-semibold text-white transition-colors hover:border-white md:inline-flex"
    >
      <WhatsApp size={18} /> WhatsApp
    </a>
  );
}
