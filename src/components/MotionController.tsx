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

/** Easing și durate comune: lent, precis. */
const EASE = "expo.out";

/**
 * Orchestrează animațiile pe fiecare pagină (se reface la schimbarea rutei). Mișcare doar acolo unde are
 * un sens: titluri (linie cu linie), fotografii (clip-path), ore (tabelă de plecări), bara de progres.
 * Restul conținutului e deja acolo. Totul e dezactivat cu prefers-reduced-motion; fără JavaScript
 * conținutul rămâne static și vizibil. Animăm doar transform, opacity și clip-path.
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
        scrollProgress(gsap);
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
      // Doar linii (nu cuvinte/litere): textul rămâne citibil ca atare, fără aria-label pe <p>.
      aria: "none",
      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.1,
          ease: EASE,
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      },
    }),
  );
  return () => splits.forEach((s) => s.revert());
}

/* ───────── Fotografii: clip-path inset la intrare + parallax lent ───────── */
function revealPhotos(gsap: Gsap) {
  document.querySelectorAll<HTMLElement>("[data-photo]").forEach((frame) => {
    const layer = frame.querySelector<HTMLElement>("[data-photo-layer]");
    if (!layer) return;
    const visible = inView(frame);
    const r = Number(frame.dataset.photoRadius || 0);
    const trigger = { trigger: frame, start: "top 90%", once: true };

    if (!visible)
      gsap.fromTo(
        frame,
        { clipPath: `inset(10% 7% 10% 7% round ${r + 12}px)` },
        { clipPath: `inset(0% 0% 0% 0% round ${r}px)`, duration: 1.2, ease: EASE, scrollTrigger: trigger },
      );

    // Stratul interior se mișcă ~9% mai încet decât pagina; marginea lui acoperă exact cursa.
    const travel = () => 0.09 * (window.innerHeight + frame.offsetHeight);
    const fitLayer = () => {
      const m = travel() / 2 + 2;
      layer.style.top = `${-m}px`;
      layer.style.bottom = `${-m}px`;
    };
    fitLayer();
    gsap.fromTo(
      layer,
      { y: () => -travel() / 2 },
      {
        y: () => travel() / 2,
        ease: "none",
        scrollTrigger: {
          trigger: frame,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: fitLayer,
        },
      },
    );

    if (frame.hasAttribute("data-photo-scale")) {
      gsap.fromTo(
        layer.querySelector("img"),
        { scale: 1.12 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom 40%", scrub: true } },
      );
    }
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

/* ───────── Bara aurie de progres ───────── */
function scrollProgress(gsap: Gsap) {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;
  gsap.fromTo(
    bar,
    { scaleX: 0 },
    { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
  );
}
