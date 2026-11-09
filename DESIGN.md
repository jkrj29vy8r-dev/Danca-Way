# Danca Way — design system

Visual references and notes: `references/NOTES.md` (local only, not deployed).

## Audit of the previous version (November 2026)

What looked generic or AI-generated, and the fix applied.

| # | Problem | Fix |
|---|---|---|
| 1 | Uppercase eyebrow + big title + grey paragraph on every section (template rhythm). | Two-tone intros (statement in ink, continuation in grey). 12 px labels only name data (Plecare, Preț, Durată). |
| 2 | Radial gradient glow in every dark hero; gradient scrims over photos. | Flat `night`. Text sits beside or below photos, never on a scrim. |
| 3 | Rounded cards everywhere (16 px trip cards, rounded panels for form, contacts, fares, countdown). | Radius 0 for images, sections and panels; structure comes from 1 px hairlines. |
| 4 | Icons inside navy circles (contacts), yellow check circle on success. | Plain label/value rows. |
| 5 | "Pasul 1 / 2 / 3" numbered step cards. | Hairline rows: bold lead-in + grey sentence, no numbers. |
| 6 | Yellow in 6+ places at once: header CTA, hero CTA, mobile "Bilet", progress bar, nav underline, labels, swallow beak. | One accent per screen (hero CTA, or the active route line). Logo files keep their own colors. |
| 7 | Five weights (400/500/600/650/700). | Two weights: 400 and 600. |
| 8 | ~20 ad-hoc font sizes (0.95 rem, 1.6 rem, 2.75 rem, 3.5 rem…). | 7-step scale: 112 / 72 / 48 / 32 / 21 / 17 / 14 (+ 12 px labels). |
| 9 | Logo twice above the fold (header + 520 px hero logo): two focal points. | One logo, in the header. The headline is the hero. |
| 10 | Mobile fold: route finder cut in half, "Următoarea plecare" 1,500 px further down. | Fold = logo, headline, route finder, next departure. Nothing else. |
| 11 | Hero stacked headline, paragraph, finder, link and four facts. | Facts moved to a Porsche-style spec row below the hero. |
| 12 | Timetable rows packed five data points into one grey line; a second countdown card duplicated the hero finder. | Flighty-style rows: time · route · price. Code, vehicle, arrival and duration on a quiet mono line. |
| 13 | Frosted-glass header with inset shadow; dropdown with `shadow-2xl` and 24 px radius. | Solid header, 1 px bottom hairline, square dropdown. |
| 14 | Motion everywhere: progress bar, parallax on every photo, hover zoom, mouse parallax, map pulses, smooth-scroll hijack. | Only: split-flap times, route-map drawing, swallow flight, countdown, line-by-line headings, clip-path photo reveals. |
| 15 | Pinned horizontal trip strip with text-only cards that looked like placeholders. | Static hairline grid; photo above text when a photo exists. |
| 16 | Eight service rows at 44–56 px with repeated "Detalii →" links. | One big link list (Polestar), one size, chevron on the right. |
| 17 | Spacing off the grid (14, 10, 6, 28, 20 px…). | 8 px system; section padding 160 px desktop / 96 px mobile. |
| 18 | Two navy surfaces plus custom greys. | `night`, `white`, `light` only; secondary text is night/white at reduced opacity. |
| 19 | Form: rounded-2xl inputs, yellow focus glow, generic "Mulțumim!" success. | 56 px inputs, 12 px radius, border focus, inline validation on blur, success that summarises the request and says what happens next. |

## Tokens

- **Color**: `night #0B1426`, `white #FFFFFF`, `light #F5F6F8`. Accent `#F2B705` at most once per screen.
  Secondary text: `night/64` on light surfaces, `white/64` on night. Hairlines: `night/12`, `white/12`.
- **Type**: Geist (400, 600) for everything; Geist Mono (400, 600) for times, prices and route codes.
  | Token | Desktop | Mobile (390 px) | Line height | Tracking |
  |---|---|---|---|---|
  | `t-112` | 112 | 48 | 0.96 | −0.04em |
  | `t-72` | 72 | 40 | 1.0 | −0.04em |
  | `t-48` | 48 | 32 | 1.08 | −0.04em |
  | `t-32` | 32 | 24 | 1.2 | −0.02em |
  | `t-21` | 21 | 19 | 1.4 | −0.01em |
  | `t-17` | 17 | 17 | 1.55 | 0 |
  | `t-14` | 14 | 14 | 1.5 | 0 |
  | `label` | 12, uppercase | 12 | 1.4 | 0.12em |
  Headings 600, body 400, body measure ≤ 62 characters.
- **Grid**: 12 columns, 24 px gutter (16 px under 768 px), page margin 24 / 48 / 64 px, max width 1440 px.
- **Spacing**: multiples of 8 px. Section padding 96 px mobile, 160 px from 1024 px.
- **Radius**: 0 for images, sections and panels; 999 px for buttons and segmented controls; 12 px for inputs.
- **Borders**: 1 px hairlines only. No shadows, gradients or glows.

## Motion

- Easing `expo.out`, durations 0.6–1.2 s. One orchestrated moment per section.
- Allowed: split-flap departure times, route-map drawing, swallow flight (hero, once), countdown digits,
  line-by-line heading reveals, clip-path photo reveals.
- Every interactive element has hover and press (scale 0.98) states. `prefers-reduced-motion` disables all of it.
