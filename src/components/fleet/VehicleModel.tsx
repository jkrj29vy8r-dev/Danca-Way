"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type ModelViewerElement = HTMLElement & { autoRotate: boolean; exposure: number };

type Props = {
  /** Fișierul .glb din /public (comprimat Draco) */
  glb: string;
  /** Descrierea modelului pentru cititoarele de ecran */
  alt: string;
  /** Pagina deschisă la o atingere (fără tragere) pe model */
  href?: string;
  /** Unghiul de pornire, „azimut elevație” (același unghi ca imaginea PNG de rezervă) */
  orbit?: string;
  /**
   * Scara modelului: distanța camerei e `scale × (1 + 0,58 × lățime/înălțime)` metri, măsurată pe cadrele 21:9, 16:10
   * și 4:3, ca autocarul să ocupe 55–75% din lățime fără să fie tăiat.
   */
  scale?: number;
  /** Cadrul (aspectul, fundalul) */
  className?: string;
  /** Imaginea PNG de rezervă: apare până se încarcă modelul și rămâne singură fără WebGL sau fără JavaScript */
  children: React.ReactNode;
};

/** Decodorul Draco e găzduit pe site (public/draco), nu pe un CDN străin */
const DRACO = "/draco/";

/**
 * Câmpul vizual vertical pentru cadrul dat, cu cel orizontal constant (38°): obiectiv „lung”, fără deformarea
 * părții din față a autocarului.
 */
function fovFor(aspect: number) {
  const h = (38 * Math.PI) / 180; // câmpul vizual orizontal, constant
  const v = (2 * Math.atan(Math.tan(h / 2) / aspect) * 180) / Math.PI;
  return `${Math.min(40, Math.max(12, v)).toFixed(1)}deg`;
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Modelul 3D al vehiculului, cu <model-viewer>: albastru-marin mat (expunere redusă, ca în imaginea PNG), umbră moale, se rotește lent cât ții mouse-ul pe card,
 * se trage 360° cu mouse-ul sau cu degetul (scroll-ul vertical rămâne liber pe telefon). Biblioteca se încarcă abia
 * când cardul se apropie de ecran. Fără WebGL rămâne imaginea PNG primită ca `children`.
 */
export function VehicleModel({ glb, alt, href, orbit = "35deg 76deg", scale = 1, className = "", children }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const mv = useRef<ModelViewerElement>(null);
  const [mode, setMode] = useState<"poster" | "3d">("poster");
  const [shown, setShown] = useState(false);
  const [cam, setCam] = useState({ fov: "20deg", orbit: `${orbit} ${(scale * 2).toFixed(2)}m` });
  const router = useRouter();

  // Câmpul vizual și distanța urmează forma cadrului (lat pe desktop, 4:3 pe telefon)
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (!el.clientHeight) return;
      const a = el.clientWidth / el.clientHeight;
      setCam({ fov: fovFor(a), orbit: `${orbit} ${(scale * (1 + 0.58 * a)).toFixed(2)}m` });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [orbit, scale]);

  // Biblioteca, doar cu WebGL și doar când modelul se apropie de ecran
  useEffect(() => {
    const el = box.current;
    if (!el || !hasWebGL()) return;
    let alive = true;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const w = window as unknown as { ModelViewerElement?: Record<string, unknown> };
        w.ModelViewerElement = { ...w.ModelViewerElement, dracoDecoderLocation: DRACO };
        import("@google/model-viewer")
          .then(() => alive && setMode("3d"))
          .catch(() => {});
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => {
      alive = false;
      io.disconnect();
    };
  }, []);

  // Imaginea de rezervă dispare abia după ce modelul e desenat; rotația lentă cât e mouse-ul pe card
  useEffect(() => {
    const m = mv.current;
    const el = box.current;
    if (mode !== "3d" || !m || !el) return;
    const onLoad = () => setShown(true);
    m.addEventListener("load", onLoad);
    // Ca număr: React ar trimite atributul ca text, pe care <model-viewer> îl ignoră
    m.exposure = 0.6;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const host = el.closest<HTMLElement>("[data-vehicle-card]") ?? el;
    const enter = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && !reduced) m.autoRotate = true;
    };
    const leave = () => {
      m.autoRotate = false;
    };
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);
    return () => {
      m.removeEventListener("load", onLoad);
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
    };
  }, [mode]);

  // O atingere scurtă (fără tragere) deschide fișa vehiculului
  const start = useRef<{ x: number; y: number; t: number } | null>(null);
  const onDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY, t: e.timeStamp };
  };
  const onUp = (e: React.PointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!href || !s) return;
    if (Math.hypot(e.clientX - s.x, e.clientY - s.y) < 6 && e.timeStamp - s.t < 600) router.push(href);
  };

  const live = mode === "3d";
  return (
    <div
      ref={box}
      className={`relative overflow-hidden ${live ? "z-10 cursor-grab active:cursor-grabbing" : "pointer-events-none"} ${className}`}
      onPointerDownCapture={live ? onDown : undefined}
      onPointerUpCapture={live ? onUp : undefined}
    >
      {live && (
        <model-viewer
          ref={mv}
          src={glb}
          alt={alt}
          loading="eager"
          reveal="auto"
          camera-controls=""
          disable-zoom=""
          disable-pan=""
          disable-tap=""
          interaction-prompt="none"
          touch-action="pan-y"
          camera-orbit={cam.orbit}
          field-of-view={cam.fov}
          min-field-of-view="10deg"
          min-camera-orbit="auto 62deg 0.5m"
          max-camera-orbit="auto 86deg auto"
          rotation-per-second="16deg"
          auto-rotate-delay="0"
          interpolation-decay="120"
          shadow-intensity="1.4"
          shadow-softness="1"
          environment-image="legacy"
          className="absolute inset-0"
          style={{ width: "100%", height: "100%", background: "transparent", "--poster-color": "transparent" }}
        />
      )}
      <div
        aria-hidden={shown || undefined}
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${shown ? "opacity-0" : "opacity-100"}`}
      >
        {children}
      </div>
    </div>
  );
}
