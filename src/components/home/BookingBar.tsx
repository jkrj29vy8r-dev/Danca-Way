"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Close } from "../icons";
import { openQuote } from "../QuoteLink";
import { site } from "@/config/site";
import { cityName, destinationsFrom, FINDER_CITIES, stopName, tripsBetween, type CityId } from "@/data/routes";
import { setFilter } from "@/lib/route-filter";
import { scrollToEl } from "@/lib/scroll";
import { formatClock, useBucharestClock } from "@/lib/use-next-departure";

type Tab = "regulate" | "privat" | "grup";
const TABS: { id: Tab; label: string }[] = [
  { id: "regulate", label: "Curse regulate" },
  { id: "privat", label: "Transfer privat" },
  { id: "grup", label: "Grup" },
];
/** Microbuzul 8+1: cel mult 8 pasageri */
const LIMITS: Record<Exclude<Tab, "regulate">, [number, number]> = { privat: [1, 8], grup: [1, 500] };
const today = () => new Date().toISOString().slice(0, 10);

type Request = { plecare: string; destinatie: string; data: string; pasageri: number };

/** Următoarea plecare cu precizie de secundă (null înainte de hidratare). */
function useNext(from: CityId, to: CityId, active: boolean) {
  const now = useBucharestClock(active);
  const trips = tripsBetween(from, to);
  if (!trips.length) return { trip: null, wait: null, day: null as null | "azi" | "mâine", first: null };
  if (now === null) return { trip: trips[0], wait: null, day: null, first: trips[0] };
  const later = trips.find((t) => t.depMin * 60 > now);
  const trip = later ?? trips[0];
  const wait = later ? trip.depMin * 60 - now : 24 * 3600 - now + trip.depMin * 60;
  return { trip, wait, day: (later ? "azi" : "mâine") as "azi" | "mâine", first: trips[0] };
}

/**
 * Bara de rezervare, imediat sub hero: trei file (curse regulate, transfer privat, grup), un singur rând de câmpuri
 * și o singură acțiune. După ce iese din ecran, rămâne sus o versiune compactă (ruta, ora, acțiunea); pe telefon,
 * versiunea compactă deschide aceeași bară într-o foaie pe tot ecranul.
 */
export function BookingBar() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("regulate");
  const [from, setFrom] = useState<CityId>("roman");
  const [to, setTo] = useState<CityId>("bucuresti");
  const [req, setReq] = useState<Record<"privat" | "grup", Request>>({
    privat: { plecare: "", destinatie: "", data: "", pasageri: 2 },
    grup: { plecare: "", destinatie: "", data: "", pasageri: 20 },
  });
  const [compact, setCompact] = useState(false);
  const [sheet, setSheet] = useState(false);
  const inline = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const next = useNext(from, to, tab === "regulate");

  // Versiunea compactă: vizibilă după ce bara a trecut de marginea de sus și până la formularul de ofertă.
  useEffect(() => {
    const bar = inline.current;
    const quote = document.getElementById("oferta");
    if (!bar) return;
    let past = false;
    let atQuote = false;
    const sync = () => setCompact(past && !atQuote);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === bar) past = !e.isIntersecting && e.boundingClientRect.top < 0;
          else atQuote = e.isIntersecting;
        }
        sync();
      },
      { threshold: 0 },
    );
    io.observe(bar);
    if (quote) io.observe(quote);
    return () => io.disconnect();
  }, []);

  // Înălțimea barei compacte ajunge în CSS (--bar): panourile fixate și ancorele stau sub ea.
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--bar", compact ? "3.5rem" : "0px");
    return () => root.setProperty("--bar", "0px");
  }, [compact]);

  // Foaia de pe telefon: <dialog> nativ (focus captiv, Escape închide).
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (sheet && !d.open) d.showModal();
    if (!sheet && d.open) d.close();
  }, [sheet]);

  const goQuote = () => {
    if (tab === "regulate") return;
    const r = req[tab];
    setSheet(false);
    openQuote(
      { service: tab === "privat" ? "transfer-privat" : "grup", plecare: r.plecare, destinatie: r.destinatie, data: r.data, pasageri: r.pasageri },
      (href) => router.push(href),
    );
  };
  const seeAll = () => {
    setSheet(false);
    const el = document.getElementById("plecari");
    if (!el) return router.push(`/curse-regulate?din=${from}&spre=${to}#plecari`);
    setFilter({ from, to });
    scrollToEl(el);
  };
  const edit = () => {
    if (window.matchMedia("(min-width: 64rem)").matches) {
      if (inline.current) scrollToEl(inline.current);
      inline.current?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]')?.focus({ preventScroll: true });
    } else setSheet(true);
  };

  const panel = (where: "inline" | "sheet") => (
    <Panel
      where={where}
      tab={tab}
      setTab={setTab}
      from={from}
      to={to}
      setFrom={(v) => {
        setFrom(v);
        const ds = destinationsFrom(v);
        if (!ds.includes(to)) setTo(ds[0]);
      }}
      setTo={setTo}
      next={next}
      req={tab === "regulate" ? null : req[tab]}
      setReq={(patch) => tab !== "regulate" && setReq((r) => ({ ...r, [tab]: { ...r[tab], ...patch } }))}
      onQuote={goQuote}
      onSeeAll={seeAll}
    />
  );

  const summary =
    tab === "regulate" ? (
      <>
        <span className="font-semibold">
          {cityName(from)} → {cityName(to)}
        </span>
        {next.trip && (
          <span className="hidden text-mist sm:inline">
            {" · "}
            <span className="font-mono tabular-nums text-white">{next.trip.dep.time}</span>
            {next.wait !== null && (
              <>
                {" "}
                în <span className="font-mono tabular-nums">{formatClock(next.wait)}</span>
              </>
            )}
          </span>
        )}
      </>
    ) : (
      <>
        <span className="font-semibold">{tab === "privat" ? "Transfer privat 8+1" : "Transport de grup"}</span>
        <span className="hidden text-mist sm:inline">
          {" · "}
          {req[tab].plecare || "De unde"} → {req[tab].destinatie || "unde"}
        </span>
      </>
    );

  return (
    <>
      <section id="rezervare" className="on-dark bg-night pt-8 pb-16 text-white lg:pt-12 lg:pb-24" data-bg="night" aria-label="Rezervare">
        <div ref={inline} className="container-x">
          {panel("inline")}
        </div>
      </section>

      {/* Versiunea compactă, fixată sub header */}
      <div className="booking-compact on-dark fixed inset-x-0 z-30 border-b border-line-dark bg-night text-white" data-visible={compact ? "" : undefined} aria-hidden={!compact} inert={!compact}>
        <div className="container-x flex min-h-14 items-center justify-between gap-4">
          <button type="button" onClick={edit} aria-label="Modifică rezervarea" className="press t-14 group flex min-h-12 min-w-0 grow items-center gap-3 text-left">
            <span className="truncate">{summary}</span>
            <span className="label shrink-0 text-mist transition-colors duration-[600ms] ease-[var(--ease-out-expo)] group-hover:text-white">Modifică</span>
          </button>
          {tab === "regulate" ? (
            // Pe telefon, „Bilet” e deja în bara de jos
            <a href={site.ticketsUrl} target="_blank" rel="noopener" className="btn btn-accent hidden min-h-10 shrink-0 px-4 md:inline-flex">
              Cumpără bilet <ArrowUpRight size={16} />
            </a>
          ) : (
            <button type="button" onClick={goQuote} className="btn btn-accent min-h-10 shrink-0 px-4">
              Cere ofertă <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Foaia de pe telefon */}
      <dialog ref={dialog} className="booking-sheet on-dark bg-night text-white" aria-label="Rezervare" onClose={() => setSheet(false)}>
        <div className="flex min-h-full flex-col">
          <div className="container-x flex h-16 shrink-0 items-center justify-between border-b border-line-dark">
            <p className="font-semibold">Rezervare</p>
            <button type="button" className="press -mr-2 grid size-12 place-items-center hover:opacity-64" onClick={() => setSheet(false)} aria-label="Închide">
              <Close />
            </button>
          </div>
          <div className="container-x grow py-6">{sheet && panel("sheet")}</div>
        </div>
      </dialog>
    </>
  );
}

/* ───────── Panoul: file + câmpuri + acțiune ───────── */

type PanelProps = {
  where: "inline" | "sheet";
  tab: Tab;
  setTab: (t: Tab) => void;
  from: CityId;
  to: CityId;
  setFrom: (c: CityId) => void;
  setTo: (c: CityId) => void;
  next: ReturnType<typeof useNext>;
  req: Request | null;
  setReq: (p: Partial<Request>) => void;
  onQuote: () => void;
  onSeeAll: () => void;
};

function Panel({ where, tab, setTab, from, to, setFrom, setTo, next, req, setReq, onQuote, onSeeAll }: PanelProps) {
  const uid = useId();
  const tabsRef = useRef<HTMLDivElement>(null);
  const [turns, setTurns] = useState(0);
  const canSwap = destinationsFrom(to).includes(from);
  const id = (k: string) => `${uid}-${where}-${k}`;

  // Săgețile stânga/dreapta mută focusul între file (model WAI-ARIA Tabs)
  const onTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = TABS.findIndex((t) => t.id === tab);
    const n = TABS[(i + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length];
    setTab(n.id);
    tabsRef.current?.querySelector<HTMLElement>(`[data-tab="${n.id}"]`)?.focus();
  };

  return (
    <div className="grid gap-4">
      <div ref={tabsRef} role="tablist" aria-label="Ce rezervi?" className="seg" onKeyDown={onTabKey}>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={id(`tab-${t.id}`)}
            data-tab={t.id}
            aria-selected={tab === t.id}
            aria-controls={id("panel")}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
            className="seg-item"
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={id("panel")} aria-labelledby={id(`tab-${tab}`)} className="grid gap-4">
        {tab === "regulate" ? (
          <div className="bbar bbar-regulate">
            <label className="bseg" htmlFor={id("din")}>
              <span className="label text-muted">De la</span>
              <select id={id("din")} value={from} onChange={(e) => setFrom(e.target.value as CityId)} className="bseg-input appearance-none">
                {FINDER_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {cityName(c)}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              className="bswap press"
              aria-label="Inversează plecarea cu destinația"
              disabled={!canSwap}
              onClick={() => {
                setFrom(to);
                setTo(from);
                setTurns((t) => t + 1);
              }}
            >
              <svg viewBox="0 0 24 24" className="size-4 transition-transform duration-[800ms] ease-[var(--ease-out-expo)]" style={{ transform: `rotate(${turns * 180}deg)` }} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
                <path d="M4 7h16M20 7l-3-3M20 7l-3 3M20 17H4M4 17l3-3M4 17l3 3" />
              </svg>
            </button>
            <label className="bseg" htmlFor={id("spre")}>
              <span className="label text-muted">Spre</span>
              <select id={id("spre")} value={to} onChange={(e) => setTo(e.target.value as CityId)} className="bseg-input appearance-none">
                {destinationsFrom(from).map((c) => (
                  <option key={c} value={c}>
                    {cityName(c)}
                  </option>
                ))}
              </select>
            </label>
            <div className="bseg bseg-next" aria-live="polite" aria-atomic="true">
              <span className="label flex justify-between gap-4 text-muted">
                <span>{next.day ? `Următoarea plecare, ${next.day}` : "Prima plecare a zilei"}</span>
                {next.trip && <span className="font-mono">{next.trip.route.code}</span>}
              </span>
              {next.trip ? (
                <span className="flex flex-wrap items-baseline gap-x-3">
                  <span className="t-21 font-mono font-semibold tabular-nums">{next.trip.dep.time}</span>
                  <span className="t-14 text-muted">
                    {next.wait !== null ? (
                      <>
                        <span className="sr-only">pleacă peste {Math.round(next.wait / 60)} de minute</span>
                        <span aria-hidden>
                          în <span className="font-mono tabular-nums text-ink">{formatClock(next.wait)}</span>
                        </span>
                      </>
                    ) : (
                      "zilnic"
                    )}
                    {" · "}
                    {stopName(next.trip.arr)} {next.trip.arr.time}
                    {next.trip.price ? (
                      <>
                        {" · "}
                        <span className="font-mono">{next.trip.price} lei</span>
                      </>
                    ) : null}
                  </span>
                </span>
              ) : (
                <span className="t-14 text-muted">Nu există o cursă directă. Alege alt oraș de sosire.</span>
              )}
            </div>
            <a href={site.ticketsUrl} target="_blank" rel="noopener" className="bcta btn btn-lg btn-accent">
              Cumpără bilet <ArrowUpRight />
            </a>
          </div>
        ) : (
          <div className="bbar bbar-quote">
            <label className="bseg" htmlFor={id("plecare")}>
              <span className="label text-muted">De unde</span>
              <input id={id("plecare")} value={req!.plecare} onChange={(e) => setReq({ plecare: e.target.value })} placeholder={tab === "privat" ? "Adresa ta din Neamț" : "Localitatea de plecare"} autoComplete="address-level2" className="bseg-input" />
            </label>
            <label className="bseg" htmlFor={id("destinatie")}>
              <span className="label text-muted">Unde</span>
              <input id={id("destinatie")} value={req!.destinatie} onChange={(e) => setReq({ destinatie: e.target.value })} placeholder={tab === "privat" ? "ex. Aeroport Otopeni" : "ex. Mănăstirea Voroneț"} className="bseg-input" />
            </label>
            <label className="bseg" htmlFor={id("data")}>
              <span className="label text-muted">Data</span>
              <input id={id("data")} type="date" min={today()} value={req!.data} onChange={(e) => setReq({ data: e.target.value })} className="bseg-input" />
            </label>
            <Stepper id={id("pasageri")} value={req!.pasageri} limits={LIMITS[tab]} onChange={(n) => setReq({ pasageri: n })} />
            <button type="button" onClick={onQuote} className="bcta btn btn-lg btn-accent">
              Cere ofertă <ArrowRight />
            </button>
          </div>
        )}

        <p className="t-14 text-mist">
          {tab === "regulate" ? (
            <>
              Biletul se cumpără online, pe autogari.ro.{" "}
              <button type="button" onClick={onSeeAll} className="link-arrow text-white">
                <span className="link-u">Vezi toate plecările</span> <ArrowRight size={16} />
              </button>
            </>
          ) : tab === "privat" ? (
            "Microbuzul 8+1 doar pentru voi, de la adresă la adresă. Primești prețul total înainte să confirmi."
          ) : (
            "Pentru excursii, evenimente și firme. Primești prețul total înainte să confirmi."
          )}
        </p>
      </div>
    </div>
  );
}

function Stepper({ id, value, limits: [min, max], onChange }: { id: string; value: number; limits: [number, number]; onChange: (n: number) => void }) {
  const clamp = (n: number) => Math.min(max, Math.max(min, Math.round(n) || min));
  return (
    <div className="bseg bseg-step">
      <label htmlFor={id} className="label text-muted">
        Pasageri
      </label>
      <div className="flex items-center gap-2">
        <button type="button" className="bstep press" aria-label="Un pasager mai puțin" disabled={value <= min} onClick={() => onChange(clamp(value - 1))}>
          −
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value)))}
          className="bseg-input w-12 text-center font-mono tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button type="button" className="bstep press" aria-label="Un pasager în plus" disabled={value >= max} onClick={() => onChange(clamp(value + 1))}>
          +
        </button>
      </div>
    </div>
  );
}
