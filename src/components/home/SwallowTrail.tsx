"use client";

import { useEffect, useRef } from "react";
import { SWALLOW_BEAK, SWALLOW_PATH } from "../icons";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Traseul rândunicii (viewBox 0 0 1440 640, peste fotografia din hero).
 * Pornește de jos, din centru, și se oprește în dreapta-sus (cerul), orientată la ~-27°.
 */
const TRAIL = "M560 700C680 580 800 540 940 530S1140 480 1120 340S1120 210 1180 180";
const END = { x: 1180, y: 180, rotate: -27 };

export function SwallowTrail() {
  const root = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = root.current;
    if (!svg || prefersReducedMotion()) {
      svg?.removeAttribute("data-animate");
      return;
    }
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    Promise.all([loadGsap(), import("gsap/MotionPathPlugin")])
      .then(([{ gsap, ScrollTrigger }, { MotionPathPlugin }]) => {
        if (cancelled) return;
        gsap.registerPlugin(MotionPathPlugin);
        const trail = svg.querySelector<SVGPathElement>(".trail-path")!;
        const mask = svg.querySelector<SVGPathElement>(".trail-mask")!;
        const bird = svg.querySelector<SVGGElement>(".swallow")!;
        const fly = svg.querySelector<SVGGElement>(".swallow-fly")!;
        const float = svg.querySelector<SVGGElement>(".swallow-float")!;
        const len = trail.getTotalLength();

        ctx = gsap.context(() => {
          gsap.set(mask, { strokeDasharray: len, strokeDashoffset: len });
          svg.style.setProperty("--trail-len", String(len));

          const tl = gsap.timeline({ delay: 0.45 });
          tl.set(bird, { opacity: 1 })
            .to(mask, { strokeDashoffset: 0, duration: 3.4, ease: "power1.inOut" }, 0)
            .to(
              bird,
              {
                duration: 3.4,
                ease: "power1.inOut",
                motionPath: { path: trail, align: trail, alignOrigin: [0.5, 0.5], autoRotate: true },
              },
              0,
            )
            .to(float, { y: -7, duration: 1.8, ease: "sine.inOut", repeat: -1, yoyo: true });

          // Când hero-ul iese din ecran, rândunica își ia zborul.
          gsap.to(fly, {
            x: 460,
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: svg.closest("section"),
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });
          ScrollTrigger.refresh();
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
      className="swallow-trail pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 640"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden
      focusable="false"
      data-animate=""
    >
      <defs>
        <mask id="trail-reveal" maskUnits="userSpaceOnUse" x="-200" y="-100" width="1800" height="900">
          <path className="trail-mask" d={TRAIL} fill="none" stroke="#fff" strokeWidth="14" strokeDasharray="3200" />
        </mask>
      </defs>
      <path
        className="trail-path"
        d={TRAIL}
        fill="none"
        stroke="rgb(255 255 255 / 0.45)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="0 13"
        mask="url(#trail-reveal)"
      />
      <g className="swallow" transform={`translate(${END.x} ${END.y}) rotate(${END.rotate})`}>
        <g className="swallow-fly">
          <g className="swallow-float">
            <g transform="scale(0.95) translate(-30 -32)">
              <path d={SWALLOW_PATH} fill="#fff" />
              <path d={SWALLOW_BEAK} fill="#F2B705" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
