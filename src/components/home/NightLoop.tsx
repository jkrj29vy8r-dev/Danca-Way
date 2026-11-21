"use client";

import { useEffect, useRef } from "react";

const SRC = {
  webm: "/media/noapte-sosea-bucla-16x9.webm",
  mp4: "/media/noapte-sosea-bucla-16x9.mp4",
  poster: "/media/noapte-sosea-bucla-16x9-poster.jpg",
};

/**
 * Bucla de noapte (șoseaua de munte, 8 s) în spatele unei secțiuni întunecate: 35% opacitate, plus un strat
 * bleumarin de 40% peste ea, deci textul gri (--color-mist) are cel puțin 5:1 și cel alb cel puțin 9,5:1 chiar și
 * peste cele mai luminoase dâre (calculat pe cadrele clipului). Clipul stă lipit de ecran cât derulezi secțiunea.
 * Se încarcă abia când secțiunea se apropie, rulează doar cât e în ecran. Cu „reduced motion” sau Save-Data:
 * doar posterul.
 */
export function NightLoop() {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = box.current;
    const v = video.current;
    const section = el?.parentElement;
    if (!el || !v || !section) return;
    const still =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    let loaded = false;
    let visible = false;

    const load = () => {
      if (loaded) return;
      loaded = true;
      v.poster = SRC.poster;
      el.setAttribute("data-ready", "");
      if (still) return;
      v.src = v.canPlayType('video/webm; codecs="vp9"') ? SRC.webm : SRC.mp4;
      if (visible) v.play().catch(() => {});
    };

    // Aproape de ecran: cerem fișierele. În ecran: rulează; în afara lui: pauză.
    const near = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        load();
        near.disconnect();
      },
      { rootMargin: "100% 0px" },
    );
    const onScreen = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (!loaded || still) return;
      if (visible) v.play().catch(() => {});
      else v.pause();
    });
    near.observe(section);
    onScreen.observe(section);
    return () => {
      near.disconnect();
      onScreen.disconnect();
      v.pause();
    };
  }, []);

  return (
    <div ref={box} className="night-loop" aria-hidden>
      <div className="night-loop-sticky">
        <video ref={video} muted playsInline loop preload="none" disablePictureInPicture />
      </div>
    </div>
  );
}
