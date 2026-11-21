"use client";

import { useBucharestMinutes } from "@/lib/use-next-departure";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Eticheta mică din hero: „Neamț · 05:48”, ora României, la fiecare minut. Spune de ce lumina din spatele
 * autocarului e cea de zori, de zi sau de noapte. Până la hidratare, locul orei e păstrat (fără salt).
 */
export function HeroClock() {
  const now = useBucharestMinutes();
  const time = now === null ? "--:--" : `${pad(Math.floor(now / 60))}:${pad(now % 60)}`;
  return (
    <p className="hero-clock label tabular-nums text-mist">
      Neamț <span aria-hidden>·</span>{" "}
      <time className={now === null ? "invisible" : ""} aria-label={now === null ? undefined : `ora ${time} în Neamț`}>
        {time}
      </time>
    </p>
  );
}
