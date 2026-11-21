"use client";

import { useEffect, useRef } from "react";

/**
 * Rândunica aterizează pe butonul „Rezervă locul” de la finalul paginii: vine din stânga sus pe o curbă, se ridică
 * puțin înainte de atingere (cum frânează o pasăre) și se așază pe marginea de sus a butonului. O singură dată,
 * când butonul e aproape tot în ecran. Imaginea e randată din modelul 3D (fără WebGL aici).
 * Cu „reduced motion”: nu apare.
 */
export function SwallowLanding({ children }: { children: React.ReactNode }) {
  const box = useRef<HTMLSpanElement>(null);
  const bird = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = box.current;
    const b = bird.current;
    if (!el || !b || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        b.src = b.dataset.src!;
        b.decode()
          .catch(() => {})
          .finally(() => {
            b.setAttribute("data-on", "");
            b.animate(
              [
                { translate: "-260px -170px", rotate: "-10deg", scale: "0.85", opacity: 0 },
                { translate: "-150px -110px", rotate: "-6deg", scale: "0.9", opacity: 1, offset: 0.25 },
                { translate: "-46px -34px", rotate: "8deg", scale: "0.96", offset: 0.68 },
                { translate: "-6px -4px", rotate: "-3deg", scale: "1", offset: 0.88 },
                { translate: "0 0", rotate: "0deg", scale: "1", opacity: 1 },
              ],
              { duration: 1700, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" },
            ).finished.then(() => b.setAttribute("data-landed", ""));
          });
      },
      { threshold: 0.9 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={box} className="landing">
      {children}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={bird} data-src="/media/live/randunica-zbor.webp" alt="" width={288} height={139} className="landing-bird" aria-hidden />
    </span>
  );
}
