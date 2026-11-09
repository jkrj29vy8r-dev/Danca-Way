/**
 * PAGINĂ TEMPORARĂ — comparație de fonturi. Se șterge după alegere.
 * Nu este în meniu, nu este în sitemap și are noindex.
 */
import type { Metadata } from "next";
import { Archivo, Geist, Instrument_Sans } from "next/font/google";
import { Logo } from "@/components/Logo";
import { ArrowRight } from "@/components/icons";
import "./fonturi.css";

export const metadata: Metadata = {
  title: "Comparație fonturi (temporar)",
  robots: { index: false, follow: false },
};

const archivo = Archivo({ subsets: ["latin", "latin-ext"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const instrument = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-instrument",
  display: "swap",
});
const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

const VARIANTS = [
  {
    id: "a",
    title: "A · Archivo Expanded + Inter + Geist Mono",
    detail: "Titluri: Archivo, lățime 125, greutate 800 (hero) / 700, spațiere strânsă. Text: Inter. Ore: Geist Mono.",
  },
  {
    id: "b",
    title: "B · Instrument Sans + Geist Mono",
    detail: "Titluri și text: Instrument Sans (titluri 600, lățime condensată 85% la mărimile foarte mari). Ore: Geist Mono.",
  },
  {
    id: "c",
    title: "C · Geist + Geist Mono",
    detail: "Titluri și text: Geist. Ore și prețuri: Geist Mono.",
  },
] as const;

const rows = [
  { time: "05:00", title: "Târgu Neamț → București Obor", sub: "B1 · Autocar · sosire 12:30 · 7 h 30 min", price: "140 lei" },
  { time: "07:00", title: "Roman → Constanța Autogara Sud", sub: "CT · Microbuz · sosire 15:00 · 8 h", price: "160 lei" },
  { time: "15:30", title: "București Obor → Bălțătești, Târgu Neamț", sub: "B3r · Microbuz · sosire 22:00 · 6 h 30 min", price: "140 lei" },
];

function Flap({ value }: { value: string }) {
  return (
    <span className="flap" aria-label={value}>
      {Array.from(value).map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="flap-c" aria-hidden>
            {ch}
          </span>
        ) : (
          <span key={i} className="flap-sep" aria-hidden>
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

function Specimen({ id, title, detail }: (typeof VARIANTS)[number]) {
  return (
    <section className={`font-variant font-${id}`} aria-labelledby={`v-${id}`}>
      {/* Eticheta variantei */}
      <div className="bg-accent text-night" data-bg="light">
        <div className="container-x flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:justify-between">
          <h2 id={`v-${id}`} className="text-lg font-bold" style={{ fontFamily: "var(--font-sans)" }}>
            {title}
          </h2>
          <p className="text-sm">{detail}</p>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-night text-white" data-bg="night">
        <div className="container-x py-16 md:py-20">
          <span className="block w-[min(520px,82vw)]">
            <Logo variant="alb" alt="Danca Way" className="h-auto w-full" />
          </span>
          <p className="display-hero mt-10 md:mt-14">
            Din Neamț la București.
            <br />
            Din Otopeni, acasă.
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mist md:text-xl">
            Autocarul pleacă din Târgu Neamț la 05:00 și 09:00, oprește la Terminalul Plecări din Otopeni și ajunge la
            București Obor. Spre Constanța pleacă microbuzul din Roman, la 07:00.
          </p>
          <div className="mt-10 grid max-w-4xl gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2 sm:grid-cols-[1fr_1fr_auto]">
            <div className="rounded-xl bg-white/[0.06] px-4 py-2">
              <p className="text-xs text-mist">Din</p>
              <p className="font-display text-lg font-semibold tracking-tight">Piatra Neamț</p>
            </div>
            <div className="rounded-xl bg-white/[0.06] px-4 py-2">
              <p className="text-xs text-mist">Spre</p>
              <p className="font-display text-lg font-semibold tracking-tight">București</p>
            </div>
            <span className="btn btn-primary min-h-14 rounded-xl">
              Vezi plecările <ArrowRight />
            </span>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["05:00 · 09:00", "Târgu Neamț → București Obor"],
              ["12:00 · 16:00", "Otopeni → Piatra Neamț, Roman"],
              ["07:00 · 15:30", "Roman ⇄ Constanța, prin Brăila"],
              ["120 lei", "Roman → București, bilet întreg"],
            ].map(([v, t]) => (
              <li key={v} className="border-t border-white/20 pt-5">
                <p className="font-mono text-xl font-semibold tracking-tight tabular-nums">{v}</p>
                <p className="mt-1 text-sm text-white/80">{t}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Orar */}
      <div className="bg-navy text-white" data-bg="navy">
        <div className="container-x py-16">
          <p className="eyebrow text-mist">Curse regulate</p>
          <p className="display-lg mt-6">Șapte curse, trei direcții.</p>
          <div className="mt-8 flex max-w-3xl gap-1 rounded-full bg-white/[0.06] p-1 text-[0.95rem] font-semibold">
            <span className="flex-1 rounded-full bg-white py-2.5 text-center text-night">Neamț → București</span>
            <span className="flex-1 py-2.5 text-center text-white/75">București → Neamț</span>
            <span className="flex-1 py-2.5 text-center text-white/75">Roman ⇄ Constanța</span>
          </div>
          <ul className="mt-6 max-w-3xl divide-y divide-white/10 border-y border-white/10">
            {rows.map((r) => (
              <li key={r.time + r.title} className="grid grid-cols-[6rem_1fr_auto] items-center gap-4 py-4">
                <span className="font-mono text-2xl font-semibold">
                  <Flap value={r.time} />
                </span>
                <span>
                  <span className="block font-medium">{r.title}</span>
                  <span className="block text-sm text-mist">{r.sub}</span>
                </span>
                <span className="font-mono text-sm font-medium whitespace-nowrap">{r.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Rând de serviciu */}
      <div className="bg-white text-ink" data-bg="white">
        <div className="container-x py-12">
          <div className="grid gap-3 border-y border-line py-10 md:grid-cols-12 md:items-center md:gap-8">
            <p className="font-display text-3xl font-semibold tracking-tight md:col-span-5 md:text-[2.75rem] md:leading-none">
              Închiriere microbuz cu șofer
            </p>
            <p className="leading-relaxed text-muted md:col-span-5">
              La oră, pe zi sau pe mai multe zile, cu șofer inclus; tu alegi traseul și opririle prin Bălțătești,
              Râmnicu Sărat sau Hârșova.
            </p>
            <span className="link-arrow md:col-span-2 md:justify-self-end">
              Detalii <ArrowRight size={16} />
            </span>
          </div>
          {/* Diacriticele românești, în toate cele trei roluri */}
          <div className="mt-8 grid gap-2 text-muted" data-diacritics="">
            <p className="font-display text-4xl font-semibold tracking-tight text-ink">ă â î ș ț — Ă Â Î Ș Ț</p>
            <p>Text: Mănăstirea Văratec, Râmnicu Sărat, Hârșova, Bălțătești, Târgu Neamț, Țara Făgărașului.</p>
            <p className="font-mono">Ore: 05:00 · 12:30 · 23:59 — ășțîâ ĂȘȚÎÂ</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FonturiPage() {
  return (
    <div className={`${archivo.variable} ${instrument.variable} ${geist.variable} pt-16 md:pt-20`}>
      <div className="bg-light" data-bg="light">
        <div className="container-x py-10">
          <p className="eyebrow text-muted">Pagină temporară</p>
          <h1 className="display-md mt-3">Comparație de fonturi</h1>
          <p className="mt-3 max-w-2xl text-muted">
            Același logo, aceleași culori și aceeași așezare — se schimbă doar fonturile. Alege A, B sau C; varianta
            aleasă se aplică pe tot site-ul, iar pagina aceasta se șterge.
          </p>
        </div>
      </div>
      {VARIANTS.map((v) => (
        <Specimen key={v.id} {...v} />
      ))}
    </div>
  );
}
