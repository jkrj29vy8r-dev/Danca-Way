"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "./icons";

type Props = { children: React.ReactNode; label: string; tone?: "dark" | "light"; variant?: "default" | "tall" };

/** Bandă orizontală cu scroll-snap și butoane anterior/următor. Funcționează și fără JS (scroll nativ). */
export function SnapStrip({ children, label, tone = "dark", variant = "default" }: Props) {
  const ref = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

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

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const btn =
    tone === "dark"
      ? "border-white/20 text-white hover:bg-white hover:text-night disabled:opacity-30"
      : "border-night/15 text-night hover:bg-night hover:text-white disabled:opacity-30";

  return (
    <div>
      <div className="container-x mb-6 hidden justify-end gap-2 md:flex">
        <button type="button" onClick={() => go(-1)} disabled={edges.start} aria-label="Anterior" className={`grid size-12 place-items-center rounded-full border transition-colors disabled:pointer-events-none ${btn}`}>
          <ArrowLeft />
        </button>
        <button type="button" onClick={() => go(1)} disabled={edges.end} aria-label="Următor" className={`grid size-12 place-items-center rounded-full border transition-colors disabled:pointer-events-none ${btn}`}>
          <ArrowRight className="" aria-hidden />
        </button>
      </div>
      <ul ref={ref} className={`snap-strip ${variant === "tall" ? "snap-strip-tall" : ""}`} aria-label={label}>
        {children}
      </ul>
    </div>
  );
}
