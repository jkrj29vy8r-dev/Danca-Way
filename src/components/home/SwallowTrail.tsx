"use client";

import { useEffect, useRef } from "react";
import { SWALLOW_BEAK, SWALLOW_PATH } from "../icons";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

const TRAIL = "M-10 150C110 190 220 70 360 100S560 160 700 50";
const END = { x: 700, y: 50, rotate: -35 };

/**
 * Rândunica din logo zboară o singură dată, după ce titlul s-a așezat (un singur lucru în mișcare deodată),
 * lăsând în urmă un traseu punctat. Doar pe desktop, în spațiul liber din dreapta-sus al hero-ului.
 * Fără JavaScript sau cu mișcare redusă rămâne desenul static, complet.
 */
export function SwallowTrail() {
  const root = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = root.current;
    if (!svg) return;
    if (prefersReducedMotion() || svg.getBoundingClientRect().width === 0) {
      svg.removeAttribute("data-animate");
      return;
    }
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    Promise.all([loadGsap(), import("gsap/MotionPathPlugin")])
      .then(([{ gsap }, { MotionPathPlugin }]) => {
        if (cancelled) return;
        gsap.registerPlugin(MotionPathPlugin);
        const trail = svg.querySelector<SVGPathElement>(".trail-path")!;
        const mask = svg.querySelector<SVGPathElement>(".trail-mask")!;
        const bird = svg.querySelector<SVGGElement>(".swallow")!;
        const len = trail.getTotalLength();
        ctx = gsap.context(() => {
          gsap.set(mask, { strokeDasharray: len, strokeDashoffset: len });
          // Titlul se dezvăluie în ~1,3 s; zborul începe după el.
          const tl = gsap.timeline({ delay: Math.max(0, 1.4 - performance.now() / 1000) });
          tl.set(bird, { opacity: 1 })
            .to(mask, { strokeDashoffset: 0, duration: 1.2, ease: "expo.out" }, 0)
            .to(
              bird,
              { duration: 1.2, ease: "expo.out", motionPath: { path: trail, align: trail, alignOrigin: [0.5, 0.5], autoRotate: true } },
              0,
            );
        }, svg);
      })
      .catch(() => svg.removeAttribute("data-animate"));

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <svg
      ref={root}
      className="swallow-trail pointer-events-none absolute top-24 right-16 hidden h-[136px] w-[36%] max-w-[560px] overflow-visible lg:block"
      viewBox="0 0 800 200"
      preserveAspectRatio="xMaxYMid meet"
      aria-hidden
      focusable="false"
      data-animate=""
    >
      <defs>
        <mask id="trail-reveal" maskUnits="userSpaceOnUse" x="-400" y="-400" width="2400" height="1600">
          <path className="trail-mask" d={TRAIL} fill="none" stroke="#fff" strokeWidth="14" strokeDasharray="3200" />
        </mask>
      </defs>
      <path
        className="trail-path"
        d={TRAIL}
        fill="none"
        stroke="rgb(255 255 255 / 0.4)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="0 12"
        mask="url(#trail-reveal)"
      />
      <g className="swallow" transform={`translate(${END.x} ${END.y}) rotate(${END.rotate})`}>
        <g transform="scale(0.85) translate(-30 -32)">
          <path d={SWALLOW_PATH} fill="#fff" />
          <path d={SWALLOW_BEAK} fill="#fff" />
        </g>
      </g>
    </svg>
  );
}
