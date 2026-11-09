/**
 * Tipurile de serviciu — folosite în meniul de navigare, în lista de servicii
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
  /** Titlul folosit în meniu și în lista de servicii */
  title: string;
  /** Eticheta din formularul de ofertă */
  formLabel: string;
  /** Pagina serviciului */
  href: string;
  /** O singură frază, cu un fapt concret (loc, oră, ce include, cum se rezervă) */
  short: string;
};

export const services: Service[] = [
  {
    id: "curse-regulate",
    title: "Curse regulate",
    formLabel: "Cursă regulată (rezervare / informații)",
    href: "/curse-regulate",
    short: "Târgu Neamț – București la 05:00 și 09:00, Roman – Constanța la 07:00, bilet online de la 120 lei.",
  },
  {
    id: "transfer-privat",
    title: "Transfer privat 8+1",
    formLabel: "Transfer privat 8+1",
    href: "/transfer-privat",
    short: "Microbuz cu 8 locuri doar pentru grupul tău, de la adresa ta până la adresa de destinație.",
  },
  {
    id: "transfer-aeroport",
    title: "Transfer Aeroport Otopeni",
    formLabel: "Transfer Aeroport Otopeni",
    href: "/transfer-aeroport-otopeni",
    short: "Te lăsăm la Terminalul Plecări sau te așteptăm la Sosiri, cu microbuz privat sau cu cursele de la 12:00 și 16:00.",
  },
  {
    id: "inchiriere",
    title: "Închiriere microbuz cu șofer",
    formLabel: "Închiriere microbuz cu șofer",
    href: "/inchiriere-microbuz-cu-sofer",
    short: "Plătești la oră, pe zi sau pe mai multe zile, iar traseul și opririle le stabilești tu.",
  },
  {
    id: "excursie",
    title: "Excursii",
    formLabel: "Excursie",
    href: "/excursii",
    short: "Ceahlău, Cheile Bicazului, Maramureș, Delta Dunării și târgurile de Crăciun din Brașov, Sibiu și Viena.",
  },
  {
    id: "pelerinaj",
    title: "Pelerinaje",
    formLabel: "Pelerinaj",
    href: "/pelerinaje",
    short: "Mănăstirile Neamțului și ale Bucovinei, Prislop, Sâmbăta de Sus, Nicula și hramul Sfintei Parascheva la Iași.",
  },
  {
    id: "grup",
    title: "Grupuri",
    formLabel: "Transport grup (școală, pensionari, ski, festival, echipă)",
    href: "/grupuri",
    short: "Transport pentru clase de elevi, cluburi de pensionari, schiori, festivaluri și echipe sportive.",
  },
  {
    id: "eveniment",
    title: "Evenimente",
    formLabel: "Eveniment (nuntă, botez, banchet)",
    href: "/evenimente",
    short: "Invitații de la nuntă, botez sau banchet, duși între biserică, restaurant și acasă.",
  },
  {
    id: "firma",
    title: "Firme",
    formLabel: "Transport pentru firme",
    href: "/firme",
    short: "Transportul angajaților la program, delegații și team-building, cu factură pe firmă.",
  },
  {
    id: "altele",
    title: "Altceva",
    formLabel: "Altceva",
    href: "/contact",
    short: "Scrie-ne traseul, data și numărul de pasageri.",
  },
];

export const serviceById = (id: string | null | undefined) => services.find((s) => s.id === id);

/** Cele trei servicii principale, afișate cu imagine mare pe pagina principală. */
export const mainServices: {
  title: string;
  text: string;
  href: string;
  image: { src: string; alt: string };
  extraLink?: { href: string; label: string };
}[] = [
  {
    title: "Transfer privat 8+1",
    text: "Microbuz cu 8 locuri doar pentru voi: plecare de la adresa ta, la ora aleasă, oriunde în țară.",
    href: "/transfer-privat",
    image: {
      src: "/images/serviciu-transfer-privat.jpg",
      alt: "Microbuz 8+1 Danca Way oprit în fața unei case, cu ușa culisantă deschisă",
    },
  },
  {
    title: "Închiriere microbuz cu șofer",
    text: "La oră, pe zi sau pe mai multe zile, cu șofer inclus; tu alegi traseul și opririle.",
    href: "/inchiriere-microbuz-cu-sofer",
    image: {
      src: "/images/serviciu-inchiriere-microbuz.jpg",
      alt: "Șofer Danca Way lângă microbuz, înaintea unei curse închiriate",
    },
  },
  {
    title: "Excursii și pelerinaje",
    text: "Ceahlău, Cheile Bicazului și Voroneț într-o zi; Prislop, Sâmbăta de Sus sau Maramureș în 2–3 zile.",
    href: "/excursii",
    image: {
      src: "/images/serviciu-excursii-pelerinaje.jpg",
      alt: "Grup de pelerini în curtea Mănăstirii Voroneț",
    },
    extraLink: { href: "/pelerinaje", label: "Pelerinaje" },
  },
];

/** Serviciile afișate ca rânduri sub cele trei principale. */
export const serviceRows: ServiceId[] = ["curse-regulate", "transfer-aeroport", "grup", "eveniment", "firma"];
