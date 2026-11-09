import { FlapText } from "../FlapText";
import { ratingDisplay, site, withDe } from "@/config/site";

/** Trei fapte, în tipografie mare. „05:00” se întoarce ca pe o tabelă de plecări. */
export function WhyUs() {
  const { rating } = site;
  return (
    <section className="section-y bg-navy text-white" aria-labelledby="dece-title" data-bg="navy">
      <div className="container-x">
        <h2 id="dece-title" className="eyebrow text-mist">
          De ce Danca Way
        </h2>
        <ul className="display-lg mt-12 border-b border-white/15 md:mt-16">
          <li className="border-t border-white/15 py-8 md:py-12">
            <p>
              Plecare <FlapText value="05:00" className="font-mono" />
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
              {ratingDisplay} din {rating.best} pe{" "}
              <a href={rating.sourceUrl} target="_blank" rel="noopener" className="link-u">
                {rating.source}
              </a>
              ,<span className="text-mist"> din {withDe(rating.count, "recenzii")}</span>
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
