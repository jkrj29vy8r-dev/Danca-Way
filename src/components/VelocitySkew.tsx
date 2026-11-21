"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Imaginile mari și titlurile mari ale secțiunilor. */
const TARGETS = "main [data-photo], main .details-row li > div, main h2.t-48, main h2.t-72";

/**
 * Viteza derulării se simte, discret: imaginile și titlurile mari se înclină puțin (cel mult 2°, 1° pe telefon)
 * după viteză și revin cu un arc când derularea se oprește. Doar elementele din ecran, doar `transform`, doar cât
 * pagina se mișcă. Cu „reduced motion”: nimic.
 */
export function VelocitySkew() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const max = window.matchMedia("(pointer: fine)").matches ? 2 : 1;
    const visible = new Set<HTMLElement>();
    const io = new IntersectionObserver((entries) =>
      entries.forEach((e) => {
        const el = e.target as HTMLElement;
        if (e.isIntersecting) visible.add(el);
        else {
          visible.delete(el);
          el.style.transform = "";
        }
      }),
    );
    const els = Array.from(document.querySelectorAll<HTMLElement>(TARGETS));
    els.forEach((el) => io.observe(el));

    let lastY = window.scrollY;
    let lastT = performance.now();
    let target = 0;
    let skew = 0;
    let vel = 0;
    let raf = 0;
    let idle = 0;
    const apply = (v: number) => {
      const t = Math.abs(v) < 0.01 ? "" : `skewY(${v.toFixed(3)}deg)`;
      visible.forEach((el) => (el.style.transform = t));
    };
    const tick = () => {
      // arc amortizat: urmează ținta și revine la 0 fără să oscileze vizibil
      vel = vel * 0.72 + (target - skew) * 0.18;
      skew += vel;
      apply(skew);
      if (Math.abs(skew) > 0.005 || Math.abs(target) > 0.005) raf = requestAnimationFrame(tick);
      else {
        raf = 0;
        apply(0);
      }
    };
    const onScroll = () => {
      const now = performance.now();
      const dy = window.scrollY - lastY;
      const dt = Math.max(8, now - lastT);
      lastY = window.scrollY;
      lastT = now;
      // px/ms → grade: 3 px/ms (derulare foarte rapidă) ≈ înclinarea maximă
      target = Math.max(-max, Math.min(max, (dy / dt) * (max / 3)));
      window.clearTimeout(idle);
      idle = window.setTimeout(() => {
        target = 0;
        if (!raf) raf = requestAnimationFrame(tick);
      }, 80);
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idle);
      cancelAnimationFrame(raf);
      io.disconnect();
      els.forEach((el) => (el.style.transform = ""));
    };
  }, [pathname]);

  return null;
}
