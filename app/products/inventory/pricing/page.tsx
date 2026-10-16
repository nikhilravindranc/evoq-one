import { LivePage } from "@/components/live/LivePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/inventory/pricing");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/inventory/pricing" />
      <LivePage file="products-inventory-pricing.html" title="EVOQ Inventory pricing" />
    </>
  );
}
