import { ArrowRight, Clock } from "./icons";
import { QuoteLink } from "./QuoteLink";
import type { ServiceId } from "@/data/services";

type Props = {
  title: string;
  duration: string;
  places: string[];
  description: string;
  /** Sezon sau dată (ex. „decembrie”, „14 octombrie”) */
  meta?: string;
  service: Extract<ServiceId, "excursie" | "pelerinaj">;
  tone?: "dark" | "light";
};

/** Card pentru o excursie sau un pelerinaj. */
export function TripCard({ title, duration, places, description, meta, service, tone = "dark" }: Props) {
  const dark = tone === "dark";
  return (
    <article
      className={`card-lift flex h-full flex-col rounded-[var(--radius-card)] border p-6 md:p-7 ${
        dark ? "card-lift-dark border-white/10 bg-navy-soft text-white" : "border-line bg-white text-ink"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium ${
            dark ? "bg-white/10" : "bg-light"
          }`}
        >
          <Clock size={14} /> {duration}
        </span>
        {meta && <span className={dark ? "text-mist" : "text-muted"}>{meta}</span>}
      </div>

      <h3 className="mt-6 font-display text-2xl leading-tight font-semibold tracking-tight">{title}</h3>
      <p className={`mt-3 text-[0.95rem] leading-relaxed ${dark ? "text-mist" : "text-muted"}`}>{description}</p>

      <ol className="relative mt-6 mb-8 space-y-2.5 text-sm" aria-label="Locuri vizitate">
        <span
          aria-hidden
          className={`absolute top-2 bottom-2 left-[3px] border-l-2 border-dotted ${dark ? "border-white/25" : "border-night/20"}`}
        />
        {places.map((p) => (
          <li key={p} className="relative flex items-center gap-3 pl-0">
            <span aria-hidden className="relative size-2 shrink-0 rounded-full bg-accent" />
            <span className={dark ? "text-white/90" : ""}>{p}</span>
          </li>
        ))}
      </ol>

      <QuoteLink
        service={service}
        subject={title}
        className={`btn mt-auto w-full ${dark ? "btn-light" : "btn-dark"}`}
        aria-label={`Cere ofertă: ${title}`}
      >
        Cere ofertă <ArrowRight />
      </QuoteLink>
    </article>
  );
}
