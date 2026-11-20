# Media Danca Way (Higgsfield, 20 noiembrie 2026)

**Singura sursă vizuală** a tuturor fișierelor de aici este hero-ul actual al site-ului, `public/images/hero-setra-studio.jpg`
(Setra S 517 HD, număr NT 21ZCA, în studioul întunecat), și varianta lui verticală `hero-setra-studio-portrait.jpg`.
Autocarul nu a fost generat din text nicăieri; s-au schimbat doar lumina, camera și atmosfera.

Decupajele folosite ca intrare (încărcate pe Higgsfield):

| Intrare | media id |
| --- | --- |
| Hero 16:9 (3200 × 1800, decupat din hero de la y = 1300) | `ed746100-ac96-4261-ae18-d5a65f9e3b96` |
| Hero 9:16 (1500 × 2667, din varianta verticală) | `8446fe1d-0b35-47ed-9e4c-634ec2fb869e` |
| Cadru de start întunecat 16:9 (făcut local din hero: 3,5% luminozitate + lumina de pe linia acoperișului) | `5cfe5fa8-927b-42df-9397-4b8db9a216fe` |
| Cadru de start întunecat 9:16 | `ad8fdd77-4e4d-44df-b11d-6c43d405f7c7` |
| Decupaje pentru detalii: far / roată / siglă / parbriz | `810de734…`, `75d165be…`, `4d38ac71…`, `2b1c32e8…` |

Atenție: insigna „S 517 HD” de lângă ușă apare deja deformată în hero („So17 KD”, de la o editare mai veche). De aceea
detaliul (c) arată sigla cromată SETRA de pe lateral, nu insigna modelului.

---

## 1. Hero cu farurile aprinse (imagine)

| Fișiere | Ce sunt |
| --- | --- |
| `hero-faruri-16x9-{2400,1200,800}.{avif,webp}` | Hero 16:9 cu farurile și luminile de zi aprinse, strălucire fină pe bară și pe podea. 2400 × 1350, 1200 × 675, 800 × 450 |
| `hero-faruri-9x16-{2400,1200,800}.{avif,webp}` | Același, vertical. Dimensiunea e pe latura lungă: 1350 × 2400, 675 × 1200, 450 × 800 |

- Model: **Nano Banana Pro 4K**. Job-uri: 16:9 `9963009a-58d6-4336-90a8-d86e55dd4bdf`, 9:16 `d1d5585b-072f-4411-bf39-aa0ad2a79641`.
- Draftul de comparație (1K): Nano Banana Pro `004cf770-e282-4639-803f-235b53cdef18` (lumină realistă, dar a stricat
  numărul: „II3 212CA”) și Kling O1 Image `cc844f7c-0408-4377-8076-763c1a43cdf6` (numărul păstrat, farurile arse, fără LED).
- **Compozit local**: din editare s-au luat doar unitățile farurilor; pe bară și pe podea s-a transferat doar lumina moale
  (diferența de luminozitate de joasă frecvență), iar strălucirea farurilor e calculată. Numărul, literele SETRA și restul
  imaginii sunt pixelii originali ai hero-ului (se schimbă 10% din 16:9, 18% din 9:16, toate în zona luminată).
- Ce se vede generat: interiorul farului stâng (văzut foarte oblic) e o pată albă destul de plată; la 9:16 conturul LED
  al farului drept pare puțin „desenat”.

## 2. Intro „lights on” (video, 5 s)

| Fișiere | Ce sunt |
| --- | --- |
| `intro-lumini-16x9.{mp4,webm}` + `-poster.jpg` | 1920 × 1080, 5,04 s, 24 fps, fără sunet. MP4 1,6 MB, WebM 0,4 MB |
| `intro-lumini-9x16.{mp4,webm}` + `-poster.jpg` | 1080 × 1920, 5,04 s, 24 fps, fără sunet. MP4 1,6 MB, WebM 0,3 MB |

- Model: **Kling 3.0 pro** (1080p), cadru de start = hero-ul întunecat cu lumina pe acoperiș, cadru de final = hero-ul exact.
  Job-uri: 16:9 `7e4ec75b-38f4-400f-ae14-9a7c798d664f`, 9:16 `f6b38104-8c6f-4a17-9037-df91ecf04800`.
  Draft (std 720p): `3fc5881a-c87c-48c4-b5b3-a462df048c45` (respins: semnalizatoarele clipeau).
- Camera e fixă (corelația muchiilor autocarului cu hero-ul urcă la 0,998), numărul și SETRA nu se schimbă.
- **Trecerea în fotografie**: ultimele 12 cadre (0,5 s) se topesc local în hero, iar ultimul cadru este hero-ul exact.
  Posterul e primul cadru (întunecat), ca să nu clipească imaginea la pornire.
- 9:16: Kling a aprins de două ori farurile și semnalizatoarele (2,45–3,0 s și 3,67–4,04 s), deși promptul cerea să rămână
  stinse. Cadrele acelea au fost înlocuite local cu o trecere lină între cadrul bun dinainte și cel de după (camera e fixă,
  deci se schimbă doar lumina). Rămâne, generat: o pană de lumină albăstruie pe fundal între 2,8 și 3,6 s și lampa laterală
  portocalie aprinsă slab.

## 3. Orbită la scroll (video 6 s + 120 de cadre)

| Fișiere | Ce sunt |
| --- | --- |
| `orbita-16x9.{mp4,webm}` + `-poster.jpg` | 1920 × 1080, 6,04 s, fără sunet. MP4 2,6 MB, WebM 0,8 MB |
| `orbita-9x16.{mp4,webm}` + `-poster.jpg` | 1080 × 1920, 6,04 s, fără sunet. MP4 2,4 MB, WebM 0,7 MB |
| `orbita-16x9/1600/000–119.webp` | 120 de cadre 1600 × 900 (5,1 MB în total) |
| `orbita-16x9/800/000–119.webp` | 120 de cadre 800 × 450 (2,4 MB) |
| `orbita-9x16/1600/000–119.webp` | 120 de cadre 900 × 1600, latura lungă 1600 (4,1 MB) |
| `orbita-9x16/800/000–119.webp` | 120 de cadre 450 × 800 (1,9 MB) |

- Model: **Kling 3.0 pro** 16:9, job `4b7eca52-8987-42af-8a7c-0884dde73c63`: arc de ~30° în jurul feței, din 3/4 spre un
  3/4 mai frontal, cu o apropiere ușoară; nu ajunge niciodată frontal.
- Drafturi respinse: std `731eae28-f457-4270-a0bd-bab46b791389` (la 5,5–6 s, aproape frontal, a inventat un panou vertical
  în stânga, ca o ușă deschisă). Final 9:16 `81ecbffd-d555-4327-9102-2706f7980d42` respins: numărul devine „NT 212CA” de la
  5,1 s și litera R din SETRA se deformează.
- **9:16 e decupat din dubla 16:9 verificată** (fereastră fixă 608 px lățime, x = 190), mărit cu Lanczos, fără rețea
  neuronală, ca să nu se reinventeze literele. E mai moale decât 16:9; cadrele de 800 px sunt micșorate, deci clare.
- Numărul „NT 21ZCA” rămâne lizibil și neschimbat în toate cadrele 16:9 (urmărire cadru cu cadru, potrivire ≥ 0,977).
  Ultimul cadru (6,0 s): litera T din SETRA e puțin mai subțire.
- Viteza camerei în video nu e constantă (prima secundă de ~4 ori mai lentă decât ultima, ca un ease-in). **Cele 120 de
  cadre sunt alese la pași egali de mișcare** (flux optic), deci la scroll mișcarea e constantă.

## 4. Detalii (imagini 4:5)

| Fișiere | Ce sunt |
| --- | --- |
| `detaliu-far-{2400,1200,800}.{avif,webp}` | (a) farul drept aprins, cu semnătura LED și banda portocalie |
| `detaliu-roata-{2400,1200,800}.{avif,webp}` | (b) roata din față, capacul alb, dunga roșie, reflexia pe podea |
| `detaliu-sigla-setra-{2400,1200,800}.{avif,webp}` | (c) sigla cromată SETRA de pe dunga laterală |
| `detaliu-parbriz-{2400,1200,800}.{avif,webp}` | (d) parbrizul și oglinzile, siluetă pe fundalul întunecat |

Lățimi 2400, 1200, 800 (înălțimi 2979–3000, 1490–1500, 993–1000).

- Model: **Nano Banana Pro 4K**, fiecare pornind de la decupajul real din hero. Job-uri: far `fabf37c4-de70-4127-a6a0-35e3bb7ea06f`,
  roată `7fd5adc0-9a96-49f0-a896-4316319a6c99`, siglă `fd8695d2-7d28-4552-9605-8dcc403d7cfe`, parbriz
  `566b8b96-29d5-461b-a48a-6e773a400afc`. Drafturi 2K: `a8d3adcb…`, `9ce7ac7d…`, `cb09cf06…`, `899b933c…`.
- (d) a fost tăiat jos local, ca să nu se vadă literele SETRA de pe bară (tot 4:5).
- Ce e generat: detaliile fine din interiorul farului (reflectoarele) și cromul siglei sunt desenate de model; în hero
  aveau doar ~150–220 px. Formele (farul, capacul, oglinzile, sigla) urmează decupajul.

## 5. Buclă de noapte (fundal pentru orar)

| Fișiere | Ce sunt |
| --- | --- |
| `noapte-sosea-bucla-16x9.{mp4,webm}` + `-poster.jpg` | 1920 × 1080, 8,00 s, 24 fps, fără sunet, buclă fără cusătură. MP4 0,8 MB, WebM 0,7 MB |

Șosea de munte noaptea, din unghi jos, cu dâre de lumină; fără vehicul, fără autocar, fără text.

- **Cadrul**: Nano Banana Pro 2K din text, job `0085af50-77fb-4960-bbfb-7024cbb98d0e`. Retușat local: am scos un indicator
  galben mic, doi stâlpi cu panouri și două puncte luminoase de la capătul curbei (puteau fi citite ca faruri), iar
  marcajele galbene (de tip american) au devenit albe, ca pe drumurile din România.
- **Mișcarea e făcută local, nu generată**: pulsuri de lumină curg de-a lungul dârelor (de la curbă spre cameră) și câteva
  stele sclipesc. Funcția e periodică, deci ultimul cadru se leagă exact de primul (diferență 0,04 din 255).
- Încercări respinse: draft Kling 3.0 std din text, job `ffa3c484-6925-4b0a-829a-e18dafb26054` (faruri de mașini în
  depărtare, indicatoare rutiere); Kling 3.0 pro cu același cadru la început și la sfârșit, job
  `08a89961-a8ca-425c-98ca-54d2fdb1d7d6` (a ieșit practic static: diferență medie între cadre 0,1 din 255).
- Ce se vede generat: copacii și munții sunt generați (nu e o fotografie reală a unui drum anume); dârele „respiră” ca într-o
  fotografie cu expunere lungă, nu ca mașini care trec.

---

Credite folosite: 119 (2961,5 → 2842,5).
