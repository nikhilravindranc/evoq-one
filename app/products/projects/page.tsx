import { LivePage } from "@/components/live/LivePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/projects");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/projects" />
      <LivePage file="products-projects.html" title="EVOQ Projects" />
    </>
  );
}
