import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog/CatalogPage";
import { tripItems } from "@/data/catalog";
import { trips, tripCategories } from "@/data/trips";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Excursii cu microbuzul din Neamț — o zi, weekend, Crăciun, city break, litoral",
  description:
    "Excursii cu plecare din Neamț: Cheile Bicazului și Lacul Roșu, Maramureș, Delta Dunării, târgurile de Crăciun din Brașov, Sibiu, Budapesta și Viena, city break Budapesta, litoral.",
  path: "/excursii",
});

export default function ExcursiiPage() {
  const groups = tripCategories
    .map((c) => ({
      id: c.id,
      label: c.label,
      items: tripItems.filter((_, idx) => trips[idx].category === c.id),
    }))
    .filter((g) => g.items.length);
  return (
    <CatalogPage
      kind="excursie"
      title="Excursii cu plecare din Neamț"
      intro="De la o zi la Cheile Bicazului până la patru zile la Viena, cu microbuz 8+1 sau autocar, în funcție de mărimea grupului."
      groups={groups}
    />
  );
}
