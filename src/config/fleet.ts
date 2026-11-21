/**
 * Flota — singura sursă pentru datele tehnice de pe pagina /flota și din pagina principală.
 *
 * Regula: aici intră doar valori verificate de tine. Ce e `null` (PLACEHOLDER) nu apare pe site în producție;
 * în dezvoltare (`next dev`) sau cu NEXT_PUBLIC_SHOW_PLACEHOLDERS=1 apare marcat „de completat”, ca să vezi unde merge.
 *
 * Pentru verificare: pagina „Parc auto” a operatorului (danca-transport.autogari.ro/parcauto, citită pe
 * 20 noiembrie 2026) listează „Autocar · Cat. I — Setra — 60 locuri — spațiu generos la picioare, priză USB,
 * aer condiționat”. Nu spune modelul, așa că valorile NU sunt trecute mai jos. Dacă sunt ale lui S 517 HD,
 * copiază-le în câmpurile de mai jos.
 */

export type FleetPhoto = {
  /** Fotografia pentru ecrane late (4:3) */
  src: string;
  /** Aceeași scenă, verticală, pentru telefon (9:16) — opțional */
  mobileSrc?: string;
  alt: string;
};

export type Vehicle = {
  id: string;
  /** Marca și modelul, exact ca pe vehicul */
  name: string;
  kind: "Autocar" | "Microbuz";
  /** PLACEHOLDER — numărul de locuri pentru pasageri (fără șofer și însoțitor) */
  seats: number | null;
  /** PLACEHOLDER — bagaje, ex. „Cală de bagaje, câte o valiză mare pentru fiecare pasager” */
  luggage: string | null;
  /** PLACEHOLDER — dotări de confort, ex. ["Aer condiționat", "Priză USB la fiecare rând"] */
  comfort: string[] | null;
  /** PLACEHOLDER — categoria de confort ARR, ex. „Cat. I” */
  category: string | null;
  /** PLACEHOLDER — anul fabricației */
  year: number | null;
  /** PLACEHOLDER — norma de poluare, ex. „Euro 6” */
  euro: string | null;
  /** Fotografii reale ale vehiculului (fișiere din /public). Prima e cea principală. */
  photos: FleetPhoto[];
  /** Fotografia de studio (pornită de la o fotografie reală): hero-ul paginii principale și capul fișei tehnice */
  cover?: FleetPhoto;
  /**
   * Modelul 3D (iconița „clay”) și imaginea PNG de rezervă, din /public. `orbit`: unghiul de pornire, același ca în PNG
   * („azimut elevație”); `scale`: scara modelului pentru distanța camerei (vezi components/fleet/VehicleModel.tsx).
   */
  model3d?: { glb: string; poster: string; orbit?: string; scale?: number };
  /**
   * Vederea 360°: cadrele stau în /public/360/<id>/{800,1600}/000.webp … 071.webp, plus manifest.json.
   * Secțiunea apare doar dacă manifest.json există. `hotspots`: punctele de pe autocar, la cadrul în care se văd
   * (0–71, 5° pe cadru) și la poziția lor în imagine (x, y între 0 și 1). Valoarea arătată vine din câmpul `spec`.
   */
  view360?: { hotspots: Hotspot[] };
};

export type Hotspot = {
  id: string;
  title: string;
  /** Cadrul (0–71) în care punctul e cel mai bine vizibil */
  frame: number;
  x: number;
  y: number;
  /** Ce valoare din fișa tehnică arată eticheta */
  spec: "seats" | "luggage" | "comfort";
};

export const fleet: Vehicle[] = [
  {
    id: "setra-s-517-hd",
    name: "Setra S 517 HD",
    kind: "Autocar",
    seats: null,
    luggage: null,
    comfort: null,
    category: null,
    year: null,
    euro: null,
    photos: [
      {
        src: "/images/setra-fata-strada.jpg",
        alt: "Autocarul Setra al Danca Way, din față, cu farurile aprinse, pe o stradă din oraș",
      },
      { src: "/images/setra-lateral-strada.jpg", alt: "Autocarul Setra al Danca Way, din lateral, parcat pe o stradă cu clădiri vechi" },
    ],
    cover: {
      src: "/images/hero-setra-studio.jpg",
      mobileSrc: "/images/hero-setra-studio-mobil.jpg",
      alt: "Autocarul Setra S 517 HD al Danca Way, din față-lateral, într-un studio întunecat",
    },
    model3d: { glb: "/3d/setra-s517hd_clay.glb", poster: "/3d/setra-s517hd_clay.png", orbit: "35deg 76deg", scale: 1 },
    // Pozițiile se potrivesc pe cadrele finale (din clipul filmat în jurul autocarului); verifică-le când le pui.
    view360: {
      hotspots: [
        { id: "usa", title: "Ușa de urcare", frame: 12, x: 0.36, y: 0.55, spec: "seats" },
        { id: "cala", title: "Cala de bagaje", frame: 18, x: 0.55, y: 0.7, spec: "luggage" },
        { id: "geamuri", title: "Geamurile panoramice", frame: 54, x: 0.5, y: 0.4, spec: "comfort" },
      ],
    },
  },
];

export const coach = fleet[0];

/** Afișăm câmpurile goale (marcate) doar în dezvoltare sau la cerere. */
export const SHOW_PLACEHOLDERS =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "1";
