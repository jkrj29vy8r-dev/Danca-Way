"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { WhatsApp } from "./icons";
import { whatsappHref } from "@/config/site";
import { useContactZone } from "@/lib/useContactZone";

/**
 * Buton WhatsApp fix, doar pe desktop (pe mobil e în bara de jos): un cerc de 48 px, ca să nu acopere text.
 * Apare după ce treci de prima secțiune; dispare deasupra formularului de ofertă și a subsolului (au contactele).
 */
export function WhatsAppButton() {
  const pathname = usePathname();
  const inZone = useContactZone();
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
      aria-label="Scrie-ne pe WhatsApp"
      title="WhatsApp"
      data-visible={pastHero && !inZone ? "" : undefined}
      className="wa-fab press on-dark fixed right-6 bottom-6 z-30 hidden size-12 place-items-center rounded-full border border-line-dark-strong bg-night text-white transition-colors hover:border-white md:grid"
    >
      <WhatsApp size={20} />
    </a>
  );
}
