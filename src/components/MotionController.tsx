"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";
import { flipDigits, resetDigits } from "@/lib/flap";

type Gsap = Awaited<ReturnType<typeof loadGsap>>["gsap"];
type ST = Awaited<ReturnType<typeof loadGsap>>["ScrollTrigger"];

/** Elementul e (măcar parțial) în ecran chiar acum. */
const inView = (el: Element) => {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0;
};

const EASE = "expo.out";

/**
 * Animațiile de pe fiecare pagină (se refac la schimbarea rutei). Doar trei tipuri, fiecare cu un sens:
 * titluri dezvăluite linie cu linie, fotografii dezvăluite cu clip-path, ore întoarse ca pe o tabelă de plecări.
 * (Harta, rândunica și countdown-ul au componentele lor.) Totul e dezactivat cu prefers-reduced-motion;
 * fără JavaScript conținutul rămâne static și vizibil. Durate 0,6–1,2 s, expo.out.
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
        disposers.push(splitFlaps(gsap, ScrollTrigger));
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
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: EASE,
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        },
      }),
    );
  return () => splits.forEach((s) => s.revert());
}

/* ───────── Fotografii: clip-path inset la intrare (fără parallax, fără zoom) ───────── */
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

/* ───────── Tabelă de plecări (split-flap): cifrele se întorc când ora intră în ecran ───────── */
function splitFlaps(gsap: Gsap, ScrollTrigger: ST) {
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-flap]"));
  els.forEach((el) =>
    ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: () => flipDigits(gsap, el) }),
  );
  // La ieșire, cifrele revin la valoarea corectă chiar dacă animația a fost întreruptă.
  return () => resetDigits(document);
}
