import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TripDetail } from "@/components/catalog/TripDetail";
import { pilgrimageItems } from "@/data/catalog";
import { pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return pilgrimageItems.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = pilgrimageItems.find((i) => i.slug === slug);
  if (!item) return {};
  return pageMeta({
    title: `${item.title} — Pelerinaj ${item.duration}`,
    description: `${item.description} Transport cu microbuz din Neamț: ${item.places.join(", ")}.`.slice(0, 300),
    path: item.href,
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const item = pilgrimageItems.find((i) => i.slug === slug);
  if (!item) notFound();
  const related = pilgrimageItems.filter((i) => i.slug !== item.slug);
  return <TripDetail item={item} related={related} />;
}
