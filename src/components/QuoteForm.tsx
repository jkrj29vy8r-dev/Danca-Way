"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { sendQuote } from "@/app/actions/quote";
import type { QuoteField, QuoteState } from "@/lib/quote-schema";
import { serviceById, services, type ServiceId } from "@/data/services";
import { ArrowRight, Check } from "./icons";
import { PREFILL_EVENT, type QuotePrefill } from "./QuoteLink";

type Props = {
  /** Serviciul preselectat (ex. pe paginile de serviciu) */
  defaultService?: ServiceId;
  /** Text precompletat în „Detalii” (ex. numele excursiei) */
  defaultSubject?: string;
};

const initial: QuoteState = { status: "idle" };

const subjectLine = (subject?: string) => (subject ? `Sunt interesat(ă) de: ${subject}\n` : "");

export function QuoteForm({ defaultService, defaultSubject }: Props) {
  const [state, action, pending] = useActionState(sendQuote, initial);
  const [service, setService] = useState<string>(defaultService ?? "");
  const [details, setDetails] = useState(subjectLine(defaultSubject));
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

  // Mută focusul pe primul câmp cu eroare.
  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) return;
    const first = Object.keys(state.fieldErrors)[0];
    formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="rounded-[var(--radius-card)] bg-white p-8 md:p-12" role="status" aria-live="polite">
        <span className="grid size-14 place-items-center rounded-full bg-accent text-night">
          <Check size={26} />
        </span>
        <h3 className="mt-8 font-display text-3xl font-semibold tracking-tight">
          Mulțumim{state.name ? `, ${state.name.split(" ")[0]}` : ""}!
        </h3>
        <p className="mt-3 max-w-md text-lg text-muted">
          Am primit cererea ta. Te sunăm la numărul din formular cu prețul și ora de plecare.
        </p>
        <button
          type="button"
          className="btn btn-ghost-dark mt-8"
          onClick={() => window.location.reload()}
        >
          Trimite o altă cerere
        </button>
      </div>
    );
  }

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? (state.values ?? {}) : {};
  const err = (f: QuoteField) => errors[f];
  const fieldProps = (f: QuoteField) => ({
    id: `${uid}-${f}`,
    name: f,
    "aria-invalid": err(f) ? (true as const) : undefined,
    "aria-describedby": err(f) ? `${uid}-${f}-err` : undefined,
  });
  const errorText = (f: QuoteField) =>
    err(f) ? (
      <p id={`${uid}-${f}-err`} className="mt-2 text-sm font-medium text-[#b42318]">
        {err(f)}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      id="formular"
      action={action}
      noValidate
      className="scroll-mt-28 rounded-[var(--radius-card)] bg-white p-6 md:p-10"
      aria-labelledby={`${uid}-title`}
    >
      <h3 id={`${uid}-title`} className="font-display text-2xl font-semibold tracking-tight">
        Cerere de ofertă
      </h3>
      <p className="mt-2 text-sm text-muted">Câmpurile marcate cu * sunt obligatorii.</p>

      {state.status === "error" && (
        <p role="alert" className="mt-6 rounded-2xl bg-[#fef3f2] px-4 py-3 text-sm font-medium text-[#b42318]">
          {state.message}
        </p>
      )}

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="label" htmlFor={`${uid}-serviciu`}>
            Tip serviciu *
          </label>
          <select
            {...fieldProps("serviciu")}
            className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230B1426%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[position:right_1rem_center] bg-no-repeat pr-12"
            required
            value={service}
            onChange={(e) => setService(e.target.value)}
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
          {errorText("serviciu")}
        </div>

        <div>
          <label className="label" htmlFor={`${uid}-plecare`}>
            De unde plecați? *
          </label>
          <input {...fieldProps("plecare")} className="field" required autoComplete="address-level2" placeholder="ex. Piatra Neamț" defaultValue={values.plecare} />
          {errorText("plecare")}
        </div>
        <div>
          <label className="label" htmlFor={`${uid}-destinatie`}>
            Unde mergeți? *
          </label>
          <input {...fieldProps("destinatie")} className="field" required placeholder="ex. Aeroport Otopeni" defaultValue={values.destinatie} />
          {errorText("destinatie")}
        </div>
        <div>
          <label className="label" htmlFor={`${uid}-data`}>
            Data plecării *
          </label>
          <input {...fieldProps("data")} type="date" className="field" required defaultValue={values.data} onFocus={(e) => (e.currentTarget.min = new Date().toISOString().slice(0, 10))} />
          {errorText("data")}
        </div>
        <div>
          <label className="label" htmlFor={`${uid}-pasageri`}>
            Număr de pasageri *
          </label>
          <input {...fieldProps("pasageri")} type="number" inputMode="numeric" min={1} max={500} className="field" required placeholder="ex. 8" defaultValue={values.pasageri} />
          {errorText("pasageri")}
        </div>
        <div>
          <label className="label" htmlFor={`${uid}-nume`}>
            Nume *
          </label>
          <input {...fieldProps("nume")} className="field" required autoComplete="name" defaultValue={values.nume} />
          {errorText("nume")}
        </div>
        <div>
          <label className="label" htmlFor={`${uid}-telefon`}>
            Telefon *
          </label>
          <input {...fieldProps("telefon")} type="tel" className="field" required autoComplete="tel" placeholder="07xx xxx xxx" defaultValue={values.telefon} />
          {errorText("telefon")}
        </div>
        <div className="md:col-span-2">
          <label className="label" htmlFor={`${uid}-email`}>
            Email <span className="font-normal text-muted">(opțional)</span>
          </label>
          <input {...fieldProps("email")} type="email" className="field" autoComplete="email" defaultValue={values.email} />
          {errorText("email")}
        </div>
        <div className="md:col-span-2">
          <label className="label" htmlFor={`${uid}-detalii`}>
            Detalii <span className="font-normal text-muted">(opțional)</span>
          </label>
          <textarea
            {...fieldProps("detalii")}
            className="field min-h-32 resize-y"
            rows={4}
            placeholder="Ora dorită, retur, bagaje, opriri pe traseu…"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          {errorText("detalii")}
        </div>

        {/* Capcană anti-spam: ascunsă pentru oameni */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${uid}-website`}>Nu completa acest câmp</label>
          <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="md:col-span-2">
          <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
            <input
              {...fieldProps("acord")}
              type="checkbox"
              value="da"
              required
              className="mt-0.5 size-5 shrink-0 rounded accent-night"
              defaultChecked={values.acord === "da"}
            />
            <span>
              Sunt de acord ca datele mele să fie folosite pentru a primi oferta, conform{" "}
              <Link href="/politica-de-confidentialitate" className="font-medium text-ink underline underline-offset-2">
                Politicii de confidențialitate
              </Link>
              . *
            </span>
          </label>
          {errorText("acord")}
        </div>
      </div>

      <button type="submit" className="btn btn-dark mt-8 w-full md:w-auto" disabled={pending} aria-busy={pending}>
        {pending ? "Se trimite…" : "Trimite cererea"}
        {!pending && <ArrowRight />}
      </button>
    </form>
  );
}
