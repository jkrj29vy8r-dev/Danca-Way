import { EnterOnView } from "../EnterOnView";

/** Cele patru detalii (4:5), în ordinea etichetelor. Descrierile sunt ale fotografiilor din public/media/README.md. */
const DETAILS = [
  { file: "detaliu-far", label: "Lumini", alt: "Farul drept aprins al autocarului Setra, cu semnătura LED și banda portocalie" },
  { file: "detaliu-roata", label: "Roți", alt: "Roata din față a autocarului, cu capacul alb și dunga roșie, reflectată pe podea" },
  { file: "detaliu-parbriz", label: "Confort", alt: "Parbrizul și oglinzile autocarului Setra, pe fundal întunecat" },
  { file: "detaliu-sigla-setra", label: "Linie", alt: "Sigla cromată SETRA de pe dunga laterală a autocarului" },
];

const WIDTHS = [800, 1200, 2400];
const srcSet = (file: string, ext: string) => WIDTHS.map((w) => `/media/${file}-${w}.${ext} ${w}w`).join(", ");
/** Pe telefon un cadru are ~78% din lățime; de la 64rem, un sfert din containerul de 90rem */
const SIZES = "(min-width: 90rem) 21rem, (min-width: 64rem) 23vw, (min-width: 48rem) 45vw, 78vw";

/**
 * Autocarul de aproape: patru detalii. Pe telefon un rând orizontal cu scroll-snap, de la 64rem o grilă de 4 coloane.
 * Fiecare cadru apare (opacitate) și se așază (scale 1,04 → 1) când intră în ecran, o singură dată.
 */
export function Details() {
  return (
    <section className="section-y bg-night text-white" aria-labelledby="detalii-titlu" data-bg="night">
      <div className="container-x">
        <h2 id="detalii-titlu" className="t-48" data-reveal="lines">
          De aproape.
        </h2>
        <EnterOnView>
          <ul className="details-row mt-12 lg:mt-16" aria-label="Detalii ale autocarului" tabIndex={0}>
            {DETAILS.map((d, i) => (
              <li key={d.file} className="enter" style={{ "--i": i } as React.CSSProperties}>
                <div className="aspect-[4/5] overflow-hidden bg-black/30">
                  <picture>
                    <source type="image/avif" srcSet={srcSet(d.file, "avif")} sizes={SIZES} />
                    <img
                      src={`/media/${d.file}-800.webp`}
                      srcSet={srcSet(d.file, "webp")}
                      sizes={SIZES}
                      alt={d.alt}
                      width={800}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover"
                    />
                  </picture>
                </div>
                <p className="label mt-4 text-mist">{d.label}</p>
              </li>
            ))}
          </ul>
        </EnterOnView>
      </div>
    </section>
  );
}
