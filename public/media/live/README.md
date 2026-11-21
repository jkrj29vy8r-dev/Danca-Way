# public/media/live — straturile „vii” ale site-ului

Materiale pentru efectele în timp real (hero, ora zilei, harta cu rândunica, granulație). Toate videourile sunt pe
negru pur (sau gri mediu, la granulație) ca să se amestece în CSS cu `mix-blend-mode: screen` (respectiv `overlay`),
fără text, fără logo, fără oameni, fără vehicule și fără locuri reale recognoscibile. Autocarul din hero nu e generat,
editat sau înlocuit: straturile stau în spatele lui (prin mască) sau peste el doar ca lumină.

Credite Higgsfield folosite în Faza 1: **70,5** (2.842,5 → 2.772).

## Fișiere

| Fișier | Ce este | Unde se folosește | Origine |
| --- | --- | --- | --- |
| `atmosfera-zori-16x9.{webm,mp4}` + `-poster.jpg`, `-9x16.*` | Rază de lumină prin ceață, albastru rece cu o margine caldă jos. Buclă de 8 s, 1920×1080 și 720×1280 | Hero și antetele paginilor, dimineața (ora României) | Derivat local din `praf` (vezi mai jos): particulele scoase cu un blur mare, întins la 8,5 s, buclă cu trecere de 0,5 s, gradare |
| `atmosfera-zi-16x9.*`, `-9x16.*` | Aceeași rază, neutră, ceață mai luminoasă. Buclă de 8 s | Hero și antete, ziua | Idem, altă gradare |
| `atmosfera-noapte-16x9.*`, `-9x16.*` | Bleumarin adânc, rază slabă, 7 puncte calde mici deasupra autocarului. Buclă de 8 s | Hero și antete, seara și noaptea | Idem; punctele calde sunt randate local |
| `praf-16x9.{webm,mp4}` + `-poster.jpg`, `-9x16.*` | Doar particulele de praf, pe negru. Buclă de 5 s (sursa are 6 s; trecerea fără cusătură consumă 1 s) | Stratul de praf din hero | Kling 3.0 **pro**, 1080p, 6 s, fără sunet — job `e91bac76-80a8-4af8-b8a3-5a7244cfff05` (10,5 cr); particulele separate local de rază (cadrul minus versiunea neclară) |
| `pata-lumina-3s.{webm,mp4}` + `-poster.jpg` | Pată de lumină caldă, moale, care intră din dreapta și se stinge. 3 s, 1920×1080 | Momentul de confirmare (rezervare / WhatsApp) | Randată local (gradienți), 0 cr — ciorna Kling avea margini poligonale |
| `flare-3s.{webm,mp4}` + `-poster.jpg` | Flare anamorfic discret: dâră orizontală rece cu nucleu cald, trece lent. 3 s | O singură dată, în intro, când se aprind farurile | Randat local, 0 cr — ciorna Kling arăta ca o cometă |
| `granulatie-0…3.webp` | Plăci de granulație 256×256, gri mediu, care se repetă fără cusătură | Granulația de film pe imaginile mari (înlocuiește zgomotul SVG din CSS) | Generată local: două octave de zgomot gaussian, ca granulația de film |
| `granulatie-1080p.{webm,mp4}` + `-poster.jpg` | Placa de granulație, 2 s, 1920×1080, gri | Materialul-sursă (pe site se folosesc plăcile de mai sus, mult mai ușoare) | Aceeași generare locală |
| `hero-masca-desktop.png` (1600×1792), `hero-masca-mobil.png` (900×1600) | Masca autocarului (alfa = autocarul), margine moale | Lumina din hero stă în spatele caroseriei | Contur desenat manual + GrabCut, din `public/images/hero-setra-studio.jpg`; aceeași decupare ca `-mobil.jpg` |
| `randunica.glb` + `randunica-poster.png` | Rândunica din simbolul Danca Way, low-poly, un singur material alb mat, 502 triunghiuri, Draco, 3 KB | Zborul pe harta rutelor și aterizarea pe butonul de rezervare | Imagine de referință Nano Banana Pro 2K din simbolul logo-ului — job `a1668ba5-7966-4a34-9475-442eb0b0c380` (din 2 variante, 4 cr), apoi Hunyuan3D v3 LowPoly — job `35216b73-fce8-4f91-8aa7-cb9a4c5c3969` (14 cr); material și Draco aplicate local |

## Ciorne respinse (plătite, nefolosite)

| Ce | Job | Cr | De ce |
| --- | --- | --- | --- |
| Atmosferă noapte, Kling 3.0 std 8 s | `b3a3cda0-f6d7-45b1-9ad2-d3b992da6749` | 12 | Un studio întreg, gri, cu perdele și stative în cadru |
| Atmosferă, a doua ciornă (doar ceață), Kling 3.0 std 8 s | `47d23b97-fa35-463e-a32a-0b45f453c368` | 12 | Un singur fum care traversează cadrul și o pată verde; nu se poate face buclă |
| Pată de lumină, Kling 3.0 std 3 s | `856ad483-554a-481e-bd7a-3f3fe498552c` | 4,5 | Margini poligonale, salt de luminozitate între cadre |
| Flare, Kling 3.0 std 3 s | `73c7b0cd-691c-4aa1-9d42-989683a2eb5b` | 4,5 | Arată ca o cometă, nu ca un flare |
| Praf, ciornă Kling 3.0 std 6 s | `0826d1f4-ec75-4266-9f61-c64765e0d653` | 9 | Bună ca direcție, prea puțin praf; refăcută în pro |
| Rândunica, varianta B (vedere laterală) | `3cf58669-d377-4dcd-afba-bcfcc554deab` | (în cele 4 cr) | Din profil aripile nu se pot reconstrui în 3D |
