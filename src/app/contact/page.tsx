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
  return (
    <>
      <QuoteSection
        headingLevel="h1"
        title="Contact"
        className="pt-36! md:pt-44!"
        intro={`Sună la ${site.contact.phoneDisplay}, scrie pe WhatsApp sau trimite formularul cu plecarea, destinația, data și numărul de pasageri.`}
      />
      <section className="bg-white" data-bg="white">
        <div className="container-x py-12 text-sm text-muted">
          <p>
            {site.legalName} · CUI {site.cui} · {site.regCom}
          </p>
        </div>
      </section>
    </>
  );
}
