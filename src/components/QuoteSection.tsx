import { QuoteForm } from "./QuoteForm";
import { Mail, Phone, WhatsApp } from "./icons";
import { mailHref, site, telHref, whatsappHref } from "@/config/site";
import type { ServiceId } from "@/data/services";

type Props = {
  title?: React.ReactNode;
  intro?: string;
  defaultService?: ServiceId;
  /** Text precompletat în „Detalii” (ex. numele excursiei) */
  defaultSubject?: string;
  headingLevel?: "h1" | "h2";
  /** Clase suplimentare pentru secțiune (ex. spațiu sub header pe pagina de contact) */
  className?: string;
};

/** Secțiunea cu formularul de ofertă și datele de contact directe. */
export function QuoteSection({
  title = "Cere o ofertă",
  intro = "Pentru transfer, închiriere, excursie sau grup: scrie de unde pleci, unde mergi, data și câți pasageri sunteți. Biletele la cursele regulate se cumpără online, pe autogari.ro.",
  defaultService,
  defaultSubject,
  headingLevel: H = "h2",
  className = "",
}: Props) {
  return (
    <section id="oferta" className={`section-y scroll-mt-16 bg-light ${className}`} aria-labelledby="oferta-title" data-bg="light">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="eyebrow text-muted">Cere ofertă</p>
          <H id="oferta-title" className="display-md mt-6" data-reveal="lines">
            {title}
          </H>
          <p className="mt-6 max-w-md text-lg text-muted">{intro}</p>

          <ul className="mt-10 space-y-3">
            {[
              { href: telHref, icon: <Phone size={20} />, label: "Telefon", value: site.contact.phoneDisplay },
              { href: whatsappHref, icon: <WhatsApp size={20} />, label: "WhatsApp", value: site.contact.phoneDisplay, external: true },
              { href: mailHref, icon: <Mail size={20} />, label: "Email", value: site.contact.email },
            ].map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener" } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-night text-white transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105">{c.icon}</span>
                  <span>
                    <span className="block text-sm text-muted">{c.label}</span>
                    <span className="link-u block font-semibold">{c.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          {site.contact.hours && <p className="mt-6 text-sm text-muted">Program: {site.contact.hours}</p>}
        </div>

        <div className="lg:col-span-7">
          <QuoteForm defaultService={defaultService} defaultSubject={defaultSubject} />
        </div>
      </div>
    </section>
  );
}
