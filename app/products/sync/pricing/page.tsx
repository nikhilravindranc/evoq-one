import { LivePage } from "@/components/live/LivePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/sync/pricing");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/sync/pricing" />
      <LivePage file="products-sync-pricing.html" title="EVOQ Sync pricing" />
    </>
  );
}
