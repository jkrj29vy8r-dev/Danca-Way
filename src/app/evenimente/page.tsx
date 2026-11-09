import type { Metadata } from "next";
import { ServicePage } from "@/components/pages/ServicePage";

import { servicePage } from "@/data/service-pages";
import { pageMeta } from "@/lib/seo";

const page = servicePage("evenimente")!;

export const metadata: Metadata = pageMeta({ title: page.metaTitle, description: page.metaDescription, path: "/evenimente" });

export default function Page() {
  return <ServicePage page={page} />;
}
