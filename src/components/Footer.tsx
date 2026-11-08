import Link from "next/link";
import { Logo } from "./Logo";
import { ArrowUpRight, Mail, Phone, WhatsApp } from "./icons";
import { mailHref, site, telHref, whatsappHref } from "@/config/site";
import { services } from "@/data/services";

const legalLinks = [
  { href: "/termeni-si-conditii", label: "Termeni și condiții" },
  { href: "/politica-de-confidentialitate", label: "Politica de confidențialitate" },
  { href: "/politica-cookie", label: "Politica de cookie-uri" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-night text-white">
      <div className="container-x pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="alb" className="h-10 w-auto" />
            <p className="mt-6 max-w-sm text-mist">
              Transport de persoane din județul Neamț: curse regulate, transferuri, excursii și
              pelerinaje. Din Neamț, oriunde vrei să ajungi.
            </p>
            <ul className="mt-8 space-y-3 text-[0.95rem]">
              <li>
                <a href={telHref} className="inline-flex items-center gap-3 hover:text-accent">
                  <Phone size={18} className="text-mist" /> {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappHref} className="inline-flex items-center gap-3 hover:text-accent" rel="noopener" target="_blank">
                  <WhatsApp size={18} className="text-mist" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={mailHref} className="inline-flex items-center gap-3 hover:text-accent">
                  <Mail size={18} className="text-mist" /> {site.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Servicii" className="lg:col-span-4">
            <h2 className="eyebrow text-mist">Servicii</h2>
            <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 text-[0.95rem] sm:grid-cols-2">
              {services
                .filter((s) => s.id !== "altele")
                .map((s) => (
                  <li key={s.id}>
                    <Link href={s.href} className="text-white/85 hover:text-white">
                      {s.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-mist">Bilete</h2>
            <a
              href={site.ticketsUrl}
              target="_blank"
              rel="noopener"
              className="link-arrow mt-5 text-white hover:text-accent"
            >
              Cumpără bilet online <ArrowUpRight size={16} />
            </a>
            <h2 className="eyebrow mt-10 text-mist">Informații</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              <li>
                <Link href="/contact" className="text-white/85 hover:text-white">
                  Contact
                </Link>
              </li>
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/85 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-3">
          <a
            href={site.legal.anpcSal}
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 items-center gap-3 rounded-xl border border-white/15 px-4 text-xs leading-tight text-white/85 hover:border-white/40"
          >
            <span className="font-display text-base font-bold text-white">ANPC</span>
            <span>
              Soluționarea alternativă
              <br />a litigiilor (SAL)
            </span>
          </a>
          <a
            href={site.legal.anpcSol}
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 items-center gap-3 rounded-xl border border-white/15 px-4 text-xs leading-tight text-white/85 hover:border-white/40"
          >
            <span className="font-display text-base font-bold text-white">SOL</span>
            <span>
              Soluționarea online
              <br />a litigiilor
            </span>
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-mist md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName} · CUI {site.cui} · {site.regCom}
          </p>
          <p>Județul Neamț, România</p>
        </div>
      </div>
    </footer>
  );
}
