import { LivePage } from "@/components/live/LivePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/projects/features");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/projects/features" />
      <LivePage file="products-projects-features.html" title="EVOQ Projects features" />
    </>
  );
}
