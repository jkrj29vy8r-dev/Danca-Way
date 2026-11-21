"use client";

import { useEffect, useRef } from "react";

/** Clipul „lights on”, la exact încadrarea fotografiei din hero (ultimul cadru = fotografia). */
const SRC = {
  desktop: { webm: "/media/intro-hero-desktop.webm", mp4: "/media/intro-hero-desktop.mp4", poster: "/media/intro-hero-desktop-poster.jpg" },
  mobil: { webm: "/media/intro-hero-mobil.webm", mp4: "/media/intro-hero-mobil.mp4", poster: "/media/intro-hero-mobil-poster.jpg" },
};
/** Clipul are 5 s; îl rulăm de 2× mai repede, ca tot intro-ul (cu titlul) să încapă în 3,5 s. */
const RATE = 2;
/** Titlul pornește cu ~0,55 s (timp real) înainte de finalul clipului. */
const TEXT_AT = 3.9;
/** Dacă clipul n-a pornit până atunci, rămâne fotografia (rețea lentă, autoplay blocat). */
const START_TIMEOUT = 1500;
/** Limita întregului intro, de la montare. */
const HARD_CAP = 3500;

let played = false;

/**
 * Intro-ul hero-ului, doar la prima vizită din sesiune (clasa `intro` pe <html>, pusă înainte de primul cadru):
 * fotografia e întunecată (nu acoperită), clipul pornește abia după ce ea s-a încărcat (ea rămâne LCP) și apare
 * doar când rulează,
 * apoi se topește în fotografie și titlul urcă linie cu linie. Orice derulare sare peste intro.
 * Fără clasa `intro` (a doua vizită, „reduced motion”, altă pagină) elementul rămâne gol și ascuns.
 */
export function HeroIntro() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    const root = document.documentElement;
    if (!v || played || !root.classList.contains("intro") || root.classList.contains("intro-done")) return;
    played = true;
    try {
      sessionStorage.setItem("dw-intro", "1");
    } catch {}
    // Aceeași limită ca <picture>: 48rem
    const src = window.matchMedia("(min-width: 48rem)").matches ? SRC.desktop : SRC.mobil;
    v.poster = src.poster;

    const timers: number[] = [];
    let done = false;
    const text = () => root.classList.add("intro-text");
    const finish = () => {
      if (done) return;
      done = true;
      text();
      root.classList.add("intro-done");
      detach();
      timers.push(window.setTimeout(() => v.pause(), 600));
    };
    const onTime = () => v.currentTime >= TEXT_AT && text();
    const onPlaying = () => root.classList.add("intro-playing");
    const onScroll = () => window.scrollY > 4 && finish();
    const onKey = (e: KeyboardEvent) => ["ArrowDown", "PageDown", " ", "End"].includes(e.key) && finish();
    const rate = () => (v.playbackRate = RATE);
    const skipEvents = ["wheel", "touchmove"] as const;
    const detach = () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("ended", finish);
      v.removeEventListener("loadedmetadata", rate);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      skipEvents.forEach((e) => window.removeEventListener(e, finish));
    };
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("ended", finish);
    v.addEventListener("loadedmetadata", rate);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    skipEvents.forEach((e) => window.addEventListener(e, finish, { passive: true }));
    timers.push(window.setTimeout(finish, HARD_CAP));

    // Clipul se încarcă abia după fotografia din hero (LCP-ul paginii)
    const still = document.querySelector<HTMLImageElement>(".hero-launch picture img");
    const start = () => {
      if (done) return;
      v.src = v.canPlayType('video/webm; codecs="vp9"') ? src.webm : src.mp4;
      rate();
      v.play().catch(finish);
      timers.push(window.setTimeout(() => v.currentTime === 0 && finish(), START_TIMEOUT));
    };
    if (!still || (still.complete && still.naturalWidth)) start();
    else still.addEventListener("load", start, { once: true });

    return () => {
      timers.forEach(clearTimeout);
      detach();
      still?.removeEventListener("load", start);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="hero-launch-img hero-intro-video"
      muted
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
      disablePictureInPicture
    />
  );
}
