import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "@/components/icons";

export const metadata: Metadata = { title: "Pagina nu există", robots: { index: false } };

const links = [
  { href: "/curse-regulate", label: "Orarul curselor regulate" },
  { href: "/transfer-aeroport-otopeni", label: "Transfer Aeroport Otopeni" },
  { href: "/excursii", label: "Excursii" },
  { href: "/contact", label: "Contact și cerere de ofertă" },
];

export default function NotFound() {
  return (
    <section className="bg-night text-white" data-bg="night">
      <div className="container-x grid-12 gap-y-12 pt-32 pb-24 lg:pt-48 lg:pb-40">
        <div className="col-span-12 lg:col-span-5">
          <p className="label font-mono text-mist">Eroare 404</p>
          <h1 className="t-72 mt-6">Pagina asta nu există.</h1>
          <p className="t-21 measure mt-8 text-mist">Poate te ajută una dintre paginile de alături.</p>
        </div>
        <ul className="col-span-12 self-end border-b border-line-dark lg:col-span-6 lg:col-start-7">
          {links.map((l) => (
            <li key={l.href} className="border-t border-line-dark">
              <Link href={l.href} className="press group t-21 flex items-center justify-between gap-6 py-6 font-semibold">
                <span className="transition-transform duration-[600ms] ease-[var(--ease-out-expo)] group-hover:translate-x-2">{l.label}</span>
                <ChevronRight className="arrow text-mist" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
