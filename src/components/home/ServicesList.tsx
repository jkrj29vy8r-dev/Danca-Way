import Link from "next/link";
import { ArrowRight } from "../icons";
import { Photo } from "../Photo";
import { mainServices, serviceById, serviceRows } from "@/data/services";
import { hasPhoto } from "@/lib/photo";

type Row = { key: string; title: string; text: string; href: string; extraLink?: { href: string; label: string } };

function ServiceRow({ row, large }: { row: Row; large?: boolean }) {
  return (
    <li className="group relative border-t border-line">
      <div className="grid gap-3 py-8 md:grid-cols-12 md:items-center md:gap-8 md:py-10">
        <h3
          className={`font-display font-semibold tracking-tight transition-transform duration-700 ease-[var(--ease-out-expo)] md:col-span-5 md:leading-none md:group-hover:translate-x-2 ${
            large ? "text-4xl md:text-[3.5rem]" : "text-3xl md:text-[2.75rem]"
          }`}
        >
          {row.title}
        </h3>
        <p className="leading-relaxed text-muted md:col-span-5">{row.text}</p>
        <div className="flex gap-6 md:col-span-2 md:flex-col md:items-end md:gap-2">
          <Link href={row.href} className="link-arrow link-u text-ink after:absolute after:inset-0 after:content-['']" aria-label={`Detalii: ${row.title}`}>
            Detalii <ArrowRight size={16} />
          </Link>
          {row.extraLink && (
            <Link href={row.extraLink.href} className="link-arrow link-u relative z-10 text-ink">
              {row.extraLink.label} <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}

export function ServicesList() {
  const rows: Row[] = serviceRows.map((id) => {
    const s = serviceById(id)!;
    return { key: s.id, title: s.title, text: s.short, href: s.href };
  });
  // Cele trei servicii principale apar cu imagine mare doar dacă toate trei au fotografie.
  const withImages = mainServices.every((s) => hasPhoto(s.image.src));

  return (
    <section className="section-y bg-white" aria-labelledby="servicii-title" data-bg="white">
      <div className="container-x">
        <p className="eyebrow text-muted">Servicii</p>
        <h2 id="servicii-title" className="display-lg mt-6 max-w-4xl" data-reveal="lines">
          Microbuz 8+1 sau autocar, cu șofer.
        </h2>

        {withImages ? (
          <ul className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-6">
            {mainServices.map((s) => (
              <li key={s.href} className="group relative flex flex-col">
                <Photo src={s.image.src} alt={s.image.alt} sizes="(min-width: 768px) 33vw, 100vw" radius={16} hoverZoom className="aspect-[4/3]" />
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 md:text-[1.75rem]">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-md leading-relaxed text-muted">{s.text}</p>
                <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  <Link href={s.href} className="link-arrow link-u text-ink" aria-label={`Detalii: ${s.title}`}>
                    Detalii <ArrowRight size={16} />
                  </Link>
                  {s.extraLink && (
                    <Link href={s.extraLink.href} className="link-arrow link-u text-ink">
                      {s.extraLink.label} <ArrowRight size={16} />
                    </Link>
                  )}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-14 md:mt-20">
            {mainServices.map((s) => (
              <ServiceRow key={s.href} large row={{ key: s.href, title: s.title, text: s.text, href: s.href, extraLink: s.extraLink }} />
            ))}
          </ul>
        )}

        <ul className={`border-b border-line ${withImages ? "mt-20 md:mt-28" : ""}`}>
          {rows.map((r) => (
            <ServiceRow key={r.key} row={r} />
          ))}
        </ul>
      </div>
    </section>
  );
}
