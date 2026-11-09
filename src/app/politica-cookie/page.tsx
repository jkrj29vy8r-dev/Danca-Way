import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/pages/LegalPage";
import { mailHref, site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

// Verificat pe 9 noiembrie 2026: site-ul nu setează cookie-uri și nu scrie în localStorage, sessionStorage sau IndexedDB.
// Dacă adaugi un instrument de analiză sau de marketing, actualizează pagina și adaugă un banner de consimțământ.
export const metadata: Metadata = pageMeta({
  title: "Politica de cookie-uri",
  description: "Site-ul Danca Way nu folosește cookie-uri și nici instrumente de analiză sau publicitate. Ce se întâmplă pe site-urile externe la care trimitem.",
  path: "/politica-cookie",
});

export default function CookiePage() {
  return (
    <LegalPage title="Politica de cookie-uri" updated="9 noiembrie 2026">
      <h2>Pe scurt: nu folosim cookie-uri</h2>
      <p>
        Site-ul {site.name} nu plasează cookie-uri în browserul tău și nu salvează date în memoria locală a browserului
        (localStorage, sessionStorage sau IndexedDB). Nu folosim instrumente de analiză a traficului, de publicitate sau de
        urmărire. De aceea nu îți cerem consimțământul printr-un banner.
      </p>

      <h2>Formularul de ofertă</h2>
      <p>
        Datele trimise prin formular nu sunt păstrate în browser; ajung la noi pe email. Detalii în{" "}
        <Link href="/politica-de-confidentialitate">Politica de confidențialitate</Link>.
      </p>

      <h2>Site-uri externe</h2>
      <p>Unele linkuri duc pe alte site-uri, care pot folosi propriile cookie-uri, conform politicilor lor:</p>
      <ul>
        <li>
          platforma de bilete{" "}
          <a href={site.ticketsUrl} target="_blank" rel="noopener">
            danca-transport.autogari.ro
          </a>{" "}
          (Autogari.RO);
        </li>
        <li>WhatsApp, când alegi să ne scrii acolo;</li>
        <li>site-urile ANPC și ale Comisiei Europene, din subsolul paginii.</li>
      </ul>

      <h2>Dacă se schimbă ceva</h2>
      <p>
        Dacă vom adăuga vreodată cookie-uri care nu sunt strict necesare, îți vom cere acordul înainte și vom actualiza
        această pagină. Întrebări: <a href={mailHref}>{site.contact.email}</a>.
      </p>
    </LegalPage>
  );
}
