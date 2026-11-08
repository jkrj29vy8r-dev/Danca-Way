import Link from "next/link";
import { ArrowRight } from "../icons";
import { featuredServices } from "@/data/services";

export function ServicesGrid() {
  return (
    <section className="section-y bg-light" aria-labelledby="servicii-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-muted">Servicii</p>
            <h2 id="servicii-title" className="display-lg mt-6 max-w-3xl">
              Orice drum.
              <br />
              Orice grup.
            </h2>
          </div>
          <p className="max-w-sm text-lg text-muted">
            De la un transfer la aeroport până la un autocar pentru o nuntă întreagă.
          </p>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((s, i) => (
            <li key={s.id}>
              <Link
                href={s.href}
                className="card-lift group flex h-full min-h-56 flex-col rounded-[var(--radius-card)] border border-line bg-white p-7"
              >
                <span className="font-display text-sm font-semibold text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-auto pt-10">
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-display text-2xl font-semibold tracking-tight">{s.title}</span>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-light transition-colors duration-300 group-hover:bg-accent">
                      <ArrowRight size={18} className="arrow transition-transform duration-500 group-hover:translate-x-0.5" />
                    </span>
                  </span>
                  <span className="mt-2 block text-[0.95rem] leading-relaxed text-muted">{s.short}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
