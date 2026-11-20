import { getImageProps } from "next/image";
import { HeroMotion } from "./HeroMotion";
import { coach } from "@/config/fleet";
import { sizeOf } from "@/data/images";

const DESK = "/images/hero-setra-studio.jpg";
const PHONE = "/images/hero-setra-studio-portrait.jpg";
const ALT = `Autocarul ${coach.name} al Danca Way, din față-lateral, într-un studio întunecat`;

/**
 * Hero ca la o lansare de model: fotografia autocarului pe tot ecranul, titlul pe fundalul închis de deasupra lui.
 * <picture>: încadrare lată pe desktop, verticală pe telefon; next/image generează AVIF/WebP pentru fiecare lățime.
 * La încărcare imaginea se retrage 4%, apoi alunecă lent la scroll (HeroMotion). Fără JS: imagine statică.
 */
export function Hero() {
  const common = { alt: ALT, sizes: "100vw", quality: 80 };
  const desk = getImageProps({ ...common, src: DESK, ...sizeOf(DESK) }).props;
  const phone = getImageProps({ ...common, src: PHONE, ...sizeOf(PHONE) }).props;
  return (
    <section className="hero-launch bg-night text-white" data-bg="night" aria-labelledby="hero-title">
      <HeroMotion>
        <picture>
          <source media="(min-width: 48rem)" srcSet={desk.srcSet} sizes="100vw" />
          <img
            src={phone.src}
            srcSet={phone.srcSet}
            sizes="100vw"
            width={phone.width}
            height={phone.height}
            alt={ALT}
            fetchPriority="high"
            decoding="async"
            className="hero-launch-img"
          />
        </picture>
      </HeroMotion>
      <div aria-hidden className="hero-launch-scrim" />
      <div className="hero-launch-copy container-x">
        <h1 id="hero-title" className="t-112 max-w-[13ch] lg:t-72 lg:max-w-none">
          <span className="reveal-line">
            <span style={{ "--i": 0 } as React.CSSProperties}>Din Neamț la București.</span>
          </span>
          <span className="reveal-line text-mist">
            <span style={{ "--i": 1 } as React.CSSProperties}>Din Otopeni, acasă.</span>
          </span>
        </h1>
        <p className="label mt-8 hidden text-mist md:block">{coach.name}</p>
      </div>
    </section>
  );
}
