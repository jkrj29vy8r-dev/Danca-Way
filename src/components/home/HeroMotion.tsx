"use client";

import { useEffect, useRef } from "react";

/**
 * Mișcarea fotografiei din hero:
 * - după ce imaginea s-a încărcat, se retrage de la 104% la 100% (2,8 s; nu și la intro, care ține locul ei);
 * - la derulare, farurile se aprind: --lit urcă de la 0 la 1 pe primele 30% din înălțimea ecranului
 *   (doar opacitate, deci și cu „reduced motion”);
 * - cât hero-ul e în ecran, fotografia coboară lent (paralaxă, 18% din distanța derulată), fără „reduced motion”.
 * Doar `opacity`, `scale` și `translate` (compoziție GPU, fără reflow).
 */
export function HeroMotion({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = ref.current;
    const img = box?.querySelector<HTMLImageElement>("picture img");
    if (!box || !img) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const settle = () => requestAnimationFrame(() => box.setAttribute("data-loaded", ""));
    if (!reduced) {
      if (img.complete && img.naturalWidth) settle();
      else img.addEventListener("load", settle, { once: true });
    }

    let raf = 0;
    let visible = true;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const lit = Math.min(1, Math.max(0, y / (window.innerHeight * 0.3)));
      box.style.setProperty("--lit", lit.toFixed(3));
      if (!reduced) box.style.setProperty("--hero-y", `${(Math.min(y, window.innerHeight * 1.2) * 0.18).toFixed(1)}px`);
    };
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) onScroll();
    });
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
