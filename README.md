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

Toate sunt coordonate de `src/components/MotionController.tsx` (plus `SwallowTrail`, `RouteMap`,
`SnapStrip`, `WordsReveal`), folosesc easing `expo.out` și animează doar `transform`, `opacity`
și `clip-path` (excepție: desenarea liniilor SVG prin `stroke-dashoffset`).

- logo-ul din hero apare cu un clip-path de la stânga la dreapta, apoi titlul, linie cu linie;
- rândunica își desenează traseul punctat în zbor, cu parallax discret după mouse;
- titlurile secțiunilor urcă linie cu linie din spatele unei margini invizibile (SplitText);
- orele din orar se întorc cifră cu cifră, ca pe o tabelă de plecări;
- harta: linia se desenează la scroll, fiecare oprire pulsează o dată în galben;
- fotografiile: dezvăluire cu clip-path inset + parallax (~9% mai lent decât pagina);
- bară aurie de progres, header care se ascunde la scroll în jos, fundal care trece lin între secțiuni;
- excursiile: bandă orizontală fixată pe desktop, swipe pe mobil;
- butoane magnetice, linkuri cu sublinierea desenată, numere care cresc o dată.

`prefers-reduced-motion` dezactivează tot. Fără JavaScript, conținutul este complet vizibil.
