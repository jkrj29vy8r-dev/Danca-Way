import type { Metadata } from "next";
import { ServicePage } from "@/components/pages/ServicePage";

import { servicePage } from "@/data/service-pages";
import { pageMeta } from "@/lib/seo";

const page = servicePage("transfer-privat")!;

export const metadata: Metadata = pageMeta({ title: page.metaTitle, description: page.metaDescription, path: "/transfer-privat" });

export default function Page() {
  return <ServicePage page={page} />;
}
