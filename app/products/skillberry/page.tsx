import { LivePage } from "@/components/live/LivePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/skillberry");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/skillberry" />
      <LivePage file="products-skillberry.html" title="EVOQ Skillberry" />
    </>
  );
}
