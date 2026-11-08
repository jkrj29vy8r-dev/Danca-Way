/**
 * Pelerinajele. Editează lista direct aici.
 * `featured: true` le afișează și în banda de pe pagina principală.
 * Imaginea implicită: /public/images/pelerinaje-<slug>.jpg (4:3, minimum 1600×1200).
 */

export type PilgrimageCategory = "manastiri" | "sarbatori";

export const pilgrimageCategories: { id: PilgrimageCategory; label: string }[] = [
  { id: "manastiri", label: "Mănăstiri" },
  { id: "sarbatori", label: "Hramuri și sărbători mari" },
];

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
  image?: string;
};

export const pilgrimages: Pilgrimage[] = [
  {
    slug: "manastirile-neamtului",
    title: "Mănăstirile Neamțului",
    category: "manastiri",
    duration: "1 zi",
    places: ["Mănăstirea Neamț", "Sihăstria", "Secu", "Agapia", "Văratec"],
    description:
      "Cinci mănăstiri într-o zi: Neamț, Sihăstria, Secu, Agapia și Văratec, toate pe o rază de 25 km în jurul Târgu Neamțului.",
    featured: true,
  },
  {
    slug: "manastirile-bucovinei",
    title: "Mănăstirile Bucovinei",
    category: "manastiri",
    duration: "1–2 zile",
    places: ["Voroneț", "Humor", "Moldovița", "Sucevița", "Putna"],
    description:
      "Bisericile pictate de la Voroneț, Humor, Moldovița și Sucevița, aflate în patrimoniul UNESCO, și mormântul lui Ștefan cel Mare de la Putna.",
    featured: true,
  },
  {
    slug: "prislop",
    title: "Mănăstirea Prislop",
    category: "manastiri",
    duration: "2 zile / 1 noapte",
    places: ["Mănăstirea Prislop", "Mormântul Părintelui Arsenie Boca", "Biserica Densuș"],
    description:
      "Mănăstirea Prislop din județul Hunedoara, mormântul Părintelui Arsenie Boca și biserica de piatră de la Densuș, cu o noapte pe drum.",
    featured: true,
  },
  {
    slug: "sambata-de-sus",
    title: "Mănăstirea Sâmbăta de Sus",
    category: "manastiri",
    duration: "2 zile / 1 noapte",
    places: ["Mănăstirea Brâncoveanu", "Izvorul Părintelui Arsenie", "Făgăraș"],
    description:
      "Mănăstirea Brâncoveanu de la Sâmbăta de Sus, ctitorită de Constantin Brâncoveanu la poalele Munților Făgăraș, și izvorul Părintelui Arsenie.",
  },
  {
    slug: "nicula",
    title: "Mănăstirea Nicula",
    category: "manastiri",
    duration: "2 zile / 1 noapte",
    places: ["Mănăstirea Nicula", "Icoana Maicii Domnului", "Cluj-Napoca"],
    description:
      "Mănăstirea Nicula de lângă Gherla, cu icoana Maicii Domnului din 1681, și o oprire în centrul Clujului.",
  },
  {
    slug: "hram-sfanta-parascheva",
    title: "Sfânta Cuvioasă Parascheva — Iași",
    category: "sarbatori",
    duration: "1 zi",
    date: "14 octombrie",
    places: ["Catedrala Mitropolitană Iași", "Mănăstirea Golia"],
    description:
      "Plecare noaptea, ca să intri la rând dimineața la Catedrala Mitropolitană din Iași, și întoarcere în aceeași zi.",
    featured: true,
  },
  {
    slug: "hram-adormirea-nicula",
    title: "Adormirea Maicii Domnului — Nicula",
    category: "sarbatori",
    duration: "2 zile / 1 noapte",
    date: "15 august",
    places: ["Mănăstirea Nicula"],
    description: "Plecare pe 14 august, priveghere la Nicula în noaptea de hram și Sfânta Liturghie pe 15 august.",
  },
  {
    slug: "hram-sfantul-ioan-suceava",
    title: "Sfântul Ioan cel Nou — Suceava",
    category: "sarbatori",
    duration: "1 zi",
    date: "24 iunie",
    places: ["Mănăstirea Sfântul Ioan cel Nou", "Cetatea de Scaun a Sucevei"],
    description:
      "Hramul de la Mănăstirea Sfântul Ioan cel Nou din Suceava, la 24 iunie, cu o oprire la Cetatea de Scaun.",
  },
  {
    slug: "pomenire-arsenie-boca",
    title: "Pomenirea Părintelui Arsenie Boca — Prislop",
    category: "sarbatori",
    duration: "2 zile / 1 noapte",
    date: "28 noiembrie",
    places: ["Mănăstirea Prislop"],
    description: "Plecare pe 27 noiembrie, ca să fii la Prislop dimineața pe 28 noiembrie, ziua de pomenire.",
  },
];

export const pilgrimageImage = (p: Pick<Pilgrimage, "slug" | "image">) => p.image ?? `/images/pelerinaje-${p.slug}.jpg`;
export const pilgrimageHref = (p: Pick<Pilgrimage, "slug">) => `/pelerinaje/${p.slug}`;
export const pilgrimageCategoryLabel = (c: PilgrimageCategory) =>
  pilgrimageCategories.find((x) => x.id === c)?.label ?? "";
