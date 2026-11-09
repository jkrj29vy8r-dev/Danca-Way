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
  className?: string;
};

/** Select nativ (accesibil, funcțional pe mobil): eticheta mică deasupra valorii, ca pe site-urile aeriene. */
export function CitySelect({ id, name, label, value, options, onChange, tone = "dark", className = "" }: Props) {
  const dark = tone === "dark";
  return (
    <div
      className={`relative flex min-h-16 flex-col justify-center rounded-field border px-4 py-2 transition-colors duration-[600ms] ease-[var(--ease-out-expo)] focus-within:outline-2 focus-within:outline-offset-0 ${
        dark
          ? "border-line-dark-strong hover:border-white focus-within:border-white focus-within:outline-white"
          : "border-line-strong bg-white hover:border-night focus-within:border-night focus-within:outline-night"
      } ${className}`}
    >
      <label htmlFor={id} className={`label ${dark ? "text-mist" : "text-muted"}`}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value as CityId)}
        className="t-21 w-full cursor-pointer appearance-none bg-transparent pr-8 font-semibold outline-none [&>option]:text-ink"
      >
        {options.map((c) => (
          <option key={c} value={c}>
            {cityName(c)}
          </option>
        ))}
      </select>
      <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute right-4 bottom-4 size-4 opacity-64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}
