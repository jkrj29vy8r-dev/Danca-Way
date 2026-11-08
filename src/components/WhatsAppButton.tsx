"use client";

import { useEffect, useState } from "react";
import { whatsappHref } from "@/config/site";
import { WhatsApp } from "./icons";

/**
 * Buton WhatsApp fix, bleumarin. Pe mobil e mereu vizibil; pe desktop apare după ce treci de hero
 * (primul element <section> al paginii). Fără JavaScript rămâne vizibil peste tot.
 */
export function WhatsAppButton() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const hero = document.querySelector("main section");
      const limit = hero ? hero.getBoundingClientRect().bottom + window.scrollY - window.innerHeight * 0.4 : 600;
      setPastHero(window.scrollY > limit);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener"
      aria-label="Scrie-ne pe WhatsApp"
      data-visible={pastHero ? "" : undefined}
      className="wa-fab fixed right-4 bottom-4 z-30 grid size-12 place-items-center rounded-full bg-navy text-white shadow-[0_8px_24px_-6px_rgb(11_20_38/0.5)] ring-1 ring-white/20 transition-[opacity,transform,visibility] duration-300 hover:-translate-y-0.5 md:right-6 md:bottom-6"
    >
      <WhatsApp size={22} />
    </a>
  );
}
