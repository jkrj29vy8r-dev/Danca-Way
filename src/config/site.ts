/**
 * Datele de contact și de identificare ale firmei — un singur loc de editat.
 * Valorile marcate „PLACEHOLDER” trebuie înlocuite cu datele reale înainte de lansare.
 */
export const site = {
  name: "Danca Way",
  legalName: "Danca Util Ideal SRL",
  cui: "41865158",
  /** PLACEHOLDER — nr. de înregistrare la Registrul Comerțului */
  regCom: "J27/XXXX/20XX",
  tagline: "Transport persoane din Neamț",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dancaway.ro").replace(/\/$/, ""),
  locale: "ro_RO",

  contact: {
    /** PLACEHOLDER */
    phoneDisplay: "07XX XXX XXX",
    /** PLACEHOLDER — format internațional, fără spații, folosit în link-ul tel: */
    phoneE164: "+40700000000",
    /** PLACEHOLDER — număr WhatsApp, doar cifre, cu prefixul țării */
    whatsapp: "40700000000",
    whatsappMessage: "Bună ziua! Aș dori o ofertă de transport.",
    /** PLACEHOLDER */
    email: "contact@firma.ro",
    /** PLACEHOLDER */
    address: {
      street: "",
      locality: "Piatra Neamț",
      region: "Neamț",
      postalCode: "",
      country: "RO",
    },
    /** PLACEHOLDER — programul de lucru; gol = nu se afișează. Ex.: "Luni–Duminică, 07:00–22:00" */
    hours: "",
  },

  ticketsUrl: "https://danca-transport.autogari.ro/",

  /** Zona deservită — folosită în JSON-LD */
  areaServed: ["Neamț", "Bacău", "Iași", "Suceava", "București", "Constanța"],

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
