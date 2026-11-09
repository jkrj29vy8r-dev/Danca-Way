# Fotografii

Site-ul afișează o zonă de imagine **doar dacă fișierul există** aici. Până adaugi fotografiile,
secțiunile apar fără imagine, cu textul pe toată lățimea.

Adaugă fișierele cu **exact numele de mai jos** (JPG). Next.js le redimensionează și le comprimă automat.
După ce le adaugi, fă un deploy nou (verificarea se face la build).

| Fișier | Format | Dimensiune minimă | Ce trebuie să arate |
| --- | --- | --- | --- |
| `hero-microbuz-drum-munte.jpg` | 21:9 | 2520 × 1080 | Microbuz închis la culoare pe un drum de munte, la ora albastră. Partea de sus (cerul) să fie liniștită: acolo zboară rândunica. |
| `drum-neamt-bucuresti.jpg` | 21:9 | 2520 × 1080 | Autocarul sau microbuzul pe drum, cadru larg. |
| `serviciu-transfer-privat.jpg` | 4:3 | 1600 × 1200 | Microbuzul 8+1 la o adresă, cu ușa deschisă / pasageri urcând. Apare pe pagina principală și în hero-ul paginii Transfer privat. |
| `serviciu-inchiriere-microbuz.jpg` | 4:3 | 1600 × 1200 | Șoferul lângă microbuz. |
| `serviciu-excursii-pelerinaje.jpg` | 4:3 | 1600 × 1200 | Grup la o mănăstire sau într-o excursie. |
| `serviciu-transfer-aeroport.jpg` | 21:9 | 2520 × 1080 | Microbuzul la Terminalul Plecări, Otopeni (hero-ul paginii Transfer Aeroport Otopeni). |
| `serviciu-grupuri.jpg` | 21:9 | 2520 × 1080 | Un grup (elevi, pensionari, echipă) urcând în microbuz (pagina Grupuri). |
| `serviciu-evenimente.jpg` | 21:9 | 2520 × 1080 | Invitați la o nuntă sau un botez, lângă microbuz (pagina Evenimente). |
| `serviciu-firme.jpg` | 21:9 | 2520 × 1080 | Angajați urcând în microbuz la început de schimb (pagina Firme). |
| `excursii-<slug>.jpg` | 4:3 | 1600 × 1200 | Câte una pentru fiecare excursie din `src/data/trips.ts` (ex. `excursii-ceahlau-durau.jpg`). Pe pagina principală se decupează vertical (3:4): subiectul la centru. |
| `pelerinaje-<slug>.jpg` | 4:3 | 1600 × 1200 | Câte una pentru fiecare pelerinaj din `src/data/pilgrimages.ts` (ex. `pelerinaje-prislop.jpg`). |

Textul alternativ al imaginilor mari este în `src/data/photos.ts` și `src/data/services.ts`.
