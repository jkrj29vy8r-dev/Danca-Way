"use client";

import { useEffect } from "react";
import { afterInteractive, loadGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Derulare lină cu Lenis, doar cu mouse/trackpad (pe ecranele tactile derularea rămâne nativă) și niciodată cu
 * „reduced motion”. Se încarcă după prima interacțiune, deci nu întârzie afișarea paginii. Se oprește singură cât
 * <html> are overflow: hidden (meniul deschis) și ține ScrollTrigger sincronizat cadru cu cadru.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    let alive = true;
    let destroy = () => {};

    afterInteractive()
      .then(() => import("lenis"))
      .then(({ default: Lenis }) => {
        if (!alive) return;
        const lenis = new Lenis({ autoRaf: true, autoToggle: true, allowNestedScroll: true, stopInertiaOnNavigate: true, lerp: 0.12 });
        destroy = () => lenis.destroy();
        loadGsap().then(({ ScrollTrigger }) => alive && lenis.on("scroll", ScrollTrigger.update));
      });

    return () => {
      alive = false;
      destroy();
    };
  }, []);

  return null;
}
