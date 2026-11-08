/**
 * Excursiile. Adaugă, șterge sau modifică intrări direct aici.
 * `featured: true` le afișează și în banda de pe pagina principală.
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
  description: string;
  /** Perioada recomandată, opțional */
  season?: string;
  featured?: boolean;
};

export const trips: Trip[] = [
  {
    slug: "cheile-bicazului-lacul-rosu",
    title: "Cheile Bicazului & Lacul Roșu",
    category: "o-zi",
    duration: "1 zi",
    places: ["Barajul Izvorul Muntelui", "Cheile Bicazului", "Lacul Roșu"],
    description: "Cea mai frumoasă zi de munte la o oră de casă: baraj, chei și lacul legendar.",
    featured: true,
  },
  {
    slug: "cetatea-neamtului-humulesti",
    title: "Cetatea Neamțului & Humulești",
    category: "o-zi",
    duration: "1 zi",
    places: ["Cetatea Neamțului", "Casa memorială Ion Creangă", "Mănăstirea Neamț"],
    description: "Istorie și copilărie: cetatea lui Ștefan cel Mare și casa lui Creangă.",
  },
  {
    slug: "salina-praid-sovata",
    title: "Salina Praid & Sovata",
    category: "o-zi",
    duration: "1 zi",
    places: ["Salina Praid", "Lacul Ursu", "Sovata"],
    description: "Aer de salină și o plimbare pe malul Lacului Ursu.",
  },
  {
    slug: "transilvania-sibiu-brasov",
    title: "Transilvania: Brașov, Sibiu, Transfăgărășan",
    category: "weekend",
    duration: "3 zile / 2 nopți",
    places: ["Brașov", "Sibiu", "Bâlea Lac", "Transfăgărășan"],
    description: "Orașele medievale și cel mai spectaculos drum din țară.",
    season: "iulie – octombrie",
    featured: true,
  },
  {
    slug: "maramures",
    title: "Maramureșul autentic",
    category: "weekend",
    duration: "3 zile / 2 nopți",
    places: ["Cimitirul Vesel Săpânța", "Mănăstirea Bârsana", "Mocănița Vișeu de Sus"],
    description: "Porți de lemn, biserici înalte și mocănița pe Valea Vaserului.",
  },
  {
    slug: "delta-dunarii",
    title: "Delta Dunării",
    category: "weekend",
    duration: "3 zile / 2 nopți",
    places: ["Tulcea", "Crișan", "Canalele Deltei"],
    description: "Plimbări cu barca printre nuferi și pelicani, pește proaspăt la cină.",
    season: "mai – septembrie",
  },
  {
    slug: "craciun-brasov-sibiu",
    title: "Târgurile de Crăciun Brașov & Sibiu",
    category: "craciun",
    duration: "2 zile / 1 noapte",
    places: ["Piața Sfatului, Brașov", "Piața Mare, Sibiu"],
    description: "Vin fiert, colinde și luminițe în cele mai frumoase piețe din țară.",
    season: "decembrie",
    featured: true,
  },
  {
    slug: "craciun-budapesta",
    title: "Târgul de Crăciun din Budapesta",
    category: "craciun",
    duration: "3 zile / 2 nopți",
    places: ["Vörösmarty tér", "Bazilica Sf. Ștefan", "Parlamentul", "Dunărea"],
    description: "Unul dintre cele mai frumoase târguri din Europa, la o zi de drum.",
    season: "decembrie",
  },
  {
    slug: "craciun-viena",
    title: "Crăciun la Viena",
    category: "craciun",
    duration: "4 zile / 3 nopți",
    places: ["Rathausplatz", "Schönbrunn", "Stephansdom"],
    description: "Târgurile vieneze, palatele imperiale și cafenelele de poveste.",
    season: "decembrie",
  },
  {
    slug: "city-break-budapesta",
    title: "City break Budapesta",
    category: "city-break",
    duration: "3 zile / 2 nopți",
    places: ["Bastionul Pescarilor", "Băile Széchenyi", "Insula Margareta"],
    description: "Băi termale, poduri peste Dunăre și seri lungi în Pesta.",
    featured: true,
  },
  {
    slug: "city-break-viena-praga",
    title: "Viena & Praga",
    category: "city-break",
    duration: "5 zile / 4 nopți",
    places: ["Viena", "Brno", "Praga", "Podul Carol"],
    description: "Două capitale imperiale într-un singur drum.",
  },
  {
    slug: "litoral-romanesc",
    title: "Litoralul românesc",
    category: "litoral",
    duration: "transport dus-întors",
    places: ["Mamaia", "Constanța", "Eforie", "Vama Veche"],
    description: "Te ducem la mare și te aducem înapoi, la data aleasă de tine.",
    season: "iunie – septembrie",
    featured: true,
  },
  {
    slug: "litoral-bulgaria",
    title: "Balcic & Nisipurile de Aur",
    category: "litoral",
    duration: "4 zile / 3 nopți",
    places: ["Balcic", "Capul Kaliakra", "Nisipurile de Aur"],
    description: "Grădina Reginei Maria și plajele Bulgariei.",
    season: "iunie – septembrie",
  },
];
