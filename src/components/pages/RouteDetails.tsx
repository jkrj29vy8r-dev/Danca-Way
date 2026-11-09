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
        <p className="eyebrow text-muted">Toate opririle</p>
        <h2 id="opriri-title" className="display-md mt-6 max-w-3xl" data-reveal="lines">
          Fiecare cursă, stație cu stație.
        </h2>
        <div className="mt-12 grid gap-14">
          {directions.map((d) => (
            <div key={d.id}>
              <h3 className="eyebrow text-muted">{d.label}</h3>
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
                        <summary className="press grid cursor-pointer list-none grid-cols-[4.5rem_1fr_auto] items-center gap-4 py-5 sm:grid-cols-[5.5rem_1fr_auto]">
                          <span className="font-mono text-xl font-semibold">{a.time}</span>
                          <span>
                            <span className="block font-semibold">
                              {stopName(a)} → {stopName(b)}
                            </span>
                            <span className="block text-sm text-muted">
                              {r.code} · {r.vehicle} · {r.stops.length} opriri, de la {cityName(first.city)} ({first.time}) la{" "}
                              {cityName(last.city)} ({last.time}) · {formatDuration(minutesOf(r, last) - minutesOf(r, first))}
                            </span>
                          </span>
                          <span aria-hidden className="text-2xl leading-none text-muted transition-transform duration-500 ease-[var(--ease-out-expo)] group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <ol className="grid gap-x-10 pb-6 sm:grid-cols-2 sm:pl-[6.5rem]">
                          {r.stops.map((s) => (
                            <li key={s.city + s.time} className="flex gap-4 border-b border-line/70 py-2 text-[0.95rem]">
                              <span className="w-12 shrink-0 font-mono tabular-nums">{s.time}</span>
                              <span>
                                <span className="font-medium">{cities[s.city].name}</span>
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
        <p className="eyebrow text-muted">Tarife</p>
        <h2 id="tarife-title" className="display-md mt-6 max-w-3xl" data-reveal="lines">
          Același preț pe toate cursele.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Prețul depinde doar de orașul de plecare și de destinație, nu de cursă. Valorile sunt pentru biletul întreg,
          în lei, după tabelul de tarife publicat de operator.
        </p>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[40rem] text-left">
            <caption className="sr-only">Tarife bilet întreg, în lei</caption>
            <thead>
              <tr className="border-b border-line text-sm text-muted">
                <th scope="col" className="px-5 py-4 font-medium">
                  Din \ Spre
                </th>
                {DESTS.map((d) => (
                  <th key={d} scope="col" className="px-5 py-4 font-medium">
                    {d === "otopeni" ? "Otopeni" : cityName(d)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ORIGINS.map((o) => (
                <tr key={o} className="border-b border-line last:border-0">
                  <th scope="row" className="px-5 py-4 font-semibold">
                    {cityName(o)}
                  </th>
                  {DESTS.map((d) => (
                    <td key={d} className="px-5 py-4 font-mono tabular-nums">
                      {fare(o, d) ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight">Reduceri</h3>
            <p className="mt-3 leading-relaxed text-muted">
              Pe cursa Roman – Constanța, biletul întreg costă 160 lei, iar Bileteria afișează 80 lei pentru copii și
              pensionari și 144 lei pentru elevi și studenți. Tabelul operatorului are aceleași proporții pe toate
              traseele; reducerea se confirmă la cumpărare.
            </p>
          </div>
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight">Bilete</h3>
            <p className="mt-3 leading-relaxed text-muted">
              Biletele se cumpără online, pe danca-transport.autogari.ro, sau la telefon, la {site.contact.phoneDisplay}.
            </p>
            <a href={site.ticketsUrl} target="_blank" rel="noopener" className="btn btn-dark mt-6">
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
    <section className="section-y bg-navy text-white" aria-labelledby="statii-title" data-bg="navy">
      <div className="container-x">
        <p className="eyebrow text-mist">Stații</p>
        <h2 id="statii-title" className="display-md mt-6 max-w-3xl" data-reveal="lines">
          De unde urci, în fiecare oraș.
        </h2>
        <ul className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {byCity.map((c) => (
            <li key={c.city} className="border-t border-white/15 py-5">
              <p className="font-display text-xl font-semibold tracking-tight">{cityName(c.city)}</p>
              <p className="mt-1 text-mist">{c.stations.join(" · ")}</p>
              <p className="mt-2 font-mono text-sm text-white/70">
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
