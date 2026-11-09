/**
 * Conținutul paginilor de servicii. Fiecare frază conține un fapt concret
 * (loc, oră, ce include, cum se rezervă). Editează textele direct aici.
 */
import type { ServiceId } from "./services";

export type ServicePageContent = {
  id: ServiceId;
  slug: string;
  /** Titlul paginii (SEO) și descrierea */
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  /** Fapte scurte afișate sub titlu */
  facts: { label: string; value: string }[];
  /** Situații concrete, afișate ca rânduri mari */
  uses: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  /** Fotografia din hero (apare doar dacă fișierul există în /public/images) */
  image: { src: string; alt: string };
  related: ServiceId[];
  /** Tipul de serviciu pentru schema.org */
  serviceType: string;
};

const STEPS_DEFAULT = [
  {
    title: "Trimiți cererea",
    text: "Scrie plecarea, destinația, data, ora și numărul de pasageri în formular, pe WhatsApp sau la telefon.",
  },
  {
    title: "Primești prețul",
    text: "Îți răspundem cu prețul total și ora de plecare, înainte să confirmi ceva.",
  },
  {
    title: "Pleci la ora stabilită",
    text: "Șoferul vine la adresa convenită, iar prețul rămâne cel din ofertă.",
  },
];

export const servicePages: ServicePageContent[] = [
  {
    id: "transfer-privat",
    slug: "transfer-privat",
    metaTitle: "Transfer privat cu microbuz 8+1 din Neamț — Piatra Neamț, Roman, Târgu Neamț",
    metaDescription:
      "Microbuz 8+1 doar pentru grupul tău, de la adresa ta din Neamț până la adresa de destinație: aeroport, gară, Constanța, București. Ofertă de preț înainte de rezervare.",
    eyebrow: "Transfer privat 8+1",
    h1: "Microbuz 8+1, doar pentru voi.",
    intro:
      "Un microbuz cu 8 locuri pentru pasageri, plus șoferul, vă ia de la adresa din Neamț și vă lasă la adresa de destinație, la ora stabilită împreună.",
    facts: [
      { label: "Locuri", value: "8 pasageri + șofer" },
      { label: "Plecare", value: "De la adresa ta" },
      { label: "Ora", value: "Aleasă de tine" },
      { label: "Preț", value: "Total, în ofertă" },
    ],
    uses: [
      {
        title: "Aeroport",
        text: "Spre Otopeni, Iași, Bacău sau Suceava, la ora zborului, fără să depinzi de cursele regulate.",
      },
      {
        title: "Concediu la mare",
        text: "Familia, bagajele și o singură oprire: de la ușa ta din Neamț până la hotelul din Mamaia sau Eforie.",
      },
      {
        title: "Gări și spitale",
        text: "Un drum dus-întors la Iași, Cluj-Napoca sau București, cu șoferul care așteaptă până termini.",
      },
      {
        title: "Grup mic",
        text: "Până la 8 colegi sau prieteni, cu opriri stabilite înainte de plecare.",
      },
    ],
    steps: STEPS_DEFAULT,
    faq: [
      { q: "Câți pasageri încap?", a: "Opt pasageri, plus șoferul." },
      {
        q: "Putem opri pe drum?",
        a: "Da. Spune-ne opririle când ceri oferta și le includem în traseu.",
      },
      {
        q: "Cum aflu prețul?",
        a: "Trimite formularul de mai jos sau sună la 0725 819 224 cu plecarea, destinația, data și numărul de pasageri.",
      },
    ],
    image: { src: "/images/serviciu-transfer-privat.jpg", alt: "Microbuz 8+1 Danca Way la o adresă, cu ușa deschisă" },
    related: ["transfer-aeroport", "inchiriere", "grup"],
    serviceType: "Transfer privat cu microbuz",
  },
  {
    id: "transfer-aeroport",
    slug: "transfer-aeroport-otopeni",
    metaTitle: "Transfer Aeroport Otopeni – Roman, Piatra Neamț, Târgu Neamț | microbuz",
    metaDescription:
      "Microbuz Otopeni – Roman, Piatra Neamț și Târgu Neamț: curse regulate cu oprire la Terminalul Plecări (12:00 și 16:00 spre Moldova) sau transfer privat 8+1 la ora zborului.",
    eyebrow: "Transfer Aeroport Otopeni",
    h1: "Între Neamț și Terminalul Plecări.",
    intro:
      "Ai două variante: cursele regulate, care opresc la Terminalul Plecări din Otopeni de șase ori pe zi, de trei ori în fiecare sens, sau un microbuz privat 8+1 la ora zborului tău.",
    facts: [
      { label: "Oprire", value: "Terminal Plecări, Otopeni" },
      { label: "Spre aeroport", value: "11:15 · 12:00 · 16:00" },
      { label: "Spre Moldova", value: "12:00 · 16:00" },
      { label: "Roman – Otopeni", value: "130 lei" },
    ],
    uses: [
      {
        title: "Zbor dimineața devreme",
        text: "Pentru un zbor înainte de 11:00 nu ai cursă regulată: microbuzul privat pleacă din Neamț la ora potrivită zborului.",
      },
      {
        title: "Zbor la prânz sau după-amiaza",
        text: "Cursele regulate ajung la Terminalul Plecări la 11:15, 12:00 și 16:00, cu bilet cumpărat online.",
      },
      {
        title: "Aterizare noaptea",
        text: "După 16:00 nu mai pleacă nicio cursă regulată spre Moldova, așa că te așteaptă microbuzul privat la Sosiri.",
      },
    ],
    steps: [
      {
        title: "Alegi varianta",
        text: "Verifică orele de mai jos: dacă zborul se potrivește cu o cursă regulată, cumperi biletul online.",
      },
      {
        title: "Sau ceri transfer privat",
        text: "Trimite data, numărul zborului, ora și adresa din Neamț prin formular, pe WhatsApp sau la telefon.",
      },
      {
        title: "Primești confirmarea",
        text: "Îți confirmăm prețul și ora la care pleacă microbuzul de la adresa ta.",
      },
    ],
    faq: [
      {
        q: "Unde opresc cursele la Otopeni?",
        a: "La Terminalul Plecări (Departures) al Aeroportului Henri Coandă, atât spre București, cât și spre Moldova.",
      },
      {
        q: "Cât costă biletul până la Otopeni?",
        a: "Din Roman 130 lei, din Piatra Neamț 140 lei și din Târgu Neamț 150 lei, bilet întreg.",
      },
      {
        q: "Pot cumpăra biletul online?",
        a: "Da, pe danca-transport.autogari.ro, pentru toate cursele care opresc la Otopeni.",
      },
    ],
    image: { src: "/images/serviciu-transfer-aeroport.jpg", alt: "Microbuz Danca Way la Terminalul Plecări, Aeroportul Otopeni" },
    related: ["curse-regulate", "transfer-privat", "inchiriere"],
    serviceType: "Transfer aeroport",
  },
  {
    id: "inchiriere",
    slug: "inchiriere-microbuz-cu-sofer",
    metaTitle: "Închiriere microbuz cu șofer în Neamț — la oră, pe zi sau mai multe zile",
    metaDescription:
      "Închiriere microbuz 8+1 cu șofer în Piatra Neamț, Roman și Târgu Neamț: la oră, pe zi sau pe mai multe zile, cu traseul și opririle stabilite de tine. Ofertă în scris.",
    eyebrow: "Închiriere microbuz cu șofer",
    h1: "Microbuz cu șofer, cât ai nevoie.",
    intro:
      "Închiriezi microbuzul 8+1 împreună cu șoferul la oră, pe zi sau pe mai multe zile, iar traseul și opririle le stabilești tu.",
    facts: [
      { label: "Vehicul", value: "Microbuz 8+1" },
      { label: "Șofer", value: "Inclus" },
      { label: "Durată", value: "Oră · zi · mai multe zile" },
      { label: "Firme", value: "Factură pe firmă" },
    ],
    uses: [
      {
        title: "La oră",
        text: "Pentru drumuri scurte în Piatra Neamț, Roman sau Târgu Neamț: o ceremonie, o întâlnire, o vizită la clinică.",
      },
      {
        title: "Pe zi",
        text: "O zi la Cheile Bicazului, la Ceahlău sau la mănăstirile Agapia și Văratec, cu plecare și întoarcere la orele tale.",
      },
      {
        title: "Mai multe zile",
        text: "Un circuit de 2–5 zile prin Transilvania, Maramureș sau până la Viena, cu șoferul alături pe tot drumul.",
      },
    ],
    steps: STEPS_DEFAULT,
    faq: [
      { q: "Șoferul este inclus?", a: "Da, microbuzul se închiriază doar împreună cu șoferul." },
      {
        q: "Ce trec în cerere?",
        a: "Data, ora de plecare, traseul cu opririle, numărul de pasageri și dacă ai nevoie de microbuz la oră, pe zi sau pe mai multe zile.",
      },
      {
        q: "Sunteți mai mult de 8 persoane?",
        a: "Scrie numărul exact în cerere: îți spunem ce vehicul e disponibil pentru data aleasă.",
      },
    ],
    image: { src: "/images/serviciu-inchiriere-microbuz.jpg", alt: "Șofer Danca Way lângă microbuzul 8+1" },
    related: ["transfer-privat", "grup", "firma"],
    serviceType: "Închiriere microbuz cu șofer",
  },
  {
    id: "grup",
    slug: "grupuri",
    metaTitle: "Transport grupuri din Neamț — școli, pensionari, ski, festivaluri, echipe sportive",
    metaDescription:
      "Transport pentru grupuri organizate din Neamț: excursii școlare, cluburi de pensionari, schiori, festivaluri (Untold, Electric Castle, Neversea) și echipe sportive.",
    eyebrow: "Grupuri",
    h1: "Clasa, clubul, echipa.",
    intro:
      "Transport pentru grupuri organizate din Neamț: școli, cluburi de pensionari, schiori, festivaluri și echipe sportive, cu plecare de la locul stabilit de voi.",
    facts: [
      { label: "Plecare", value: "Școală, club, sală" },
      { label: "Program", value: "Stabilit de grup" },
      { label: "Microbuz", value: "8 pasageri + șofer" },
      { label: "Ofertă", value: "Pentru tot grupul" },
    ],
    uses: [
      {
        title: "Școli",
        text: "Excursii de o zi la Cetatea Neamțului și Humulești, la Cheile Bicazului sau la Palatul Culturii din Iași.",
      },
      {
        title: "Pensionari",
        text: "Pelerinaje la Agapia, Văratec și Voroneț sau o zi la Salina Praid, cu plecare din fața clubului.",
      },
      {
        title: "Ski",
        text: "Drumuri spre Vatra Dornei sau Poiana Brașov, dus-întors în aceeași zi sau cu cazare acolo.",
      },
      {
        title: "Festivaluri",
        text: "Untold și Electric Castle la Cluj, Neversea la Constanța, cu întoarcere după ultima zi de festival.",
      },
      {
        title: "Echipe sportive",
        text: "Deplasări la meciuri și competiții, cu plecarea calculată după ora de început a meciului.",
      },
    ],
    steps: STEPS_DEFAULT,
    faq: [
      {
        q: "Câți participanți puteți transporta?",
        a: "Microbuzul are 8 locuri pentru pasageri; pentru grupuri mai mari, scrie numărul exact în cerere și îți spunem ce variantă avem.",
      },
      {
        q: "Plecați din alt loc decât autogara?",
        a: "Da, plecăm de la școală, de la club sau de la sala de sport, la adresa trecută în cerere.",
      },
    ],
    image: { src: "/images/serviciu-grupuri.jpg", alt: "Grup de elevi urcând în microbuzul Danca Way" },
    related: ["inchiriere", "excursie", "pelerinaj"],
    serviceType: "Transport grupuri organizate",
  },
  {
    id: "eveniment",
    slug: "evenimente",
    metaTitle: "Transport invitați nuntă, botez, banchet în Neamț — microbuz cu șofer",
    metaDescription:
      "Transport pentru invitați la nunți, botezuri și banchete în Piatra Neamț, Roman și Târgu Neamț: de acasă la biserică, la restaurant și înapoi acasă după petrecere.",
    eyebrow: "Evenimente",
    h1: "Nuntă, botez, banchet.",
    intro:
      "Ducem invitații de acasă la biserică, de la biserică la restaurant și înapoi acasă după petrecere, pe programul zilei voastre.",
    facts: [
      { label: "Ture", value: "Pe programul zilei" },
      { label: "Microbuz", value: "8 pasageri + șofer" },
      { label: "Întoarcere", value: "După petrecere" },
      { label: "Preț", value: "Total, în ofertă" },
    ],
    uses: [
      {
        title: "Nunți",
        text: "Cununia civilă, biserica și sala: stabilim turele după ora fiecărui moment din program.",
      },
      {
        title: "Botezuri",
        text: "Nașii și invitații de la biserică la restaurant și înapoi, cu o singură comandă.",
      },
      {
        title: "Banchete",
        text: "Absolvenții pleacă de la liceu la restaurant și ajung acasă după miezul nopții.",
      },
    ],
    steps: [
      {
        title: "Trimiți programul",
        text: "Scrie data, orele și adresele fiecărui moment (casă, biserică, restaurant) și numărul de invitați.",
      },
      {
        title: "Primești turele și prețul",
        text: "Îți propunem turele potrivite programului și prețul total.",
      },
      {
        title: "Ziua evenimentului",
        text: "Microbuzul este la prima adresă la ora stabilită și rămâne până la ultima tură.",
      },
    ],
    faq: [
      {
        q: "Ce facem dacă avem mai mult de 8 invitați?",
        a: "Stabilim mai multe ture sau un vehicul mai mare; scrie numărul de invitați în cerere.",
      },
      {
        q: "Cât de devreme rezervăm?",
        a: "Cât mai devreme după ce ai data evenimentului, mai ales pentru sâmbetele din mai–septembrie.",
      },
    ],
    image: { src: "/images/serviciu-evenimente.jpg", alt: "Invitați la o nuntă coborând din microbuzul Danca Way" },
    related: ["inchiriere", "transfer-privat", "grup"],
    serviceType: "Transport invitați la evenimente",
  },
  {
    id: "firma",
    slug: "firme",
    metaTitle: "Transport angajați și delegații în Neamț — microbuz cu factură pe firmă",
    metaDescription:
      "Transport pentru firme din Neamț: ture zilnice pentru angajați, delegații la clienți și târguri, transfer aeroport și team-building, cu factură pe firmă.",
    eyebrow: "Firme",
    h1: "Transport pentru firme, cu factură.",
    intro:
      "Transportul angajaților la program, delegații la clienți, transfer la aeroport și team-building, facturate pe firma ta.",
    facts: [
      { label: "Factură", value: "Pe firmă, cu CUI" },
      { label: "Program", value: "Pe schimburi sau la cerere" },
      { label: "Microbuz", value: "8 pasageri + șofer" },
      { label: "Aeroport", value: "Otopeni, Iași, Bacău" },
    ],
    uses: [
      {
        title: "Transportul angajaților",
        text: "Ture zilnice între localitățile angajaților și fabrică sau birou, pe orele schimburilor.",
      },
      {
        title: "Delegații",
        text: "Drumuri la clienți, târguri și ședințe în București, Iași sau Cluj-Napoca, cu plecare din Neamț.",
      },
      {
        title: "Transfer aeroport",
        text: "Echipa ajunge la Otopeni, Iași sau Bacău la ora zborului, cu un singur microbuz.",
      },
      {
        title: "Team-building",
        text: "O zi la Cheile Bicazului sau la Ceahlău, ori un weekend la Brașov și Sibiu.",
      },
    ],
    steps: [
      {
        title: "Trimiți nevoia",
        text: "Scrie traseul, orele, numărul de angajați și dacă e o cursă unică sau un program regulat.",
      },
      {
        title: "Primești oferta",
        text: "Îți trimitem oferta cu prețul pe cursă sau pe lună, pentru program regulat.",
      },
      {
        title: "Facturăm pe firmă",
        text: "Emitem factura pe datele firmei tale, cu CUI.",
      },
    ],
    faq: [
      { q: "Emiteți factură pe firmă?", a: "Da, cu datele și CUI-ul firmei tale." },
      {
        q: "Puteți face transport zilnic pentru angajați?",
        a: "Da: scrie localitățile, orele schimburilor și numărul de angajați, iar oferta va fi pentru programul regulat.",
      },
    ],
    image: { src: "/images/serviciu-firme.jpg", alt: "Angajați urcând în microbuzul Danca Way la începutul schimbului" },
    related: ["transfer-aeroport", "inchiriere", "grup"],
    serviceType: "Transport pentru firme",
  },
];

export const servicePage = (slug: string) => servicePages.find((p) => p.slug === slug);
