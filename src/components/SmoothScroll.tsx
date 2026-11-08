"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type Lenis from "lenis";
import { loadGsap, prefersReducedMotion, whenIdle } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Lenis legat de ticker-ul GSAP, ca ScrollTrigger să rămână sincronizat. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      await whenIdle(1500);
      const [{ default: LenisCtor }, { gsap, ScrollTrigger }] = await Promise.all([
        import("lenis"),
        loadGsap(),
      ]);
      if (cancelled) return;
      const lenis = new LenisCtor({ autoRaf: false, anchors: { offset: -80 }, lerp: 0.11 });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        window.__lenis = undefined;
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  // La schimbarea paginii, resincronizează poziția Lenis și recalculează ScrollTrigger.
  useEffect(() => {
    const lenis = window.__lenis;
    if (lenis && !window.location.hash) lenis.scrollTo(0, { immediate: true, force: true });
    loadGsap().then(({ ScrollTrigger }) => requestAnimationFrame(() => ScrollTrigger.refresh()));
  }, [pathname]);

  return null;
}
