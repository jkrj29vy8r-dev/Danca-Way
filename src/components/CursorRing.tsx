"use client";

import { useEffect, useRef } from "react";

/** Cuvântul din inel, după ținta de sub cursor. */
function wordFor(el: Element): string | null {
  const explicit = el.closest<HTMLElement>("[data-cursor]");
  if (explicit) return explicit.dataset.cursor || null;
  const a = el.closest("a, button");
  if (!a) return null;
  const href = a.getAttribute("href") ?? "";
  if (href.startsWith("tel:")) return "Sună";
  if (href.includes("wa.me")) return "Scrie";
  if (href.includes("autogari")) return "Rezervă";
  if (a.matches("[data-photo] a, a:has([data-photo]), a.group")) return "Vezi";
  return "";
}

/**
 * Cursorul de pe desktop: un inel mic care urmează mouse-ul cu inerție și crește pe butoane și carduri, cu un
 * cuvânt („Vezi”, „Rezervă”, „Sună”, „Scrie”). Cursorul obișnuit rămâne (inelul doar îl însoțește); dispare peste
 * câmpurile de text. Ascuns pe ecranele tactile și cu „reduced motion”.
 */
export function CursorRing() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const r = ring.current;
    const l = label.current;
    if (!r || !l) return;
    if (!window.matchMedia("(pointer: fine) and (hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tx = -100,
      ty = -100,
      x = tx,
      y = ty,
      raf = 0;
    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      r.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.2 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      if (!r.hasAttribute("data-on")) {
        x = tx;
        y = ty;
        r.setAttribute("data-on", "");
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element;
      const field = t.closest("input, textarea, select, [contenteditable]");
      r.toggleAttribute("data-hidden", !!field);
      // culoarea inelului după fundalul secțiunii (alb pe bleumarin, bleumarin pe alb)
      const dark = t.closest("[data-bg]")?.getAttribute("data-bg") === "night" || !!t.closest(".on-dark, footer, header");
      r.toggleAttribute("data-dark", dark);
      const w = wordFor(t);
      r.toggleAttribute("data-active", w !== null);
      l.textContent = w ?? "";
      r.toggleAttribute("data-word", !!w);
    };
    const onLeave = () => r.removeAttribute("data-on");
    const onDown = () => r.setAttribute("data-press", "");
    const onUp = () => r.removeAttribute("data-press");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div ref={ring} className="cursor-ring" aria-hidden>
      <span ref={label} className="cursor-word" />
    </div>
  );
}
