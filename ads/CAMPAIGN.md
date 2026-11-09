# Campania Danca Way — Facebook și Instagram

Pregătită pe 9 noiembrie 2026 pentru Meta Ads Manager. Toate cifrele din reclame vin din orarul și tarifele de pe site
(`src/data/routes.ts`, `src/data/service-pages.ts`), verificate pe 8 noiembrie 2026 pe danca-transport.autogari.ro.

- **Creativele** sunt în `ads/export/`: 12 imagini și 4 clipuri.
- **Textele** sunt în `ads/copy.json`, aceleași ca mai jos.
- **Previzualizarea** este `ads/preview.html`.
- **Sursa creativelor** este `ads/src/` (`ad.html`, `render.js`, `ad_audio.py`).

---

## 1. Cele patru concepte

| # | Concept | Ce vinde | Campanie | Formate |
|---|---|---|---|---|
| 01 | Tabela de plecări | cursa de 05:00 cu oprire la Terminalul Plecări | WhatsApp | 4:5, 1:1, 9:16 + video 4:5, 9:16 |
| 02 | Acasă de Crăciun | cursele de 12:00 și 16:00 de la Otopeni spre Neamț | WhatsApp | 4:5, 1:1, 9:16 + video 4:5, 9:16 |
| 03 | Microbuzul e doar al vostru | transferul privat 8+1, de acasă la Otopeni | WhatsApp | 4:5, 1:1, 9:16 |
| 04 | Preț clar | Neamț – București de la 120 lei | Trafic | 4:5, 1:1, 9:16 |

Pe imagine sunt cel mult 7–10 cuvinte. Pe 9:16, primele 14% și ultimele 35% din cadru nu au text și nici logo.
Clipurile au 8 secunde, se înțeleg din prima secundă și fără sunet, iar ultimele 2 secunde arată logo-ul și „Scrie-ne pe WhatsApp”.

### 01 — Tabela de plecări
- **Hook:** Cursa de 05:00 din Târgu Neamț oprește la Terminalul Plecări din Otopeni.
- **Text principal (94/125):** Cursa de 05:00 din Târgu Neamț oprește la Terminalul Plecări din Otopeni. Rezervă pe WhatsApp.
- **Titlu (35/40):** Zbori din Otopeni? Plecăm la 05:00.
- **Descriere:** Târgu Neamț – Otopeni, bilet 150 lei
- **Buton:** Trimite mesaj
- **Mesaj precompletat pe WhatsApp:** „Bună ziua, aș vrea un loc la cursa de 05:00 spre Otopeni.”

| Variantă A/B | Text principal | Titlu |
|---|---|---|
| A | Cursa de 05:00 din Târgu Neamț oprește la Terminalul Plecări din Otopeni. Rezervă pe WhatsApp. | Zbori din Otopeni? Plecăm la 05:00. |
| B | Plecăm la 05:00 din Târgu Neamț și la 06:00 din Piatra Neamț și Roman, cu oprire la Terminalul Plecări. | Târgu Neamț → Otopeni, 05:00 |
| C | Lași mașina acasă: de la 05:00, din Târgu Neamț până la Terminalul Plecări din Otopeni. | Spre Otopeni, din Neamț, la 05:00 |

*Surse:* B1 și B3 pleacă din Târgu Neamț la 05:00; B1 oprește în Piatra Neamț și Roman la 06:00; sosirea la Terminal Plecări e la 11:15 (B3) și 12:00 (B1). Tariful Târgu Neamț – Otopeni este 150 lei.

> **Corectură față de brief:** pe tabelă scrie „TÂRGU NEAMȚ → OTOPENI”, nu „PIATRA NEAMȚ → OTOPENI · 05:00”.
> Din Piatra Neamț, aceeași cursă pleacă la 06:00.

### 02 — Acasă de Crăciun
- **Hook:** Aterizezi la Otopeni de Crăciun?
- **Text principal (109/125):** Aterizezi la Otopeni de Crăciun? Te luăm de la Terminalul Plecări la 12:00 sau la 16:00 și te ducem în Neamț.
- **Titlu (29/40):** De la Otopeni, acasă în Neamț
- **Descriere:** Plecări zilnice din Otopeni: 12:00 și 16:00
- **Buton:** Trimite mesaj
- **Mesaj precompletat:** „Bună ziua, ajung la Otopeni pe data de … și aș vrea un loc spre Neamț.”

| Variantă A/B | Text principal | Titlu |
|---|---|---|
| A | Aterizezi la Otopeni de Crăciun? Te luăm de la Terminalul Plecări la 12:00 sau la 16:00 și te ducem în Neamț. | De la Otopeni, acasă în Neamț |
| B | Zbor de noapte? Microbuzul privat 8+1 te așteaptă la Sosiri și te duce acasă, oriunde în Neamț. | Te așteptăm la Sosiri, și noaptea |
| C | Otopeni → Roman, Piatra Neamț, Târgu Neamț. Plecări zilnice la 12:00 și la 16:00, bilet de la 130 lei. | Otopeni → Neamț, 12:00 și 16:00 |

*Surse:* de la Terminal Plecări se pleacă la 12:00 (B2r) și la 16:00 (B1r, B3r). Tariful Otopeni – Roman este 130 lei.
Pagina „Transfer Aeroport Otopeni” spune: „după 16:00 … te așteaptă microbuzul privat la Sosiri”.

### 03 — Microbuzul e doar al vostru
- **Hook:** Microbuzul e doar al vostru.
- **Text principal (106/125):** Microbuzul e doar al vostru: vă luăm de acasă, oriunde în Neamț, și vă ducem la Otopeni, ziua sau noaptea.
- **Titlu (30/40):** Transfer privat 8+1 la Otopeni
- **Descriere:** Prețul total, înainte să confirmi
- **Buton:** Trimite mesaj
- **Mesaj precompletat:** „Bună ziua, vreau o ofertă pentru transfer privat la Otopeni.”

| Variantă A/B | Text principal | Titlu |
|---|---|---|
| A | Microbuzul e doar al vostru: vă luăm de acasă, oriunde în Neamț, și vă ducem la Otopeni, ziua sau noaptea. | Transfer privat 8+1 la Otopeni |
| B | Zbor dimineața devreme? Plecăm din fața casei la ora potrivită zborului, cu microbuzul doar pentru voi. | De acasă la Otopeni, la ora ta |
| C | Până la 8 pasageri, un șofer, un singur preț total. Vă luăm de acasă, oriunde în Neamț, zi sau noapte. | 8 locuri, doar pentru voi |

*Surse:* paginile „Transfer privat” și „Transfer Aeroport Otopeni” spun: „microbuzul privat pleacă din Neamț la ora potrivită zborului”, „Îți răspundem cu prețul total … înainte să confirmi”, „Șoferul vine la adresa convenită”.

### 04 — Preț clar
- **Hook:** Neamț – București de la 120 lei.
- **Text principal (100/125):** Plecări zilnice din Roman la 06:00 și 07:45 spre București Obor, cu oprire la Otopeni. Bilet online.
- **Titlu (31/40):** Neamț – București de la 120 lei
- **Descriere:** Roman 120 · Piatra Neamț 130 · Târgu Neamț 140 lei
- **Buton:** Rezervă acum
- **Link:** pagina `/curse-regulate` de pe site, cu UTM-uri (vezi secțiunea 6). Biletul se cumpără apoi de acolo, pe autogari.ro.

| Variantă A/B | Text principal | Titlu |
|---|---|---|
| A | Plecări zilnice din Roman la 06:00 și 07:45 spre București Obor, cu oprire la Otopeni. Bilet online. | Neamț – București de la 120 lei |
| B | Același preț pe orice cursă: Roman – București 120 lei, Piatra Neamț 130 lei, Târgu Neamț 140 lei. | Prețul nu depinde de cursă |
| C | Pleci din Roman la 06:00 și ajungi la București Obor la 12:30, cu oprire la Otopeni la 12:00. | Roman → București, 120 lei |

*Surse:*
- **B1:** Roman 06:00 → Otopeni 12:00 → Obor 12:30.
- **B4:** Roman 07:45 → Otopeni 16:00 → Obor 16:30.
- **Tarife:** biletul întreg costă la fel pe toate cursele.

> **De ce Roman și nu Târgu Neamț:** „de la 120 lei” este prețul din Roman. Din Târgu Neamț biletul costă 140 lei.
> Prima versiune a imaginii punea „Din Târgu Neamț 05:00 09:00” sub „de la 120 lei”, ceea ce ar fi sugerat un preț greșit.
> Acum imaginea arată plecările din Roman.

### Ce am corectat la verificare
Am verificat fiecare reclamă în machete de telefon (`ads/preview.html`). Am urmărit:
- dacă oferta se înțelege într-o secundă;
- dacă textul se citește pe ecran;
- dacă zonele sigure din Stories sunt respectate;
- dacă faptele sunt corecte;
- aspectul.

Corecturile:

| Reclamă | Problemă | Corectură |
|---|---|---|
| 01, 02, 04 | Etichetele mici („Plecări”, „Din Otopeni, zilnic”, „Din Roman”) aveau 24–26 px din 1080, cam 9 pt pe telefon | 32 px; „Terminal Plecări” 40 px |
| 02 | În clip, orele 12:00 și 16:00 apăreau abia după 2 secunde | apar de la 0,45 s și sunt complete la 1,4 s |
| 02 | Pe 9:16, „Neamț” intra în primele 14% ale cadrului; la începutul clipului rândunica acoperea „Otopeni” | ambele etichete mutate |
| 04 | „De la 120 lei” stătea lângă orele din Târgu Neamț, unde biletul costă 140 lei | imaginea arată plecările din Roman (06:00, 07:45), unde biletul costă 120 lei |

---

## 2. Structura în Ads Manager

**Nume:** `DW_<obiectiv>_<audiență>_<concept>_<variantă>_<format>`, de exemplu `DW_WA_Local_01_A_4x5`.

### Campania A — Click-to-WhatsApp (principala)
- **Obiectiv:** Interacțiune.
- **Unde au loc conversiile:** Aplicații de mesagerie → WhatsApp.
- **Optimizare:** maximizează numărul de conversații.
- **Condiție:** numărul 0725 819 224 trebuie să fie cont WhatsApp Business conectat la Pagina de Facebook (Setări Pagină → Conturi conectate → WhatsApp).
- **Seturi de reclame:** câte unul pe audiență (secțiunea 3). În fiecare set:
  - conceptele 01, 02, 03, cu varianta A;
  - pentru 01 și 02, imaginea și clipul ca reclame separate.
- **Mesajul precompletat** se setează în reclamă, la „Șablon de mesaj”, pe concept, ca mai sus.

### Campania B — Trafic, pentru comparație
- **Obiectiv:** Trafic.
- **Destinație:** site, cu optimizare pe vizualizări ale paginii de destinație.
- **Reclame:** conceptul 04, către `/curse-regulate`.
- **Audiență:** un singur set, Local.
- **Dacă pixelul e instalat:** poți folosi în loc obiectivul **Clienți potențiali**, cu evenimentul `Contact` (clic pe WhatsApp, telefon sau bilete) ca optimizare.
- **Ce comparăm după 7 zile:**
  - costul pe conversație în A;
  - costul pe clic spre bilete sau WhatsApp de pe site în B;
  - rezervările reale din fiecare.

**Categorie specială de reclame:** nu e cazul (transport, nu credite, locuințe, angajări sau politică).
**Beneficiar și plătitor (UE):** Danca Util Ideal SRL. Meta cere aceste date la fiecare set de reclame care ajunge în UE.

---

## 3. Audiențe

### Local — rază în jurul orașelor
- **Locații:** Piatra Neamț, Roman și Târgu Neamț, fiecare cu rază de 25 km. Tipul de locație: „Persoane care locuiesc în această locație sau au fost recent aici”.
- **Vârstă și limbă:** 18–65+, limba română.
- **Fără interese:** lasă Advantage+ audience să lărgească audiența.
- **Concepte:** 01, 03, 04 (și 02, pentru cei care primesc rude la Otopeni).

### Diaspora
- **Țări:** Italia, Spania, Marea Britanie, Germania, Franța. Tipul de locație: „Persoane care locuiesc în această locație”.
- **Limbă:** română.
- **Interese/comportamente** (adaugă-le pe cele care apar în cont, fiindcă Meta le redenumește des):
  - comportamentul pentru foștii expați din România („Au locuit în România” / „Expați – România”);
  - interes pentru Aeroportul Henri Coandă, Wizz Air, TAROM;
  - interes pentru Piatra Neamț, Roman.
- **Concepte:** 02 (principal) și 03.
- **Ce nu facem:** nu scriem în reclamă „Ești din Neamț?” sau „Lucrezi în Italia?”. Detaliile sunt în secțiunea 8.

### Retargeting — ultimele 30 de zile
Audiențe personalizate:
- persoanele care au interacționat cu Pagina de Facebook sau cu contul de Instagram;
- cele care au trimis mesaj Paginii;
- cele care au văzut cel puțin 50% din clipurile 01 sau 02;
- vizitatorii site-ului, după ce pixelul e instalat.

**Exclude** persoanele care au trimis mesaj în ultimele 7 zile; ele vorbesc deja cu voi pe WhatsApp.
**Concepte:** 03 și 04 (detaliu și preț, pentru cei care știu deja de voi).

### Calendarul de Crăciun
| Perioadă | Ce rulăm |
|---|---|
| 10–16 nov. | test: toate conceptele, toate audiențele (secțiunea 4) |
| 17 nov. – 23 dec. | scalăm câștigătoarele; pentru Diaspora, conceptul 02 primește cel mai mare buget |
| 18 dec. – 10 ian. | set nou, „Vizitatori”: limba română, comportament expați, locație Neamț cu tipul „Persoane care se află recent aici”. Conceptele 01 și 03 îi prind pe cei veniți acasă de sărbători, care se întorc la Otopeni |

---

## 4. Buget și plan de test

| Campanie | Set de reclame | Buget/zi |
|---|---|---|
| A — WhatsApp | Local | 12 € |
| A — WhatsApp | Diaspora | 15 € |
| A — WhatsApp | Retargeting 30 zile | 10 € |
| B — Trafic | Local | 10 € |
| **Total** | | **47 €/zi**, aproximativ 330 € pentru 7 zile de test |

Dacă ad account-ul e în lei, bugetele se transformă la cursul zilei (12 € ≈ 60 lei).

1. **Zilele 1–5/7:**
   - nu modifica nimic în primele 3 zile;
   - „Învățare limitată” e normal la bugetul acesta.
2. **Ziua 5–7:**
   - în fiecare set, păstrează cele **2 reclame** cu costul pe conversație cel mai mic (în B, costul pe clic spre WhatsApp, telefon sau bilete) și oprește-le pe celelalte;
   - o reclamă cu sub 1.000 de afișări nu se judecă încă;
   - apoi testează variantele B și C ale textului pe cele 2 reclame rămase (A/B test din Ads Manager, pe text, cu același creativ).
3. **Scalare:**
   - crește bugetul setului cu **+20% la fiecare 3 zile**, cât timp costul pe conversație nu crește cu mai mult de 20%;
   - dacă crește, revino la bugetul anterior și așteaptă 3 zile.
4. **Oboseală:** când frecvența depășește 3 la Local sau Retargeting, schimbă formatul (imagine ↔ clip) sau varianta de text.

---

## 5. Plasări
**Advantage+ placements**, cu imaginea potrivită încărcată pentru fiecare grup de plasări („Personalizare resurse”):

| Plasare | Fișier | Ce verifici în previzualizarea din Ads Manager |
|---|---|---|
| Feed Facebook / Instagram, Explore, Video feeds | `_4x5` (imagine sau clip) | nimic tăiat în colțuri; titlul de sub imagine nu e trunchiat |
| Stories, Reels (Facebook și Instagram) | `_9x16` | textul stă între 14% și 65% din înălțime; numele Paginii sus și butonul jos nu acoperă nimic |
| Coloana din dreapta, Search, Marketplace, Messenger inbox | `_1x1` | ora sau prețul rămân lizibile la dimensiune mică |

- **Audience Network:** la campania B, după 3 zile, compară clicurile cu vizualizările paginii. Dacă din Audience Network vin clicuri fără vizualizări, exclude-l.
- **Campania A:** Click-to-WhatsApp rulează doar pe Facebook și Instagram.

---

## 6. Măsurare

### Ce se vede fără nimic instalat
- **Conversațiile pe WhatsApp:** Ads Manager le numără singur (coloanele „Conversații prin mesaje începute” și „Cost per conversație”).
- **Rezervările reale:** în WhatsApp Business, pune eticheta **„Rezervat – Meta”** pe fiecare conversație venită din reclamă care se termină cu bilet sau transfer confirmat.
  - Conversațiile din reclamă încep cu mesajul precompletat, deci se recunosc ușor.
  - Duminica, numără etichetele într-un tabel: dată, concept, audiență, tip (bilet sau transfer), valoare.

### Pixel + Conversions API (pentru campania B și pentru retargeting pe site)
**Atenție: azi site-ul nu folosește cookie-uri și o spune în `/politica-cookie`.** Pixelul Meta setează cookie-ul `_fbp`, deci înainte de instalare e nevoie de:
1. **un banner de consimțământ:** pixelul se încarcă doar după „Accept”; refuzul trebuie să fie la fel de ușor ca acceptul;
2. **actualizarea paginilor `/politica-cookie` și `/politica-de-confidentialitate`:** Meta ca destinatar, scopul (măsurarea reclamelor), durata cookie-urilor;
3. **Conversions API trimis doar cu consimțământ:** evenimentele de pe server (formularul de ofertă) pleacă numai dacă vizitatorul a acceptat. Același `event_id` în browser și pe server, pentru deduplicare.

Evenimentele:

| Eveniment | Când | Unde în cod |
|---|---|---|
| `PageView` | la fiecare pagină | layout |
| `Contact` cu `content_name: "whatsapp"` | clic pe un link `wa.me` | `whatsappHref` (`src/config/site.ts`) |
| `Contact` cu `content_name: "telefon"` | clic pe un link `tel:` | `telHref` |
| `ClickBilete` (eveniment personalizat) | clic spre danca-transport.autogari.ro | `site.ticketsUrl` |
| `Lead` | formular de ofertă trimis cu succes (browser + CAPI, același `event_id`) | `src/app/actions/quote.ts` |

Cumpărarea biletului se face pe autogari.ro, unde nu avem pixel. Pentru bilete, ultimul pas măsurat este `ClickBilete`.

### UTM-uri
În Ads Manager, la fiecare reclamă cu link spre site, în „Parametri URL”:
```
utm_source={{site_source_name}}&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_term={{adset.name}}&utm_content={{ad.name}}
```
Exemplu de link final pentru conceptul 04:
```
https://danca-way.vercel.app/curse-regulate?utm_source=fb&utm_medium=paid_social&utm_campaign=DW_TR_Test&utm_term=Local&utm_content=DW_TR_Local_04_A_4x5
```

---

## 7. Ce urmărim (coloane personalizate în Ads Manager)

| Metrică | Formulă | La ce folosește |
|---|---|---|
| Cost per conversație | cheltuială ÷ conversații începute | metrica principală pentru campania A |
| CTR (link) | clicuri pe link ÷ afișări | dacă titlul și imaginea se înțeleg |
| Thumb-stop rate (clipuri) | redări de 3 secunde ÷ afișări | dacă prima secundă oprește scroll-ul |
| Hold rate (clipuri) | ThruPlay ÷ redări de 3 secunde | dacă oamenii ajung la cartonașul cu WhatsApp |
| Cost per clic spre WhatsApp, telefon sau bilete | cheltuială ÷ (Contact + ClickBilete) | metrica principală pentru campania B |
| **Cost per rezervare reală** | cheltuială ÷ etichete „Rezervat – Meta” | decizia finală: ce concept și ce audiență primesc bani |
| Frecvență | afișări ÷ persoane | oboseala reclamei |

---

## 8. Verificare politici Meta (înainte de publicare)

- [x] **Fără atribute personale:**
  - nicio frază nu presupune ceva despre cine citește („Ești din Neamț?”, „Lucrezi în străinătate?”, „Ești român în Italia?”);
  - întrebările din reclame se referă la o acțiune („Zbori din Otopeni?”, „Aterizezi la Otopeni de Crăciun?”, „Zbor de noapte?”).
- [x] **Prețuri reale:**
  - 120, 130, 140 și 150 lei sunt tarifele de bilet întreg din orar;
  - „de la 120 lei” are condiția scrisă în descriere (Roman 120 · Piatra Neamț 130 · Târgu Neamț 140).
- [x] **Ore reale:** 05:00 și 06:00 (01), 12:00 și 16:00 (02), 06:00 și 07:45 din Roman (04), verificate în `src/data/routes.ts`.
- [x] **Pagina de destinație spune același lucru:** `/curse-regulate` arată aceleași ore și prețuri.
- [x] **Fără afirmații pe care nu le putem dovedi:** fără „cel mai ieftin”, „cel mai rapid”, „garantat”, procente sau recenzii.
- [x] **Fără „!” în titluri, fără liste cu emoji, fără majuscule de tip strigăt.** Majusculele apar doar pe tabela de plecări, ca pe tabelele din aeroport.
- [x] **Mărcile terțe folosite corect:** „WhatsApp” apare doar ca nume de canal („Scrie-ne pe WhatsApp”), fără logo-ul lor modificat.
- [x] **Crăciunul e doar perioada:** nu e vizată religia și nu se folosesc simboluri religioase.
- [ ] **Pagina de Facebook are completate:**
  - firma (Danca Util Ideal SRL, CUI 41865158);
  - adresa, telefonul, site-ul;
  - WhatsApp conectat.
- [ ] **Beneficiar și plătitor** completate la fiecare set de reclame (cerință UE).
- [ ] **Pixel abia după bannerul de consimțământ** și după actualizarea politicilor (secțiunea 6).

---

## 9. Pașii de încărcare
1. **Business Suite → Setări:**
   - conectează WhatsApp Business (0725 819 224) la Pagină;
   - verifică datele firmei.
2. **Ads Manager → Creează → Interacțiune → Aplicații de mesagerie → WhatsApp.** Numele campaniei: `DW_WA_Test_2026-11`.
3. **Primul set de reclame:**
   - creează setul `Local` cu audiența, bugetul și plasările de mai sus;
   - duplică-l pentru `Diaspora` și `Retargeting`, apoi schimbă doar audiența și bugetul.
4. **Reclame:**
   - încarcă `_4x5` ca imagine principală, apoi la „Personalizare resurse” pune `_9x16` pentru Stories/Reels și `_1x1` pentru coloana din dreapta și Search;
   - copiază textul principal, titlul și descrierea din secțiunea 1 și alege butonul „Trimite mesaj”;
   - pune mesajul precompletat în „Șablon de mesaj”;
   - la clipuri, alege ca miniatură PNG-ul de același format. Primul cadru are plăcuțele goale, pentru că orele abia încep să se întoarcă.
5. **Previzualizează fiecare plasare** (butonul „Previzualizare avansată”) și bifează verificările din secțiunea 5.
6. **Campania B:** Trafic, setul `Local`, conceptul 04, linkul spre `/curse-regulate` cu UTM-uri, butonul „Rezervă acum”.
7. **Publică marți sau miercuri dimineață.** Lasă campaniile neatinse 3 zile.

---

## 10. Note
- **Referințe lipsă:** din Meta Ad Library am capturat reclamele FlixBus, Uber, Booking.com, Wizz Air și Bolt (15 capturi, `ads/references/`, nepublicate).
  - Pe BlaBlaCar, Airbnb și Apple nu le-am putut găsi: căutarea publică după cuvinte cheie nu le întoarce, iar căutarea după Pagină cere cont Facebook.
  - Clipurile din bibliotecă nu pornesc fără cont.
  - Ce am preluat de la fiecare brand e în `ads/references/NOTES.md`.
- **Accentul galben:** ciocul galben al rândunicii din logo e parte din marcă și nu se socotește ca al doilea accent.
- **Reexport după o schimbare de text sau de oră:**
  1. din `ads/src`, pornește serverul local cu `python3 -m http.server 3400`;
  2. imaginile: `node render.js stills`;
  3. clipurile: `node render.js video <1|2> <4x5|9x16> <folder>`, apoi `ad_audio.py` și comanda ffmpeg din `ads/src/README`.
