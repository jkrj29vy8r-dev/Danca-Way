import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog/CatalogPage";
import { pilgrimageItems } from "@/data/catalog";
import { pilgrimages, pilgrimageCategories } from "@/data/pilgrimages";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Pelerinaje cu microbuzul — Mănăstirile Neamțului, Bucovina, Prislop, Nicula",
  description:
    "Pelerinaj la Mănăstirile Neamțului (Neamț, Sihăstria, Secu, Agapia, Văratec), mănăstirile Bucovinei, Prislop, Sâmbăta de Sus, Nicula și la hramurile din 14 octombrie, 15 august și 24 iunie.",
  path: "/pelerinaje",
});

export default function PelerinajePage() {
  const groups = pilgrimageCategories
    .map((c) => ({
      id: c.id,
      label: c.label,
      items: pilgrimageItems.filter((_, idx) => pilgrimages[idx].category === c.id),
    }))
    .filter((g) => g.items.length);
  return (
    <CatalogPage
      kind="pelerinaj"
      title="Pelerinaje la mănăstiri și la hramuri"
      intro="Mănăstirile Neamțului într-o zi, Bucovina în una sau două, Prislop, Sâmbăta de Sus și Nicula cu o noapte pe drum, plus plecări la datele marilor hramuri."
      groups={groups}
    />
  );
}
