/**
 * Datele de contact și de identificare ale firmei — un singur loc de editat.
 * Valorile marcate „PLACEHOLDER” trebuie înlocuite cu datele reale înainte de lansare.
 */
export const site = {
  name: "Danca Way",
  legalName: "Danca Util Ideal SRL",
  cui: "41865158",
  /** PLACEHOLDER — nr. de înregistrare la Registrul Comerțului (ex. J27/123/2019) */
  regCom: "J27/XXXX/20XX",
  tagline: "Transport persoane din Neamț",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dancaway.ro").replace(/\/$/, ""),
  locale: "ro_RO",

  contact: {
    /** Telefonul afișat (rezervări și informații, ca pe danca-transport.autogari.ro/contact) */
    phoneDisplay: "0725 819 224",
    /** Același telefon, format internațional fără spații (link-ul tel:) */
    phoneE164: "+40725819224",
    /** Număr WhatsApp, doar cifre, cu prefixul țării — același număr; schimbă-l dacă WhatsApp e pe alt număr */
    whatsapp: "40725819224",
    whatsappMessage: "Bună ziua! Aș dori o ofertă de transport.",
    /** PLACEHOLDER — adresa de email */
    email: "contact@firma.ro",
    /** Sediul, conform paginii de contact Danca (danca-transport.autogari.ro/contact) */
    address: {
      street: "Str. Brândușelor nr. 92, sat Adjudeni",
      locality: "Tămășeni",
      region: "Neamț",
      postalCode: "",
      country: "RO",
    },
    /** PLACEHOLDER — programul de lucru; gol = nu se afișează. Ex.: "Luni–Duminică, 07:00–22:00" */
    hours: "",
  },

  ticketsUrl: "https://danca-transport.autogari.ro/",

  /**
   * Nota de pe Bileteria.ro — o singură sursă pentru tot site-ul.
   * Verificată pe 8 noiembrie 2026: „Nota 4.57977 din 304 evaluări” (afișat 4,58).
   * Actualizează `value`, `count` și `checkedOn` când se schimbă.
   */
  rating: {
    value: 4.58,
    count: 304,
    best: 5,
    source: "Bileteria",
    sourceUrl: "https://bileteria.ro/Transport/Roman-Constanta",
    checkedOn: "2026-11-08",
  },

  /** Zona deservită — folosită în JSON-LD */
  areaServed: ["Neamț", "Bacău", "Vrancea", "Brăila", "Buzău", "Ilfov", "București", "Constanța"],

  legal: {
    anpcSal: "https://anpc.ro/ce-este-sal/",
    anpcSol: "https://ec.europa.eu/consumers/odr",
    anpc: "https://anpc.ro/",
  },
} as const;

export const telHref = `tel:${site.contact.phoneE164}`;
export const mailHref = `mailto:${site.contact.email}`;
export const whatsappHref = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
  site.contact.whatsappMessage,
)}`;

/** Nota rotunjită la o zecimală, cu virgulă: 4.58 → „4,6” */
export const ratingDisplay = site.rating.value.toFixed(1).replace(".", ",");
/** „de” după numerale: 20–99 în ultimele două cifre (ex. „304 recenzii”, dar „320 de recenzii”). */
export const withDe = (n: number, noun: string) => {
  const r = n % 100;
  return `${n} ${r === 0 || r >= 20 ? "de " : ""}${noun}`;
};
/** Ex.: „4,6 din 5 pe Bileteria, din 304 recenzii” */
export const ratingSentence = `${ratingDisplay} din ${site.rating.best} pe ${site.rating.source}, din ${withDe(site.rating.count, "recenzii")}`;
