"use client";

import { useEffect, useMemo, useRef } from "react";
import { cities, MAP_LINES, MAP_VIEWBOX, project, type CityId, type Route } from "@/data/routes";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

type Line = Route["line"];
type Pt = { x: number; y: number };

/** Distanța dintre cele două linii pe porțiunea comună (Roman – Bacău – Focșani). */
const GAP = 7;

const base = (id: CityId): Pt => project(cities[id]);

/** Decalează o polilinie perpendicular pe direcția de mers (spre dreapta). */
function offsetLine(ids: CityId[], d: number): Record<string, Pt> {
  const pts = ids.map(base);
  const out: Record<string, Pt> = {};
  ids.forEach((id, i) => {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(pts.length - 1, i + 1)];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    out[id] = { x: pts[i].x + (dy / len) * d, y: pts[i].y - (dx / len) * d };
  });
  return out;
}
const CT_OFFSET = offsetLine(MAP_LINES.constanta, GAP);

/** Punctul unui oraș pe o linie: ramura spre Constanța are propria geometrie, paralelă cu trunchiul. */
const pointOn = (line: Line, id: CityId): Pt => (line === "constanta" && CT_OFFSET[id]) || base(id);

const polyline = (pts: Pt[]) => pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join("");
const lengthOf = (pts: Pt[]) => pts.slice(1).reduce((acc, p, i) => acc + Math.hypot(p.x - pts[i].x, p.y - pts[i].y), 0);

const LINE_PTS: Record<Line, Pt[]> = {
  bucuresti: MAP_LINES.bucuresti.map((id) => pointOn("bucuresti", id)),
  constanta: MAP_LINES.constanta.map((id) => pointOn("constanta", id)),
};
const LINE_LEN: Record<Line, number> = { bucuresti: lengthOf(LINE_PTS.bucuresti), constanta: lengthOf(LINE_PTS.constanta) };
/** Fracțiunea din lungimea liniei la care se află fiecare oprire (pentru pulsul galben). */
const STOP_FRACTIONS: Record<Line, { id: CityId; f: number }[]> = (["bucuresti", "constanta"] as Line[]).reduce(
  (acc, line) => {
    const pts = LINE_PTS[line];
    let run = 0;
    acc[line] = MAP_LINES[line].map((id, i) => {
      if (i) run += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
      return { id, f: run / LINE_LEN[line] };
    });
    return acc;
  },
  {} as Record<Line, { id: CityId; f: number }[]>,
);

/** Orașe afișate și poziția etichetei. */
const STATIONS: { id: CityId; side: "left" | "right"; label?: string }[] = [
  { id: "targu-neamt", side: "right" },
  { id: "piatra-neamt", side: "left" },
  { id: "roman", side: "right" },
  { id: "buhusi", side: "left" },
  { id: "bacau", side: "right" },
  { id: "focsani", side: "right" },
  { id: "buzau", side: "left" },
  { id: "braila", side: "right" },
  { id: "otopeni", side: "left", label: "Otopeni" },
  { id: "bucuresti", side: "right" },
  { id: "constanta", side: "left" },
];
const onLine = (line: Line, id: CityId) => MAP_LINES[line].includes(id);

type Props = {
  /** Linia evidențiată în galben (tab-ul activ din orar) */
  activeLine: Line;
  /** Segmentul evidențiat (rândul de sub cursor / perechea căutată), ca listă de orașe */
  highlight?: { line: Line; path: CityId[] } | null;
  className?: string;
};

export function RouteMap({ activeLine, highlight = null, className = "" }: Props) {
  const root = useRef<SVGSVGElement>(null);
  const gsapRef = useRef<Awaited<ReturnType<typeof loadGsap>>["gsap"] | null>(null);
  const seen = useRef(false);
  const activeLineRef = useRef(activeLine);

  const hl = useMemo(() => {
    if (!highlight) return null;
    const pts = highlight.path.filter((id) => cities[id].lat).map((id) => pointOn(highlight.line, id));
    return { d: polyline(pts), len: lengthOf(pts), ids: new Set(highlight.path) };
  }, [highlight]);

  /** Desenează linia activă (1 s, expo.out), cu „autobuzul” în vârf și un puls galben la fiecare oprire. */
  const drawLine = (line: Line) => {
    const svg = root.current;
    const gsap = gsapRef.current;
    if (!svg || !gsap) return;
    const path = svg.querySelector<SVGPathElement>(`.active-${line}`);
    const head = svg.querySelector<SVGCircleElement>(".route-head");
    if (!path || !head) return;
    const len = LINE_LEN[line];
    const pts = LINE_PTS[line];
    const pulsed = new Set<CityId>();
    const state = { p: 0 };
    gsap.killTweensOf(state);
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(state, {
      p: 1,
      duration: 1.1,
      ease: "expo.out",
      onUpdate: () => {
        path.style.strokeDashoffset = String(len * (1 - state.p));
        // poziția vehiculului pe linie
        let dist = state.p * len;
        let i = 0;
        while (i < pts.length - 2 && dist > Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y)) {
          dist -= Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
          i++;
        }
        const a = pts[i];
        const b = pts[i + 1] ?? a;
        const seg = Math.hypot(b.x - a.x, b.y - a.y) || 1;
        const t = Math.min(dist / seg, 1);
        head.setAttribute("cx", String(a.x + (b.x - a.x) * t));
        head.setAttribute("cy", String(a.y + (b.y - a.y) * t));
        head.style.opacity = state.p < 0.98 ? "1" : "0";
        for (const s of STOP_FRACTIONS[line]) {
          if (state.p >= s.f - 0.002 && !pulsed.has(s.id)) {
            pulsed.add(s.id);
            const ring = svg.querySelector(`[data-pulse="${line}-${s.id}"]`);
            if (ring)
              gsap.fromTo(
                ring,
                { scale: 1, opacity: 0.9 },
                { scale: 3, opacity: 0, duration: 0.9, ease: "expo.out", transformOrigin: "50% 50%" },
              );
          }
        }
      },
    });
  };

  // Prima desenare: când harta intră în ecran.
  useEffect(() => {
    const svg = root.current;
    if (!svg) return;
    if (prefersReducedMotion()) {
      svg.removeAttribute("data-animate");
      return;
    }
    let cancelled = false;
    let st: { kill: () => void } | undefined;
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      gsapRef.current = gsap;
      st = ScrollTrigger.create({
        trigger: svg,
        start: "top 80%",
        once: true,
        onEnter: () => {
          seen.current = true;
          svg.setAttribute("data-drawn", "");
          drawLine(activeLineRef.current);
        },
      });
    });
    return () => {
      cancelled = true;
      st?.kill();
    };
  }, []);

  // Schimbarea tab-ului: linia nouă se desenează, cealaltă se estompează (CSS).
  useEffect(() => {
    if (activeLineRef.current === activeLine) return;
    activeLineRef.current = activeLine;
    if (seen.current) drawLine(activeLine);
  }, [activeLine]);

  // Segmentul evidențiat se desenează în 0,6 s.
  useEffect(() => {
    const svg = root.current;
    const gsap = gsapRef.current;
    if (!svg || !hl || !gsap || prefersReducedMotion()) return;
    const path = svg.querySelector<SVGPathElement>(".highlight");
    if (!path) return;
    gsap.fromTo(path, { strokeDashoffset: hl.len }, { strokeDashoffset: 0, duration: 0.6, ease: "expo.out" });
  }, [hl]);

  const label = `Harta curselor: linia ${activeLine === "constanta" ? "Roman – Bacău – Focșani – Brăila – Constanța" : "Târgu Neamț – Piatra Neamț – Roman – Bacău – Focșani – Buzău – Otopeni – București"}`;

  return (
    <svg
      ref={root}
      viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
      className={`route-map h-auto w-full overflow-visible ${className}`}
      role="img"
      aria-label={label}
      data-animate=""
      data-active={activeLine}
    >
      {/* Ramificație secundară (B3r prin Buhuși) */}
      <path
        d={polyline((["piatra-neamt", "buhusi", "bacau"] as CityId[]).map(base))}
        fill="none"
        stroke="rgb(255 255 255 / 0.14)"
        strokeWidth="1.5"
        strokeDasharray="2 6"
        strokeLinecap="round"
      />

      {/* Șinele ambelor linii (mereu vizibile, discrete) */}
      {(["bucuresti", "constanta"] as Line[]).map((line) => (
        <path
          key={`track-${line}`}
          d={polyline(LINE_PTS[line])}
          fill="none"
          stroke="rgb(255 255 255 / 0.16)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {/* Linia activă, în galben; cealaltă se estompează */}
      {(["bucuresti", "constanta"] as Line[]).map((line) => (
        <path
          key={`active-${line}`}
          className={`route-line active-${line}`}
          data-on={activeLine === line ? "" : undefined}
          d={polyline(LINE_PTS[line])}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={LINE_LEN[line]}
          style={{ "--len": LINE_LEN[line] } as React.CSSProperties}
        />
      ))}

      {/* Segmentul evidențiat (rândul selectat din orar) */}
      {hl && (
        <path
          className="highlight"
          d={hl.d}
          fill="none"
          stroke="#fff"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={hl.len}
        />
      )}
      <circle className="route-head" r="5.5" fill="#fff" opacity="0" />

      {/* Stații */}
      {STATIONS.map(({ id, side, label: text }) => {
        const inB = onLine("bucuresti", id);
        const inC = onLine("constanta", id);
        const pB = base(id);
        const pC = inC ? pointOn("constanta", id) : pB;
        const both = inB && inC;
        const lit = onLine(activeLine, id);
        const hot = hl?.ids.has(id) ?? false;
        const anchor = both ? (side === "right" ? (pC.x > pB.x ? pC : pB) : pC.x < pB.x ? pC : pB) : inC ? pC : pB;
        const name = text ?? cities[id].name;
        return (
          <g key={id} className="route-stop" data-lit={lit ? "" : undefined} data-hot={hot ? "" : undefined}>
            {(["bucuresti", "constanta"] as Line[])
              .filter((l) => onLine(l, id))
              .map((l) => {
                const p = pointOn(l, id);
                return (
                  <circle
                    key={l}
                    data-pulse={`${l}-${id}`}
                    cx={p.x}
                    cy={p.y}
                    r="6"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="2"
                    opacity="0"
                  />
                );
              })}
            {both ? (
              <line x1={pB.x} y1={pB.y} x2={pC.x} y2={pC.y} className="stop-capsule" strokeLinecap="round" />
            ) : (
              <circle cx={anchor.x} cy={anchor.y} r="5" className="stop-dot" />
            )}
            <text
              x={side === "right" ? anchor.x + 13 : anchor.x - 13}
              y={anchor.y + 4.5}
              textAnchor={side === "right" ? "start" : "end"}
              className="stop-label"
            >
              {name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
