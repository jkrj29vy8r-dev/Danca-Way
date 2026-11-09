import { Suspense } from "react";
import { ArrowUpRight } from "../icons";
import { Photo } from "../Photo";
import { RouteFinder } from "./RouteFinder";
import { SwallowTrail } from "./SwallowTrail";
import { photos } from "@/data/photos";
import { site } from "@/config/site";
import { hasPhoto } from "@/lib/photo";

/**
 * Hero: un singur punct de focus — titlul. Sub el, căutarea și următoarea plecare.
 * Pe mobil, deasupra liniei de plutire: logo (în header), titlu, căutare, următoarea plecare. Nimic altceva.
 */
export function Hero() {
  const withPhoto = hasPhoto(photos.hero.src);
  return (
    <section className="relative isolate overflow-hidden bg-night text-white" data-bg="night" aria-labelledby="hero-title">
      <div className="container-x relative pt-24 pb-16 lg:pt-40 lg:pb-24">
        <Suspense>
          <SwallowTrail />
        </Suspense>
        {/* Două propoziții, aceeași mărime: afirmația în alb, continuarea în gri */}
        <h1 id="hero-title" className="t-112 max-w-[14ch] lg:max-w-none">
          <span className="reveal-line">
            <span style={{ "--i": 0 } as React.CSSProperties}>Din Neamț la București.</span>
          </span>
          <span className="reveal-line text-mist">
            <span style={{ "--i": 1 } as React.CSSProperties}>Din Otopeni, acasă.</span>
          </span>
        </h1>

        <div className="mt-8 lg:mt-16">
          <Suspense>
            <RouteFinder />
          </Suspense>
          <a
            href={site.ticketsUrl}
            target="_blank"
            rel="noopener"
            className="link-arrow t-14 mt-6 hidden text-mist transition-colors duration-[600ms] ease-[var(--ease-out-expo)] hover:text-white lg:inline-flex"
          >
            <span className="link-u">Ai ales cursa? Biletul se cumpără online</span> <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {withPhoto && (
        <Photo src={photos.hero.src} alt={photos.hero.alt} sizes="100vw" priority className="aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]" />
      )}
    </section>
  );
}
