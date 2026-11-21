import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

type Loaded = { gsap: typeof GsapType; ScrollTrigger: typeof ScrollTriggerType };

let loading: Promise<Loaded> | null = null;

/**
 * Încarcă GSAP + ScrollTrigger doar după ce pagina a devenit interactivă: la prima interacțiune
 * (scroll, atingere, tastă, mișcarea mouse-ului). Conținutul e vizibil și fără animații.
 */
export function loadGsap(): Promise<Loaded> {
  loading ??= afterInteractive()
    .then(() => Promise.all([import("gsap"), import("gsap/ScrollTrigger")]))
    .then(([g, st]) => {
      g.gsap.registerPlugin(st.ScrollTrigger);
      return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
    });
  return loading;
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Așteaptă ca thread-ul principal să fie liber. */
export function whenIdle(timeout = 900): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve();
    if ("requestIdleCallback" in window) window.requestIdleCallback(() => resolve(), { timeout });
    else setTimeout(resolve, 200);
  });
}

let interactive: Promise<void> | null = null;
const EVENTS = ["pointermove", "pointerdown", "keydown", "touchstart", "wheel", "scroll"] as const;

/**
 * Prima interacțiune a vizitatorului (pe un moment liber). Fără temporizator de rezervă: tot ce folosește GSAP
 * pornește la derulare (orbita, titlurile, paralaxa, harta care intră în ecran), iar ce e deja în ecran la
 * încărcare rămâne static, deci cine doar citește nu plătește ~70 KB de JavaScript și un task lung degeaba.
 */
export function afterInteractive(): Promise<void> {
  interactive ??= new Promise<void>((resolve) => {
    if (typeof window === "undefined") return resolve();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      EVENTS.forEach((e) => window.removeEventListener(e, finish));
      whenIdle(500).then(resolve);
    };
    EVENTS.forEach((e) => window.addEventListener(e, finish, { once: true, passive: true }));
  });
  return interactive;
}
