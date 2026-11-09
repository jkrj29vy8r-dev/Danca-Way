/** Ora curentă în România (Europe/Bucharest), indiferent de fusul orar al vizitatorului. */
const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Bucharest",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

export function bucharestNow(date = new Date()) {
  const parts = Object.fromEntries(fmt.formatToParts(date).map((p) => [p.type, p.value]));
  const h = Number(parts.hour);
  const m = Number(parts.minute);
  const s = Number(parts.second);
  return { minutes: h * 60 + m, seconds: s };
}

/** „3 h 20 min”, „45 min” sau „mai puțin de un minut”. */
export function formatCountdown(min: number) {
  if (min < 1) return "mai puțin de un minut";
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${m} min` : `${h} h`;
}
