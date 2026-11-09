import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = { title: "Pagina nu există", robots: { index: false } };

const links = [
  { href: "/curse-regulate", label: "Orarul curselor regulate" },
  { href: "/transfer-aeroport-otopeni", label: "Transfer Aeroport Otopeni" },
  { href: "/excursii", label: "Excursii" },
  { href: "/contact", label: "Contact și cerere de ofertă" },
];

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-end bg-night text-white" data-bg="night">
      <div className="container-x pt-40 pb-20">
        <p className="eyebrow font-mono text-accent">404</p>
        <h1 className="display-lg mt-5 max-w-3xl">Pagina asta nu există.</h1>
        <p className="mt-6 max-w-xl text-lg text-mist">Poate te ajută una dintre paginile de mai jos.</p>
        <ul className="mt-10 max-w-xl border-b border-white/15">
          {links.map((l) => (
            <li key={l.href} className="border-t border-white/15">
              <Link href={l.href} className="press group flex items-center justify-between py-4 font-display text-xl font-semibold">
                <span className="link-u">{l.label}</span>
                <ArrowRight />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
