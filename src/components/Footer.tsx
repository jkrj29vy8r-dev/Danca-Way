import Link from "next/link";
import { Logo } from "./Logo";
import { ArrowUpRight } from "./icons";
import { mailHref, site, telHref, whatsappHref } from "@/config/site";
import { services } from "@/data/services";

const legalLinks = [
  { href: "/termeni-si-conditii", label: "Termeni și condiții" },
  { href: "/politica-de-confidentialitate", label: "Politica de confidențialitate" },
  { href: "/politica-cookie", label: "Politica de cookie-uri" },
];

const linkCls = "link-u text-white/80 transition-colors duration-[600ms] ease-[var(--ease-out-expo)] hover:text-white";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-night text-white" data-bg="night">
      <div className="container-x pt-24 pb-12 lg:pt-40">
        <div className="grid-12 gap-y-16">
          <div className="col-span-12 lg:col-span-4">
            <Logo variant="alb" className="h-10 w-auto" />
            <p className="measure mt-6 text-mist">
              Curse regulate Târgu Neamț – București, București – Otopeni – Roman și Roman – Constanța. Transfer privat
              8+1, închiriere microbuz cu șofer, excursii și pelerinaje.
            </p>
            <dl className="t-14 mt-8 border-b border-line-dark">
              {[
                { label: "Telefon", value: site.contact.phoneDisplay, href: telHref },
                { label: "WhatsApp", value: site.contact.phoneDisplay, href: whatsappHref, external: true },
                { label: "Email", value: site.contact.email, href: mailHref },
              ].map((c) => (
                <div key={c.label} className="flex items-baseline justify-between gap-4 border-t border-line-dark py-4">
                  <dt className="label text-mist">{c.label}</dt>
                  <dd>
                    <a href={c.href} {...(c.external ? { target: "_blank", rel: "noopener" } : {})} className={linkCls}>
                      {c.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <nav aria-label="Servicii" className="col-span-12 sm:col-span-6 lg:col-span-4 lg:col-start-6">
            <h2 className="label text-mist">Servicii</h2>
            <ul className="t-14 mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {services
                .filter((s) => s.id !== "altele")
                .map((s) => (
                  <li key={s.id}>
                    <Link href={s.href} className={linkCls}>
                      {s.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="col-span-12 sm:col-span-6 lg:col-span-2 lg:col-start-11">
            <h2 className="label text-mist">Informații</h2>
            <ul className="t-14 mt-6 grid gap-y-4">
              <li>
                <a href={site.ticketsUrl} target="_blank" rel="noopener" className="link-arrow font-normal text-white/80 hover:text-white">
                  <span className="link-u">Bilete online</span> <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <Link href="/contact" className={linkCls}>
                  Contact
                </Link>
              </li>
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pictogramele ANPC cerute de lege: dreptunghiuri cu linie de 1 px, fără colțuri rotunjite */}
        <div className="mt-16 flex flex-wrap gap-2">
          {[
            { href: site.legal.anpcSal, short: "ANPC", text: ["Soluționarea alternativă", "a litigiilor (SAL)"] },
            { href: site.legal.anpcSol, short: "SOL", text: ["Soluționarea online", "a litigiilor"] },
          ].map((b) => (
            <a
              key={b.short}
              href={b.href}
              target="_blank"
              rel="noopener"
              className="press flex min-h-12 items-center gap-4 border border-line-dark px-4 py-2 text-white/80 transition-colors duration-[600ms] ease-[var(--ease-out-expo)] hover:border-white hover:text-white"
            >
              <span className="font-semibold text-white">{b.short}</span>
              <span className="t-14">
                {b.text[0]}
                <br />
                {b.text[1]}
              </span>
            </a>
          ))}
        </div>

        <div className="t-14 mt-12 flex flex-col gap-2 border-t border-line-dark pt-8 text-mist md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName} · CUI {site.cui} · {site.regCom}
          </p>
          <p>Județul Neamț, România</p>
        </div>
      </div>
    </footer>
  );
}
