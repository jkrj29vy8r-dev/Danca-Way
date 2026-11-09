import { FlapText } from "../FlapText";
import { ArrowUpRight } from "../icons";
import { site } from "@/config/site";
import { cityName, fare, routes, stopAt, type CityId, type Route } from "@/data/routes";

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
      <li className="grid gap-x-6 gap-y-2 border-t border-white/10 py-5 sm:grid-cols-[6.5rem_1fr]">
        <span className="font-mono text-2xl font-semibold">
          <FlapText value={at(r)!.time} />
        </span>
        <div>
          <p className="font-medium">
            {r.code} · {r.vehicle} · {dir === "to" ? "sosire la Otopeni" : "plecare de la Otopeni"}
          </p>
          <p className="mt-1 text-sm text-mist">
            {ordered.map((s, i) => (
              <span key={s.city}>
                {i > 0 && " · "}
                {dir === "to" ? "din " : ""}
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
    <section className="section-y bg-navy text-white" aria-labelledby="otp-title" data-bg="navy">
      <div className="container-x">
        <p className="eyebrow text-mist">Cursele regulate la Otopeni</p>
        <h2 id="otp-title" className="display-md mt-6 max-w-3xl" data-reveal="lines">
          Oprire la Terminalul Plecări, în ambele sensuri.
        </h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-10">
          <div>
            <h3 className="eyebrow text-accent">Spre aeroport</h3>
            <ul className="mt-4 border-b border-white/10">
              {toAirport.map((r) => (
                <Row key={r.code} r={r} dir="to" />
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-accent">De la aeroport, spre Moldova</h3>
            <ul className="mt-4 border-b border-white/10">
              {fromAirport.map((r) => (
                <Row key={r.code} r={r} dir="from" />
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 text-sm text-mist">
          Orar orientativ, confirmă la rezervare. Prețurile din paranteză sunt pentru biletul întreg între oraș și Otopeni.
        </p>
        <a href={site.ticketsUrl} target="_blank" rel="noopener" className="btn btn-primary mt-8">
          Cumpără bilet până la Otopeni <ArrowUpRight />
        </a>
      </div>
    </section>
  );
}
