import { Suspense } from "react";
import { ArrowUpRight } from "../icons";
import { Logo } from "../Logo";
import { Photo } from "../Photo";
import { RouteFinder } from "./RouteFinder";
import { SwallowTrail } from "./SwallowTrail";
import { photos } from "@/data/photos";
import { site } from "@/config/site";
import { hasPhoto } from "@/lib/photo";

const lines = ["Din Neamț la București.", "Din Otopeni, acasă."];

const facts = [
  { value: "05:00 · 09:00", text: "Târgu Neamț → București Obor, cu oprire la Otopeni" },
  { value: "12:00 · 16:00", text: "Otopeni → Piatra Neamț, Roman, Târgu Neamț" },
  { value: "07:00 · 15:30", text: "Roman → Constanța și înapoi, prin Brăila" },
  { value: "120 lei", text: "Roman → București, bilet întreg" },
];

export function Hero() {
  const withPhoto = hasPhoto(photos.hero.src);
  return (
    <section className="relative isolate overflow-hidden bg-night text-white" data-bg="night">
      <div
        aria-hidden
        className="absolute inset-0 -z-[1] bg-[radial-gradient(60%_50%_at_85%_0%,#1c2d57_0%,transparent_70%)]"
      />
      <div className="container-x relative pt-28 pb-12 md:pt-36 md:pb-16">
        {!withPhoto && (
          <Suspense>
            <SwallowTrail variant="text" />
          </Suspense>
        )}
        <h1>
          <span className="hero-logo block w-[min(520px,82vw)]">
            <Logo variant="alb" priority alt="Danca Way" className="h-auto w-full" />
          </span>
          <span className="display-hero mt-10 block md:mt-14">
            {lines.map((line, i) => (
              <span key={line} className="reveal-line">
                <span style={{ "--i": i } as React.CSSProperties}>{line}</span>
              </span>
            ))}
          </span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mist md:text-xl">
          Autocarul pleacă din Târgu Neamț la 05:00 și 09:00, oprește la Terminalul Plecări din Otopeni și ajunge
          la București Obor. Spre Constanța pleacă microbuzul din Roman, la 07:00.
        </p>
        <div className="mt-10 max-w-4xl">
          <Suspense>
            <RouteFinder />
          </Suspense>
          <a
            href={site.ticketsUrl}
            target="_blank"
            rel="noopener"
            className="link-arrow link-u mt-4 inline-flex text-sm text-white/85"
          >
            Ai ales cursa? Cumpără biletul online <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      <div className="relative">
        {withPhoto && (
          <div className="relative">
            <Photo
              src={photos.hero.src}
              alt={photos.hero.alt}
              sizes="100vw"
              priority
              className="aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-night/85 via-night/40 to-transparent md:block"
            />
            <Suspense>
              <SwallowTrail variant="photo" />
            </Suspense>
          </div>
        )}
        <ul
          className={`container-x grid gap-6 pb-12 sm:grid-cols-2 md:pb-16 lg:grid-cols-4 ${
            withPhoto ? "pt-10 md:absolute md:inset-x-0 md:bottom-0 md:pt-10 md:pb-10" : "pt-2"
          }`}
        >
          {facts.map((f) => (
            <li key={f.value} className="border-t border-white/20 pt-5">
              <p className="font-mono text-xl font-semibold tracking-tight tabular-nums">{f.value}</p>
              <p className="mt-1 text-sm text-white/80">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
