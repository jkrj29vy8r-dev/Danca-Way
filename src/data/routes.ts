/**
 * Cursele regulate Danca, după orarul publicat de operator pe
 * https://danca-transport.autogari.ro/curse (verificat 8 noiembrie 2026).
 * Orele sunt orientative — se confirmă la rezervare. Pentru a modifica un orar, editează doar acest fișier.
 */

export type CityId =
  | "targu-neamt"
  | "cristesti"
  | "baltatesti"
  | "dobreni"
  | "piatra-neamt"
  | "roman"
  | "buhusi"
  | "bacau"
  | "sascut"
  | "adjud"
  | "focsani"
  | "vulturu"
  | "maxineni"
  | "braila"
  | "viziru"
  | "spiru-haret"
  | "harsova"
  | "ovidiu"
  | "constanta"
  | "ramnicu-sarat"
  | "buzau"
  | "urziceni"
  | "afumati"
  | "otopeni"
  | "bucuresti";

export type City = {
  id: CityId;
  name: string;
  /** Doar orașele de pe hartă au coordonate */
  lat?: number;
  lon?: number;
};

const c = (id: CityId, name: string, lat?: number, lon?: number): City => ({ id, name, lat, lon });

export const cities: Record<CityId, City> = {
  "targu-neamt": c("targu-neamt", "Târgu Neamț", 47.2, 26.36),
  cristesti: c("cristesti", "Cristești"),
  baltatesti: c("baltatesti", "Bălțătești"),
  dobreni: c("dobreni", "Dobreni"),
  "piatra-neamt": c("piatra-neamt", "Piatra Neamț", 46.93, 26.37),
  roman: c("roman", "Roman", 46.92, 26.93),
  buhusi: c("buhusi", "Buhuși", 46.72, 26.7),
  bacau: c("bacau", "Bacău", 46.57, 26.91),
  sascut: c("sascut", "Sascut"),
  adjud: c("adjud", "Adjud"),
  focsani: c("focsani", "Focșani", 45.7, 27.18),
  vulturu: c("vulturu", "Vulturu"),
  maxineni: c("maxineni", "Măxineni"),
  braila: c("braila", "Brăila", 45.27, 27.96),
  viziru: c("viziru", "Viziru"),
  "spiru-haret": c("spiru-haret", "Spiru Haret"),
  harsova: c("harsova", "Hârșova"),
  ovidiu: c("ovidiu", "Ovidiu"),
  constanta: c("constanta", "Constanța", 44.17, 28.63),
  "ramnicu-sarat": c("ramnicu-sarat", "Râmnicu Sărat"),
  buzau: c("buzau", "Buzău", 45.15, 26.83),
  urziceni: c("urziceni", "Urziceni"),
  afumati: c("afumati", "Afumați"),
  otopeni: c("otopeni", "Aeroport Otopeni", 44.57, 26.08),
  bucuresti: c("bucuresti", "București", 44.45, 26.13),
};

export type Stop = {
  city: CityId;
  /** Stația exactă */
  station: string;
  /** Ora (HH:MM). Orele după miezul nopții sunt pe ziua următoare. */
  time: string;
};

export type Direction = "spre-bucuresti" | "spre-moldova" | "litoral";

export type Route = {
  code: string;
  vehicle: "Autocar" | "Microbuz";
  direction: Direction;
  /** Linia de pe hartă pe care circulă */
  line: "bucuresti" | "constanta";
  /** Capetele afișate în orar (ex. „Târgu Neamț → București Obor”) */
  from: CityId;
  to: CityId;
  stops: Stop[];
  /** Traseul geografic desenat pe hartă */
  mapPath: CityId[];
};

export const directions: { id: Direction; label: string; short: string }[] = [
  { id: "spre-bucuresti", label: "Neamț → București", short: "Spre București" },
  { id: "spre-moldova", label: "București → Neamț", short: "Spre Moldova" },
  { id: "litoral", label: "Roman ⇄ Constanța", short: "Constanța" },
];

const S = (city: CityId, station: string, time: string): Stop => ({ city, station, time });
const OBOR = "Autogara Obor";
const OTP = "Terminal Plecări";

export const routes: Route[] = [
  {
    code: "B1",
    vehicle: "Autocar",
    direction: "spre-bucuresti",
    line: "bucuresti",
    from: "targu-neamt",
    to: "bucuresti",
    stops: [
      S("targu-neamt", "Autogara David Romica", "05:00"),
      S("piatra-neamt", "Autogara Fya Trans", "06:00"),
      S("roman", "Autogara Ulderic Iosif", "06:00"),
      S("bacau", "Autogara Transport Bistrița", "07:00"),
      S("adjud", "Stație Parc / Monument", "08:00"),
      S("focsani", "Benzinăria SOCAR E85", "08:30"),
      S("ramnicu-sarat", "Parcare PROFI", "09:30"),
      S("buzau", "Fabrica de Bere", "10:15"),
      S("otopeni", OTP, "12:00"),
      S("bucuresti", OBOR, "12:30"),
    ],
    mapPath: ["targu-neamt", "piatra-neamt", "roman", "bacau", "focsani", "buzau", "otopeni", "bucuresti"],
  },
  {
    // Vehiculul nu e precizat în orarul operatorului; la fel ca la retur (B3r): microbuz.
    code: "B3",
    vehicle: "Microbuz",
    direction: "spre-bucuresti",
    line: "bucuresti",
    from: "targu-neamt",
    to: "bucuresti",
    stops: [
      S("targu-neamt", "Autogara David Romica", "05:00"),
      S("baltatesti", "Stație Centru", "05:20"),
      S("dobreni", "Stație Dobreni", "05:40"),
      S("piatra-neamt", "Autogara Fya Trans", "06:00"),
      S("buhusi", "Petrom", "06:30"),
      S("bacau", "Autogara Transport Bistrița", "07:00"),
      S("sascut", "Centru", "07:40"),
      S("adjud", "Stație Parc / Monument", "08:00"),
      S("focsani", "Benzinăria SOCAR E85", "08:30"),
      S("ramnicu-sarat", "Stație Pod", "09:00"),
      S("buzau", "Dedeman", "09:30"),
      S("urziceni", "Benzinăria Petrom", "10:15"),
      S("afumati", "Stație Afumați", "10:45"),
      S("otopeni", OTP, "11:15"),
      S("bucuresti", OBOR, "12:00"),
    ],
    mapPath: ["targu-neamt", "piatra-neamt", "buhusi", "bacau", "focsani", "buzau", "otopeni", "bucuresti"],
  },
  {
    code: "B4",
    vehicle: "Autocar",
    direction: "spre-bucuresti",
    line: "bucuresti",
    from: "targu-neamt",
    to: "bucuresti",
    stops: [
      S("roman", "Autogara Ulderic Iosif", "07:45"),
      S("cristesti", "Intersecția cu Târgu Neamț", "08:15"),
      S("targu-neamt", "Autogara David Romica", "09:00"),
      S("piatra-neamt", "Autogara Fya Trans", "10:00"),
      S("bacau", "Autogara Transport Bistrița", "11:00"),
      S("adjud", "Intersecție Onești", "12:00"),
      S("focsani", "Benzinăria Petrom (vis-à-vis Dedeman)", "12:30"),
      S("ramnicu-sarat", "Parcare PROFI", "13:00"),
      S("buzau", "Peco Petrom, ieșire E85", "14:00"),
      S("urziceni", "Stație Urziceni", "15:00"),
      S("afumati", "Stație Afumați", "15:30"),
      S("otopeni", OTP, "16:00"),
      S("bucuresti", OBOR, "16:30"),
    ],
    mapPath: ["roman", "targu-neamt", "piatra-neamt", "bacau", "focsani", "buzau", "otopeni", "bucuresti"],
  },
  {
    code: "B2r",
    vehicle: "Microbuz",
    direction: "spre-moldova",
    line: "bucuresti",
    from: "bucuresti",
    to: "roman",
    stops: [
      S("bucuresti", OBOR, "11:30"),
      S("otopeni", OTP, "12:00"),
      S("afumati", "Stație Afumați", "12:30"),
      S("urziceni", "Stație Urziceni", "13:00"),
      S("buzau", "Fabrica de Bere", "14:00"),
      S("ramnicu-sarat", "Parcare PROFI", "14:30"),
      S("focsani", "Benzinăria SOCAR E85", "15:15"),
      S("adjud", "Stație Parc / Monument", "15:45"),
      S("bacau", "Autogara Transport Bistrița", "16:45"),
      S("piatra-neamt", "Autogara Fya Trans", "17:45"),
      S("roman", "Autogara Ulderic Iosif", "18:45"),
      S("targu-neamt", "Autogara David Romica", "20:00"),
    ],
    mapPath: ["bucuresti", "otopeni", "buzau", "focsani", "bacau", "piatra-neamt", "roman", "targu-neamt"],
  },
  {
    code: "B1r",
    vehicle: "Autocar",
    direction: "spre-moldova",
    line: "bucuresti",
    from: "bucuresti",
    to: "roman",
    stops: [
      S("bucuresti", OBOR, "15:30"),
      S("otopeni", OTP, "16:00"),
      S("buzau", "Fabrica de Bere", "17:45"),
      S("ramnicu-sarat", "Parcare PROFI", "18:15"),
      S("focsani", "Benzinăria SOCAR E85", "18:45"),
      S("adjud", "Monument, lângă Piață", "19:15"),
      S("bacau", "Autogara Transport Bistrița", "20:00"),
      S("piatra-neamt", "Autogara Fya Trans", "21:00"),
      S("roman", "Autogara Ulderic Iosif", "21:00"),
      S("targu-neamt", "Autogara David Romica", "22:00"),
    ],
    mapPath: ["bucuresti", "otopeni", "buzau", "focsani", "bacau", "roman", "piatra-neamt", "targu-neamt"],
  },
  {
    code: "B3r",
    vehicle: "Microbuz",
    direction: "spre-moldova",
    line: "bucuresti",
    from: "bucuresti",
    to: "targu-neamt",
    stops: [
      S("bucuresti", OBOR, "15:30"),
      S("otopeni", OTP, "16:00"),
      S("afumati", "Stație Afumați", "16:30"),
      S("urziceni", "Benzinăria Petrom", "17:00"),
      S("buzau", "Dedeman", "17:45"),
      S("ramnicu-sarat", "Stație Pod", "18:15"),
      S("focsani", "Benzinăria Petrom (vis-à-vis Dedeman)", "18:45"),
      S("adjud", "Intersecție Onești", "19:15"),
      S("sascut", "Centru", "19:45"),
      S("bacau", "Autogara Transport Bistrița", "20:00"),
      S("buhusi", "Petrom", "20:30"),
      S("piatra-neamt", "Autogara Fya Trans", "21:00"),
      S("dobreni", "Stație Dobreni", "21:20"),
      S("baltatesti", "Stație Centru", "21:45"),
      S("targu-neamt", "Autogara David Romica", "22:00"),
    ],
    mapPath: ["bucuresti", "otopeni", "buzau", "focsani", "bacau", "buhusi", "piatra-neamt", "targu-neamt"],
  },
  {
    code: "CT",
    vehicle: "Microbuz",
    direction: "litoral",
    line: "constanta",
    from: "roman",
    to: "constanta",
    stops: [
      S("targu-neamt", "Autogara David Romica", "05:00"),
      S("piatra-neamt", "Autogara Fya Trans", "06:00"),
      S("roman", "Autogara Ulderic Iosif", "07:00"),
      S("bacau", "Autogara Transport Bistrița", "08:00"),
      S("adjud", "Autogara Mihandru", "09:30"),
      S("focsani", "Autogara Nord", "10:30"),
      S("vulturu", "Stație Vulturu", "10:50"),
      S("maxineni", "Stație", "11:30"),
      S("braila", "Autogara Atlas", "12:00"),
      S("viziru", "Stație Viziru", "12:30"),
      S("spiru-haret", "Centru", "12:45"),
      S("harsova", "Centru", "13:15"),
      S("ovidiu", "Centru", "14:30"),
      S("constanta", "Autogara Sud (Herli-Sof, lângă Gara CFR)", "15:00"),
    ],
    mapPath: ["targu-neamt", "piatra-neamt", "roman", "bacau", "focsani", "braila", "constanta"],
  },
  {
    code: "CTr",
    vehicle: "Microbuz",
    direction: "litoral",
    line: "constanta",
    from: "constanta",
    to: "roman",
    stops: [
      S("constanta", "Autogara Sud (Herli-Sof, lângă Gara CFR)", "15:30"),
      S("ovidiu", "Centru", "16:00"),
      S("harsova", "Centru", "16:45"),
      S("spiru-haret", "Centru", "17:15"),
      S("viziru", "Stație Viziru", "17:30"),
      S("braila", "Autogara Atlas", "18:00"),
      S("maxineni", "Stație", "18:45"),
      S("vulturu", "Stație Vulturu", "19:15"),
      S("focsani", "Autogara Nord", "19:30"),
      S("adjud", "Autogara Mihandru", "20:00"),
      S("bacau", "Autogara Transport Bistrița", "21:00"),
      S("piatra-neamt", "Autogara Fya Trans", "22:00"),
      S("roman", "Autogara Ulderic Iosif", "23:00"),
      S("targu-neamt", "Autogara David Romica", "00:00"),
    ],
    mapPath: ["constanta", "braila", "focsani", "bacau", "roman", "piatra-neamt", "targu-neamt"],
  },
];

/* ───────── Tarife (bilet întreg, lei) — aceleași pe toate cursele, simetrice ───────── */

const FARE_LIST: [CityId, CityId, number][] = [
  ["targu-neamt", "piatra-neamt", 40],
  ["targu-neamt", "bacau", 80],
  ["targu-neamt", "focsani", 100],
  ["targu-neamt", "buzau", 120],
  ["targu-neamt", "braila", 130],
  ["targu-neamt", "bucuresti", 140],
  ["targu-neamt", "otopeni", 150],
  ["targu-neamt", "constanta", 180],
  ["piatra-neamt", "bacau", 40],
  ["piatra-neamt", "focsani", 90],
  ["piatra-neamt", "braila", 100],
  ["piatra-neamt", "buzau", 110],
  ["piatra-neamt", "bucuresti", 130],
  ["piatra-neamt", "otopeni", 140],
  ["piatra-neamt", "constanta", 160],
  ["roman", "bacau", 40],
  ["roman", "focsani", 90],
  ["roman", "braila", 100],
  ["roman", "buzau", 110],
  ["roman", "bucuresti", 120],
  ["roman", "otopeni", 130],
  ["roman", "constanta", 160],
  ["bacau", "focsani", 70],
  ["bacau", "braila", 90],
  ["bacau", "buzau", 100],
  ["bacau", "bucuresti", 110],
  ["bacau", "otopeni", 120],
  ["bacau", "constanta", 150],
  ["focsani", "constanta", 130],
  ["focsani", "buzau", 70],
  ["focsani", "bucuresti", 90],
  ["focsani", "otopeni", 100],
  ["buzau", "bucuresti", 70],
  ["buzau", "otopeni", 80],
  ["braila", "constanta", 100],
  ["otopeni", "bucuresti", 40],
];
const FARES = new Map<string, number>();
for (const [a, b, v] of FARE_LIST) {
  FARES.set(`${a}|${b}`, v);
  FARES.set(`${b}|${a}`, v);
}
export const fare = (a: CityId, b: CityId) => FARES.get(`${a}|${b}`);

/* ───────── Utilitare ───────── */

export const TIMETABLE_DISCLAIMER = "Orar orientativ, confirmă la rezervare";

export const cityName = (id: CityId) => cities[id].name;
export const stopAt = (r: Route, city: CityId) => r.stops.find((s) => s.city === city);
export const stopName = (s: Stop) =>
  s.city === "bucuresti" ? "București Obor" : s.city === "constanta" ? "Constanța Autogara Sud" : cityName(s.city);

/** Minute de la miezul nopții; orele de după 00:00 de la finalul unei curse trec în ziua următoare. */
export function minutesOf(r: Route, s: Stop): number {
  const [h, m] = s.time.split(":").map(Number);
  let v = h * 60 + m;
  const first = r.stops[0].time.split(":").map(Number);
  if (v < first[0] * 60 + first[1]) v += 24 * 60;
  return v;
}

/** Cursele care leagă `from` de `to`, cu ora de plecare și de sosire. */
export type Trip = { route: Route; dep: Stop; arr: Stop; depMin: number; arrMin: number; price?: number };
export function tripsBetween(from: CityId, to: CityId): Trip[] {
  const out: Trip[] = [];
  for (const r of routes) {
    const dep = stopAt(r, from);
    const arr = stopAt(r, to);
    if (!dep || !arr) continue;
    const depMin = minutesOf(r, dep);
    const arrMin = minutesOf(r, arr);
    if (arrMin <= depMin) continue;
    out.push({ route: r, dep, arr, depMin, arrMin, price: fare(from, to) });
  }
  return out.sort((a, b) => a.depMin - b.depMin);
}

/** Orașele din căutarea rapidă (hero și orar). */
export const FINDER_CITIES: CityId[] = ["targu-neamt", "piatra-neamt", "roman", "bucuresti", "otopeni", "constanta"];

/** Destinațiile disponibile dintr-un oraș (doar orașele din căutare). */
export function destinationsFrom(from: CityId): CityId[] {
  return FINDER_CITIES.filter((to) => to !== from && tripsBetween(from, to).length > 0);
}

/** Capetele unei curse, pentru rândul din orar. */
export const routeTrip = (r: Route): Trip => {
  const dep = stopAt(r, r.from)!;
  const arr = stopAt(r, r.to)!;
  return { route: r, dep, arr, depMin: minutesOf(r, dep), arrMin: minutesOf(r, arr), price: fare(r.from, r.to) };
};

export const formatDuration = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
};

/** Direcția potrivită pentru o pereche de orașe (pentru tab-ul activ din orar). */
export function directionFor(from: CityId, to: CityId): Direction {
  if (from === "constanta" || to === "constanta") return "litoral";
  if (to === "bucuresti" || to === "otopeni") return "spre-bucuresti";
  return "spre-moldova";
}

/**
 * Proiecție simplă (echirectangulară corectată) pentru harta schematică.
 * viewBox-ul hărții: 0 0 400 560.
 */
export const MAP_VIEWBOX = { width: 400, height: 560 };
export function project(city: City): { x: number; y: number } {
  const x = ((city.lon ?? 0) - 25.6) * 118;
  const y = (47.42 - (city.lat ?? 0)) * 166;
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

/** Liniile hărții: trunchiul spre București și ramura spre Constanța, care pleacă din Roman. */
export const MAP_LINES: Record<Route["line"], CityId[]> = {
  bucuresti: ["targu-neamt", "piatra-neamt", "roman", "bacau", "focsani", "buzau", "otopeni", "bucuresti"],
  constanta: ["roman", "bacau", "focsani", "braila", "constanta"],
};
