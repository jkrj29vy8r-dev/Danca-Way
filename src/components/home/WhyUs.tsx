import { routes, servedCities } from "@/data/routes";
import { trips } from "@/data/trips";
import { pilgrimages } from "@/data/pilgrimages";

const reasons = [
  {
    title: "Oameni, nu un call-center",
    text: "Suni și răspunde cineva care cunoaște traseul, mașina și șoferul. Stabilim totul direct, fără intermediari.",
  },
  {
    title: "La timp, de fiecare dată",
    text: "Plecăm la ora stabilită și urmărim zborurile la Otopeni. Dacă avionul întârzie, te așteptăm.",
  },
  {
    title: "Microbuze curate și confortabile",
    text: "Scaune reglabile, aer condiționat, loc pentru bagaje. Mașini verificate înainte de fiecare drum.",
  },
  {
    title: "Preț spus de la început",
    text: "Primești oferta în scris, fără costuri ascunse. Pentru firme emitem factură.",
  },
];

export function WhyUs() {
  const stats = [
    { value: routes.length, label: "curse regulate" },
    { value: servedCities.length, label: "orașe pe traseele noastre" },
    { value: trips.length + pilgrimages.length, label: "excursii și pelerinaje" },
  ];
  return (
    <section className="section-y bg-white" aria-labelledby="dece-title">
      <div className="container-x">
        <p className="eyebrow text-muted">De ce Danca Way</p>
        <h2 id="dece-title" className="display-lg mt-6 max-w-4xl">
          Ne pasă de drum
          <br />
          cât îți pasă și ție.
        </h2>

        <dl className="mt-16 grid gap-8 border-y border-line py-10 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="mt-2 text-muted">{s.label}</dt>
              <dd className="font-display text-6xl font-bold tracking-tight tabular-nums md:text-7xl">{s.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {reasons.map((r, i) => (
            <li key={r.title} className="flex gap-6">
              <span className="font-display text-sm font-semibold text-muted tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight">{r.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted">{r.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
