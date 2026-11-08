# Fotografii

Fiecare `.jpg` de aici este un **placeholder bleumarin**. Înlocuiește-l cu fotografia reală,
**păstrând exact același nume de fișier**. Nu este nevoie de nicio modificare în cod.
Next.js redimensionează și comprimă automat imaginile (AVIF/WebP).

| Fișier | Format | Dimensiune minimă | Ce trebuie să arate |
| --- | --- | --- | --- |
| `hero-microbuz-drum-munte.jpg` | 21:9 | 2520 × 1080 | Microbuz închis la culoare pe un drum de munte, la ora albastră. Partea de sus a imaginii să fie mai liniștită (cer). |
| `drum-neamt-bucuresti.jpg` | 21:9 | 2520 × 1080 | Autocarul sau microbuzul pe drum, cadru larg. Se mărește ușor la scroll, deci lasă puțin spațiu pe margini. |
| `serviciu-transfer-privat.jpg` | 4:3 | 1600 × 1200 | Microbuzul 8+1 la o adresă, cu ușa deschisă / pasageri urcând. |
| `serviciu-inchiriere-microbuz.jpg` | 4:3 | 1600 × 1200 | Șoferul lângă microbuz. |
| `serviciu-excursii-pelerinaje.jpg` | 4:3 | 1600 × 1200 | Grup la o mănăstire sau într-o excursie. |
| `excursii-<slug>.jpg` | 4:3 | 1600 × 1200 | Câte una pentru fiecare excursie din `src/data/trips.ts`. Pe pagina principală se decupează vertical (3:4), deci subiectul să fie în centru. |
| `pelerinaje-<slug>.jpg` | 4:3 | 1600 × 1200 | Câte una pentru fiecare pelerinaj din `src/data/pilgrimages.ts`. |

Textul alternativ (pentru accesibilitate) al imaginilor mari este în `src/data/photos.ts` și `src/data/services.ts`;
actualizează-l dacă fotografia arată altceva.
