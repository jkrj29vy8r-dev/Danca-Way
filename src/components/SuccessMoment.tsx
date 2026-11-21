"use client";

import { useEffect, useRef, useState } from "react";
import { SUCCESS_EVENT, type SuccessKind } from "@/lib/success";

const TEXT: Record<SuccessKind, { title: string; note: string }> = {
  oferta: { title: "Cererea a plecat.", note: "Te sunăm cu prețul total și ora de plecare." },
  whatsapp: { title: "Ne vedem în WhatsApp.", note: "Scrie-ne traseul, data și câți sunteți." },
};
const SHOW_MS = 3400;

/**
 * Momentul de confirmare, scurt și liniștit: rândunica din logo traversează cardul, bifa se desenează singură,
 * o lumină caldă trece prin fundal. După ce formularul de ofertă a fost trimis cu succes sau după un clic pe
 * WhatsApp (când pagina redevine vizibilă, dacă s-a deschis aplicația). Nu blochează nimic, dispare singur.
 * Nu apare la biletele de pe autogari.ro: acolo nu putem ști dacă rezervarea a reușit.
 */
export function SuccessMoment() {
  const [kind, setKind] = useState<SuccessKind | null>(null);
  const [run, setRun] = useState(0);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let timer = 0;
    const show = (k: SuccessKind) => {
      setKind(k);
      setRun((r) => r + 1);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setKind(null), SHOW_MS);
    };
    const onEvent = (e: Event) => show(((e as CustomEvent<{ kind: SuccessKind }>).detail?.kind ?? "oferta") as SuccessKind);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href*="wa.me"]');
      if (!a) return;
      // Dacă s-a deschis aplicația, arătăm momentul când vizitatorul se întoarce pe pagină
      window.setTimeout(() => {
        if (document.visibilityState === "visible") return show("whatsapp");
        const back = () => {
          if (document.visibilityState !== "visible") return;
          document.removeEventListener("visibilitychange", back);
          show("whatsapp");
        };
        document.addEventListener("visibilitychange", back);
      }, 400);
    };
    window.addEventListener(SUCCESS_EVENT, onEvent);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener(SUCCESS_EVENT, onEvent);
      document.removeEventListener("click", onClick);
      window.clearTimeout(timer);
    };
  }, []);

  // Lumina caldă din fundal: clipul de 3 s se cere abia acum
  useEffect(() => {
    const v = video.current;
    if (!kind || !v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!v.src) v.src = v.canPlayType('video/webm; codecs="vp9"') ? "/media/live/pata-lumina-3s.webm" : "/media/live/pata-lumina-3s.mp4";
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [kind, run]);

  const t = kind ? TEXT[kind] : null;
  return (
    <div className="success-moment" data-open={kind ? "" : undefined} role="status" aria-live="polite">
      {t && (
        <div key={run} className="success-card">
          <video ref={video} className="success-light" muted playsInline preload="none" aria-hidden />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/live/randunica-zbor.webp" alt="" width={288} height={139} className="success-bird" aria-hidden />
          <svg className="success-check" viewBox="0 0 32 32" aria-hidden>
            <circle cx="16" cy="16" r="15" />
            <path d="M9.5 16.5l4.5 4.5 8.5-9" />
          </svg>
          <p className="min-w-0">
            <span className="block font-semibold">{t.title}</span>
            <span className="t-14 block text-mist">{t.note}</span>
          </p>
        </div>
      )}
    </div>
  );
}
