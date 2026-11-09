import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/pages/LegalPage";
import { mailHref, site, telHref } from "@/config/site";
import { pageMeta } from "@/lib/seo";

// Text de pornire conform GDPR, redactat pe baza modului real în care funcționează site-ul
// (formularul trimite emailuri prin Resend, găzduire pe Vercel, fără cookie-uri). Recomandat: verificare de către un jurist.
export const metadata: Metadata = pageMeta({
  title: "Politica de confidențialitate",
  description: `Cum folosește ${site.legalName} datele trimise prin formularul de ofertă de pe site-ul Danca Way: ce date, de ce, cât timp le păstrăm și ce drepturi ai conform GDPR.`,
  path: "/politica-de-confidentialitate",
});

export default function ConfidentialitatePage() {
  const a = site.contact.address;
  return (
    <LegalPage title="Politica de confidențialitate" updated="9 noiembrie 2026">
      <h2>1. Operatorul datelor</h2>
      <p>
        <strong>{site.legalName}</strong>, CUI {site.cui}, cu sediul în {a.street}, comuna {a.locality}, județul {a.region}.
        Pentru orice întrebare despre datele tale: <a href={mailHref}>{site.contact.email}</a> sau{" "}
        <a href={telHref}>{site.contact.phoneDisplay}</a>.
      </p>

      <h2>2. Ce date colectăm</h2>
      <p>Prin formularul de cerere de ofertă primim doar ce completezi tu:</p>
      <ul>
        <li>tipul serviciului, localitatea de plecare, destinația, data și numărul de pasageri;</li>
        <li>numele și numărul de telefon;</li>
        <li>adresa de email, dacă o completezi (este opțională);</li>
        <li>detaliile pe care alegi să le scrii în câmpul „Detalii”.</li>
      </ul>
      <p>
        Furnizorul de găzduire înregistrează automat, pentru securitate, date tehnice despre cereri (adresa IP, tipul de
        browser, ora accesării). Site-ul nu folosește cookie-uri și nici instrumente de analiză sau publicitate.
      </p>

      <h2>3. De ce le folosim și pe ce temei</h2>
      <ul>
        <li>
          <strong>Ca să îți răspundem cu oferta și să organizăm transportul</strong> — art. 6 alin. (1) lit. (b) GDPR
          (demersuri înainte de încheierea unui contract, la cererea ta).
        </li>
        <li>
          <strong>Ca să emitem factura, dacă rezervi</strong> — art. 6 alin. (1) lit. (c) GDPR (obligație legală).
        </li>
        <li>
          <strong>Ca să protejăm site-ul împotriva abuzurilor</strong> (jurnale tehnice, limitarea numărului de cereri) —
          art. 6 alin. (1) lit. (f) GDPR (interes legitim).
        </li>
      </ul>
      <p>Nu folosim datele pentru marketing și nu le vindem.</p>

      <h2>4. Cine are acces la date</h2>
      <ul>
        <li>echipa {site.name}, care răspunde la cereri;</li>
        <li>
          <strong>Resend</strong> (Resend, Inc., SUA), serviciul prin care formularul ne trimite cererea pe email;
        </li>
        <li>
          <strong>Vercel</strong> (Vercel Inc., SUA), furnizorul de găzduire al site-ului.
        </li>
      </ul>
      <p>
        Transferul datelor în SUA către acești furnizori se face pe baza Cadrului UE–SUA privind confidențialitatea datelor
        (Data Privacy Framework) sau a clauzelor contractuale standard aprobate de Comisia Europeană. Dacă ne scrii pe
        WhatsApp sau cumperi bilet pe platforma Autogari.RO, datele sunt prelucrate și conform politicilor acelor servicii.
      </p>

      <h2>5. Cât timp le păstrăm</h2>
      <ul>
        <li>cererile de ofertă: cel mult 12 luni de la ultima comunicare cu tine;</li>
        <li>documentele contabile (de exemplu facturile): pe durata prevăzută de legislația contabilă;</li>
        <li>jurnalele tehnice: pe durata stabilită de furnizorul de găzduire, de regulă câteva zile.</li>
      </ul>

      <h2>6. Drepturile tale</h2>
      <p>
        Conform art. 15–22 GDPR ai dreptul de acces, de rectificare, de ștergere, de restricționare a prelucrării, de
        portabilitate și de opoziție. Le poți exercita gratuit scriindu-ne la <a href={mailHref}>{site.contact.email}</a>;
        îți răspundem în cel mult o lună. Ai și dreptul de a depune plângere la Autoritatea Națională de Supraveghere a
        Prelucrării Datelor cu Caracter Personal (ANSPDCP), B-dul G-ral. Gheorghe Magheru nr. 28-30, Sector 1, București,{" "}
        <a href="https://www.dataprotection.ro" target="_blank" rel="noopener">
          dataprotection.ro
        </a>
        .
      </p>

      <h2>7. Securitate</h2>
      <p>
        Site-ul folosește doar conexiuni criptate (HTTPS), iar formularul are protecție împotriva trimiterilor automate.
      </p>

      <h2>8. Modificări</h2>
      <p>
        Dacă schimbăm modul în care folosim datele, actualizăm această pagină și data de sus. Vezi și{" "}
        <Link href="/politica-cookie">Politica de cookie-uri</Link> și <Link href="/termeni-si-conditii">Termenii și condițiile</Link>.
      </p>
    </LegalPage>
  );
}
