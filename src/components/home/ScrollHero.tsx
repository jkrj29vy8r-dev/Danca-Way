"use client";

import { useEffect, useRef } from "react";
import { whenIdle } from "@/lib/gsap";

const COUNT = 121;
const FIRST = "/hero/f001.webp";
const frameSrc = (i: number) => `/hero/f${String(i + 1).padStart(3, "0")}.webp`;
/** Cât din scroll-ul secțiunii ocupă mișcarea camerei; restul e pentru titlu. */
const FILM_END = 0.72;
/** Câte cadre se încarcă înainte de orice altceva (restul, după prima afișare, pe rând) */
const EAGER = 12;
export const SCRUB_MEDIA = "(min-width: 48rem) and (prefers-reduced-motion: no-preference)";

type Props = {
  /** srcset pentru posterul 16:9 (desktop cu „reduced motion”) */
  desktopSrcSet: string;
  /** posterul 4:3 pentru telefon */
  phone: { src: string; srcSet?: string; width?: number | `${number}`; height?: number | `${number}` };
  alt: string;
};

/**
 * Secvența de cadre desenată pe un canvas, condusă de scroll (ca pe paginile de produs Apple).
 * Progresul secțiunii ajunge în CSS ca `--p` (0…1): titlul, voalul și indicatorul de scroll îl citesc direct.
 */
export function ScrollHero({ desktopSrcSet, phone, alt }: Props) {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(SCRUB_MEDIA);
    let stop = () => {};
    const setup = () => {
      stop();
      stop = mq.matches && section.current && canvas.current ? scrub(section.current, canvas.current) : () => {};
    };
    setup();
    mq.addEventListener("change", setup);
    return () => {
      mq.removeEventListener("change", setup);
      stop();
    };
  }, []);

  return (
    <section ref={section} className="hero bg-night text-white" data-bg="night" aria-labelledby="hero-title">
      {/* Primul cadru, preîncărcat doar acolo unde rulează secvența */}
      <link rel="preload" as="image" href={FIRST} media={SCRUB_MEDIA} fetchPriority="high" />
      <div className="hero-stage">
        <div className="hero-media">
          <picture>
            <source media={SCRUB_MEDIA} srcSet={FIRST} />
            <source media="(min-width: 48rem)" srcSet={desktopSrcSet} sizes="100vw" />
            <img
              src={phone.src}
              srcSet={phone.srcSet}
              sizes="100vw"
              width={phone.width}
              height={phone.height}
              alt={alt}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 size-full object-cover"
            />
          </picture>
          <canvas ref={canvas} aria-hidden className="hero-canvas absolute inset-0 size-full" />
          <div aria-hidden className="hero-scrim absolute inset-0 bg-night" />
        </div>

        <div className="hero-copy container-x">
          <h1 id="hero-title" className="t-112 max-w-[14ch] lg:max-w-none">
            <span className="hero-line block">Din Neamț la București.</span>
            <span className="hero-line block text-mist" style={{ "--d": 0.06 } as React.CSSProperties}>
              Din Otopeni, acasă.
            </span>
          </h1>
        </div>

        <div aria-hidden className="hero-cue">
          <span className="label">Derulează</span>
          <span className="hero-cue-line" />
        </div>
      </div>
    </section>
  );
}

/* ───────── Secvența ───────── */
function scrub(section: HTMLElement, canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return () => {};
  const frames: (HTMLImageElement | null)[] = Array(COUNT).fill(null);
  let alive = true;
  let cur = 0;
  let target = 0;
  let drawn = -1;
  let raf = 0;

  const load = (i: number) =>
    new Promise<void>((resolve) => {
      const im = new Image();
      im.decoding = "async";
      im.src = frameSrc(i);
      im.decode()
        .then(() => {
          if (!alive) return;
          frames[i] = im;
          if (drawn < 0 || Math.abs(Math.round(cur) - i) < 2) draw(true);
        })
        .catch(() => {})
        .finally(resolve);
    });

  // Primele cadre imediat; restul după încărcarea paginii (evenimentul `load`) și un moment liber,
  // câte 6 deodată, în ordinea în care vor fi văzute.
  const pageLoaded = new Promise<void>((r) => (document.readyState === "complete" ? r() : window.addEventListener("load", () => r(), { once: true })));
  Promise.all([...Array.from({ length: EAGER }, (_, i) => load(i)), pageLoaded]).then(async () => {
    await whenIdle(1200);
    let next = EAGER;
    const worker = async () => {
      while (alive && next < COUNT) await load(next++);
    };
    await Promise.all(Array.from({ length: 6 }, worker));
  });

  const nearest = (i: number) => {
    for (let d = 0; d < COUNT; d++) {
      if (frames[i - d]) return frames[i - d];
      if (frames[i + d]) return frames[i + d];
    }
    return null;
  };

  function draw(force = false) {
    const i = Math.max(0, Math.min(COUNT - 1, Math.round(cur)));
    if (!force && i === drawn) return;
    const im = nearest(i);
    if (!im || !ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;
    // „cover”, cu subiectul ușor la dreapta centrului (fața autocarului)
    const s = Math.max(cw / im.naturalWidth, ch / im.naturalHeight);
    const w = im.naturalWidth * s;
    const h = im.naturalHeight * s;
    ctx.drawImage(im, (cw - w) * 0.6, (ch - h) / 2, w, h);
    drawn = frames[i] ? i : -2;
    section.dataset.live = "";
  }

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    draw(true);
  };

  const progress = () => {
    const r = section.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
  };

  const tick = () => {
    raf = 0;
    const p = progress();
    section.style.setProperty("--p", p.toFixed(4));
    target = Math.min(1, p / FILM_END) * (COUNT - 1);
    // Urmărire ușor amortizată: fără sacadări când rotița sare câte 100 px
    cur += (target - cur) * 0.22;
    if (Math.abs(target - cur) < 0.04) cur = target;
    draw();
    if (cur !== target) raf = requestAnimationFrame(tick);
  };
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  window.addEventListener("scroll", onScroll, { passive: true });
  cur = target = Math.min(1, progress() / FILM_END) * (COUNT - 1);
  resize();
  tick();

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    ro.disconnect();
    window.removeEventListener("scroll", onScroll);
    section.style.removeProperty("--p");
    delete section.dataset.live;
  };
}
