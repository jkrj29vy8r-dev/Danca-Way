/**
 * Momentul zilei în Neamț (ora României), după răsăritul și apusul soarelui, nu după ore fixe.
 * Tabelul: răsărit și apus la Piatra Neamț pe la mijlocul fiecărei luni, în minute de la miezul nopții, ora locală
 * (cu ora de vară). Pentru o atmosferă discretă e destul de exact (±15 min).
 */
export const SUN: [number, number][] = [
  [470, 1005], // ianuarie 07:50 – 16:45
  [440, 1050], // februarie 07:20 – 17:30
  [390, 1090], // martie 06:30 – 18:10
  [390, 1190], // aprilie 06:30 – 19:50 (ora de vară)
  [345, 1230], // mai 05:45 – 20:30
  [325, 1255], // iunie 05:25 – 20:55
  [340, 1250], // iulie 05:40 – 20:50
  [375, 1210], // august 06:15 – 20:10
  [415, 1155], // septembrie 06:55 – 19:15
  [455, 1095], // octombrie 07:35 – 18:15
  [435, 995], // noiembrie 07:15 – 16:35
  [465, 985], // decembrie 07:45 – 16:25
];

export type TimeOfDay = "zori" | "zi" | "noapte";

/**
 * Zori: de la o oră înainte de răsărit până la o oră și jumătate după; și amurgul, de la o oră înainte de apus până
 * la o jumătate de oră după (aceeași lumină rece cu margine caldă). Ziua între ele, noaptea în rest.
 */
export function timeOfDay(month: number, minutes: number): TimeOfDay {
  const [rise, set] = SUN[month];
  if (minutes >= rise - 60 && minutes < rise + 90) return "zori";
  if (minutes >= set - 60 && minutes < set + 30) return "zori";
  if (minutes >= rise + 90 && minutes < set - 60) return "zi";
  return "noapte";
}

const parts = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Bucharest",
  month: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** Luna (0–11) și minutele zilei acum, în România. */
export function bucharestMonthMinutes(date = new Date()) {
  const p = Object.fromEntries(parts.formatToParts(date).map((x) => [x.type, x.value]));
  return { month: Number(p.month) - 1, minutes: Number(p.hour) * 60 + Number(p.minute) };
}

export function currentTimeOfDay(date = new Date()): TimeOfDay {
  const { month, minutes } = bucharestMonthMinutes(date);
  return timeOfDay(month, minutes);
}

/**
 * Același calcul, ca text de script pus în <head>: `data-ora` e pe <html> înainte de primul cadru
 * (fără să clipească tonul fundalului la încărcare).
 */
export const timeOfDayScript = `try{var S=${JSON.stringify(SUN)},f=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Bucharest',month:'numeric',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date()),o={};f.forEach(function(x){o[x.type]=x.value});var mo=+o.month-1,m=+o.hour*60+ +o.minute,r=S[mo][0],s=S[mo][1],t=(m>=r-60&&m<r+90)||(m>=s-60&&m<s+30)?'zori':(m>=r+90&&m<s-60)?'zi':'noapte';document.documentElement.setAttribute('data-ora',t)}catch(e){}`;
