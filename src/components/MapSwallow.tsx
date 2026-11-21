"use client";

import { useEffect, useRef } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

type Pt = { x: number; y: number };

type Props = {
  /** Punctele liniei active (coordonatele hărții) și orașele de pe ea, în ordine */
  pts: Pt[];
  cities: string[];
  /** Dimensiunea hărții (viewBox) */
  width: number;
  height: number;
  /** Harta a fost desenată (rândunica apare abia după linie) */
  svg: React.RefObject<SVGSVGElement | null>;
};

const DRACO = "/draco/";
const GLB = "/media/live/randunica.glb";
const deg = (r: number) => (r * 180) / Math.PI;

/** Lungimile cumulate ale unei polilinii (pentru opriri și pentru poziția la o distanță dată). */
function cumulative(pts: Pt[]) {
  const c = [0];
  for (let i = 1; i < pts.length; i++) c.push(c[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  return c;
}
function at(pts: Pt[], cum: number[], d: number): Pt {
  const L = cum[cum.length - 1];
  const t = Math.max(0, Math.min(L, d));
  let i = 1;
  while (i < cum.length - 1 && cum[i] < t) i++;
  const a = pts[i - 1];
  const b = pts[i];
  const seg = cum[i] - cum[i - 1] || 1;
  const k = (t - cum[i - 1]) / seg;
  return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
}

/**
 * model-viewer (4.x), la fiecare schimbare de `orientation`, cheamă și partea de AR (`arRenderer.onUpdateScene`),
 * care presupune o sesiune AR deschisă și aruncă o eroare când nu e (scena AR e null). Site-ul nu folosește AR:
 * apelul rămâne activ doar în timpul unei sesiuni AR. Randorul e comun (singleton), îl găsim prin simbolurile private.
 */
function patchArUpdate(m: HTMLElement) {
  try {
    for (let o: object | null = m; o; o = Object.getPrototypeOf(o)) {
      for (const s of Object.getOwnPropertySymbols(o)) {
        const v = (m as unknown as Record<symbol, unknown>)[s] as { arRenderer?: { isPresenting: boolean; onUpdateScene: () => void; __dw?: boolean } } | undefined;
        const ar = v && typeof v === "object" ? v.arRenderer : undefined;
        if (!ar || ar.__dw) continue;
        const original = ar.onUpdateScene;
        ar.onUpdateScene = () => {
          if (ar.isPresenting) original();
        };
        ar.__dw = true;
        return;
      }
    }
  } catch {}
}

/**
 * Rândunica din logo zboară pe linia activă a hărții pe măsură ce derulezi orarul: își schimbă direcția lin
 * (direcția e măsurată pe o porțiune de linie, nu pe un singur segment, deci colțurile devin curbe) și se înclină
 * în viraje; opririle se aprind când trece de ele.
 * Desktop (mouse, ecran lat): modelul 3D real (model-viewer, încărcat doar aici, Draco, 3 KB), văzut de sus.
 * Telefon: aceeași rândunică, randată din model ca imagine (fără WebGL). Cu „reduced motion”: nu zboară.
 */
export function MapSwallow({ pts, cities, width, height, svg }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const bird = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    const b = bird.current;
    const map = svg.current;
    if (!el || !b || !map || prefersReducedMotion()) return;
    const cum = cumulative(pts);
    const L = cum[cum.length - 1];
    const stops = Array.from(map.querySelectorAll<SVGGElement>(".route-stop[data-city]"));
    const stopAt = new Map(cities.map((c, i) => [c, cum[i]]));
    const use3d =
      window.matchMedia("(pointer: fine) and (min-width: 64rem)").matches &&
      !!document.createElement("canvas").getContext("webgl2");

    let mv: (HTMLElement & { orientation: string }) | null = null;
    let alive = true;
    if (use3d) {
      const w = window as unknown as { ModelViewerElement?: Record<string, unknown> };
      w.ModelViewerElement = { ...w.ModelViewerElement, dracoDecoderLocation: DRACO };
      import("@google/model-viewer")
        .then(() => {
          if (!alive) return;
          const m = document.createElement("model-viewer") as HTMLElement & { orientation: string; exposure: number };
          for (const [k, v] of Object.entries({
            src: GLB,
            "camera-orbit": "0deg 0deg 2.7m",
            "min-camera-orbit": "auto 0deg auto",
            "camera-target": "0m 0m 0m",
            "field-of-view": "30deg",
            "interaction-prompt": "none",
            "disable-zoom": "",
            "disable-pan": "",
            "disable-tap": "",
            "environment-image": "neutral",
            "shadow-intensity": "0",
            loading: "eager",
            "aria-hidden": "true",
          }))
            m.setAttribute(k, v);
          m.exposure = 1.05;
          m.className = "map-bird-3d";
          patchArUpdate(m);
          m.addEventListener("load", () => b.setAttribute("data-3d", ""), { once: true });
          b.appendChild(m);
          mv = m;
        })
        .catch(() => {});
    }

    // Ținta vine din derulare (ScrollTrigger, scrub); desenăm pe cadru, doar când se schimbă
    let target = 0;
    let cur = 0;
    let raf = 0;
    let lastO = "";
    const draw = () => {
      raf = 0;
      cur += (target - cur) * 0.14;
      if (Math.abs(target - cur) > 0.05) raf = requestAnimationFrame(draw);
      const d = cur * L;
      const p = at(pts, cum, d);
      // direcția pe o fereastră de ±14 unități: colțurile liniei devin viraje line
      const a = at(pts, cum, d - 14);
      const c = at(pts, cum, d + 14);
      const heading = Math.atan2(c.y - a.y, c.x - a.x);
      const h1 = Math.atan2(p.y - a.y, p.x - a.x);
      const h2 = Math.atan2(c.y - p.y, c.x - p.x);
      let turn = h2 - h1;
      if (turn > Math.PI) turn -= 2 * Math.PI;
      if (turn < -Math.PI) turn += 2 * Math.PI;
      const bank = Math.max(-38, Math.min(38, deg(turn) * 2.2));
      const r = el.getBoundingClientRect();
      const x = (p.x / width) * r.width;
      const y = (p.y / height) * r.height;
      b.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
      b.style.setProperty("--heading", `${deg(heading).toFixed(1)}deg`);
      b.style.setProperty("--bank", `${Math.cos((bank * Math.PI) / 180).toFixed(3)}`);
      b.style.opacity = cur > 0.002 && cur < 0.998 ? "1" : cur >= 0.998 ? "1" : "0";
      if (mv) {
        // model-viewer: yaw = direcția (axa Y), pitch = înclinarea pe axa corpului (ordinea Euler YXZ)
        const o = `0deg ${bank.toFixed(0)}deg ${(-deg(heading)).toFixed(0)}deg`;
        if (o !== lastO) mv.orientation = lastO = o;
      }
      for (const s of stops) {
        const sd = stopAt.get(s.dataset.city!);
        if (sd === undefined) continue;
        if (sd <= d + 2) s.setAttribute("data-passed", "");
        else s.removeAttribute("data-passed");
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    let kill = () => {};
    loadGsap().then(({ ScrollTrigger }) => {
      if (!alive) return;
      const section = el.closest("section") ?? el;
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 55%",
        end: "bottom 75%",
        onUpdate: (self) => {
          target = self.progress;
          kick();
        },
      });
      target = st.progress;
      kick();
      kill = () => st.kill();
    });
    const onResize = () => kick();
    window.addEventListener("resize", onResize);

    return () => {
      alive = false;
      kill();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      stops.forEach((s) => s.removeAttribute("data-passed"));
      mv?.remove();
    };
  }, [pts, cities, width, height, svg]);

  return (
    <div ref={box} className="map-bird-layer" aria-hidden>
      <div ref={bird} className="map-bird">
        {/* Rândunica randată din modelul 3D, văzută de sus (imaginea de pe telefon și până se încarcă 3D-ul) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/live/randunica-sus.webp" alt="" width={138} height={192} className="map-bird-2d" decoding="async" loading="lazy" />
      </div>
    </div>
  );
}
