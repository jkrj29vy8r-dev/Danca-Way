# Danca Way — site de prezentare

Site-ul Danca Way (Danca Util Ideal SRL, CUI 41865158), transport persoane din județul Neamț.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis · Resend · Vercel

## Pornire locală

```bash
npm install
cp .env.example .env.local   # completează RESEND_API_KEY etc.
npm run dev                  # http://localhost:3000
```

Alte comenzi: `npm run build`, `npm run lint`, `npm run typecheck`.

## Unde se editează conținutul

| Ce | Fișier |
| --- | --- |
| Telefon, WhatsApp, email, adresă, link bilete, date firmă | `src/config/site.ts` |
| Curse regulate (orar, prețuri, traseu pe hartă) | `src/data/routes.ts` |
| Excursii | `src/data/trips.ts` |
| Pelerinaje | `src/data/pilgrimages.ts` |
| Servicii (meniu, grilă, opțiuni formular) | `src/data/services.ts` |
| Logo | `public/brand/danca-way-logo.svg`, `danca-way-logo-alb.svg`, `danca-way-simbol.svg` (+ `src/app/icon.svg` pentru favicon) |

Logo-urile actuale sunt **provizorii** — înlocuiește fișierele SVG păstrând aceleași nume.

## Formularul de ofertă

Trimiterea se face printr-un Server Action (`src/app/actions/quote.ts`) prin Resend.
Variabile de mediu (setează-le și în Vercel → Settings → Environment Variables):

- `RESEND_API_KEY` — cheia API Resend
- `QUOTE_TO_EMAIL` — unde ajung cererile (mai multe adrese separate prin virgulă)
- `QUOTE_FROM_EMAIL` — expeditor de pe un domeniu verificat în Resend
- `NEXT_PUBLIC_SITE_URL` — domeniul final (sitemap, Open Graph, JSON-LD)

În dezvoltare, fără cheie, cererea este doar afișată în consolă.

## Accesibilitate și animații

- Tot conținutul este vizibil fără JavaScript; animațiile care ascund inițial elemente se activează doar când JS rulează (clasa `.js` pe `<html>`).
- `prefers-reduced-motion` dezactivează Lenis, animațiile GSAP și tranzițiile.
- GSAP și Lenis se încarcă după ce pagina devine interactivă (`requestIdleCallback`).
