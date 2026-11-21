import { CountUp } from "../CountUp";
import { fare, routes, stopAt } from "@/data/routes";

/** Prima sosire la Terminalul Plecări (cea mai devreme cursă spre București care oprește la Otopeni). */
const firstAirport = routes
  .filter((r) => r.direction === "spre-bucuresti")
  .map((r) => stopAt(r, "otopeni")?.time)
  .filter((t): t is string => Boolean(t))
  .sort()[0];

/**
 * Date tehnice, ca pe o fișă de model: valoare mare, etichetă scurtă dedesubt, linii de 1 px între ele.
 * Momentul de mișcare al secțiunii: orele și prețurile numără de la zero când intră în ecran (CountUp).
 */
export function Facts() {
  const specs = [
    { value: "05:00", label: "Prima plecare, din Târgu Neamț" },
    { value: firstAirport!, label: "Prima sosire la Terminalul Plecări, Otopeni" },
    { value: `${fare("roman", "bucuresti")} lei`, label: "Roman → București, bilet întreg" },
    { value: `${fare("roman", "constanta")} lei`, label: "Roman → Constanța, bilet întreg" },
  ];
  return (
    <section className="section-y bg-white" aria-labelledby="fapte-title" data-bg="white">
      <div className="container-x">
        <h2 id="fapte-title" className="t-32 max-w-[36ch] font-semibold" data-reveal="lines">
          Opt curse pe zi, șase dintre ele prin Otopeni.{" "}
          <span className="text-muted">Din Târgu Neamț, Piatra Neamț și Roman, spre București, Otopeni și Constanța.</span>
        </h2>

        <dl className="grid-12 mt-16 gap-y-8 lg:mt-24">
          {specs.map((s) => (
            <div key={s.label} className="col-span-12 flex flex-col border-t border-line pt-6 sm:col-span-6 lg:col-span-3">
              <dt className="t-14 mt-2 max-w-[24ch] text-muted">{s.label}</dt>
              <dd className="t-48 order-first font-mono font-normal tabular-nums">
                <CountUp value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
