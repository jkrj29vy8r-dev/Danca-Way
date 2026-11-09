"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "./icons";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  label: string;
  tone?: "dark" | "light";
  variant?: "default" | "tall";
  /**
   * Pe desktop (≥1024px), secțiunea se fixează și scroll-ul vertical mută cardurile pe orizontală.
   * Pe mobil (și cu mișcare redusă) rămâne bandă cu swipe și snap.
   */
  pinOnDesktop?: boolean;
};

/** Bandă orizontală cu scroll-snap și butoane anterior/următor. Funcționează și fără JS (scroll nativ). */
export function SnapStrip({ children, label, tone = "dark", variant = "default", pinOnDesktop = false }: Props) {
  const ref = useRef<HTMLUListElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setEdges({
        start: el.scrollLeft < 8,
        end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Scroll orizontal fixat (pinned) pe desktop
  useEffect(() => {
    const el = ref.current;
    if (!pinOnDesktop || !el || prefersReducedMotion()) return;
    let mm: ReturnType<Awaited<ReturnType<typeof loadGsap>>["gsap"]["matchMedia"]> | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const media = gsap.matchMedia();
      mm = media;
      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const section = el.closest("section");
        const wrap = wrapRef.current;
        if (!section || !wrap) return;
        // Banda intră în lățimea conținutului: se văd 3–4 carduri întregi, fără carduri tăiate la margini.
        el.scrollLeft = 0;
        wrap.setAttribute("data-pinned", "");
        el.setAttribute("data-pinned", "");
        const distance = () => el.scrollWidth - el.clientWidth;
        const card = () => el.firstElementChild as HTMLElement | null;
        if (distance() <= 0) {
          wrap.removeAttribute("data-pinned");
          el.removeAttribute("data-pinned");
          return;
        }
        setPinned(true);
        // Pasul de oprire: câte un card (scroll-ul se așază mereu pe un card întreg).
        const steps = () => {
          const w = card()?.offsetWidth ?? 1;
          const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
          return Math.max(1, Math.round(distance() / (w + gap)));
        };
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            snap: { snapTo: (v: number) => Math.round(v * steps()) / steps(), duration: { min: 0.3, max: 0.8 }, ease: "expo.out" },
            invalidateOnRefresh: true,
          },
        });
        return () => {
          wrap.removeAttribute("data-pinned");
          el.removeAttribute("data-pinned");
          setPinned(false);
        };
      });
    });
    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, [pinOnDesktop]);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const btn =
    tone === "dark"
      ? "border-white/25 text-white hover:bg-white/10 disabled:opacity-30"
      : "border-night/20 text-night hover:bg-night/5 disabled:opacity-30";

  return (
    <div>
      {!pinned && (
        <div className="container-x mb-6 hidden justify-end gap-2 md:flex">
          <button type="button" onClick={() => go(-1)} disabled={edges.start} aria-label="Anterior" className={`grid size-12 place-items-center rounded-full border disabled:pointer-events-none ${btn}`}>
            <ArrowLeft />
          </button>
          <button type="button" onClick={() => go(1)} disabled={edges.end} aria-label="Următor" className={`grid size-12 place-items-center rounded-full border disabled:pointer-events-none ${btn}`}>
            <ArrowRight aria-hidden />
          </button>
        </div>
      )}
      <div ref={wrapRef} className="strip-clip">
        <ul ref={ref} className={`snap-strip ${variant === "tall" ? "snap-strip-tall" : ""}`} aria-label={label}>
          {children}
        </ul>
      </div>
    </div>
  );
}
