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
        mobileSrc: "/images/setra-fata-apus-vertical.jpg",
        alt: "Autocarul Setra al Danca Way, din față, cu farurile aprinse, pe o stradă din oraș",
      },
      { src: "/images/setra-lateral-strada.jpg", alt: "Autocarul Setra al Danca Way, din lateral, parcat pe o stradă cu clădiri vechi" },
      { src: "/images/setra-fata-apus-vertical.jpg", alt: "Autocarul Setra al Danca Way, din față, la apus" },
      { src: "/images/setra-fata-vertical.jpg", alt: "Autocarul Setra al Danca Way, din față, într-o parcare, ziua" },
      { src: "/images/setra-autogara-vertical.jpg", alt: "Autocarul Setra al Danca Way, într-o parcare largă, sub cerul senin" },
    ],
  },
];

export const coach = fleet[0];

/** Afișăm câmpurile goale (marcate) doar în dezvoltare sau la cerere. */
export const SHOW_PLACEHOLDERS =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "1";
