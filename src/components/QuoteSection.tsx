import { QuoteForm } from "./QuoteForm";
import { mailHref, site, telHref, whatsappHref } from "@/config/site";
import type { ServiceId } from "@/data/services";

type Props = {
  /** Afirmația (în culoarea textului) */
  title?: string;
  /** Continuarea titlului, în gri, aceeași mărime */
  lead?: string;
  intro?: string;
  defaultService?: ServiceId;
  /** Text precompletat în „Detalii” (ex. numele excursiei) */
  defaultSubject?: string;
  headingLevel?: "h1" | "h2";
  tone?: "white" | "light";
  /** Clase suplimentare pentru secțiune (ex. spațiu sub header pe pagina de contact) */
  className?: string;
};

/** Formularul de ofertă și datele de contact directe, ca rânduri etichetă / valoare. */
export function QuoteSection({
  title = "Cere o ofertă.",
  lead = "Răspundem cu prețul total și ora de plecare.",
  intro = "Pentru transfer, închiriere, excursie sau grup. Biletele la cursele regulate se cumpără online, pe autogari.ro.",
  defaultService,
  defaultSubject,
  headingLevel: H = "h2",
  tone = "white",
  className = "",
}: Props) {
  const contacts = [
    { label: "Telefon", value: site.contact.phoneDisplay, href: telHref },
    { label: "WhatsApp", value: site.contact.phoneDisplay, href: whatsappHref, external: true },
    { label: "Email", value: site.contact.email, href: mailHref },
  ];
  return (
    <section
      id="oferta"
      className={`section-y scroll-mt-16 ${tone === "light" ? "bg-light" : "bg-white"} ${className}`}
      aria-labelledby="oferta-title"
      data-bg={tone}
    >
      <div className="container-x grid-12 gap-y-16">
        <div className="col-span-12 lg:col-span-4">
          <H id="oferta-title" className="t-48" data-reveal="lines">
            {title} <span className="text-muted">{lead}</span>
          </H>
          <p className="measure mt-6 text-muted">{intro}</p>

          <dl className="mt-12 border-b border-line">
            {contacts.map((c) => (
              <div key={c.label} className="flex items-baseline justify-between gap-4 border-t border-line py-4">
                <dt className="label text-muted">{c.label}</dt>
                <dd>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener" } : {})}
                    className="link-u font-semibold"
                  >
                    {c.value}
                  </a>
                </dd>
              </div>
            ))}
            {site.contact.hours && (
              <div className="flex items-baseline justify-between gap-4 border-t border-line py-4">
                <dt className="label text-muted">Program</dt>
                <dd className="font-semibold">{site.contact.hours}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <QuoteForm defaultService={defaultService} defaultSubject={defaultSubject} labelledBy="oferta-title" />
        </div>
      </div>
    </section>
  );
}
