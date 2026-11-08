import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { pilgrimageItems, tripItems } from "@/data/catalog";

/** Toate paginile publice. Adaugă aici orice pagină nouă. */
export const sitePages: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/curse-regulate", priority: 0.9 },
  { path: "/transfer-privat", priority: 0.8 },
  { path: "/transfer-aeroport-otopeni", priority: 0.9 },
  { path: "/inchiriere-microbuz-cu-sofer", priority: 0.8 },
  { path: "/excursii", priority: 0.8 },
  { path: "/pelerinaje", priority: 0.8 },
  { path: "/grupuri", priority: 0.7 },
  { path: "/evenimente", priority: 0.7 },
  { path: "/firme", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/termeni-si-conditii", priority: 0.2 },
  { path: "/politica-de-confidentialitate", priority: 0.2 },
  { path: "/politica-cookie", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = [
    ...sitePages,
    ...[...tripItems, ...pilgrimageItems].map((i) => ({ path: i.href, priority: 0.6 })),
  ];
  return pages.map(({ path, priority }) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/curse-regulate" ? "weekly" : "monthly",
    priority,
  }));
}
