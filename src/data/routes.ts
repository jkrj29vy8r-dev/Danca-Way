/**
 * Cursele regulate. Orele sunt orientative — se confirmă la rezervare.
 * Pentru a modifica un orar, editează doar acest fișier.
 */

export type CityId =
  | "targu-neamt"
  | "piatra-neamt"
  | "buhusi"
  | "roman"
  | "bacau"
  | "focsani"
  | "buzau"
  | "braila"
  | "bucuresti"
  | "otopeni"
  | "constanta";

export type City = {
  id: CityId;
  name: string;
  lat: number;
  lon: number;
};

export const cities: Record<CityId, City> = {
  "targu-neamt": { id: "targu-neamt", name: "Târgu Neamț", lat: 47.2, lon: 26.36 },
  "piatra-neamt": { id: "piatra-neamt", name: "Piatra Neamț", lat: 46.93, lon: 26.37 },
  buhusi: { id: "buhusi", name: "Buhuși", lat: 46.72, lon: 26.7 },
  roman: { id: "roman", name: "Roman", lat: 46.92, lon: 26.93 },
  bacau: { id: "bacau", name: "Bacău", lat: 46.57, lon: 26.91 },
  focsani: { id: "focsani", name: "Focșani", lat: 45.7, lon: 27.18 },
  buzau: { id: "buzau", name: "Buzău", lat: 45.15, lon: 26.83 },
  braila: { id: "braila", name: "Brăila", lat: 45.27, lon: 27.96 },
  bucuresti: { id: "bucuresti", name: "București", lat: 44.45, lon: 26.13 },
  otopeni: { id: "otopeni", name: "Aeroport Otopeni", lat: 44.57, lon: 26.08 },
  constanta: { id: "constanta", name: "Constanța", lat: 44.17, lon: 28.63 },
};

export type Stop = {
  city: CityId;
  /** Denumirea exactă a stației, dacă diferă de numele orașului */
  station?: string;
  /** Ora (HH:MM). Lipsește acolo unde nu avem o oră confirmată. */
  time?: string;
};

export type Direction = "spre-bucuresti" | "spre-moldova" | "litoral";

export type Route = {
  code: string;
  vehicle: "Autocar" | "Microbuz";
  direction: Direction;
  stops: Stop[];
  /** Preț bilet întreg, în lei */
  price: { min: number; max: number };
  priceNote?: string;
  /** Traseul geografic desenat pe hartă (include orașele prin care trece fără oprire) */
  mapPath: CityId[];
};

export const directions: { id: Direction; label: string; short: string }[] = [
  { id: "spre-bucuresti", label: "Neamț → București", short: "Spre București" },
  { id: "spre-moldova", label: "București → Neamț", short: "Spre Moldova" },
  { id: "litoral", label: "Roman ⇄ Constanța", short: "Constanța" },
];

const corridorSouth: Stop[] = [
  { city: "piatra-neamt" },
  { city: "roman" },
  { city: "bacau" },
  { city: "focsani" },
  { city: "buzau" },
];

export const routes: Route[] = [
  {
    code: "B1",
    vehicle: "Autocar",
    direction: "spre-bucuresti",
    stops: [
      { city: "targu-neamt", time: "05:00" },
      ...corridorSouth,
      { city: "bucuresti", station: "București Obor", time: "12:29" },
    ],
    price: { min: 120, max: 140 },
    priceNote: "în funcție de orașul de plecare",
    mapPath: ["targu-neamt", "piatra-neamt", "roman", "bacau", "focsani", "buzau", "bucuresti"],
  },
  {
    code: "B4",
    vehicle: "Autocar",
    direction: "spre-bucuresti",
    stops: [
      { city: "targu-neamt", time: "09:00" },
      ...corridorSouth,
      { city: "bucuresti", station: "București Obor", time: "16:29" },
    ],
    price: { min: 120, max: 140 },
    priceNote: "în funcție de orașul de plecare",
    mapPath: ["targu-neamt", "piatra-neamt", "roman", "bacau", "focsani", "buzau", "bucuresti"],
  },
  {
    code: "B2r",
    vehicle: "Microbuz",
    direction: "spre-moldova",
    stops: [
      { city: "bucuresti", station: "București Obor", time: "11:30" },
      { city: "otopeni", time: "12:00" },
      { city: "piatra-neamt", time: "17:44" },
      { city: "roman", time: "18:44" },
    ],
    price: { min: 120, max: 130 },
    priceNote: "în funcție de destinație",
    mapPath: ["bucuresti", "otopeni", "buzau", "focsani", "bacau", "buhusi", "piatra-neamt", "roman"],
  },
  {
    code: "B1r",
    vehicle: "Autocar",
    direction: "spre-moldova",
    stops: [
      { city: "bucuresti", station: "București Obor", time: "15:30" },
      { city: "otopeni", time: "16:00" },
      { city: "roman", time: "20:59" },
    ],
    price: { min: 120, max: 130 },
    priceNote: "în funcție de destinație",
    mapPath: ["bucuresti", "otopeni", "buzau", "focsani", "bacau", "roman"],
  },
  {
    code: "B3r",
    vehicle: "Microbuz",
    direction: "spre-moldova",
    stops: [
      { city: "bucuresti", station: "București Obor", time: "15:30" },
      { city: "buhusi", time: "20:30" },
      { city: "piatra-neamt", time: "20:57" },
      { city: "targu-neamt" },
    ],
    price: { min: 130, max: 130 },
    mapPath: ["bucuresti", "buzau", "focsani", "bacau", "buhusi", "piatra-neamt", "targu-neamt"],
  },
  {
    code: "CT",
    vehicle: "Microbuz",
    direction: "litoral",
    stops: [
      { city: "roman", time: "07:00" },
      { city: "focsani" },
      { city: "braila" },
      { city: "constanta", station: "Constanța Autogara Sud", time: "14:30" },
    ],
    price: { min: 160, max: 160 },
    mapPath: ["roman", "bacau", "focsani", "braila", "constanta"],
  },
  {
    code: "CTr",
    vehicle: "Microbuz",
    direction: "litoral",
    stops: [
      { city: "constanta", station: "Constanța Autogara Sud", time: "15:30" },
      { city: "roman", time: "23:00" },
    ],
    price: { min: 160, max: 160 },
    mapPath: ["constanta", "braila", "focsani", "bacau", "roman"],
  },
];

export const TIMETABLE_DISCLAIMER = "Orar orientativ, confirmă la rezervare";

export const stopName = (s: Stop) => s.station ?? cities[s.city].name;
export const firstStop = (r: Route) => r.stops[0];
export const lastStop = (r: Route) => r.stops[r.stops.length - 1];

export const formatPrice = (p: Route["price"]) =>
  p.min === p.max ? `${p.min} lei` : `${p.min}–${p.max} lei`;

/** Toate orașele deservite de cursele regulate, în ordinea primei apariții. */
export const servedCities: City[] = Array.from(
  new Set(routes.flatMap((r) => r.stops.map((s) => s.city))),
).map((id) => cities[id]);

/**
 * Proiecție simplă (echirectangulară corectată) pentru harta schematică.
 * viewBox-ul hărții: 0 0 400 560.
 */
export const MAP_VIEWBOX = { width: 400, height: 560 };
export function project(c: City): { x: number; y: number } {
  const x = (c.lon - 25.6) * 118;
  const y = (47.42 - c.lat) * 166;
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}
