"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

type Gsap = Awaited<ReturnType<typeof loadGsap>>["gsap"];
type ST = Awaited<ReturnType<typeof loadGsap>>["ScrollTrigger"];

/** Easing și durate comune: lent, precis. */
const EASE = "expo.out";
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * Orchestrează micro-animațiile pe fiecare pagină (se reface la schimbarea rutei).
 * Totul este dezactivat cu prefers-reduced-motion; fără JavaScript conținutul rămâne static și vizibil.
 * Animăm doar transform, opacity și clip-path.
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
        disposers.push(countUps(gsap, ScrollTrigger));
        scrollProgress(gsap);
      });
      disposers.push(magneticButtons(gsap));
      disposers.push(backgroundMorph(ScrollTrigger));

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
  const splits = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal="lines"]')).map((el) =>
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
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
    const r = Number(frame.dataset.photoRadius || 0);
    const trigger = { trigger: frame, start: "top 90%", once: true };

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

/* ───────── Tabelă de plecări (split-flap): cifrele se întorc una câte una ───────── */
function splitFlaps(gsap: Gsap, ScrollTrigger: ST) {
  const cells: HTMLElement[] = [];
  document.querySelectorAll<HTMLElement>("[data-flap]").forEach((el) => {
    const digits = Array.from(el.querySelectorAll<HTMLElement>(".flap-c"));
    cells.push(...digits);
    const tl = gsap.timeline({ paused: true });
    digits.forEach((c, i) => {
      const final = c.dataset.final ?? c.textContent ?? "";
      c.dataset.final = final;
      const sub = gsap.timeline();
      const flips = 4 + i * 2;
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
        .fromTo(c, { rotateX: -90 }, { rotateX: 0, duration: 0.55, ease: EASE });
      tl.add(sub, i * 0.07);
    });
    ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: () => tl.play() });
  });
  // La ieșire, cifrele revin la valoarea corectă chiar dacă animația a fost întreruptă.
  return () => cells.forEach((c) => (c.textContent = c.dataset.final ?? c.textContent));
}

/* ───────── Numere care cresc o singură dată, când devin vizibile ───────── */
function countUps(gsap: Gsap, ScrollTrigger: ST) {
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
  const finals = els.map((el) => el.textContent);
  els.forEach((el) => {
    const target = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals || 0);
    const fmt = (v: number) => v.toFixed(decimals).replace(".", ",");
    const state = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () =>
        gsap.fromTo(
          state,
          { v: 0 },
          { v: target, duration: 1.6, ease: EASE, onUpdate: () => (el.textContent = fmt(state.v)) },
        ),
    });
  });
  return () => els.forEach((el, i) => (el.textContent = finals[i]));
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

/* ───────── Butoane magnetice (doar cu mouse) ───────── */
function magneticButtons(gsap: Gsap) {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};
  const offs = Array.from(document.querySelectorAll<HTMLElement>(".btn")).map((el) => {
    const qx = gsap.quickTo(el, "x", { duration: 0.9, ease: EASE });
    const qy = gsap.quickTo(el, "y", { duration: 0.9, ease: EASE });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      qx(clamp((e.clientX - (r.left + r.width / 2)) * 0.22, -8, 8));
      qy(clamp((e.clientY - (r.top + r.height / 2)) * 0.35, -6, 6));
    };
    const leave = () => {
      qx(0);
      qy(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.set(el, { x: 0, y: 0 });
    };
  });
  return () => offs.forEach((f) => f());
}

/* ───────── Fundal care trece lin între secțiunile închise și deschise ───────── */
const BG_ORDER = ["night", "navy", "light", "white"] as const;

function backgroundMorph(ScrollTrigger: ST) {
  const layers = BG_ORDER.map((c) => document.querySelector<HTMLElement>(`[data-bg-layer="${c}"]`));
  const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-bg]")).filter(
    (el) => !el.parentElement?.closest("[data-bg]"),
  );
  if (!sections.length || layers.some((l) => !l)) return () => {};
  const root = document.documentElement;
  root.classList.add("bg-morph");

  let tops: number[] = [];
  let colors: string[] = [];
  const last: string[] = [];
  const measure = () => {
    tops = sections.map((s) => {
      const box = s.parentElement?.classList.contains("pin-spacer") ? s.parentElement : s;
      return box.getBoundingClientRect().top + window.scrollY;
    });
    colors = sections.map((s) => s.dataset.bg ?? "white");
  };

  const apply = () => {
    const vh = window.innerHeight;
    const P = window.scrollY + vh * 0.5;
    const Z = vh * 0.35;
    let k = 0;
    for (let i = 0; i < tops.length; i++) if (tops[i] <= P) k = i;
    let a = colors[k];
    let b = colors[k];
    let t = 0;
    const next = tops[k + 1];
    if (next !== undefined && next - P < Z / 2) {
      b = colors[k + 1];
      t = clamp((P - (next - Z / 2)) / Z, 0, 1);
    } else if (k > 0 && P - tops[k] < Z / 2) {
      a = colors[k - 1];
      t = clamp((P - (tops[k] - Z / 2)) / Z, 0, 1);
    }
    const ia = BG_ORDER.indexOf(a as (typeof BG_ORDER)[number]);
    const ib = BG_ORDER.indexOf(b as (typeof BG_ORDER)[number]);
    layers.forEach((l, i) => {
      let o = 0;
      if (ia === ib) o = i === ia ? 1 : 0;
      else if (i === Math.min(ia, ib)) o = 1;
      else if (i === Math.max(ia, ib)) o = ib > ia ? t : 1 - t;
      // Scriem în DOM doar când valoarea se schimbă.
      const v = o.toFixed(3);
      if (last[i] !== v) {
        last[i] = v;
        l!.style.opacity = v;
      }
    });
  };

  let raf = 0;
  const onScroll = () => {
    if (!raf)
      raf = requestAnimationFrame(() => {
        raf = 0;
        apply();
      });
  };
  const onRefresh = () => {
    measure();
    apply();
  };
  onRefresh();
  ScrollTrigger.addEventListener("refresh", onRefresh);
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    cancelAnimationFrame(raf);
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    window.removeEventListener("scroll", onScroll);
    root.classList.remove("bg-morph");
  };
}
