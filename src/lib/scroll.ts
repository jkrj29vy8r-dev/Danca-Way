import { prefersReducedMotion } from "./gsap";

/** Derulare nativă până la un element (offset-ul pentru header vine din `scroll-padding-top`). */
export function scrollToEl(el: Element) {
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
}
