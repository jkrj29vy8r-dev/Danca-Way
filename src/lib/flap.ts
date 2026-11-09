import type { gsap as GsapType } from "gsap";

/**
 * Efectul de tabelă de plecări (split-flap): fiecare cifră se întoarce de câteva ori prin cifre
 * aleatorii și se oprește pe valoarea corectă. Doar transform (rotateX) + textContent.
 * Durata totală ≤ ~1,1 s.
 */
export function flipDigits(gsap: typeof GsapType, root: Element) {
  const cells = Array.from(root.querySelectorAll<HTMLElement>(".flap-c"));
  const tl = gsap.timeline();
  cells.forEach((c, i) => {
    const final = c.dataset.final ?? c.textContent ?? "";
    c.dataset.final = final;
    const sub = gsap.timeline();
    const flips = 3 + i;
    for (let k = 0; k < flips; k++) {
      sub
        .call(() => {
          c.textContent = String(Math.floor(Math.random() * 10));
        })
        .fromTo(c, { rotateX: -85 }, { rotateX: 0, duration: 0.06, ease: "none" });
    }
    sub
      .call(() => {
        c.textContent = final;
      })
      .fromTo(c, { rotateX: -90 }, { rotateX: 0, duration: 0.55, ease: "expo.out" });
    tl.add(sub, i * 0.06);
  });
  return tl;
}

/** Readuce cifrele la valoarea corectă (după o animație întreruptă). */
export function resetDigits(root: ParentNode) {
  root.querySelectorAll<HTMLElement>(".flap-c").forEach((c) => {
    if (c.dataset.final) c.textContent = c.dataset.final;
  });
}
