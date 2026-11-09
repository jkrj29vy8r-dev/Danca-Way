import { FlapText } from "../FlapText";
import { ArrowUpRight } from "../icons";
import { site } from "@/config/site";
import { cityName, fare, routes, stopAt, TIMETABLE_DISCLAIMER, type CityId, type Route } from "@/data/routes";

const NEAMT: CityId[] = ["targu-neamt", "piatra-neamt", "roman", "bacau"];

/** Orele curselor regulate la Terminalul Plecări din Otopeni, calculate din orar (src/data/routes.ts). */
export function OtopeniTimes() {
  const at = (r: Route) => stopAt(r, "otopeni");
  const toAirport = routes.filter((r) => r.direction === "spre-bucuresti" && at(r)).sort((a, b) => at(a)!.time.localeCompare(at(b)!.time));
  const fromAirport = routes.filter((r) => r.direction === "spre-moldova" && at(r)).sort((a, b) => at(a)!.time.localeCompare(at(b)!.time));

  const Row = ({ r, dir }: { r: Route; dir: "to" | "from" }) => {
    const stops = NEAMT.map((c) => stopAt(r, c)).filter((s): s is NonNullable<typeof s> => Boolean(s));
    const ordered = dir === "to" ? stops : stops.sort((a, b) => a.time.localeCompare(b.time));
    return (
      <li className="grid grid-cols-[5rem_1fr] items-baseline gap-x-4 border-t border-line-dark py-6 sm:grid-cols-[7rem_1fr] sm:gap-x-6">
        <span className="t-32 font-mono tabular-nums">
          <FlapText value={at(r)!.time} />
        </span>
        <div>
          <p className="t-21 font-semibold">{dir === "to" ? "Sosire la Terminalul Plecări" : "Plecare de la Terminalul Plecări"}</p>
          <p className="t-14 mt-2 text-mist">
            <span className="font-mono">{r.code}</span> · {r.vehicle}
            {ordered.map((s) => (
              <span key={s.city}>
                {" · "}
                {cityName(s.city)} <span className="font-mono text-white">{s.time}</span>
                {fare(s.city, "otopeni") ? <span className="font-mono"> ({fare(s.city, "otopeni")} lei)</span> : null}
              </span>
            ))}
          </p>
        </div>
      </li>
    );
  };

  return (
    <section className="section-y bg-night text-white" aria-labelledby="otp-title" data-bg="night">
      <div className="container-x">
        <h2 id="otp-title" className="t-48 max-w-[22ch]">
          Cursele regulate la Otopeni. <span className="text-mist">Oprire la Terminalul Plecări, în ambele sensuri.</span>
        </h2>
        <div className="grid-12 mt-16 gap-y-12 lg:mt-24">
          <div className="col-span-12 lg:col-span-6">
            <h3 className="label text-mist">Spre aeroport</h3>
            <ul className="mt-4 border-b border-line-dark">
              {toAirport.map((r) => (
                <Row key={r.code} r={r} dir="to" />
              ))}
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <h3 className="label text-mist">De la aeroport, spre Moldova</h3>
            <ul className="mt-4 border-b border-line-dark">
              {fromAirport.map((r) => (
                <Row key={r.code} r={r} dir="from" />
              ))}
            </ul>
          </div>
        </div>
        <p className="t-14 mt-6 text-mist">
          {TIMETABLE_DISCLAIMER}. Prețurile din paranteză sunt pentru biletul întreg între oraș și Otopeni.
        </p>
        <a href={site.ticketsUrl} target="_blank" rel="noopener" className="btn btn-lg btn-light mt-8">
          Cumpără bilet până la Otopeni <ArrowUpRight />
        </a>
      </div>
    </section>
  );
}
