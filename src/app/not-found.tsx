import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "@/components/icons";

export const metadata: Metadata = { title: "Pagina nu există", robots: { index: false } };

const links = [
  { href: "/curse-regulate", label: "Orarul curselor regulate" },
  { href: "/transfer-aeroport-otopeni", label: "Transfer Aeroport Otopeni" },
  { href: "/flota", label: "Flota" },
  { href: "/contact", label: "Contact și cerere de ofertă" },
];

/** Un rând de tabelă de plecări: fiecare caracter pe plăcuța lui. */
function Board({ text, accent = false }: { text: string; accent?: boolean }) {
  return (
    <span aria-hidden className="inline-flex gap-1">
      {Array.from(text).map((ch, i) =>
        ch === " " ? (
          <span key={i} className="w-3" />
        ) : (
          <span
            key={i}
            className={`grid h-[1.6em] min-w-[1.1em] place-items-center rounded-[4px] bg-white/[0.06] px-[0.15em] font-mono tabular-nums ${accent ? "text-accent" : ""}`}
          >
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

export default function NotFound() {
  return (
    <section className="bg-night text-white" data-bg="night">
      <div className="container-x grid-12 gap-y-16 pt-32 pb-24 lg:pt-48 lg:pb-40">
        <div className="col-span-12 lg:col-span-6">
          {/* Tabela: cursa 404 e anulată */}
          <div className="t-21 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-line-dark py-4" role="img" aria-label="Tabelă de plecări: cursa 404, anulată">
            <Board text="404" accent />
            <Board text="ANULAT" />
          </div>
          <h1 className="t-72 mt-12">
            <span className="reveal-line">
              <span>Cursa asta nu există.</span>
            </span>
          </h1>
          <p className="t-21 measure mt-8 text-mist">Adresa e greșită sau pagina a fost mutată. Te ducem de aici mai departe.</p>
          <Link href="/" className="btn btn-lg btn-light mt-12">
            Înapoi acasă <ArrowRight />
          </Link>
        </div>
        <nav aria-label="Pagini utile" className="col-span-12 self-end lg:col-span-5 lg:col-start-8">
          <ul className="border-b border-line-dark">
            {links.map((l) => (
              <li key={l.href} className="border-t border-line-dark">
                <Link href={l.href} className="press group t-21 flex items-center justify-between gap-6 py-6 font-semibold">
                  <span className="transition-transform duration-[600ms] ease-[var(--ease-out-expo)] group-hover:translate-x-2">{l.label}</span>
                  <ChevronRight className="arrow text-mist" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
