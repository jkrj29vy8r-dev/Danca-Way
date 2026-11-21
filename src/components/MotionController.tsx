"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";
import { easeReveal } from "@/lib/ease";

type Gsap = Awaited<ReturnType<typeof loadGsap>>["gsap"];

/** Elementul e (măcar parțial) în ecran chiar acum. */
const inView = (el: Element) => {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0;
};

const EASE = "expo.out";

/**
 * Animațiile de pe fiecare pagină (se refac la schimbarea rutei). Trei tipuri, fiecare cu un sens:
 * titluri dezvăluite linie cu linie (o singură dată), fotografii dezvăluite cu clip-path și cu paralaxă lentă.
 * (Harta, orele și prețurile care numără, rândunica și countdown-ul au componentele lor.) Totul e dezactivat cu
 * prefers-reduced-motion; fără JavaScript conținutul rămâne static și vizibil.
 */
export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cancelled = false;
    let cleanup = () => {};

    Promise.all([loadGsap(), import("gsap/SplitText")]).then(([{ gsap, ScrollTrigger }, { SplitText }]) => {
      if (cancelled) return;
      gsap.registerPlugin(SplitText);
      const disposers: (() => void)[] = [];

      const ctx = gsap.context(() => {
        disposers.push(revealLines(gsap, SplitText));
        revealPhotos(gsap);
        parallax(gsap);
      });

      // Recalculăm pozițiile după ce se încarcă fonturile (liniile se pot rupe altfel).
      document.fonts?.ready.then(() => !cancelled && ScrollTrigger.refresh());

      cleanup = () => {
        disposers.forEach((d) => d());
        ctx.revert();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [pathname]);

  return null;
}

/* ───────── Titluri: liniile urcă din spatele unei margini invizibile ───────── */
function revealLines(gsap: Gsap, SplitText: typeof import("gsap/SplitText").SplitText) {
  // Ce e deja pe ecran când pornesc animațiile rămâne așa cum e: conținutul nu „reapare”.
  const splits = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal="lines"]'))
    .filter((el) => !inView(el))
    .map((el) =>
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        // Doar linii (nu cuvinte/litere): textul rămâne citibil ca atare, fără aria-label pe element.
        aria: "none",
        onSplit(self) {
          // Aceeași mișcare ca titlul din hero: 0,9 s, cubic-bezier(0.22, 1, 0.36, 1), 80 ms între linii
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 0.9,
            ease: easeReveal,
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        },
      }),
    );
  return () => splits.forEach((s) => s.revert());
}

/* ───────── Fotografii: clip-path inset la intrare ───────── */
function revealPhotos(gsap: Gsap) {
  document.querySelectorAll<HTMLElement>("[data-photo]").forEach((frame) => {
    if (inView(frame)) return;
    gsap.fromTo(
      frame,
      { clipPath: "inset(8% 6% 8% 6%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: EASE, scrollTrigger: { trigger: frame, start: "top 90%", once: true } },
    );
  });
}

/* ───────── Paralaxă lentă: fotografia (cu 12% mai mare decât cadrul) alunecă ±5% cât traversează ecranul ───────── */
function parallax(gsap: Gsap) {
  document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((img) => {
    const frame = img.closest<HTMLElement>("[data-photo]") ?? img.parentElement!;
    gsap.fromTo(
      img,
      { yPercent: -5 },
      { yPercent: 5, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.6 } },
    );
  });
}
