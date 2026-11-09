"use client";

import { useEffect, useRef } from "react";
import { SWALLOW_BEAK, SWALLOW_PATH } from "../icons";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Două trasee pentru rândunică:
 * - `photo`: peste fotografia din hero (viewBox 1440×640), pornește de jos și se oprește în cerul din dreapta-sus;
 * - `text`: când nu există fotografie, zboară de la capătul logo-ului spre dreapta (viewBox 800×200), doar pe desktop.
 */
const VARIANTS = {
  photo: {
    viewBox: "0 0 1440 640",
    aspect: "xMaxYMid slice",
    trail: "M560 700C680 580 800 540 940 530S1140 480 1120 340S1120 210 1180 180",
    end: { x: 1180, y: 180, rotate: -27 },
    scale: 0.95,
    className: "absolute inset-0 h-full w-full",
  },
  text: {
    viewBox: "0 0 800 200",
    aspect: "xMinYMid meet",
    trail: "M-10 120C110 160 220 40 360 70S560 130 700 30",
    end: { x: 700, y: 30, rotate: -35 },
    scale: 0.85,
    // În containerul hero-ului, în dreapta logo-ului (520px + 3rem), pe aceeași bandă verticală cu el.
    className:
      "absolute top-[4.5rem] right-10 hidden h-[200px] w-[calc(100%-5rem-min(520px,82vw)-3rem)] max-w-[800px] md:top-[6.5rem] md:block",
  },
} as const;

export function SwallowTrail({ variant }: { variant: keyof typeof VARIANTS }) {
  const root = useRef<SVGSVGElement>(null);
  const cfg = VARIANTS[variant];

  useEffect(() => {
    const svg = root.current;
    if (!svg) return;
    // Ascuns (ex. varianta desktop pe mobil) sau mișcare redusă: rămâne desenul static complet.
    if (prefersReducedMotion() || svg.getBoundingClientRect().width === 0) {
      svg.removeAttribute("data-animate");
      return;
    }
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    let removeMouse = () => {};

    Promise.all([loadGsap(), import("gsap/MotionPathPlugin")])
      .then(([{ gsap }, { MotionPathPlugin }]) => {
        if (cancelled) return;
        gsap.registerPlugin(MotionPathPlugin);
        const trail = svg.querySelector<SVGPathElement>(".trail-path")!;
        const mask = svg.querySelector<SVGPathElement>(".trail-mask")!;
        const bird = svg.querySelector<SVGGElement>(".swallow")!;
        const fly = svg.querySelector<SVGGElement>(".swallow-fly")!;
        const mouse = svg.querySelector<SVGGElement>(".swallow-mouse")!;
        const len = trail.getTotalLength();

        ctx = gsap.context(() => {
          gsap.set(mask, { strokeDasharray: len, strokeDashoffset: len });
          // Zborul începe după ce logo-ul și titlul s-au așezat (cel mult două lucruri în mișcare deodată);
          // traseul punctat apare exact în urma rândunicii, apoi ea rămâne pe loc.
          const tl = gsap.timeline({ delay: 1.3 });
          tl.set(bird, { opacity: 1 })
            .to(mask, { strokeDashoffset: 0, duration: 1.2, ease: "expo.out" }, 0)
            .to(
              bird,
              {
                duration: 1.2,
                ease: "expo.out",
                motionPath: { path: trail, align: trail, alignOrigin: [0.5, 0.5], autoRotate: true },
              },
              0,
            );

          // La scroll, rândunica își continuă zborul înainte.
          gsap.to(fly, {
            x: 420,
            y: -30,
            ease: "none",
            scrollTrigger: { trigger: svg.closest("section"), start: "top top", end: "bottom top", scrub: 0.8 },
          });
        }, svg);

        // Parallax discret după mouse (doar pe desktop, cu pointer fin).
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          const section = svg.closest("section")!;
          const qx = gsap.quickTo(mouse, "x", { duration: 1.2, ease: "expo.out" });
          const qy = gsap.quickTo(mouse, "y", { duration: 1.2, ease: "expo.out" });
          const onMove = (e: PointerEvent) => {
            const r = section.getBoundingClientRect();
            qx(((e.clientX - r.left) / r.width - 0.5) * 24);
            qy(((e.clientY - r.top) / r.height - 0.5) * 16);
          };
          section.addEventListener("pointermove", onMove);
          removeMouse = () => section.removeEventListener("pointermove", onMove);
        }
      })
      .catch(() => svg.removeAttribute("data-animate"));

    return () => {
      cancelled = true;
      removeMouse();
      ctx?.revert();
    };
  }, []);

  const maskId = `trail-reveal-${variant}`;
  return (
    <svg
      ref={root}
      className={`swallow-trail pointer-events-none overflow-visible ${cfg.className}`}
      viewBox={cfg.viewBox}
      preserveAspectRatio={cfg.aspect}
      aria-hidden
      focusable="false"
      data-animate=""
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-400" y="-400" width="2400" height="1600">
          <path className="trail-mask" d={cfg.trail} fill="none" stroke="#fff" strokeWidth="14" strokeDasharray="3200" />
        </mask>
      </defs>
      <path
        className="trail-path"
        d={cfg.trail}
        fill="none"
        stroke="rgb(255 255 255 / 0.45)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="0 13"
        mask={`url(#${maskId})`}
      />
      <g className="swallow" transform={`translate(${cfg.end.x} ${cfg.end.y}) rotate(${cfg.end.rotate})`}>
        <g className="swallow-fly">
          <g className="swallow-mouse">
            <g className="swallow-float">
              <g transform={`scale(${cfg.scale}) translate(-30 -32)`}>
                <path d={SWALLOW_PATH} fill="#fff" />
                <path d={SWALLOW_BEAK} fill="#F2B705" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
