"use client";

import { useEffect, useRef } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

type Props = { text: string; className?: string; as?: "p" | "h2" };

/** Paragraf ale cărui cuvinte se „aprind” pe rând, pe măsură ce derulezi. */
export function WordsReveal({ text, className, as: Tag = "p" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.to(el.querySelectorAll(".w"), {
          color: getComputedStyle(el).color,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: 0.4 },
        });
      }, el);
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  const words = text.split(/\s+/);
  return (
    <Tag ref={ref as React.Ref<HTMLParagraphElement & HTMLHeadingElement>} className={className} data-words="">
      {words.map((w, i) => (
        <span key={i} className="w">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
