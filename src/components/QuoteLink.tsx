"use client";

import Link from "next/link";
import type { ServiceId } from "@/data/services";

export type QuotePrefill = { service: ServiceId; subject?: string };
export const PREFILL_EVENT = "quote:prefill";

type Props = QuotePrefill & { className?: string; children: React.ReactNode; "aria-label"?: string };

export function quoteHref({ service, subject }: QuotePrefill) {
  const q = new URLSearchParams({ serviciu: service });
  if (subject) q.set("subiect", subject);
  return `/contact?${q.toString()}#formular`;
}

/**
 * Link „Cere ofertă” care preselectează serviciul în formular.
 * Dacă pagina curentă are deja formularul, îl completează și derulează la el;
 * altfel (sau fără JavaScript) duce la pagina de contact.
 */
export function QuoteLink({ service, subject, className, children, ...rest }: Props) {
  return (
    <Link
      href={quoteHref({ service, subject })}
      className={className}
      aria-label={rest["aria-label"]}
      onClick={(e) => {
        const form = document.getElementById("formular");
        if (!form) return;
        e.preventDefault();
        window.dispatchEvent(new CustomEvent<QuotePrefill>(PREFILL_EVENT, { detail: { service, subject } }));
        if (window.__lenis) window.__lenis.scrollTo(form, { offset: -96 });
        else form.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      {children}
    </Link>
  );
}
