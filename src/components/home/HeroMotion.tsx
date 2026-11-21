"use client";

import { useEffect, useRef } from "react";

/**
 * Mișcarea fotografiei din hero: după ce imaginea s-a încărcat, se retrage de la 104% la 100% (2,8 s);
 * apoi, cât hero-ul e în ecran, coboară lent la scroll (paralaxă, 18% din distanța derulată).
 * Doar `scale` și `translate` (compoziție GPU, fără reflow). Cu „reduced motion”: nimic.
 */
export function HeroMotion({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = ref.current;
    const img = box?.querySelector<HTMLImageElement>("picture img");
    if (!box || !img || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const settle = () => requestAnimationFrame(() => box.setAttribute("data-loaded", ""));
    if (img.complete && img.naturalWidth) settle();
    else img.addEventListener("load", settle, { once: true });

    let raf = 0;
    let visible = true;
    const update = () => {
      raf = 0;
      const y = Math.min(window.scrollY, window.innerHeight * 1.2);
      box.style.setProperty("--hero-y", `${(y * 0.18).toFixed(1)}px`);
    };
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(box);
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      img.removeEventListener("load", settle);
    };
  }, []);

  return (
    <div ref={ref} className="hero-launch-media">
      {children}
    </div>
  );
}
