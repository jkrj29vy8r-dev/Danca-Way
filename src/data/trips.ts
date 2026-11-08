/**
 * Excursiile. Adaugă, șterge sau modifică intrări direct aici.
 * `featured: true` le afișează și în banda de pe pagina principală.
 * Imaginea implicită: /public/images/excursii-<slug>.jpg (4:3, minimum 1600×1200).
 */

export type TripCategory = "o-zi" | "weekend" | "craciun" | "city-break" | "litoral";

export const tripCategories: { id: TripCategory; label: string }[] = [
  { id: "o-zi", label: "Excursii de o zi" },
  { id: "weekend", label: "Circuite de weekend" },
  { id: "craciun", label: "Târguri de Crăciun" },
  { id: "city-break", label: "City break" },
  { id: "litoral", label: "Litoral" },
];

export type Trip = {
  slug: string;
  title: string;
  category: TripCategory;
  /** Ex.: „1 zi”, „3 zile / 2 nopți” */
  duration: string;
  places: string[];
  /** Fraze concrete: ce se vizitează, ce include, când */
  description: string;
  /** Perioada recomandată, opțional */
  season?: string;
  featured?: boolean;
  /** Suprascrie imaginea implicită */
  image?: string;
};

export const trips: Trip[] = [
  {
    slug: "cheile-bicazului-lacul-rosu",
    title: "Cheile Bicazului & Lacul Roșu",
    category: "o-zi",
    duration: "1 zi",
    places: ["Barajul Izvorul Muntelui", "Cheile Bicazului", "Lacul Roșu"],
    description:
      "Oprire la barajul Izvorul Muntelui, drum prin Cheile Bicazului și timp liber la Lacul Roșu. Întoarcerea în Neamț este seara, în aceeași zi.",
    featured: true,
  },
  {
    slug: "cetatea-neamtului-humulesti",
    title: "Cetatea Neamțului & Humulești",
    category: "o-zi",
    duration: "1 zi",
    places: ["Cetatea Neamțului", "Casa memorială Ion Creangă", "Mănăstirea Neamț"],
    description:
      "Cetatea Neamțului, casa lui Ion Creangă din Humulești și Mănăstirea Neamț, toate la mai puțin de 15 km una de alta.",
  },
  {
    slug: "salina-praid-sovata",
    title: "Salina Praid & Sovata",
    category: "o-zi",
    duration: "1 zi",
    places: ["Salina Praid", "Lacul Ursu", "Sovata"],
    description:
      "Coborâre în Salina Praid și plimbare pe malul Lacului Ursu din Sovata, la circa trei ore de mers din Piatra Neamț.",
  },
  {
    slug: "transilvania-sibiu-brasov",
    title: "Brașov, Sibiu & Transfăgărășan",
    category: "weekend",
    duration: "3 zile / 2 nopți",
    places: ["Brașov", "Sibiu", "Bâlea Lac", "Transfăgărășan"],
    description:
      "O noapte la Brașov, una la Sibiu și urcarea pe Transfăgărășan până la Bâlea Lac. Drumul este deschis de regulă între 1 iulie și 31 octombrie.",
    season: "iulie – octombrie",
    featured: true,
  },
  {
    slug: "maramures",
    title: "Maramureș",
    category: "weekend",
    duration: "3 zile / 2 nopți",
    places: ["Cimitirul Vesel Săpânța", "Mănăstirea Bârsana", "Mocănița Vișeu de Sus"],
    description:
      "Cimitirul Vesel din Săpânța, Mănăstirea Bârsana și o tură cu Mocănița pe Valea Vaserului, cu două nopți în Maramureș.",
  },
  {
    slug: "delta-dunarii",
    title: "Delta Dunării",
    category: "weekend",
    duration: "3 zile / 2 nopți",
    places: ["Tulcea", "Crișan", "Canalele Deltei"],
    description:
      "Drum până la Tulcea, de unde continui cu barca spre Crișan, pe canalele Deltei, și înapoi după două nopți.",
    season: "mai – septembrie",
  },
  {
    slug: "craciun-brasov-sibiu",
    title: "Târgurile de Crăciun Brașov & Sibiu",
    category: "craciun",
    duration: "2 zile / 1 noapte",
    places: ["Piața Sfatului, Brașov", "Piața Mare, Sibiu"],
    description:
      "Seara în Piața Sfatului din Brașov, a doua zi în Piața Mare din Sibiu, cu o noapte de cazare între ele.",
    season: "decembrie",
    featured: true,
  },
  {
    slug: "craciun-budapesta",
    title: "Târgul de Crăciun din Budapesta",
    category: "craciun",
    duration: "3 zile / 2 nopți",
    places: ["Vörösmarty tér", "Bazilica Sf. Ștefan", "Parlamentul", "Dunărea"],
    description:
      "Două nopți în Budapesta, cu târgurile din Vörösmarty tér și din fața Bazilicii Sf. Ștefan, la 10 minute de mers pe jos unul de altul.",
    season: "decembrie",
  },
  {
    slug: "craciun-viena",
    title: "Crăciun la Viena",
    category: "craciun",
    duration: "4 zile / 3 nopți",
    places: ["Rathausplatz", "Schönbrunn", "Stephansdom"],
    description:
      "Târgul din Rathausplatz, cel de la Palatul Schönbrunn și catedrala Stephansdom, cu trei nopți în Viena.",
    season: "decembrie",
  },
  {
    slug: "city-break-budapesta",
    title: "City break Budapesta",
    category: "city-break",
    duration: "3 zile / 2 nopți",
    places: ["Bastionul Pescarilor", "Băile Széchenyi", "Insula Margareta"],
    description:
      "Bastionul Pescarilor, Băile Széchenyi și o seară pe Insula Margareta, cu două nopți în Budapesta.",
    featured: true,
  },
  {
    slug: "city-break-viena-praga",
    title: "Viena & Praga",
    category: "city-break",
    duration: "5 zile / 4 nopți",
    places: ["Viena", "Brno", "Praga", "Podul Carol"],
    description: "Două nopți la Viena, două la Praga și o oprire de prânz la Brno, pe drumul dintre ele.",
  },
  {
    slug: "litoral-romanesc",
    title: "Litoralul românesc",
    category: "litoral",
    duration: "dus-întors, la date alese",
    places: ["Mamaia", "Constanța", "Eforie", "Vama Veche"],
    description:
      "Te lăsăm la hotel în Mamaia, Eforie sau Vama Veche și te luăm înapoi la data aleasă. Pentru o persoană, cursa Roman – Constanța de la 07:00 costă 160 lei.",
    season: "iunie – septembrie",
    featured: true,
  },
  {
    slug: "litoral-bulgaria",
    title: "Balcic & Nisipurile de Aur",
    category: "litoral",
    duration: "4 zile / 3 nopți",
    places: ["Balcic", "Capul Kaliakra", "Nisipurile de Aur"],
    description:
      "Castelul și grădina botanică din Balcic, Capul Kaliakra și trei nopți la Nisipurile de Aur. La graniță ai nevoie de buletin sau pașaport valabil.",
    season: "iunie – septembrie",
  },
];

export const tripImage = (t: Pick<Trip, "slug" | "image">) => t.image ?? `/images/excursii-${t.slug}.jpg`;
export const tripHref = (t: Pick<Trip, "slug">) => `/excursii/${t.slug}`;
export const tripCategoryLabel = (c: TripCategory) => tripCategories.find((x) => x.id === c)?.label ?? "";
