/** Trei fapte, în tipografie mare. Partea evidențiată e albă, restul gri. */
const facts: { strong: string; rest: string }[] = [
  { strong: "Plecare 05:00", rest: " din Târgu Neamț" },
  { strong: "Oprire la Terminal Plecări,", rest: " Otopeni" },
  { strong: "4,6 din 5 pe Bileteria,", rest: " din peste 300 de recenzii" },
];

export function WhyUs() {
  return (
    <section className="section-y bg-navy text-white" aria-labelledby="dece-title" data-surface="dark">
      <div className="container-x">
        <h2 id="dece-title" className="eyebrow text-mist">
          De ce Danca Way
        </h2>
        <ul className="mt-12 border-b border-white/15 md:mt-16">
          {facts.map((f) => (
            <li key={f.strong} className="border-t border-white/15 py-8 md:py-12">
              <p className="display-lg">
                {f.strong}
                <span className="text-mist">{f.rest}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
