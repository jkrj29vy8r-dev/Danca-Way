"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { sendQuote } from "@/app/actions/quote";
import type { QuoteField, QuoteState } from "@/lib/quote-schema";
import { serviceById, services, type ServiceId } from "@/data/services";
import { site, telHref } from "@/config/site";
import { ArrowRight } from "./icons";
import { PREFILL_EVENT, type QuotePrefill } from "./QuoteLink";

type Props = {
  /** Serviciul preselectat (ex. pe paginile de serviciu) */
  defaultService?: ServiceId;
  /** Text precompletat în „Detalii” (ex. numele excursiei) */
  defaultSubject?: string;
  /** Id-ul titlului secțiunii (formularul nu mai are titlu propriu) */
  labelledBy?: string;
};

const initial: QuoteState = { status: "idle" };
const subjectLine = (subject?: string) => (subject ? `Sunt interesat(ă) de: ${subject}\n` : "");
const today = () => new Date().toISOString().slice(0, 10);

/** Validare imediată (la ieșirea din câmp), cu aceleași reguli și mesaje ca validarea de pe server. */
function check(f: QuoteField, v: string, checked = false): string | null {
  const t = v.trim();
  switch (f) {
    case "serviciu":
      return t ? null : "Alege tipul de serviciu.";
    case "plecare":
      return t.length >= 2 ? null : "Scrie locul de plecare.";
    case "destinatie":
      return t.length >= 2 ? null : "Scrie destinația.";
    case "data":
      if (!/^\d{4}-\d{2}-\d{2}$/.test(t)) return "Alege data plecării.";
      return t < today() ? "Data plecării a trecut deja." : null;
    case "pasageri": {
      const n = Number(t);
      if (!t || !Number.isInteger(n)) return "Scrie numărul de pasageri.";
      if (n < 1) return "Minimum 1 pasager.";
      return n > 500 ? "Pentru peste 500 de pasageri, sună-ne." : null;
    }
    case "nume":
      return t.length >= 2 ? null : "Scrie-ne numele tău.";
    case "telefon":
      return /^[+()\d\s.-]{9,20}$/.test(t) ? null : "Numărul de telefon nu pare corect.";
    case "email":
      return !t || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t) ? null : "Adresa de email nu pare corectă.";
    case "acord":
      return checked ? null : "Este necesar acordul pentru prelucrarea datelor.";
    default:
      return null;
  }
}
const FIELDS: QuoteField[] = ["serviciu", "plecare", "destinatie", "data", "pasageri", "nume", "telefon", "email", "acord"];

export function QuoteForm({ defaultService, defaultSubject, labelledBy }: Props) {
  const [state, action, pending] = useActionState(sendQuote, initial);
  const [service, setService] = useState<string>(defaultService ?? "");
  const [details, setDetails] = useState(subjectLine(defaultSubject));
  /** Erorile din browser au întâietate față de cele întoarse de server, odată ce câmpul a fost atins */
  const [local, setLocal] = useState<Partial<Record<QuoteField, string | null>>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  // Preselectare din URL (?serviciu=…&subiect=…) și din butoanele „Cere ofertă” de pe pagină.
  useEffect(() => {
    const apply = ({ service: s, subject }: Partial<QuotePrefill>) => {
      if (s && serviceById(s)) setService(s);
      if (subject) setDetails((d) => (d.includes(subject) ? d : subjectLine(subject) + d));
    };
    const params = new URLSearchParams(window.location.search);
    apply({
      service: (params.get("serviciu") ?? undefined) as ServiceId | undefined,
      subject: params.get("subiect") ?? undefined,
    });
    const onPrefill = (e: Event) => apply((e as CustomEvent<QuotePrefill>).detail);
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  // După un răspuns cu erori de la server, focusul merge pe primul câmp greșit.
  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) return;
    const first = Object.keys(state.fieldErrors)[0];
    formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, [state]);

  if (state.status === "success") {
    const s = state.summary;
    const first = (s?.name ?? state.name).split(" ")[0];
    return (
      <div role="status" aria-live="polite" className="border-t border-line-strong pt-8">
        <p className="label text-muted">Cerere trimisă</p>
        <h3 className="t-32 mt-4 font-semibold">Am primit cererea{first ? `, ${first}` : ""}.</h3>
        {s && (
          <dl className="mt-8 border-b border-line">
            {[
              ["Serviciu", s.service],
              ["Traseu", s.route],
              ["Data", s.date],
              ["Pasageri", String(s.passengers)],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 border-t border-line py-4">
                <dt className="text-muted">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        )}
        <h4 className="t-21 mt-12 font-semibold">Ce urmează</h4>
        <ol className="mt-4 border-b border-line">
          <li className="border-t border-line py-4">
            <span className="font-semibold">Te sunăm{s ? ` la ${s.phone}` : ""}</span>{" "}
            <span className="text-muted">cu prețul total și ora de plecare.</span>
          </li>
          <li className="border-t border-line py-4">
            <span className="font-semibold">Confirmi doar după ce ai prețul total.</span>
          </li>
          <li className="border-t border-line py-4">
            <span className="font-semibold">Ai uitat ceva?</span>{" "}
            <span className="text-muted">
              Sună la{" "}
              <a href={telHref} className="link-u text-ink">
                {site.contact.phoneDisplay}
              </a>
              .
            </span>
          </li>
        </ol>
        <button type="button" className="btn btn-lg btn-line-dark mt-8" onClick={() => window.location.reload()}>
          Trimite altă cerere
        </button>
      </div>
    );
  }

  const server = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? (state.values ?? {}) : {};
  const err = (f: QuoteField) => (f in local ? local[f] : server[f]) ?? null;

  const validate = (el: EventTarget | null) => {
    const t = el as HTMLInputElement;
    const f = t?.name as QuoteField;
    if (!FIELDS.includes(f)) return;
    setLocal((l) => ({ ...l, [f]: check(f, t.value, t.checked) }));
  };
  const fieldProps = (f: QuoteField) => ({
    id: `${uid}-${f}`,
    name: f,
    "aria-invalid": err(f) ? (true as const) : undefined,
    "aria-describedby": err(f) ? `${uid}-${f}-err` : undefined,
    onBlur: (e: React.FocusEvent) => validate(e.target),
    // După prima eroare, mesajul dispare imediat ce valoarea devine corectă.
    onChange: (e: React.ChangeEvent) => {
      const f2 = (e.target as HTMLInputElement).name as QuoteField;
      if (err(f2)) validate(e.target);
    },
  });
  const errorText = (f: QuoteField) =>
    err(f) ? (
      <p id={`${uid}-${f}-err`} className="t-14 mt-2 font-semibold text-error">
        {err(f)}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      id="formular"
      action={action}
      noValidate
      className="scroll-mt-32"
      aria-labelledby={labelledBy}
      onSubmit={(e) => {
        const form = e.currentTarget;
        const next: Partial<Record<QuoteField, string | null>> = {};
        for (const f of FIELDS) {
          const el = form.elements.namedItem(f) as HTMLInputElement | null;
          if (el) next[f] = check(f, el.value, el.checked);
        }
        setLocal(next);
        const bad = FIELDS.find((f) => next[f]);
        if (bad) {
          e.preventDefault();
          form.querySelector<HTMLElement>(`[name="${bad}"]`)?.focus();
        }
      }}
    >
      <p className="t-14 text-muted">Toate câmpurile sunt obligatorii, în afară de email și detalii.</p>

      {state.status === "error" && (
        <p role="alert" className="t-14 mt-6 border-l-2 border-error pl-4 font-semibold text-error">
          {state.message}
        </p>
      )}

      <div className="mt-8 grid gap-x-4 gap-y-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="field-label" htmlFor={`${uid}-serviciu`}>
            Tip serviciu
          </label>
          <div className="relative">
            <select
              {...fieldProps("serviciu")}
              className="field cursor-pointer appearance-none pr-12"
              required
              value={service}
              onChange={(e) => {
                setService(e.target.value);
                if (err("serviciu")) validate(e.target);
              }}
            >
              <option value="" disabled>
                Alege serviciul
              </option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.formLabel}
                </option>
              ))}
            </select>
            <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          {errorText("serviciu")}
        </div>

        <div>
          <label className="field-label" htmlFor={`${uid}-plecare`}>
            De unde plecați?
          </label>
          <input {...fieldProps("plecare")} className="field" required autoComplete="address-level2" placeholder="ex. Piatra Neamț" defaultValue={values.plecare} />
          {errorText("plecare")}
        </div>
        <div>
          <label className="field-label" htmlFor={`${uid}-destinatie`}>
            Unde mergeți?
          </label>
          <input {...fieldProps("destinatie")} className="field" required placeholder="ex. Aeroport Otopeni" defaultValue={values.destinatie} />
          {errorText("destinatie")}
        </div>
        <div>
          <label className="field-label" htmlFor={`${uid}-data`}>
            Data plecării
          </label>
          <input {...fieldProps("data")} type="date" className="field" required defaultValue={values.data} onFocus={(e) => (e.currentTarget.min = today())} />
          {errorText("data")}
        </div>
        <div>
          <label className="field-label" htmlFor={`${uid}-pasageri`}>
            Număr de pasageri
          </label>
          <input {...fieldProps("pasageri")} type="number" inputMode="numeric" min={1} max={500} className="field" required placeholder="ex. 8" defaultValue={values.pasageri} />
          {errorText("pasageri")}
        </div>
        <div>
          <label className="field-label" htmlFor={`${uid}-nume`}>
            Nume
          </label>
          <input {...fieldProps("nume")} className="field" required autoComplete="name" defaultValue={values.nume} />
          {errorText("nume")}
        </div>
        <div>
          <label className="field-label" htmlFor={`${uid}-telefon`}>
            Telefon
          </label>
          <input {...fieldProps("telefon")} type="tel" className="field" required autoComplete="tel" placeholder="07xx xxx xxx" defaultValue={values.telefon} />
          {errorText("telefon")}
        </div>
        <div className="md:col-span-2">
          <label className="field-label" htmlFor={`${uid}-email`}>
            Email <span className="font-normal text-muted">(opțional)</span>
          </label>
          <input {...fieldProps("email")} type="email" className="field" autoComplete="email" defaultValue={values.email} />
          {errorText("email")}
        </div>
        <div className="md:col-span-2">
          <label className="field-label" htmlFor={`${uid}-detalii`}>
            Detalii <span className="font-normal text-muted">(opțional)</span>
          </label>
          <textarea
            id={`${uid}-detalii`}
            name="detalii"
            className="field min-h-32 resize-y"
            rows={4}
            placeholder="Ora dorită, retur, bagaje, opriri pe traseu…"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        {/* Capcană anti-spam: ascunsă pentru oameni */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${uid}-website`}>Nu completa acest câmp</label>
          <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="md:col-span-2">
          <label className="flex cursor-pointer items-start gap-4 text-muted">
            <input
              {...fieldProps("acord")}
              onChange={(e) => validate(e.target)}
              type="checkbox"
              value="da"
              required
              className="mt-1 size-5 shrink-0 cursor-pointer accent-night"
              defaultChecked={values.acord === "da"}
            />
            <span>
              Sunt de acord ca datele mele să fie folosite pentru a primi oferta, conform{" "}
              <Link href="/politica-de-confidentialitate" className="text-ink underline decoration-1 underline-offset-4 transition-opacity hover:opacity-64">
                Politicii de confidențialitate
              </Link>
              .
            </span>
          </label>
          {errorText("acord")}
        </div>
      </div>

      <button type="submit" className="btn btn-lg btn-accent mt-8 w-full md:w-auto" disabled={pending} aria-busy={pending}>
        {pending ? "Se trimite…" : "Trimite cererea"}
        {!pending && <ArrowRight />}
      </button>
    </form>
  );
}
