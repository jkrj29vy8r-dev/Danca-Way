"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

export type ResolvedHotspot = { id: string; title: string; frame: number; x: number; y: number; value: string | null };

type Props = {
  /** Folderul cadrelor, ex. „/360/setra-s517hd” (conține 800/ și 1600/) */
  base: string;
  count: number;
  /** Raportul lățime/înălțime al cadrelor */
  ratio: number;
  label: string;
  hotspots: ResolvedHotspot[];
  /** În dezvoltare: arată unde lipsește o valoare din fleet.ts */
  showTodo?: boolean;
};

const pad = (i: number) => String(i).padStart(3, "0");
const mod = (a: number, n: number) => ((a % n) + n) % n;

/**
 * Vedere 360° ca într-un configurator: cadrele (72 × 5°) desenate pe un canvas.
 * Tragi cu mouse-ul sau cu degetul (inerție la eliberare), săgețile stânga/dreapta rotesc câte 5°.
 * Se încarcă după hero (când secțiunea se apropie de ecran): 800 px pe telefon, 1600 px pe desktop, cu un inel de progres.
 * La prima intrare în ecran face o singură rotație lentă (nu și cu „reduced motion”).
 */
export function Viewer360({ base, count, ratio, label, hotspots, showTodo }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const frames = useRef<(HTMLImageElement | null)[]>(Array(count).fill(null));
  const pos = useRef(0); // poziția (în cadre, fracționară)
  const drawn = useRef(-1);
  const [frame, setFrame] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [touched, setTouched] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const stopAnim = useRef<() => void>(() => {});
  const uid = useId();

  const draw = useCallback(
    (force = false) => {
      const c = canvas.current;
      const ctx = c?.getContext("2d");
      if (!c || !ctx) return;
      const i = mod(Math.round(pos.current), count);
      if (!force && i === drawn.current) return;
      // cel mai apropiat cadru deja încărcat (cât timp se încarcă restul)
      let im: HTMLImageElement | null = null;
      for (let d = 0; d < count && !im; d++) im = frames.current[mod(i - d, count)] ?? frames.current[mod(i + d, count)];
      if (!im) return;
      ctx.drawImage(im, 0, 0, c.width, c.height);
      drawn.current = i;
      setFrame(i);
    },
    [count],
  );

  // Încărcare leneșă: abia când secțiunea se apropie de ecran. Ordine: cadrul 0, apoi din 6 în 6, apoi restul.
  useEffect(() => {
    const el = wrap.current;
    const c = canvas.current;
    if (!el || !c) return;
    let alive = true;
    const size = el.clientWidth < 900 ? 800 : 1600;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(el.clientWidth * dpr);
      c.height = Math.round((el.clientWidth / ratio) * dpr);
      draw(true);
    };
    const order = [0, ...Array.from({ length: count }, (_, k) => k).filter((k) => k && k % 6 === 0), ...Array.from({ length: count }, (_, k) => k).filter((k) => k % 6)];
    const start = () => {
      let next = 0;
      const worker = async () => {
        while (alive && next < order.length) {
          const k = order[next++];
          const im = new Image();
          im.decoding = "async";
          im.src = `${base}/${size}/${pad(k)}.webp`;
          try {
            await im.decode();
          } catch {
            continue;
          }
          if (!alive) return;
          frames.current[k] = im;
          setLoaded((n) => n + 1);
          if (Math.abs(mod(Math.round(pos.current), count) - k) < 1 || drawn.current < 0) draw(true);
        }
      };
      Array.from({ length: 4 }, worker);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        start();
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();
    return () => {
      alive = false;
      io.disconnect();
      ro.disconnect();
    };
  }, [base, count, ratio, draw]);

  const ready = loaded >= count;

  // O singură rotație lentă la prima intrare în ecran, după ce s-au încărcat cadrele (fără „reduced motion”).
  useEffect(() => {
    const el = wrap.current;
    if (!ready || !el || touched || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || e.intersectionRatio < 0.6 || started) return;
        started = true;
        const t0 = performance.now();
        const from = pos.current;
        const step = (t: number) => {
          const k = Math.min(1, (t - t0) / 4200);
          const ease = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
          pos.current = from + ease * count;
          draw();
          if (k < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: [0.6] },
    );
    io.observe(el);
    stopAnim.current = () => {
      cancelAnimationFrame(raf);
      started = true;
    };
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ready, touched, count, draw]);

  // Tragere cu inerție
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dragging = false;
    let lastX = 0;
    let lastT = 0;
    let vel = 0; // cadre pe ms
    let raf = 0;
    const perPx = () => count / (el.clientWidth * 1.1); // o tură completă ≈ lățimea vizualizatorului
    const down = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      dragging = true;
      lastX = e.clientX;
      lastT = e.timeStamp;
      vel = 0;
      cancelAnimationFrame(raf);
      stopAnim.current();
      setTouched(true);
      setOpen(null);
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dt = Math.max(1, e.timeStamp - lastT);
      const df = -dx * perPx();
      pos.current += df;
      vel = 0.8 * (df / dt) + 0.2 * vel;
      lastX = e.clientX;
      lastT = e.timeStamp;
      draw();
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      if (reduced) return;
      let last = performance.now();
      const coast = (t: number) => {
        const dt = t - last;
        last = t;
        pos.current += vel * dt;
        vel *= Math.pow(0.94, dt / 16.7);
        draw();
        if (Math.abs(vel) > 0.0004) raf = requestAnimationFrame(coast);
        else {
          pos.current = Math.round(pos.current);
          draw();
        }
      };
      raf = requestAnimationFrame(coast);
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [count, draw]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    stopAnim.current();
    setTouched(true);
    pos.current = Math.round(pos.current) + (e.key === "ArrowRight" ? 1 : -1);
    draw();
  };

  const angle = Math.round((frame * 360) / count);
  const near = (h: ResolvedHotspot) => {
    const d = Math.abs(mod(frame - h.frame + count / 2, count) - count / 2);
    return d <= 4 ? 1 - d / 5 : 0;
  };

  return (
    <div
      ref={wrap}
      className="v360 relative w-full touch-pan-y select-none"
      style={{ aspectRatio: String(ratio) }}
      tabIndex={0}
      role="slider"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={355}
      aria-valuenow={angle}
      aria-valuetext={`Unghi ${angle}°. Folosește săgețile stânga și dreapta pentru a roti.`}
      onKeyDown={onKey}
      data-ready={ready ? "" : undefined}
    >
      <canvas ref={canvas} aria-hidden className="absolute inset-0 size-full" />

      {/* Inel de progres cât timp se încarcă cadrele */}
      {!ready && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden>
          <svg viewBox="0 0 48 48" className="size-14 -rotate-90">
            <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="2" />
            <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray={`${(loaded / count) * 125.7} 125.7`} className="transition-[stroke-dasharray] duration-200" />
          </svg>
          <span className="sr-only">Se încarcă vederea 360°</span>
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {ready ? "Vederea 360° s-a încărcat." : ""}
      </p>

      {/* Indiciul „360°”, până la prima interacțiune */}
      <div className="v360-hint pointer-events-none absolute inset-x-0 bottom-6 flex justify-center" data-hidden={touched || !ready ? "" : undefined} aria-hidden>
        <span className="label inline-flex items-center gap-3 rounded-full bg-night/70 px-4 py-2 text-white">
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4" />
          </svg>
          360° · trage pentru a roti
        </span>
      </div>

      {/* Puncte pe autocar. În producție apar doar cele cu valoare completată în fleet.ts. */}
      {hotspots.filter((h) => h.value || showTodo).map((h) => {
        const o = near(h);
        const isOpen = open === h.id;
        return (
          <div
            key={h.id}
            className="v360-spot absolute"
            style={{ left: `${h.x * 100}%`, top: `${h.y * 100}%`, opacity: ready ? o : 0, pointerEvents: ready && o > 0.3 ? "auto" : "none" }}
          >
            <button
              type="button"
              className="v360-dot"
              aria-expanded={isOpen}
              aria-controls={`${uid}-${h.id}`}
              aria-label={h.title}
              tabIndex={ready && o > 0.3 ? 0 : -1}
              onClick={() => setOpen(isOpen ? null : h.id)}
            >
              <span aria-hidden>+</span>
            </button>
            <div id={`${uid}-${h.id}`} role="note" hidden={!isOpen} className="v360-note">
              <p className="font-semibold">{h.title}</p>
              <p className="t-14 mt-1 text-muted">
                {h.value ?? (showTodo ? "de completat în src/config/fleet.ts" : "—")}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
