import Link from "next/link";
import { Photo } from "../Photo";
import { hasPhoto } from "@/lib/photo";

type Props = {
  eyebrow: string;
  title: string;
  intro?: React.ReactNode;
  /** Firimituri: Acasă / … (pagina curentă se adaugă automat) */
  trail?: { href: string; label: string }[];
  /** Butoane sau căutare, sub introducere */
  children?: React.ReactNode;
  facts?: { label: string; value: string }[];
  image?: { src: string; alt: string };
  /** Titlu mai mic pentru paginile lungi (ex. cele legale) */
  compact?: boolean;
};

/** Hero-ul paginilor interioare: fundal închis, titlu dezvăluit linie cu linie, fotografie doar dacă există. */
export function PageHero({ eyebrow, title, intro, trail = [], children, facts, image, compact }: Props) {
  const withPhoto = image && hasPhoto(image.src);
  return (
    <section className="relative isolate overflow-hidden bg-night text-white" data-bg="night">
      <div
        aria-hidden
        className="absolute inset-0 -z-[1] bg-[radial-gradient(55%_45%_at_90%_0%,#1c2d57_0%,transparent_70%)]"
      />
      <div className={`container-x ${compact ? "pt-32 pb-12 md:pt-40 md:pb-16" : "pt-32 pb-14 md:pt-44 md:pb-20"}`}>
        <nav aria-label="Navigare ierarhică" className="text-sm text-mist">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="link-u hover:text-white">
                Acasă
              </Link>
            </li>
            {trail.map((t) => (
              <li key={t.href} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                <Link href={t.href} className="link-u hover:text-white">
                  {t.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow mt-10 text-mist">{eyebrow}</p>
        {/* Titlul urcă din spatele unei margini la încărcare (CSS, funcționează și fără JavaScript) */}
        <h1 className={`${compact ? "display-md" : "display-lg"} mt-5 max-w-5xl`}>
          <span className="reveal-line">
            <span style={{ "--i": -3 } as React.CSSProperties}>{title}</span>
          </span>
        </h1>
        {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-mist md:text-xl">{intro}</div>}
        {children && <div className="mt-10">{children}</div>}
        {facts && (
          <dl className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse border-t border-white/20 pt-5">
                <dt className="mt-1 text-sm text-white/75">{f.label}</dt>
                <dd className="font-display text-xl font-semibold tracking-tight">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      {withPhoto && (
        <Photo src={image.src} alt={image.alt} sizes="100vw" priority className="aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]" />
      )}
    </section>
  );
}
