import { FlapText } from "../FlapText";

/**
 * Trei fapte, în tipografie mare. Partea evidențiată e albă, restul gri.
 * „05:00” se întoarce ca pe o tabelă de plecări; 4,6 și 300 cresc o singură dată, când devin vizibile.
 */
export function WhyUs() {
  return (
    <section className="section-y bg-navy text-white" aria-labelledby="dece-title" data-bg="navy">
      <div className="container-x">
        <h2 id="dece-title" className="eyebrow text-mist">
          De ce Danca Way
        </h2>
        <ul className="display-lg mt-12 border-b border-white/15 md:mt-16">
          <li className="border-t border-white/15 py-8 md:py-12">
            <p>
              Plecare <FlapText value="05:00" />
              <span className="text-mist"> din Târgu Neamț</span>
            </p>
          </li>
          <li className="border-t border-white/15 py-8 md:py-12">
            <p>
              Oprire la Terminal Plecări,
              <span className="text-mist"> Otopeni</span>
            </p>
          </li>
          <li className="border-t border-white/15 py-8 md:py-12">
            <p>
              <span className="tabular-nums" data-count="4.6" data-decimals="1">
                4,6
              </span>{" "}
              din 5 pe Bileteria,
              <span className="text-mist">
                {" "}
                din peste{" "}
                <span className="tabular-nums" data-count="300">
                  300
                </span>{" "}
                de recenzii
              </span>
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
