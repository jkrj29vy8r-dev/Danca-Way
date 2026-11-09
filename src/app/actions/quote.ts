"use server";

import { Resend } from "resend";
import { headers } from "next/headers";
import { quoteSchema, type QuoteField, type QuoteState } from "@/lib/quote-schema";
import { serviceById } from "@/data/services";
import { site } from "@/config/site";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
};

/** Limitare simplă în memorie (per instanță) împotriva trimiterilor repetate. */
const recent = new Map<string, number[]>();
function rateLimited(key: string, limit = 5, windowMs = 10 * 60_000) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < windowMs);
  hits.push(now);
  recent.set(key, hits);
  return hits.length > limit;
}

export async function sendQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  const raw = Object.fromEntries(
    Array.from(formData.entries()).filter(([k, v]) => typeof v === "string" && !k.startsWith("$")),
  ) as Record<string, string>;

  // Capcană pentru roboți: câmp ascuns care trebuie să rămână gol.
  if (raw.website) return { status: "success", name: "" };

  const parsed = quoteSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<QuoteField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as QuoteField;
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "Verifică câmpurile marcate.", fieldErrors, values: raw };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: `Ai trimis deja 5 cereri în ultimele 10 minute. Pentru alte trasee, sună la ${site.contact.phoneDisplay}.`,
      values: raw,
    };
  }

  const q = parsed.data;
  const serviceLabel = serviceById(q.serviciu)?.formLabel ?? q.serviciu;
  const rows: [string, string][] = [
    ["Serviciu", serviceLabel],
    ["Plecare", q.plecare],
    ["Destinație", q.destinatie],
    ["Data", formatDate(q.data)],
    ["Pasageri", String(q.pasageri)],
    ["Nume", q.nume],
    ["Telefon", q.telefon],
    ["Email", q.email || "—"],
    ["Detalii", q.detalii || "—"],
  ];

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[oferta] RESEND_API_KEY lipsește — cererea nu a fost trimisă:", Object.fromEntries(rows));
      return { status: "success", name: q.nume };
    }
    console.error("[oferta] RESEND_API_KEY lipsește în producție.");
    return {
      status: "error",
      message: `Nu am putut trimite cererea. Te rugăm să ne suni la ${site.contact.phoneDisplay}.`,
      values: raw,
    };
  }

  const resend = new Resend(apiKey);
  const html = `
    <div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;color:#0B1426;max-width:560px">
      <h2 style="margin:0 0 16px">Cerere de ofertă nouă</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 12px 8px 0;color:#545E73;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:8px 0;font-weight:600;white-space:pre-wrap">${escape(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin-top:24px;color:#545E73;font-size:13px">Trimis din formularul de pe ${site.url}</p>
    </div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const { error } = await resend.emails.send({
    from: process.env.QUOTE_FROM_EMAIL ?? "Danca Way <onboarding@resend.dev>",
    to: (process.env.QUOTE_TO_EMAIL ?? site.contact.email).split(",").map((s) => s.trim()),
    replyTo: q.email || undefined,
    subject: `Cerere ofertă: ${serviceLabel} · ${q.plecare} → ${q.destinatie} · ${formatDate(q.data)}`,
    html,
    text,
  });

  if (error) {
    console.error("[oferta] Resend:", error);
    return {
      status: "error",
      message: `Nu am putut trimite cererea. Te rugăm să încerci din nou sau să ne suni la ${site.contact.phoneDisplay}.`,
      values: raw,
    };
  }

  return { status: "success", name: q.nume };
}
