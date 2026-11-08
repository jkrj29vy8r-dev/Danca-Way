import type { Metadata } from "next";
import { site } from "@/config/site";
import { cities, routes, stopName, type Route } from "@/data/routes";

type PageMetaInput = { title: string; description: string; path: string };

/** Metadate unice pe pagină: titlu, descriere, canonical, Open Graph. */
export function pageMeta({ title, description, path }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website", locale: site.locale, siteName: site.name },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function localBusinessJsonLd() {
  const { contact } = site;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#firma`,
    name: site.name,
    legalName: site.legalName,
    taxID: site.cui,
    url: site.url,
    logo: `${site.url}/brand/danca-way-logo.svg`,
    image: `${site.url}/opengraph-image`,
    description:
      "Transport de persoane din județul Neamț: curse regulate spre București, Aeroport Otopeni și Constanța, transfer privat 8+1, închiriere microbuz cu șofer, excursii și pelerinaje.",
    telephone: contact.phoneE164,
    email: contact.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street || undefined,
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode || undefined,
      addressCountry: contact.address.country,
    },
    areaServed: site.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "22:00",
    },
  };
}

function busTrip(r: Route) {
  const first = r.stops[0];
  const last = r.stops[r.stops.length - 1];
  return {
    "@type": "BusTrip",
    name: `${r.code}: ${stopName(first)} – ${stopName(last)}`,
    busNumber: r.code,
    busName: `${r.vehicle} ${site.name}`,
    provider: { "@id": `${site.url}/#firma` },
    departureBusStop: { "@type": "BusStop", name: stopName(first), address: cities[first.city].name },
    arrivalBusStop: { "@type": "BusStop", name: stopName(last), address: cities[last.city].name },
    ...(first.time ? { departureTime: first.time } : {}),
    ...(last.time ? { arrivalTime: last.time } : {}),
    itinerary: {
      "@type": "ItemList",
      itemListElement: r.stops.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "BusStop", name: stopName(s) },
      })),
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "RON",
      lowPrice: r.price.min,
      highPrice: r.price.max,
      url: site.ticketsUrl,
    },
  };
}

/** Cursele regulate ca BusTrip (tipul schema.org pentru o cursă de autobuz). */
export function busTripsJsonLd() {
  return { "@context": "https://schema.org", "@graph": routes.map(busTrip) };
}
