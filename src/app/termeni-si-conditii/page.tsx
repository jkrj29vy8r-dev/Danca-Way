import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/pages/LegalPage";
import { mailHref, site, telHref } from "@/config/site";
import { pageMeta } from "@/lib/seo";

// Text de pornire, redactat pe baza datelor reale ale firmei. Recomandat: verificare de către un jurist.
export const metadata: Metadata = pageMeta({
  title: "Termeni și condiții",
  description: `Termenii de utilizare a site-ului Danca Way, operat de ${site.legalName} (CUI ${site.cui}): orar, prețuri, cereri de ofertă, bilete și soluționarea litigiilor.`,
  path: "/termeni-si-conditii",
});

export default function TermeniPage() {
  const a = site.contact.address;
  return (
    <LegalPage title="Termeni și condiții" updated="9 noiembrie 2026">
      <h2>1. Cine suntem</h2>
      <p>
        Site-ul este operat de <strong>{site.legalName}</strong>, cu sediul în {a.street}, comuna {a.locality}, județul{" "}
        {a.region}, CUI {site.cui}, înregistrată la Registrul Comerțului sub nr. {site.regCom}. Ne poți contacta la{" "}
        <a href={telHref}>{site.contact.phoneDisplay}</a> sau la <a href={mailHref}>{site.contact.email}</a>.
      </p>

      <h2>2. Ce găsești pe site</h2>
      <p>
        Site-ul prezintă cursele regulate Danca, serviciile de transfer, închiriere, excursii și pelerinaje și un formular
        prin care ceri o ofertă de preț. Folosirea site-ului este gratuită și nu necesită cont.
      </p>

      <h2>3. Orar și prețuri</h2>
      <ul>
        <li>Orele afișate sunt orientative și se confirmă la rezervare; pot apărea întârzieri din cauza traficului sau a vremii.</li>
        <li>Prețurile sunt în lei și sunt pentru biletul întreg; reducerile se confirmă la cumpărare.</li>
        <li>Prețul serviciilor private (transfer, închiriere, excursii, grupuri, evenimente, firme) este cel din oferta confirmată.</li>
      </ul>

      <h2>4. Bilete la cursele regulate</h2>
      <p>
        Biletele se cumpără online, prin platforma{" "}
        <a href={site.ticketsUrl} target="_blank" rel="noopener">
          danca-transport.autogari.ro
        </a>{" "}
        (Autogari.RO), sau la telefon. Pentru biletele cumpărate online se aplică termenii și politica de anulare afișate pe
        platformă la momentul cumpărării. Drepturile pasagerilor sunt cele prevăzute de Regulamentul (UE) nr. 181/2011
        privind drepturile pasagerilor care călătoresc cu autobuzul și autocarul.
      </p>

      <h2>5. Cereri de ofertă</h2>
      <p>
        Trimiterea formularului nu reprezintă o rezervare și nu te obligă la nimic. Transportul se consideră rezervat
        după ce ambele părți confirmă oferta (traseu, dată, oră, număr de pasageri, preț), în scris sau la telefon.
      </p>

      <h2>6. Conținutul site-ului</h2>
      <p>
        Textele, logo-ul, fotografiile și grafica site-ului aparțin {site.legalName} și nu pot fi copiate în scop comercial
        fără acordul nostru scris. Linkurile către alte site-uri (de exemplu platforma de bilete sau WhatsApp) duc la
        servicii cu propriii termeni.
      </p>

      <h2>7. Date personale și cookie-uri</h2>
      <p>
        Modul în care folosim datele trimise prin formular este descris în{" "}
        <Link href="/politica-de-confidentialitate">Politica de confidențialitate</Link>. Site-ul nu folosește cookie-uri;
        detalii în <Link href="/politica-cookie">Politica de cookie-uri</Link>.
      </p>

      <h2>8. Reclamații și soluționarea litigiilor</h2>
      <p>
        Pentru orice nemulțumire, scrie-ne la <a href={mailHref}>{site.contact.email}</a> sau sună la{" "}
        <a href={telHref}>{site.contact.phoneDisplay}</a>. Dacă nu ajungem la o soluție, te poți adresa Autorității
        Naționale pentru Protecția Consumatorilor (
        <a href={site.legal.anpc} target="_blank" rel="noopener">
          anpc.ro
        </a>
        ) sau poți folosi procedura de{" "}
        <a href={site.legal.anpcSal} target="_blank" rel="noopener">
          soluționare alternativă a litigiilor (SAL)
        </a>
        . Platforma europeană de{" "}
        <a href={site.legal.anpcSol} target="_blank" rel="noopener">
          soluționare online a litigiilor (SOL)
        </a>{" "}
        a fost închisă de Comisia Europeană în 2025.
      </p>

      <h2>9. Legea aplicabilă</h2>
      <p>
        Acești termeni se supun legii române. Litigiile care nu se rezolvă pe cale amiabilă sunt de competența instanțelor
        românești.
      </p>
    </LegalPage>
  );
}
