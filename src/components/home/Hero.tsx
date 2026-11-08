import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "../icons";
import { SwallowTrail } from "./SwallowTrail";
import { photos } from "@/data/photos";
import { site } from "@/config/site";

const lines = ["Din Neamț la București.", "Din Otopeni, acasă."];

const facts = [
  { value: "05:00 și 09:00", text: "Plecări din Târgu Neamț spre București Obor" },
  { value: "12:00 și 16:00", text: "Preluare de la Aeroportul Otopeni spre Piatra Neamț și Roman" },
  { value: "de la 120 lei", text: "Bilet cumpărat online, pe autogari.ro" },
];

const v = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white" data-surface="dark">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_85%_0%,#1c2d57_0%,transparent_70%)]"
      />
      <div className="container-x pt-32 pb-12 md:pt-40 md:pb-16">
        <p className="eyebrow reveal-fade text-mist" style={v(0)}>
          Transport persoane din Neamț
        </p>
        <h1 className="display-hero mt-6">
          {lines.map((line, i) => (
            <span key={line} className="reveal-line">
              <span style={v(i + 1)}>{line}</span>
            </span>
          ))}
        </h1>
        <div className="reveal-fade mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end" style={v(3)}>
          <p className="max-w-xl text-lg leading-relaxed text-mist md:col-span-7 md:text-xl">
            Autocarul pleacă din Târgu Neamț la 05:00 și 09:00 și oprește în Piatra Neamț, Roman, Bacău,
            Focșani și Buzău până la București Obor.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end">
            <a href={site.ticketsUrl} target="_blank" rel="noopener" className="btn btn-primary">
              Cumpără bilet <ArrowUpRight />
            </a>
            <Link href="/curse-regulate" className="btn btn-ghost-light">
              Vezi orarul <ArrowRight />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="relative aspect-[4/3] w-full bg-navy sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src={photos.hero.src}
            alt={photos.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Gradient doar sub textul suprapus (de la md în sus) */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-night/85 via-night/40 to-transparent md:block"
          />
          <SwallowTrail />
        </div>
        <ul className="container-x grid gap-6 py-10 sm:grid-cols-3 md:absolute md:inset-x-0 md:bottom-0 md:py-10">
          {facts.map((f) => (
            <li key={f.value} className="border-t border-white/20 pt-5">
              <p className="font-display text-2xl font-semibold tracking-tight tabular-nums">{f.value}</p>
              <p className="mt-1 text-sm text-white/80">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
