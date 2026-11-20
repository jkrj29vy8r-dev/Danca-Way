# Fotografii

Site-ul afișează o zonă de imagine **doar dacă fișierul există** aici (fără casete goale).
Dimensiunile fiecărei fotografii sunt trecute în `src/data/images.ts` (pentru srcset și pentru spațiul rezervat).
Fotografiile se servesc prin `<picture>`: o încadrare pentru ecrane late și, opțional, una verticală pentru telefon.

## Gradarea

Fișierele de aici sunt **gradate**, toate la fel: originalele stau în `assets/foto-originale/`, iar
`python3 scripts/grade.py` le scrie aici (balans de alb spre neutru, saturație 82%, curbă de film, umbre spre
albastrul-noapte al site-ului). O fotografie nouă: pune originalul în `assets/foto-originale/`, rulează scriptul,
apoi trece dimensiunile în `src/data/images.ts`. Nu edita direct fișierele de aici.

Granulația nu e în fișiere: se adaugă din CSS (clasa `grain`), doar pe imaginile de la margine la margine.

## Ce există (20 noiembrie 2026)

| Fișier | Dimensiune | Ce arată | Unde apare |
| --- | --- | --- | --- |
| `hero-setra-studio.jpg` | 3200 × 3584 | Setra S 517 HD în studio, din față-lateral (pornind de la fotografia reală) | Hero-ul paginii principale, capul fișei tehnice |
| `hero-setra-studio-portrait.jpg` | 1500 × 2775 | Aceeași, încadrare verticală | Aceleași, pe telefon |
| `setra-fata-strada.jpg` | 1600 × 1200 | Fotografie reală: Setra din față, pe stradă | Cardul Flota de pe pagina principală (până există vederea 360°) |
| `setra-fata-apus-vertical.jpg` | 900 × 1600 | Fotografie reală: Setra din față, la apus | Același card, pe telefon; galeria fișei tehnice |
| `setra-lateral-strada.jpg` | 1600 × 1200 | Fotografie reală: Setra din lateral | Curse regulate (hero) |
| `setra-fata-vertical.jpg` | 900 × 1600 | Fotografie reală: Setra din față, în parcare | Curse regulate pe telefon; galeria fișei tehnice |
| `setra-autogara-vertical.jpg` | 900 × 1600 | Fotografie reală: Setra în parcare, de departe | Galeria fișei tehnice |

## Ce lipsește încă

Fotografii pentru microbuzul 8+1 și pentru paginile de servicii (transfer privat, închiriere, grupuri, evenimente,
firme), pentru excursii (`excursii-<slug>.jpg`) și pelerinaje (`pelerinaje-<slug>.jpg`), 4:3, minimum 1600 × 1200.
Fără ele, secțiunile apar doar cu text. Nu folosi fotografii cu autocarul pentru serviciile cu microbuz.
