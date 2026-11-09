"use client";

import { formatCountdown } from "@/lib/bucharest-time";
import { cityName, stopName, type CityId } from "@/data/routes";
import { useNextDeparture } from "@/lib/use-next-departure";

/** Cifrele care se schimbă se întorc (CSS, doar transform). */
export function FlipString({ value, className = "" }: { value: string; className?: string }) {
  return (
    <span aria-hidden className={`inline-flex ${className}`}>
      {Array.from(value).map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={`${i}-${ch}`} className="flip-in inline-block tabular-nums">
            {ch}
          </span>
        ) : (
          <span key={`${i}-${ch}`} className="whitespace-pre">
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

/**
 * „Următoarea plecare”, ca într-o aplicație de zboruri: ora mare, traseul, cât mai e până la plecare.
 * Ora României (Europe/Bucharest). Fără JavaScript afișează prima plecare a zilei, în același format.
 */
export function NextDeparture({ from, to }: { from: CityId; to: CityId }) {
  const { next, first } = useNextDeparture(from, to);
  const trip = next?.trip ?? first;

  return (
    <div className="border-t border-line-dark pt-4" aria-live="polite" aria-atomic="true">
      <p className="label flex justify-between gap-4 text-mist">
        <span>{next ? "Următoarea plecare" : "Prima plecare"}</span>
        <span>Ora României</span>
      </p>
      {trip ? (
        <div className="mt-4 flex items-baseline gap-6">
          <p className="t-48 font-mono tabular-nums">
            <span className="sr-only">{trip.dep.time}</span>
            <FlipString value={trip.dep.time} />
          </p>
          <div className="min-w-0">
            <p className="font-semibold">
              {cityName(from)} → {stopName(trip.arr)}
            </p>
            <p className="t-14 text-mist">
              {next ? (
                <>
                  {next.day} · <span className="sr-only">pleacă în {formatCountdown(next.wait)}</span>
                  <span aria-hidden>
                    în <FlipString value={formatCountdown(next.wait)} />
                  </span>
                </>
              ) : (
                "zilnic"
              )}
              {" · "}
              <span className="font-mono">{trip.route.code}</span>
              {trip.price ? (
                <>
                  {" · "}
                  <span className="font-mono">{trip.price} lei</span>
                </>
              ) : null}
            </p>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-mist">Nu există o cursă directă între aceste orașe.</p>
      )}
    </div>
  );
}
