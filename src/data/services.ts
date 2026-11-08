/**
 * Tipurile de serviciu — folosite în meniul de navigare, în grila de servicii
 * și ca opțiuni în formularul de ofertă.
 */
export type ServiceId =
  | "curse-regulate"
  | "transfer-privat"
  | "transfer-aeroport"
  | "inchiriere"
  | "excursie"
  | "pelerinaj"
  | "grup"
  | "eveniment"
  | "firma"
  | "altele";

export type Service = {
  id: ServiceId;
  /** Titlul folosit în meniu și pe carduri */
  title: string;
  /** Eticheta din formularul de ofertă */
  formLabel: string;
  /** Pagina serviciului */
  href: string;
  /** O frază scurtă pentru carduri */
  short: string;
};

export const services: Service[] = [
  {
    id: "curse-regulate",
    title: "Curse regulate",
    formLabel: "Cursă regulată (rezervare / informații)",
    href: "/curse-regulate",
    short: "Zilnic între Neamț, București, Otopeni și Constanța. Bilete online.",
  },
  {
    id: "transfer-privat",
    title: "Transfer privat 8+1",
    formLabel: "Transfer privat 8+1",
    href: "/transfer-privat",
    short: "Microbuz doar pentru tine și ai tăi, de la ușă la ușă, oriunde în țară.",
  },
  {
    id: "transfer-aeroport",
    title: "Transfer Aeroport Otopeni",
    formLabel: "Transfer Aeroport Otopeni",
    href: "/transfer-aeroport-otopeni",
    short: "Te luăm de acasă și te lăsăm la terminal. Urmărim zborul la întoarcere.",
  },
  {
    id: "inchiriere",
    title: "Închiriere microbuz cu șofer",
    formLabel: "Închiriere microbuz cu șofer",
    href: "/inchiriere-microbuz-cu-sofer",
    short: "La oră, pe zi sau pe mai multe zile. Tu stabilești traseul.",
  },
  {
    id: "excursie",
    title: "Excursii",
    formLabel: "Excursie",
    href: "/excursii",
    short: "Excursii de o zi, circuite de weekend, târguri de Crăciun, city break, litoral.",
  },
  {
    id: "pelerinaj",
    title: "Pelerinaje",
    formLabel: "Pelerinaj",
    href: "/pelerinaje",
    short: "Mănăstirile Neamțului, Bucovina, Prislop, Sâmbăta de Sus, Nicula, hramuri mari.",
  },
  {
    id: "grup",
    title: "Grupuri",
    formLabel: "Transport grup (școală, pensionari, ski, festival, echipă)",
    href: "/grupuri",
    short: "Școli, pensionari, ski, festivaluri și echipe sportive.",
  },
  {
    id: "eveniment",
    title: "Evenimente",
    formLabel: "Eveniment (nuntă, botez, banchet)",
    href: "/evenimente",
    short: "Nunți, botezuri și banchete. Invitații ajung și pleacă în siguranță.",
  },
  {
    id: "firma",
    title: "Firme",
    formLabel: "Transport pentru firme",
    href: "/firme",
    short: "Transport angajați, delegații, team-building. Factură pe firmă.",
  },
  {
    id: "altele",
    title: "Altceva",
    formLabel: "Altceva",
    href: "/contact",
    short: "Spune-ne ce ai nevoie.",
  },
];

export const serviceById = (id: string | null | undefined) =>
  services.find((s) => s.id === id);

/** Serviciile afișate în grila de pe pagina principală (fără „Altceva”). */
export const featuredServices = services.filter((s) => s.id !== "altele");
