import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

type Loaded = { gsap: typeof GsapType; ScrollTrigger: typeof ScrollTriggerType };

let loading: Promise<Loaded> | null = null;

/** Încarcă GSAP + ScrollTrigger la cerere, ca să nu blocheze randarea inițială. */
export function loadGsap(): Promise<Loaded> {
  loading ??= whenIdle().then(() => Promise.all([import("gsap"), import("gsap/ScrollTrigger")])).then(([g, st]) => {
    g.gsap.registerPlugin(st.ScrollTrigger);
    return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
  });
  return loading;
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Așteaptă ca thread-ul principal să fie liber (după hidratare), ca animațiile să nu întârzie interactivitatea. */
export function whenIdle(timeout = 900): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve();
    if ("requestIdleCallback" in window) window.requestIdleCallback(() => resolve(), { timeout });
    else setTimeout(resolve, 200);
  });
}
