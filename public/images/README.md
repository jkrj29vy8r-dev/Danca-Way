# Fotografii

Site-ul afișează o zonă de imagine **doar dacă fișierul există** aici (fără casete goale).
Dimensiunile fiecărei fotografii sunt trecute în `src/data/images.ts` (pentru srcset și pentru spațiul rezervat).
Fotografiile se servesc prin `<picture>`: o încadrare pentru ecrane late și, opțional, una verticală pentru telefon.

## Ce există (20 noiembrie 2026)

| Fișier | Dimensiune | Ce arată | Unde apare |
| --- | --- | --- | --- |
| `hero-autocar-piata.jpg` | 2400 × 1357 | Autocarul Danca Way într-o piață, la răsărit (imagine generată, cadrul final al clipului din hero) | Posterul hero-ului pe desktop cu „reduced motion” |
| `hero-autocar-piata-4x3.jpg` | 2027 × 1520 | Același cadru, decupat 4:3 | Hero-ul pe telefon |
| `hero-rindunica-panou.jpg` | 2400 × 1357 | Rândunica de pe panoul autocarului (cadrul de început) | Rezervă |
| `setra-fata-strada.jpg` | 1600 × 1200 | Fotografie reală: Setra din față, pe stradă | Flota (hero), cardul Flota de pe pagina principală |
| `setra-fata-apus-vertical.jpg` | 900 × 1600 | Fotografie reală: Setra din față, la apus | Aceleași, pe telefon; galeria Flota |
| `setra-lateral-strada.jpg` | 1600 × 1200 | Fotografie reală: Setra din lateral | Curse regulate (hero), Flota (date tehnice) |
| `setra-fata-vertical.jpg` | 900 × 1600 | Fotografie reală: Setra din față, în parcare | Curse regulate pe telefon; galeria Flota |
| `setra-autogara-vertical.jpg` | 900 × 1600 | Fotografie reală: Setra în parcare, de departe | Galeria Flota |

Cadrele hero-ului sunt în `/public/hero` (`f001.webp` … `f121.webp`, 1600 × 900): clipul de trecere de la logo
la autocar, mărit cu Real-ESRGAN (realesr-general-x4v3) și exportat cadru cu cadru.

## Ce lipsește încă

Fotografii pentru microbuzul 8+1 și pentru paginile de servicii (transfer privat, închiriere, grupuri, evenimente,
firme), pentru excursii (`excursii-<slug>.jpg`) și pelerinaje (`pelerinaje-<slug>.jpg`), 4:3, minimum 1600 × 1200.
Fără ele, secțiunile apar doar cu text. Nu folosi fotografii cu autocarul pentru serviciile cu microbuz.
