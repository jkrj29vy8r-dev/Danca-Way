import type { Metadata } from "next";
import { QuoteSection } from "@/components/QuoteSection";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact și cerere de ofertă",
  description: `Cere ofertă pentru transfer privat 8+1, transfer Otopeni, închiriere microbuz cu șofer, excursii, pelerinaje și grupuri. Telefon ${site.contact.phoneDisplay}, WhatsApp și email ${site.contact.email}.`,
  path: "/contact",
});

export default function ContactPage() {
  const a = site.contact.address;
  const company = [
    { label: "Firma", value: site.legalName },
    { label: "CUI", value: site.cui },
    { label: "Nr. Reg. Com.", value: site.regCom },
    { label: "Sediu", value: `${a.street}, com. ${a.locality}, jud. ${a.region}` },
  ];
  return (
    <>
      <QuoteSection
        headingLevel="h1"
        title="Contact."
        lead="Sună, scrie pe WhatsApp sau trimite formularul."
        intro="Pentru o ofertă, scrie plecarea, destinația, data și numărul de pasageri. Biletele la cursele regulate se cumpără online, pe autogari.ro."
        className="pt-32! lg:pt-48!"
      />
      <section className="section-y bg-light" aria-labelledby="firma-title" data-bg="light">
        <div className="container-x grid-12 gap-y-12">
          <h2 id="firma-title" className="t-32 col-span-12 font-semibold lg:col-span-4">
            Date de identificare
          </h2>
          <dl className="col-span-12 border-b border-line lg:col-span-7 lg:col-start-6">
            {company.map((c) => (
              <div key={c.label} className="grid grid-cols-[8rem_1fr] gap-4 border-t border-line py-4 sm:grid-cols-[12rem_1fr]">
                <dt className="label self-center text-muted">{c.label}</dt>
                <dd className="font-semibold">{c.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
