import type { Metadata } from "next";
import { ServicePage } from "@/components/pages/ServicePage";
import { OtopeniTimes } from "@/components/pages/OtopeniTimes";
import { servicePage } from "@/data/service-pages";
import { pageMeta } from "@/lib/seo";

const page = servicePage("transfer-aeroport-otopeni")!;

export const metadata: Metadata = pageMeta({ title: page.metaTitle, description: page.metaDescription, path: "/transfer-aeroport-otopeni" });

export default function Page() {
  return <ServicePage page={page} extra={<OtopeniTimes />} />;
}
