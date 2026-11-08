import { QuoteForm } from "./QuoteForm";
import { Mail, Phone, WhatsApp } from "./icons";
import { mailHref, site, telHref, whatsappHref } from "@/config/site";
import type { ServiceId } from "@/data/services";

type Props = {
  title?: React.ReactNode;
  intro?: string;
  defaultService?: ServiceId;
  headingLevel?: "h1" | "h2";
};

/** Secțiunea cu formularul de ofertă și datele de contact directe. */
export function QuoteSection({
  title = (
    <>
      Spune-ne unde mergi.
      <br />
      Noi ne ocupăm de drum.
    </>
  ),
  intro = "Completează formularul și revenim cu o ofertă clară. Dacă te grăbești, sună-ne sau scrie-ne pe WhatsApp.",
  defaultService,
  headingLevel: H = "h2",
}: Props) {
  return (
    <section id="oferta" className="section-y scroll-mt-16 bg-light" aria-labelledby="oferta-title">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="eyebrow text-muted">Cere ofertă</p>
          <H id="oferta-title" className="display-md mt-6">
            {title}
          </H>
          <p className="mt-6 max-w-md text-lg text-muted">{intro}</p>

          <ul className="mt-10 space-y-3">
            {[
              { href: telHref, icon: <Phone size={20} />, label: "Telefon", value: site.contact.phoneDisplay },
              { href: whatsappHref, icon: <WhatsApp size={20} />, label: "WhatsApp", value: "Scrie-ne un mesaj", external: true },
              { href: mailHref, icon: <Mail size={20} />, label: "Email", value: site.contact.email },
            ].map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener" } : {})}
                  className="card-lift flex items-center gap-4 rounded-2xl border border-line bg-white p-4"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-night text-white">{c.icon}</span>
                  <span>
                    <span className="block text-sm text-muted">{c.label}</span>
                    <span className="block font-semibold">{c.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">Program: {site.contact.hours}</p>
        </div>

        <div className="lg:col-span-7">
          <QuoteForm defaultService={defaultService} />
        </div>
      </div>
    </section>
  );
}
