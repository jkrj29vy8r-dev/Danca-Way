"use client";

import { useEffect, useRef, useState } from "react";
import { FlipString } from "../NextDeparture";
import { cityName, routes, stopName } from "@/data/routes";

/**
 * O cursă, stație cu stație (povestire la scroll, ca pe paginile de produs Apple):
 * ora, orașul și stația din stânga rămân fixate și se schimbă pe măsură ce lista din dreapta trece prin
 * mijlocul ecranului. Cifrele orei se întorc (singurul moment de mișcare al secțiunii).
 * Fără JavaScript: lista completă, cu prima oprire în panou.
 */
export function Journey({ code = "B3" }: { code?: string }) {
  const route = routes.find((r) => r.code === code)!;
  const stops = route.stops;
  const last = stops.length - 1;
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const rows = listRef.current?.querySelectorAll<HTMLElement>("[data-stop]");
    if (!rows?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.stop));
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  const stop = stops[active];
  const otp = stops.find((s) => s.city === "otopeni");
  const end = stops[last];

  return (
    <section className="section-y bg-light" aria-labelledby="traseu-title" data-bg="light">
      <div className="container-x">
        <h2 id="traseu-title" className="t-48 max-w-[22ch]">
          Pleci la {stops[0].time} din {cityName(stops[0].city)}.{" "}
          <span className="text-muted">
            {otp ? `La ${otp.time} ești la Terminalul Plecări, ` : ""}la {end.time} la {stopName(end).replace("București ", "")}.
          </span>
        </h2>

        <div className="grid-12 mt-16 lg:mt-24">
          {/* Panoul fixat: oglindește rândul activ din listă (ascuns pentru cititoarele de ecran) */}
          <div
            aria-hidden
            className="sticky top-[var(--hdr)] z-10 col-span-12 -mx-6 self-start border-b border-line bg-light px-6 py-4 transition-[top] duration-[600ms] ease-[var(--ease-out-expo)] md:-mx-12 md:px-12 lg:top-40 lg:col-span-5 lg:mx-0 lg:border-0 lg:p-0"
          >
            <p className="label hidden text-muted lg:block">
              <span className="font-mono">{route.code}</span> · {cityName(route.from)} → {stopName(stops[last])}
            </p>
            <div className="flex items-baseline gap-4 lg:mt-6 lg:block">
              <p className="t-48 lg:t-112 font-mono font-normal tabular-nums">
                <FlipString value={stop.time} />
              </p>
              <div className="min-w-0 lg:mt-6">
                <p className="t-21 lg:t-32 truncate font-semibold">{stop.city === "otopeni" ? "Aeroport Otopeni" : cityName(stop.city)}</p>
                <p className="t-14 lg:t-17 truncate text-muted">{stop.station}</p>
              </div>
            </div>
            <p className="t-14 mt-6 hidden font-mono text-muted lg:block">
              Oprirea {active + 1} din {stops.length}
            </p>
          </div>

          <ol ref={listRef} className="relative col-span-12 mt-8 lg:col-span-6 lg:col-start-7 lg:mt-0" aria-label={`Opririle cursei ${route.code}`}>
            {/* Linia traseului: partea parcursă se umple până la oprirea activă */}
            <span aria-hidden className="absolute top-8 bottom-8 left-[3.5px] w-px bg-line" />
            <span
              aria-hidden
              className="absolute top-8 bottom-8 left-[3.5px] w-px origin-top bg-night transition-transform duration-[800ms] ease-[var(--ease-out-expo)]"
              style={{ transform: `scaleY(${active / last})` }}
            />
            {stops.map((s, i) => (
              <li
                key={s.city + s.time}
                data-stop={i}
                className={`relative grid grid-cols-[8px_4rem_1fr] items-baseline gap-x-4 py-4 transition-colors duration-[600ms] ease-[var(--ease-out-expo)] lg:grid-cols-[8px_5rem_1fr] lg:gap-x-6 lg:py-6 ${
                  i === active ? "text-ink" : "text-muted"
                }`}
              >
                <span
                  aria-hidden
                  className={`size-2 self-center rounded-full border transition-colors duration-[600ms] ease-[var(--ease-out-expo)] ${
                    i <= active ? "border-night bg-night" : "border-line-strong bg-light"
                  }`}
                />
                <span className={`t-21 font-mono tabular-nums ${i === active ? "font-semibold" : ""}`}>{s.time}</span>
                <span className="min-w-0">
                  <span className="t-21 block font-semibold">{s.city === "otopeni" ? "Aeroport Otopeni" : cityName(s.city)}</span>
                  <span className="t-14 block">{s.station}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
