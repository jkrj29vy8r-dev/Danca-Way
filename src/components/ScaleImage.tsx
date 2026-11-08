"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";
import type { Photo } from "@/data/photos";

/** Imagine pe toată lățimea, care se micșorează ușor (de la 112% la 100%) pe măsură ce derulezi. */
export function ScaleImage({ photo, className = "" }: { photo: Photo; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el || prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          el.querySelector("img"),
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom 40%", scrub: true },
          },
        );
      }, el);
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={wrap} className={`relative w-full overflow-hidden bg-navy ${className}`} data-surface="dark">
      <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-cover will-change-transform" />
    </div>
  );
}
