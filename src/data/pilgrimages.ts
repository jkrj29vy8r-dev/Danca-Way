/**
 * Pelerinajele. Editează lista direct aici.
 * `featured: true` le afișează și în banda de pe pagina principală.
 */

export type PilgrimageCategory = "manastiri" | "sarbatori";

export type Pilgrimage = {
  slug: string;
  title: string;
  category: PilgrimageCategory;
  duration: string;
  places: string[];
  description: string;
  /** Pentru hramuri: data sărbătorii */
  date?: string;
  featured?: boolean;
};

export const pilgrimages: Pilgrimage[] = [
  {
    slug: "manastirile-neamtului",
    title: "Mănăstirile Neamțului",
    category: "manastiri",
    duration: "1 zi",
    places: ["Mănăstirea Neamț", "Sihăstria", "Secu", "Agapia", "Văratec"],
    description: "Inima ortodoxiei românești, la câțiva kilometri de casă.",
    featured: true,
  },
  {
    slug: "manastirile-bucovinei",
    title: "Mănăstirile Bucovinei",
    category: "manastiri",
    duration: "1–2 zile",
    places: ["Voroneț", "Humor", "Moldovița", "Sucevița", "Putna"],
    description: "Bisericile pictate din patrimoniul UNESCO și mormântul lui Ștefan cel Mare.",
    featured: true,
  },
  {
    slug: "prislop",
    title: "Mănăstirea Prislop",
    category: "manastiri",
    duration: "2 zile / 1 noapte",
    places: ["Mănăstirea Prislop", "Mormântul Părintelui Arsenie Boca", "Biserica Densuș"],
    description: "Pelerinaj la mormântul Părintelui Arsenie Boca.",
    featured: true,
  },
  {
    slug: "sambata-de-sus",
    title: "Mănăstirea Sâmbăta de Sus",
    category: "manastiri",
    duration: "2 zile / 1 noapte",
    places: ["Mănăstirea Brâncoveanu", "Izvorul Părintelui Arsenie", "Făgăraș"],
    description: "Mănăstirea lui Constantin Brâncoveanu, la poalele Făgărașului.",
  },
  {
    slug: "nicula",
    title: "Mănăstirea Nicula",
    category: "manastiri",
    duration: "2 zile / 1 noapte",
    places: ["Mănăstirea Nicula", "Icoana făcătoare de minuni", "Cluj-Napoca"],
    description: "Cel mai mare pelerinaj marian din Transilvania.",
  },
  {
    slug: "hram-sfanta-parascheva",
    title: "Sfânta Cuvioasă Parascheva — Iași",
    category: "sarbatori",
    duration: "1 zi",
    date: "14 octombrie",
    places: ["Catedrala Mitropolitană Iași", "Mănăstirea Golia"],
    description: "Cel mai mare pelerinaj din țară, cu plecare la ore potrivite pentru rând.",
    featured: true,
  },
  {
    slug: "hram-adormirea-nicula",
    title: "Adormirea Maicii Domnului — Nicula",
    category: "sarbatori",
    duration: "2 zile / 1 noapte",
    date: "15 august",
    places: ["Mănăstirea Nicula"],
    description: "Hramul Niculei, cu priveghere și Sfânta Liturghie.",
  },
  {
    slug: "hram-sfantul-ioan-suceava",
    title: "Sfântul Ioan cel Nou — Suceava",
    category: "sarbatori",
    duration: "1 zi",
    date: "24 iunie",
    places: ["Mănăstirea Sfântul Ioan cel Nou", "Cetatea de Scaun a Sucevei"],
    description: "Hramul ocrotitorului Moldovei.",
  },
  {
    slug: "pomenire-arsenie-boca",
    title: "Pomenirea Părintelui Arsenie Boca — Prislop",
    category: "sarbatori",
    duration: "2 zile / 1 noapte",
    date: "28 noiembrie",
    places: ["Mănăstirea Prislop"],
    description: "Ziua în care mii de pelerini urcă la Prislop.",
  },
];
