import { ArrowUpRight } from "../icons";
import { site } from "@/config/site";
import {
  cities,
  cityName,
  directions,
  fare,
  formatDuration,
  minutesOf,
  routes,
  stopAt,
  stopName,
  type CityId,
} from "@/data/routes";

/** Toate opririle fiecărei curse, grupate pe direcții. Funcționează fără JavaScript (<details>). */
export function AllStops() {
  return (
    <section id="opriri" className="section-y scroll-mt-16 bg-white" aria-labelledby="opriri-title" data-bg="white">
      <div className="container-x">
        <h2 id="opriri-title" className="t-48 max-w-[22ch]" data-reveal="lines">
          Toate opririle. <span className="text-muted">Fiecare cursă, stație cu stație.</span>
        </h2>
        <div className="mt-16 grid gap-16 lg:mt-24">
          {directions.map((d) => (
            <div key={d.id}>
              <h3 className="label text-muted">{d.label}</h3>
              <div className="mt-4 border-b border-line">
                {routes
                  .filter((r) => r.direction === d.id)
                  .map((r) => {
                    const a = stopAt(r, r.from)!;
                    const b = stopAt(r, r.to)!;
                    const first = r.stops[0];
                    const last = r.stops[r.stops.length - 1];
                    return (
                      <details key={r.code} className="faq group border-t border-line">
                        <summary className="press grid cursor-pointer list-none grid-cols-[5rem_1fr_auto] items-baseline gap-x-4 py-6 transition-opacity hover:opacity-64 sm:grid-cols-[7rem_1fr_auto] sm:gap-x-6">
                          <span className="t-32 font-mono tabular-nums">{a.time}</span>
                          <span>
                            <span className="t-21 block font-semibold">
                              {stopName(a)} → {stopName(b)}
                            </span>
                            <span className="t-14 mt-2 block text-muted">
                              <span className="font-mono">{r.code}</span> · {r.vehicle} · {r.stops.length} opriri, de la {cityName(first.city)}{" "}
                              <span className="font-mono">{first.time}</span> la {cityName(last.city)} <span className="font-mono">{last.time}</span> ·{" "}
                              {formatDuration(minutesOf(r, last) - minutesOf(r, first))}
                            </span>
                          </span>
                          <span aria-hidden className="faq-plus t-32 self-center leading-none text-muted">
                            +
                          </span>
                        </summary>
                        <ol className="relative pb-8 sm:pl-[8.5rem]">
                          <span aria-hidden className="absolute top-5 bottom-[53px] left-[3.5px] w-px bg-line-strong sm:left-[calc(8.5rem+3.5px)]" />
                          {r.stops.map((s) => (
                            <li key={s.city + s.time} className="relative grid grid-cols-[8px_3.5rem_1fr] items-baseline gap-x-4 py-2">
                              <span aria-hidden className="size-2 self-center rounded-full border border-night bg-white" />
                              <span className="font-mono tabular-nums">{s.time}</span>
                              <span>
                                <span className="font-semibold">{cities[s.city].name}</span>
                                <span className="text-muted"> · {s.station}</span>
                              </span>
                            </li>
                          ))}
                        </ol>
                      </details>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ORIGINS: CityId[] = ["targu-neamt", "piatra-neamt", "roman", "bacau"];
const DESTS: CityId[] = ["bucuresti", "otopeni", "buzau", "focsani", "braila", "constanta"];

/** Tabelul de tarife (bilet întreg) între orașele din Neamț și destinații. */
export function FareTable() {
  return (
    <section className="section-y bg-light" aria-labelledby="tarife-title" data-bg="light">
      <div className="container-x">
        <h2 id="tarife-title" className="t-48 max-w-[22ch]" data-reveal="lines">
          Tarife. <span className="text-muted">Același preț pe toate cursele dintre două orașe.</span>
        </h2>
        <p className="measure mt-8 text-muted">
          Prețul depinde doar de orașul de plecare și de destinație, nu de cursă. Valorile sunt pentru biletul întreg, în
          lei, după tabelul de tarife publicat de operator.
        </p>
        <div className="mt-16 overflow-x-auto border-y border-line-strong">
          <table className="w-full min-w-[40rem] text-left">
            <caption className="sr-only">Tarife bilet întreg, în lei</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="label py-4 pr-6 text-muted">
                  Din \ Spre
                </th>
                {DESTS.map((d) => (
                  <th key={d} scope="col" className="label px-4 py-4 text-right text-muted">
                    {d === "otopeni" ? "Otopeni" : cityName(d)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ORIGINS.map((o) => (
                <tr key={o} className="border-b border-line last:border-0">
                  <th scope="row" className="py-4 pr-6 font-semibold">
                    {cityName(o)}
                  </th>
                  {DESTS.map((d) => (
                    <td key={d} className="px-4 py-4 text-right font-mono tabular-nums">
                      {fare(o, d) ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid-12 mt-16 gap-y-12">
          <div className="col-span-12 border-t border-line-strong pt-6 md:col-span-6">
            <h3 className="t-21 font-semibold">Reduceri</h3>
            <p className="measure mt-2 text-muted">
              Pe cursa Roman – Constanța, biletul întreg costă <span className="font-mono">160 lei</span>, iar Bileteria afișează{" "}
              <span className="font-mono">80 lei</span> pentru copii și pensionari și <span className="font-mono">144 lei</span> pentru
              elevi și studenți. Tabelul operatorului are aceleași proporții pe toate traseele; reducerea se confirmă la cumpărare.
            </p>
          </div>
          <div className="col-span-12 border-t border-line-strong pt-6 md:col-span-6">
            <h3 className="t-21 font-semibold">Bilete</h3>
            <p className="measure mt-2 text-muted">
              Biletele se cumpără online, pe danca-transport.autogari.ro, sau la telefon, la {site.contact.phoneDisplay}.
            </p>
            <a href={site.ticketsUrl} target="_blank" rel="noopener" className="btn btn-lg btn-dark mt-8">
              Cumpără bilet online <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const MAIN: CityId[] = ["targu-neamt", "piatra-neamt", "roman", "bacau", "focsani", "buzau", "braila", "otopeni", "bucuresti", "constanta"];

/** Stațiile din fiecare oraș, extrase din orar. */
export function Stations() {
  const byCity = MAIN.map((c) => ({
    city: c,
    stations: Array.from(new Set(routes.flatMap((r) => r.stops.filter((s) => s.city === c).map((s) => s.station)))),
    codes: routes.filter((r) => r.stops.some((s) => s.city === c)).map((r) => r.code),
  }));
  return (
    <section className="section-y bg-white" aria-labelledby="statii-title" data-bg="white">
      <div className="container-x">
        <h2 id="statii-title" className="t-48 max-w-[22ch]" data-reveal="lines">
          Stații. <span className="text-muted">De unde urci, în fiecare oraș.</span>
        </h2>
        <ul className="mt-16 border-b border-line lg:mt-24">
          {byCity.map((c) => (
            <li key={c.city} className="grid-12 gap-y-2 border-t border-line py-6">
              <p className="t-21 col-span-12 font-semibold md:col-span-3">{cityName(c.city)}</p>
              <p className="col-span-12 text-muted md:col-span-6">{c.stations.join(" · ")}</p>
              <p className="t-14 col-span-12 font-mono text-muted md:col-span-3 md:text-right">
                <span className="sr-only">Curse: </span>
                {c.codes.join(" · ")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
