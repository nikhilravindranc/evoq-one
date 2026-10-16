import { LivePage } from "@/components/live/LivePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/campaigns");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/campaigns" />
      <LivePage file="products-campaigns.html" title="EVOQ Campaigns — Turn customer engagement into business opportunities" />
    </>
  );
}
