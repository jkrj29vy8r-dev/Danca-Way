import Link from "next/link";
import { ArrowRight } from "../icons";
import { SwallowTrail } from "./SwallowTrail";

const lines = ["Din Neamț,", "oriunde vrei", "să ajungi."];

const facts = [
  { title: "Zilnic spre București", text: "Din Târgu Neamț la 05:00 și 09:00" },
  { title: "Transfer Otopeni", text: "De la ușa ta până la terminal" },
  { title: "Microbuze 8+1 și autocare", text: "Pentru familie, grup sau firmă" },
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_85%_20%,#1c2d57_0%,transparent_60%),radial-gradient(60%_50%_at_0%_100%,#122047_0%,transparent_70%)]"
      />
      <SwallowTrail />

      <div className="container-x relative flex flex-1 flex-col justify-end pt-32 pb-10 md:pb-14">
        <p className="eyebrow reveal-fade text-mist" style={{ "--i": 0 } as React.CSSProperties}>
          Transport persoane · Județul Neamț
        </p>
        <h1 className="display-xl mt-6 max-w-[12ch]">
          {lines.map((line, i) => (
            <span key={line} className="reveal-line">
              <span style={{ "--i": i + 1 } as React.CSSProperties}>{line}</span>
            </span>
          ))}
        </h1>
        <p
          className="reveal-fade mt-8 max-w-xl text-lg leading-relaxed text-mist md:text-xl"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          Curse regulate zilnice spre București, Aeroportul Otopeni și Constanța. Transferuri private,
          excursii, pelerinaje și microbuze cu șofer pentru orice drum.
        </p>
        <div
          className="reveal-fade mt-10 flex flex-col gap-3 sm:flex-row"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          <Link href="#oferta" className="btn btn-primary">
            Cere ofertă <ArrowRight />
          </Link>
          <Link href="/curse-regulate" className="btn btn-ghost-light">
            Vezi cursele regulate <ArrowRight />
          </Link>
        </div>

        <ul
          className="reveal-fade mt-16 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3 md:mt-24"
          style={{ "--i": 6 } as React.CSSProperties}
        >
          {facts.map((f) => (
            <li key={f.title}>
              <p className="font-display text-base font-semibold">{f.title}</p>
              <p className="mt-1 text-sm text-mist">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
