import Link from "next/link";
import { Photo } from "../Photo";
import { hasPhoto } from "@/lib/photo";

type Props = {
  /** Numele scurt al paginii (ultimul element din firimituri) */
  eyebrow: string;
  title: string;
  intro?: React.ReactNode;
  /** Firimituri intermediare: Acasă / … / pagina curentă */
  trail?: { href: string; label: string }[];
  /** Butoane sau căutare, sub introducere */
  children?: React.ReactNode;
  /** Date tehnice: valoare + etichetă, ca pe o fișă de model */
  facts?: { label: string; value: string }[];
  image?: { src: string; alt: string };
  /** Titlu mai mic pentru paginile lungi (ex. cele legale) */
  compact?: boolean;
};

/** Valorile cu ore sau prețuri se scriu cu Geist Mono */
const isData = (v: string) => /\d{2}:\d{2}|\d+\s?lei/.test(v);

/** Hero-ul paginilor interioare: fundal night plin, un titlu, introducerea, fotografie doar dacă există. */
export function PageHero({ eyebrow, title, intro, trail = [], children, facts, image, compact }: Props) {
  const withPhoto = image && hasPhoto(image.src);
  return (
    <section className="bg-night text-white" data-bg="night">
      <div className={`container-x ${compact ? "pt-32 pb-16 lg:pt-48 lg:pb-24" : "pt-32 pb-16 lg:pt-48 lg:pb-24"}`}>
        <nav aria-label="Navigare ierarhică" className="t-14 text-mist">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="link-u transition-colors duration-[600ms] ease-[var(--ease-out-expo)] hover:text-white">
                Acasă
              </Link>
            </li>
            {trail.map((t) => (
              <li key={t.href} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                <Link href={t.href} className="link-u transition-colors duration-[600ms] ease-[var(--ease-out-expo)] hover:text-white">
                  {t.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span aria-hidden>/</span>
              <span aria-current="page" className="text-white">
                {eyebrow}
              </span>
            </li>
          </ol>
        </nav>
        {/* Titlul urcă din spatele unei margini la încărcare (CSS, funcționează și fără JavaScript) */}
        <h1 className={`${compact ? "t-48" : "t-72"} mt-8 max-w-[18ch] lg:mt-12`}>
          <span className="reveal-line">
            <span>{title}</span>
          </span>
        </h1>
        {intro && <div className="t-21 measure mt-8 text-mist">{intro}</div>}
        {children && <div className="mt-12">{children}</div>}
        {facts && (
          <dl className="grid-12 mt-16 gap-y-8 lg:mt-24">
            {facts.map((f) => (
              <div key={f.label} className="col-span-12 flex flex-col border-t border-line-dark pt-6 sm:col-span-6 lg:col-span-3">
                <dt className="t-14 mt-2 text-mist">{f.label}</dt>
                <dd className={`t-21 order-first font-semibold ${isData(f.value) ? "font-mono" : ""}`}>{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      {withPhoto && <Photo src={image.src} alt={image.alt} sizes="100vw" priority className="aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]" />}
    </section>
  );
}
