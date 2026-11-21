"use client";

import { useEffect, useRef } from "react";
import { easeReveal } from "@/lib/ease";

const DURATION = 900;
const TIME = /^(\d{1,2}):(\d{2})$/;
const NUMBER = /^(\d+)(.*)$/;
/** Spațiu cât o cifră: lățimea rămâne aceeași cât numără (0 → 140) */
const FIGURE_SPACE = " ";
const pad = (n: number) => String(n).padStart(2, "0");

/** Cum arată valoarea la o fracțiune din drum (0–1): ore în minute (00:00 → 05:00), numere întregi (0 → 140 lei). */
function formatter(value: string): ((p: number) => string) | null {
  const time = TIME.exec(value);
  if (time) {
    const total = Number(time[1]) * 60 + Number(time[2]);
    return (p) => {
      const m = Math.round(total * p);
      return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
    };
  }
  const num = NUMBER.exec(value);
  if (num) {
    const n = Number(num[1]);
    return (p) => String(Math.round(n * p)).padStart(num[1].length, FIGURE_SPACE) + num[2];
  }
  return null;
}

/**
 * O oră sau un preț care numără de la zero când intră în ecran, o singură dată (0,9 s, aceeași curbă ca restul
 * dezvăluirilor). Ce e deja în ecran la montare (de ex. rândurile noi la schimbarea direcției) rămâne cum e.
 * Fără JavaScript sau cu „reduced motion”: valoarea finală. Cititoarele de ecran primesc doar valoarea finală.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const format = formatter(value);
    if (!el || !format || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.bottom > 0 && r.top < window.innerHeight) return;

    el.textContent = format(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / DURATION);
          el.textContent = p < 1 ? format(easeReveal(p)) : value;
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = value;
    };
  }, [value]);

  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      {/* `key`: la o valoare nouă, React pune un element nou (textul lui e schimbat din efect, nu de React) */}
      <span key={value} ref={ref} aria-hidden>
        {value}
      </span>
    </span>
  );
}
