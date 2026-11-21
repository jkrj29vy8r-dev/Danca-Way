import { getImageProps } from "next/image";
import { HeroIntro } from "./HeroIntro";
import { HeroClock } from "./HeroClock";
import { HeroLit } from "./HeroLit";
import { HeroLive } from "./HeroLive";
import { HeroMotion } from "./HeroMotion";
import { coach } from "@/config/fleet";
import { sizeOf } from "@/data/images";

const cover = coach.cover!;
const DESK = cover.src;
const PHONE = cover.mobileSrc ?? cover.src;
const ALT = cover.alt;
/** Aceleași încadrări cu farurile aprinse (pentru derulare) */
const DESK_LIT = "/images/hero-setra-studio-faruri.jpg";
const PHONE_LIT = "/images/hero-setra-studio-faruri-mobil.jpg";

/** Titlul, pe rândurile lui vizibile: pe telefon câte o bucată pe rând, pe desktop două rânduri. */
const LINES = [
  { text: "Din Neamț", muted: false },
  { text: "la București.", muted: false },
  { text: "Din Otopeni,", muted: true },
  { text: "acasă.", muted: true },
];

/**
 * Hero ca la o lansare de model: fotografia autocarului pe tot ecranul, titlul pe fundalul închis de deasupra lui.
 * <picture>: încadrare lată pe desktop, 9:16 pe telefon (toată fața și roata din față); next/image dă AVIF/WebP.
 * Fotografia e LCP-ul paginii (fetchPriority high, preîncărcată). La derulare, varianta cu farurile aprinse (HeroLit)
 * apare peste ea pe primele 30% din ecran. La prima vizită din sesiune, HeroIntro rulează
 * clipul „lights on” peste ea și apoi titlul urcă linie cu linie; altfel fotografia și titlul apar direct.
 */
export function Hero() {
  const common = { alt: ALT, sizes: "100vw", quality: 80 };
  const desk = getImageProps({ ...common, src: DESK, ...sizeOf(DESK) }).props;
  const phone = getImageProps({ ...common, src: PHONE, ...sizeOf(PHONE) }).props;
  const deskLit = getImageProps({ ...common, alt: "", src: DESK_LIT, ...sizeOf(DESK_LIT) }).props;
  const phoneLit = getImageProps({ ...common, alt: "", src: PHONE_LIT, ...sizeOf(PHONE_LIT) }).props;
  return (
    <section className="hero-launch bg-night text-white" data-bg="night" aria-labelledby="hero-title">
      {/* Preîncărcare pe încadrări (React le mută în <head>): fiecare ecran cere din timp doar imaginea lui */}
      <link rel="preload" as="image" imageSrcSet={desk.srcSet} imageSizes="100vw" media="(min-width: 48rem)" fetchPriority="high" />
      <link rel="preload" as="image" imageSrcSet={phone.srcSet} imageSizes="100vw" media="(max-width: 47.99rem)" fetchPriority="high" />
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
        <HeroLit
          deskSrcSet={deskLit.srcSet!}
          phone={{ src: phoneLit.src, srcSet: phoneLit.srcSet, width: Number(phoneLit.width), height: Number(phoneLit.height) }}
        />
        <HeroLive />
        <HeroIntro />
      </HeroMotion>
      <div aria-hidden className="hero-launch-scrim" />
      <div aria-hidden className="hero-launch-grain" />
      <div className="hero-launch-copy container-x">
        <h1 id="hero-title" className="t-112 max-w-[13ch] lg:t-72 lg:max-w-none">
          {LINES.map((l, i) => (
            <span key={l.text}>
              {i === 2 && <br className="hidden lg:inline" />}
              <span className={`hero-line ${l.muted ? "text-mist" : ""}`}>
                <span style={{ "--i": i } as React.CSSProperties}>{l.text}</span>
              </span>
              {i % 2 === 0 && " "}
            </span>
          ))}
        </h1>
        <div className="hero-kicker mt-6 md:mt-8">
          <HeroClock />
        </div>
      </div>
    </section>
  );
}
