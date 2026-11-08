import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "../icons";
import { mainServices, serviceById, serviceRows } from "@/data/services";

export function ServicesList() {
  const rows = serviceRows.map((id) => serviceById(id)!);
  return (
    <section className="section-y bg-white" aria-labelledby="servicii-title" data-surface="light">
      <div className="container-x">
        <p className="eyebrow text-muted">Servicii</p>
        <h2 id="servicii-title" className="display-lg mt-6 max-w-4xl">
          Microbuz 8+1 sau autocar, cu șofer.
        </h2>

        {/* Cele trei servicii principale, cu imagine mare */}
        <ul className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-6">
          {mainServices.map((s) => (
            <li key={s.href} className="group relative flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy">
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight md:text-[1.75rem]">{s.title}</h3>
              <p className="mt-2 max-w-md leading-relaxed text-muted">{s.text}</p>
              <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                <Link href={s.href} className="link-arrow text-ink hover:text-navy-soft" aria-label={`Detalii: ${s.title}`}>
                  Detalii <ArrowRight size={16} />
                </Link>
                {s.extraLink && (
                  <Link href={s.extraLink.href} className="link-arrow text-ink hover:text-navy-soft">
                    {s.extraLink.label} <ArrowRight size={16} />
                  </Link>
                )}
              </p>
            </li>
          ))}
        </ul>

        {/* Restul serviciilor, ca rânduri */}
        <ul className="mt-20 border-b border-line md:mt-28">
          {rows.map((s) => (
            <li key={s.id} className="group relative border-t border-line">
              <div className="grid gap-3 py-8 md:grid-cols-12 md:items-center md:gap-8 md:py-10">
                <h3 className="font-display text-3xl font-semibold tracking-tight transition-transform duration-500 ease-[var(--ease-out-expo)] md:col-span-5 md:text-[2.75rem] md:leading-none md:group-hover:translate-x-2">
                  {s.title}
                </h3>
                <p className="leading-relaxed text-muted md:col-span-5">{s.short}</p>
                <div className="md:col-span-2 md:text-right">
                  <Link
                    href={s.href}
                    className="link-arrow text-ink after:absolute after:inset-0 after:content-['']"
                    aria-label={`Detalii: ${s.title}`}
                  >
                    Detalii <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
