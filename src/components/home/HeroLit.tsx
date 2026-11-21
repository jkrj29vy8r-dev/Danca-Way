"use client";

import { useEffect, useRef } from "react";
import { whenIdle } from "@/lib/gsap";

type Props = {
  /** srcset-ul variantei cu faruri pentru ecranele late (de la 48rem) */
  deskSrcSet: string;
  /** varianta de telefon (încadrarea 9:16) */
  phone: { src: string; srcSet?: string; width: number; height: number };
};

/**
 * Aceeași fotografie din hero, cu farurile aprinse, peste cea normală. Opacitatea ei (--lit, 0 → 1) e legată de
 * derulare de HeroMotion, pe primele 30% din înălțimea ecranului. Fișierele se cer abia după ce fotografia
 * principală (LCP-ul) s-a încărcat și browserul e liber. Decorativă: textul alternativ e pe fotografia principală.
 */
export function HeroLit({ deskSrcSet, phone }: Props) {
  const ref = useRef<HTMLPictureElement>(null);

  useEffect(() => {
    const pic = ref.current;
    const still = document.querySelector<HTMLImageElement>(".hero-launch picture:not(.hero-lit-pic) img");
    if (!pic) return;
    let alive = true;
    const load = () =>
      whenIdle(1500).then(() => {
        if (!alive) return;
        pic.querySelector("source")!.srcset = deskSrcSet;
        const img = pic.querySelector("img")!;
        if (phone.srcSet) img.srcset = phone.srcSet;
        img.src = phone.src;
      });
    if (!still || (still.complete && still.naturalWidth)) load();
    else still.addEventListener("load", load, { once: true });
    return () => {
      alive = false;
      still?.removeEventListener("load", load);
    };
  }, [deskSrcSet, phone]);

  return (
    <picture ref={ref} className="hero-lit-pic">
      <source media="(min-width: 48rem)" sizes="100vw" />
      <img alt="" aria-hidden width={phone.width} height={phone.height} sizes="100vw" decoding="async" className="hero-launch-img hero-lit" />
    </picture>
  );
}
