"use client";

import { cityName, type CityId } from "@/data/routes";

type Props = {
  id: string;
  name: string;
  label: string;
  value: CityId;
  options: CityId[];
  onChange: (v: CityId) => void;
  tone?: "dark" | "light";
};

/** Select nativ (accesibil, funcțional pe mobil) cu etichetă mică deasupra valorii, ca pe site-urile aeriene. */
export function CitySelect({ id, name, label, value, options, onChange, tone = "dark" }: Props) {
  const dark = tone === "dark";
  return (
    <div
      className={`relative flex min-h-16 flex-col justify-center rounded-xl px-4 py-2 transition-colors duration-300 focus-within:ring-2 ${
        dark ? "bg-white/[0.06] hover:bg-white/[0.09] focus-within:ring-accent" : "bg-light hover:bg-[#eceef2] focus-within:ring-night"
      }`}
    >
      <label htmlFor={id} className={`text-xs font-medium ${dark ? "text-mist" : "text-muted"}`}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value as CityId)}
        className="w-full cursor-pointer appearance-none bg-transparent pr-6 font-display text-lg font-semibold tracking-tight outline-none [&>option]:text-ink"
      >
        {options.map((c) => (
          <option key={c} value={c}>
            {cityName(c)}
          </option>
        ))}
      </select>
      <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute right-3 bottom-4 size-4 opacity-60" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}
