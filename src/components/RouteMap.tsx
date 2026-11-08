"use client";

import { useEffect, useMemo, useRef } from "react";
import { cities, MAP_VIEWBOX, project, routes, type CityId } from "@/data/routes";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

/** Poziția etichetelor pe hartă, ca să nu se suprapună. */
const labels: Partial<Record<CityId, { side: "left" | "right"; text?: string }>> = {
  "piatra-neamt": { side: "left" },
  buhusi: { side: "left" },
  otopeni: { side: "left", text: "Otopeni" },
  constanta: { side: "left" },
};

type Props = {
  /** Orașele traseului evidențiat, în ordine */
  path: CityId[];
  /** „scroll”: linia se desenează la derulare; „mount”: se desenează imediat ce apare */
  trigger?: "scroll" | "mount";
  className?: string;
  title?: string;
};

type Pt = { x: number; y: number };

function polyline(points: Pt[]) {
  return points.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join("");
}

/** Toate segmentele unice din rețea (fundalul hărții). */
const networkSegments = (() => {
  const seen = new Set<string>();
  const segs: [CityId, CityId][] = [];
  for (const r of routes) {
    for (let i = 1; i < r.mapPath.length; i++) {
      const a = r.mapPath[i - 1];
      const b = r.mapPath[i];
      const key = [a, b].sort().join("|");
      if (!seen.has(key)) {
        seen.add(key);
        segs.push([a, b]);
      }
    }
  }
  return segs;
})();

const networkCities = Array.from(new Set(networkSegments.flat()));

export function RouteMap({ path, trigger = "scroll", className = "", title }: Props) {
  const root = useRef<SVGSVGElement>(null);

  const geo = useMemo(() => {
    const pts = path.map((id) => project(cities[id]));
    const segLens = pts.slice(1).map((p, i) => Math.hypot(p.x - pts[i].x, p.y - pts[i].y));
    const total = segLens.reduce((a, b) => a + b, 0);
    const fractions = [0];
    segLens.reduce((acc, l) => {
      fractions.push((acc + l) / total);
      return acc + l;
    }, 0);
    return { pts, segLens, total, fractions, d: polyline(pts) };
  }, [path]);

  useEffect(() => {
    const svg = root.current;
    if (!svg) return;
    if (prefersReducedMotion()) {
      svg.removeAttribute("data-animate");
      return;
    }
    const line = svg.querySelector<SVGPathElement>(".route-line")!;
    const head = svg.querySelector<SVGCircleElement>(".route-head")!;
    const stopEls = Array.from(svg.querySelectorAll<SVGGElement>("[data-stop-index]"));

    const render = (p: number) => {
      line.style.strokeDashoffset = String(geo.total * (1 - p));
      // Poziția „vehiculului” pe linie
      let dist = p * geo.total;
      let i = 0;
      while (i < geo.segLens.length - 1 && dist > geo.segLens[i]) {
        dist -= geo.segLens[i];
        i++;
      }
      const a = geo.pts[i];
      const b = geo.pts[i + 1] ?? a;
      const t = geo.segLens[i] ? Math.min(dist / geo.segLens[i], 1) : 0;
      head.setAttribute("cx", String(a.x + (b.x - a.x) * t));
      head.setAttribute("cy", String(a.y + (b.y - a.y) * t));
      head.style.opacity = p > 0.001 && p < 0.999 ? "1" : "0";
      stopEls.forEach((el) => {
        const f = geo.fractions[Number(el.dataset.stopIndex)];
        if (p >= f - 0.002) el.setAttribute("data-lit", "");
        else el.removeAttribute("data-lit");
      });
    };

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      render(0);
      ctx = gsap.context(() => {
        const state = { p: 0 };
        const vars = { p: 1, ease: "none", onUpdate: () => render(state.p) };
        if (trigger === "scroll") {
          gsap.to(state, {
            ...vars,
            scrollTrigger: { trigger: svg, start: "top 80%", end: "bottom 45%", scrub: 0.5 },
          });
        } else {
          gsap.to(state, { ...vars, duration: 1.8, ease: "power2.inOut" });
        }
      }, svg);
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [geo, trigger]);

  const activeSet = new Set(path);

  return (
    <svg
      ref={root}
      viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
      className={`route-map h-auto w-full overflow-visible ${className}`}
      role="img"
      aria-label={title ?? `Traseu: ${path.map((id) => cities[id].name).join(" – ")}`}
      data-animate=""
    >
      {/* Rețeaua completă, discretă */}
      <g stroke="rgb(255 255 255 / 0.14)" strokeWidth="1.5" strokeDasharray="2 6" strokeLinecap="round">
        {networkSegments.map(([a, b]) => {
          const p1 = project(cities[a]);
          const p2 = project(cities[b]);
          return <line key={`${a}-${b}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} />;
        })}
      </g>

      {/* Traseul evidențiat */}
      <path
        className="route-line"
        d={geo.d}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={geo.total}
        style={{ "--len": geo.total } as React.CSSProperties}
      />
      <circle className="route-head" r="6" fill="#fff" opacity="0" style={{ filter: "drop-shadow(0 0 6px #F2B705)" }} />

      {/* Orașe */}
      {networkCities.map((id) => {
        const c = cities[id];
        const { x, y } = project(c);
        const label = labels[id];
        const side = label?.side ?? "right";
        const index = path.indexOf(id);
        const active = activeSet.has(id);
        return (
          <g
            key={id}
            className="route-stop"
            data-stop-index={active ? index : undefined}
            data-lit={active ? "" : undefined}
          >
            {active && <circle className="halo" cx={x} cy={y} r="11" fill="rgb(242 183 5 / 0.18)" />}
            <circle
              className="dot"
              cx={x}
              cy={y}
              r={active ? 5 : 3.5}
              fill={active ? "var(--color-accent)" : "rgb(255 255 255 / 0.35)"}
              stroke={active ? "var(--color-night)" : "none"}
              strokeWidth="2"
            />
            <text
              x={side === "right" ? x + 14 : x - 14}
              y={y + 4.5}
              textAnchor={side === "right" ? "start" : "end"}
              fontSize="13"
              fontWeight={active ? 600 : 500}
              fill={active ? "#fff" : "rgb(255 255 255 / 0.45)"}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {label?.text ?? c.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
