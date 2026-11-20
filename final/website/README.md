# Danca Way — imagini pentru site (fotografie de studio, clip, model 3D)

Toate pornesc de la **fotografiile reale** ale autocarului Setra S 517 HD (nu din text). Modelul, colantul și
proporțiile sunt cele reale. S-au schimbat doar fundalul, lumina și reflexiile. Panoul alb de pe lateral e fără
text, la cererea ta. Generate în Higgsfield pe 20 noiembrie 2026.

## foto/

| Fișier | Ce este | Unde merge |
|---|---|---|
| `setra-studio-3-4_master.jpg` | Setra din față-lateral, studio întunecat, 4800 × 3584. Master, pentru editări ulterioare | — |
| `setra-studio-3-4_2400.webp`, `_1600.webp` | Același cadru pentru web (srcset) | hero Flota, cardul Flota de pe pagina principală |
| `setra-studio-lateral_master.jpg` | Setra din lateral, același studio, 4800 × 3584 | — |
| `setra-studio-lateral_2400.webp`, `_1600.webp` | Același cadru pentru web | fișa tehnică de pe Flota |

**Cum s-au făcut:**
- Nano Banana Pro 4K, cu fotografia reală ca referință, pe care am comparat-o cu Kling O1 Image. Kling a fost
  respins, pentru că schimba unghiul.
- Pe fotografia față-lateral, textul de pe panou (redesenat greșit de model) a fost șters local, prin retușare.
  Fotografia din lateral a ieșit direct cu panoul alb.

**Ce rămâne generat, nu real:**
- studioul și reflexia de pe podea;
- textul din colajul alb-negru de pe caroserie (de ex. „Willkommen”), care e redesenat și nu se poate citi la
  dimensiunea de pe site;
- plăcuța mică „S 517 HD” de lângă ușă, care nu e perfect lizibilă.

## video/

| Fișier | Ce este |
|---|---|
| `setra-studio-apropiere_1664x1244.mp4` | 5 s, fără sunet, cu camera apropiindu-se lent de autocarul din studio (Kling 3.0 Pro, pornind de la fotografia față-lateral). Master |
| `setra-studio-apropiere_1280.mp4` | Același clip, 1280 px, ~0,75 MB, pentru site (`autoplay muted loop playsinline`) |
| `setra-studio-apropiere_poster.jpg` | Primul cadru, ca `poster` pentru `<video>` |

Kling a inventat un con portocaliu pe acoperiș, de la secunda 1,5. L-am scos cadru cu cadru: acoperișul real e
copiat dintr-un cadru dinainte de con și aliniat pe fiecare cadru următor. Verificat: zona retușată nu pâlpâie
(mișcarea ei e la fel ca în clipul original).

## 3d/

| Fișier | Ce este |
|---|---|
| `setra-s517hd_clay.glb` | Modelul 3D al autocarului, 40.000 de triunghiuri, comprimat cu Draco (69 KB). Un singur material mat, bleumarin Danca (#0E1A36), fără texturi. Pe site are nevoie de `DRACOLoader`, de exemplu în three.js sau `<model-viewer>`. |
| `setra-s517hd_clay.png` | Imaginea de rezervă (față-lateral), fundal transparent, ~1840 px. Pentru browsere fără WebGL și pentru încărcarea inițială. |
| `setra-s517hd_clay_lateral.png`, `_spate-3-4.png`, `_sus.png` | Același model din alte unghiuri, fundal transparent. |

**Cum s-a făcut:**
- Hunyuan3D v3 (doar geometrie), pornind de la fotografia de studio față-lateral.
- Apoi local: un singur material, simplificare la 40.000 de triunghiuri, centrare pe sol și compresie Draco.
- Modelul generat avea o singură osie în spate; autocarul real are două. A doua roată din spate e copiată din
  prima, la distanța din fotografia laterală.

**Ce e inventat:** spatele autocarului (nu există nicio fotografie din spate) și detaliile fine ale parbrizului.
În stilul mat „clay”, la dimensiunea unei iconițe, nu se observă.

## Ce lipsește

- **Vederea 360°:** amânată. Lipsește clipul filmat în jurul autocarului.
- **Microbuzul și dubița 8+1:** fără fotografii, deci fără imagini de studio și fără modele 3D.
- **Scenele de pe drum de munte și Otopeni:** neîncepute. Pentru fotografiile de până acum ai ales studioul.
