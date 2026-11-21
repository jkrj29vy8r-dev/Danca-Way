"use client";

import { useEffect, useRef } from "react";
import { whenIdle } from "@/lib/gsap";
import { currentTimeOfDay, type TimeOfDay } from "@/lib/time-of-day";

const BASE = "/media/live";
const atmo = (t: TimeOfDay, f: "16x9" | "9x16") => `${BASE}/atmosfera-${t}-${f}`;

/** Arcul spotului: cât de repede ajunge la țintă (pe cadru, 60 fps). Mic = inerție, fără să pară lent. */
const FOLLOW = 0.075;

/**
 * Lumina vie din hero, în spatele autocarului (fotografia rămâne neatinsă):
 * - atmosfera momentului zilei (zori / zi / noapte, după ora din Neamț), în „screen”, mascată ca să nu treacă peste
 *   caroserie;
 * - un spot moale care urmează cursorul (desktop) sau, pe telefon, derularea, cu inerție; în spatele autocarului
 *   e mai puternic, pe caroserie doar o atingere (aceeași poziție, altă mască);
 * - praful din raza de lumină (doar desktop, al doilea video), cu o paralaxă mică opusă cursorului.
 * Pornește după fotografia LCP și după intro, doar cât hero-ul e în ecran. Cu „reduced motion”: doar posterul
 * atmosferei, fără spot și fără video.
 */
export function HeroLive() {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    const media = el?.parentElement;
    if (!el || !media) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 48rem)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const t = currentTimeOfDay();
    const f = desktop ? "16x9" : "9x16";
    el.dataset.ora = t;

    const atmoVideo = el.querySelector<HTMLVideoElement>(".hero-atmo video")!;
    const dustVideo = el.querySelector<HTMLVideoElement>(".hero-dust video");
    const videos = [atmoVideo, ...(desktop && dustVideo ? [dustVideo] : [])];
    const webm = atmoVideo.canPlayType('video/webm; codecs="vp9"') !== "";
    const ext = webm ? "webm" : "mp4";

    let alive = true;
    let visible = true;
    // „În repaus”: hero-ul n-a fost derulat mai mult de 30% din ecran. Peste atât, farurile preiau lumina (HeroMotion)
    // și stratul viu se stinge (--lit); videourile lui se opresc, ca derularea să rămână fluidă pe procesoare slabe.
    let resting = window.scrollY < window.innerHeight * 0.3;
    let started = false;
    const play = () => videos.forEach((v) => v.src && v.play().catch(() => {}));
    const pause = () => videos.forEach((v) => v.pause());

    const start = () => {
      if (!alive || started) return;
      started = true;
      atmoVideo.poster = `${atmo(t, f)}-poster.jpg`;
      if (!reduced) {
        atmoVideo.src = `${atmo(t, f)}.${ext}`;
        if (desktop && dustVideo) dustVideo.src = `${BASE}/praf-16x9.${ext}`;
        if (visible && resting) play();
      }
      el.setAttribute("data-on", "");
    };

    // După LCP (fotografia încărcată), pe un moment liber, și după intro (dacă rulează)
    const still = media.querySelector<HTMLImageElement>("picture img");
    const root = document.documentElement;
    const afterIntro = () =>
      new Promise<void>((resolve) => {
        if (!root.classList.contains("intro") || root.classList.contains("intro-done")) return resolve();
        const mo = new MutationObserver(() => {
          if (!root.classList.contains("intro-done")) return;
          mo.disconnect();
          resolve();
        });
        mo.observe(root, { attributes: true, attributeFilter: ["class"] });
      });
    const loaded = new Promise<void>((resolve) => {
      if (!still || (still.complete && still.naturalWidth)) resolve();
      else still.addEventListener("load", () => resolve(), { once: true });
    });
    Promise.all([loaded, afterIntro()])
      .then(() => whenIdle(1200))
      .then(start);

    // Doar cât hero-ul e în ecran: cele două videouri se opresc când pleci (cel mult două rulează odată pe pagină)
    const sync = () => {
      if (!started || reduced) return;
      if (visible && resting) play();
      else pause();
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(media);
    let restRaf = 0;
    const onRest = () => {
      if (restRaf) return;
      restRaf = requestAnimationFrame(() => {
        restRaf = 0;
        const r = window.scrollY < window.innerHeight * 0.3;
        if (r !== resting) {
          resting = r;
          sync();
        }
      });
    };
    window.addEventListener("scroll", onRest, { passive: true });

    if (reduced)
      return () => {
        alive = false;
        io.disconnect();
        window.removeEventListener("scroll", onRest);
      };

    // Spotul: țintă (cursor sau derulare) → poziție, cu inerție. Doar `translate` (compoziție, fără repictare).
    let tx = 0.62,
      ty = 0.3,
      x = tx,
      y = ty,
      raf = 0;
    const set = () => {
      const r = media.getBoundingClientRect();
      el.style.setProperty("--sx", `${(x * r.width).toFixed(1)}px`);
      el.style.setProperty("--sy", `${(y * r.height).toFixed(1)}px`);
      el.style.setProperty("--px", `${((0.5 - x) * 14).toFixed(2)}px`);
      el.style.setProperty("--py", `${((0.5 - y) * 10).toFixed(2)}px`);
    };
    const tick = () => {
      x += (tx - x) * FOLLOW;
      y += (ty - y) * FOLLOW;
      set();
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.0005 && visible ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !visible) return;
      const r = media.getBoundingClientRect();
      tx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      ty = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      kick();
    };
    const onScroll = () => {
      if (!visible) return;
      const r = media.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
      // pe telefon: spotul coboară și trece ușor spre dreapta pe măsură ce derulezi hero-ul
      tx = 0.3 + 0.45 * p;
      ty = 0.22 + 0.5 * p;
      kick();
    };
    set();
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    else window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      alive = false;
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onRest);
      cancelAnimationFrame(restRaf);
      pause();
    };
  }, []);

  return (
    <div ref={box} className="hero-live" aria-hidden>
      <div className="hero-live-fade">
      {/* În spatele autocarului: atmosfera și spotul, amestecate „screen” prin masca inversă */}
      <div className="hero-launch-img hero-live-behind">
        <div className="hero-atmo">
          <video muted playsInline loop preload="none" disablePictureInPicture />
        </div>
        <div className="hero-spot" />
      </div>
      {/* Pe caroserie: doar o atingere din același spot */}
      <div className="hero-launch-img hero-live-body">
        <div className="hero-spot" />
      </div>
      <div className="hero-dust">
        <video muted playsInline loop preload="none" disablePictureInPicture />
      </div>
      </div>
    </div>
  );
}
