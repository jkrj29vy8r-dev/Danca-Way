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
| Curse regulate: opriri, ore, tarife, linii pe hartă (după orarul publicat pe danca-transport.autogari.ro/curse) | `src/data/routes.ts` |
| Nota de pe Bileteria (o singură valoare pentru tot site-ul) | `src/config/site.ts` → `rating` |
| Excursii | `src/data/trips.ts` |
| Pelerinaje | `src/data/pilgrimages.ts` |
| Servicii (meniu, grilă, opțiuni formular) | `src/data/services.ts` |
| Logo | `public/danca-way-logo.svg` (fundal deschis), `public/danca-way-logo-alb.svg` (fundal închis), `public/danca-way-simbol.svg` (favicon + apple-touch-icon) |

Logo-urile sunt vectorizate din logo-ul oficial. Pentru o versiune nouă, înlocuiește fișierele SVG păstrând aceleași nume.

## Formularul de ofertă

Trimiterea se face printr-un Server Action (`src/app/actions/quote.ts`) prin Resend.
Variabile de mediu (setează-le și în Vercel → Settings → Environment Variables):

- `RESEND_API_KEY` — cheia API Resend
- `QUOTE_TO_EMAIL` — unde ajung cererile (mai multe adrese separate prin virgulă)
- `QUOTE_FROM_EMAIL` — expeditor de pe un domeniu verificat în Resend
- `NEXT_PUBLIC_SITE_URL` — domeniul final (sitemap, Open Graph, JSON-LD)

În dezvoltare, fără cheie, cererea este doar afișată în consolă.

## Fotografii

Zonele de imagine apar **doar dacă fișierul există** în `public/images/` (verificare la build).
Lista fișierelor și formatele: `public/images/README.md`.

## Animații

Mișcare doar acolo unde are un sens legat de drum: orele se întorc ca pe o tabelă de plecări,
traseul se desenează pe hartă (cu un puls galben la fiecare oprire), rândunica zboară,
countdown-ul „Următoarea plecare” se actualizează. În rest: titluri dezvăluite linie cu linie,
fotografii cu clip-path și parallax, bară de progres, header care se ascunde la scroll în jos.
Durate 0,6–1,2 s, easing expo.out; doar transform, opacity și clip-path (plus desenarea liniilor SVG).
GSAP se încarcă abia după prima interacțiune (sau după ~5 s), ca să nu întârzie pagina.

`prefers-reduced-motion` dezactivează tot. Fără JavaScript, conținutul este complet vizibil.

## Pagina temporară /fonturi

`/fonturi` compară trei perechi de fonturi (A Archivo Expanded + Inter, B Instrument Sans, C Geist; orele în
Geist Mono). Are `noindex` și nu apare în meniu sau sitemap. După alegere: fonturile se setează în
`src/app/layout.tsx` și tokenurile `--font-display`, `--font-sans`, `--font-mono` din `src/app/globals.css`,
apoi se șterge folderul `src/app/fonturi`.
