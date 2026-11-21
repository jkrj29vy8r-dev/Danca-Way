"use client";

import { useEffect, useRef } from "react";
import { loadGsap, prefersReducedMotion, whenIdle } from "@/lib/gsap";

const COUNT = 120;
const pad = (i: number) => String(i).padStart(3, "0");
/** 1600 px pe desktop (16:9), 800 px pe telefon (9:16, latura lungă) */
const SET = {
  desktop: { base: "/media/orbita-16x9/1600", mp4: "/media/orbita-16x9.mp4", poster: "/media/orbita-16x9-poster.jpg" },
  mobil: { base: "/media/orbita-9x16/800", mp4: "/media/orbita-9x16.mp4", poster: "/media/orbita-9x16-poster.jpg" },
};

export type Caption = { title: string; note?: string | null };

/** Unde apare fiecare legendă pe parcursul orbitei (0–1): intră, stă, iese. */
const WINDOWS: [number, number][] = [
  [0.02, 0.3],
  [0.36, 0.64],
  [0.7, 0.98],
];
const FADE = 0.06;
const captionOpacity = (p: number, [a, b]: [number, number]) => Math.max(0, Math.min(1, (p - a) / FADE, (b - p) / FADE));

/**
 * Orbita la derulare: cele 120 de cadre desenate pe un canvas, legate de derulare cu GSAP ScrollTrigger (scrub 0.5).
 * Secțiunea are 250vh; ecranul din interior rămâne lipit (sticky, deci locul e rezervat din CSS, fără salturi când
 * se încarcă GSAP). Primele 10 cadre se cer imediat, restul pe momente libere. Fără canvas: clipul MP4 în buclă.
 * Cu „reduced motion”: o singură fotografie, fără fixare (din CSS).
 */
export function Orbit({
  captions,
  still,
  children,
}: {
  captions: Caption[];
  still: { desktop: string; mobil: string };
  /** Rămâne pe ecran tot timpul (ex. linkul spre fișa tehnică) */
  children?: React.ReactNode;
}) {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const caps = useRef<(HTMLDivElement | null)[]>([]);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = section.current;
    const c = canvas.current;
    if (!el || !c || prefersReducedMotion()) return;
    const set = window.matchMedia("(min-width: 48rem)").matches ? SET.desktop : SET.mobil;
    const ctx = c.getContext("2d", { alpha: false });
    const fallback = () => {
      const v = video.current;
      if (!v) return;
      el.setAttribute("data-fallback", "");
      v.poster = set.poster;
      v.src = set.mp4;
      v.play().catch(() => {});
    };
    if (!ctx) return fallback();

    let alive = true;
    const frames: (HTMLImageElement | null)[] = Array(COUNT).fill(null);
    let drawn = -1;
    let current = 0;
    let progress = 0;

    const draw = (force = false) => {
      const i = Math.max(0, Math.min(COUNT - 1, Math.round(current)));
      if (!force && i === drawn) return;
      let im: HTMLImageElement | null = null;
      for (let d = 0; d < COUNT && !im; d++) im = frames[i - d] ?? frames[i + d] ?? null;
      if (!im) return;
      // Canvasul are exact rezoluția cadrelor: desenare 1:1, fără scalare; întinderea pe ecran o face CSS (object-fit)
      if (c.width !== im.naturalWidth) {
        c.width = im.naturalWidth;
        c.height = im.naturalHeight;
      }
      ctx.drawImage(bitmaps.get(i) ?? im, 0, 0);
      drawn = i;
    };
    const paintCaptions = () =>
      caps.current.forEach((cap, k) => {
        if (cap) cap.style.opacity = captionOpacity(progress, WINDOWS[k]).toFixed(3);
      });

    // Cadrele spre care merge derularea, gata decodate (ImageBitmap): desenarea nu mai așteaptă decodarea WebP.
    // O fereastră de ~20 de cadre în jurul țintei (16 în direcția derulării), ca memoria să rămână mică pe telefon.
    const bitmaps = new Map<number, ImageBitmap>();
    const pending = new Set<number>();
    let dir = 1;
    const warm = (i: number) => {
      if (typeof createImageBitmap !== "function") return;
      const lo = Math.max(0, i - (dir > 0 ? 4 : 16));
      const hi = Math.min(COUNT - 1, i + (dir > 0 ? 16 : 4));
      for (const [k, bm] of bitmaps) {
        if (k >= lo - 6 && k <= hi + 6) continue;
        bm.close();
        bitmaps.delete(k);
      }
      for (let k = lo; k <= hi; k++) {
        const im = frames[k];
        if (!im || bitmaps.has(k) || pending.has(k)) continue;
        pending.add(k);
        createImageBitmap(im)
          .then((bm) => (alive ? bitmaps.set(k, bm) : bm.close()))
          .catch(() => {})
          .finally(() => pending.delete(k));
      }
    };

    const load = (k: number, priority: "high" | "low") =>
      new Promise<void>((done) => {
        const im = new Image();
        im.decoding = "async";
        im.fetchPriority = priority;
        im.src = `${set.base}/${pad(k)}.webp`;
        im.decode()
          .then(() => {
            if (!alive) return;
            frames[k] = im;
            if (Math.abs(k - Math.round(current)) <= 1 || drawn < 0) draw(true);
          })
          .catch(() => k === 0 && fallback())
          .finally(done);
      });

    // Primele 10 cadre când secțiunea se apropie; restul câte 4, pe momente libere
    const order = Array.from({ length: COUNT }, (_, k) => k);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        Promise.all(order.slice(0, 10).map((k) => load(k, "high"))).then(async () => {
          for (let k = 10; k < COUNT && alive; k += 4) {
            await whenIdle(600);
            await Promise.all(order.slice(k, k + 4).map((j) => load(j, "low")));
          }
        });
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(el);

    // Derularea: cadrul și legendele, netezite cu scrub 0.5
    let kill = () => {};
    loadGsap().then(({ gsap }) => {
      if (!alive) return;
      const state = { f: 0 };
      const tween = gsap.to(state, {
        f: COUNT - 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          // Ținta derulării (înainte de netezire): pregătim cadrele spre care se îndreaptă desenul
          onUpdate: (self) => {
            dir = self.direction;
            warm(Math.round(self.progress * (COUNT - 1)));
          },
        },
        onUpdate: () => {
          current = state.f;
          progress = state.f / (COUNT - 1);
          draw();
          paintCaptions();
        },
      });
      kill = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    paintCaptions();

    return () => {
      alive = false;
      io.disconnect();
      kill();
      bitmaps.forEach((bm) => bm.close());
    };
  }, []);

  return (
    <section ref={section} className="orbit bg-night text-white" data-bg="night" aria-labelledby="orbita-titlu">
      <div className="orbit-sticky">
        {/* Fotografia de pornire: fără JavaScript, cu „reduced motion” și până se desenează primul cadru */}
        <picture className="orbit-still">
          <source media="(min-width: 48rem)" srcSet={still.desktop} />
          <img src={still.mobil} alt="Autocarul Setra S 517 HD al Danca Way, în studio, din față-lateral" loading="lazy" decoding="async" />
        </picture>
        <canvas ref={canvas} className="orbit-canvas" aria-hidden />
        <video ref={video} className="orbit-video" muted playsInline loop aria-hidden />
        <div className="orbit-captions container-x">
          {captions.map((cap, k) => (
            <div key={cap.title} ref={(n) => void (caps.current[k] = n)} className="orbit-caption">
              {k === 0 ? (
                <h2 id="orbita-titlu" className="t-48">
                  {cap.title}
                </h2>
              ) : (
                <p className="t-48 font-semibold">{cap.title}</p>
              )}
              {cap.note && <p className="t-14 mt-3 text-mist">{cap.note}</p>}
            </div>
          ))}
        </div>
        {children}
      </div>
    </section>
  );
}
