import { LivePage } from "@/components/live/LivePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/inventory/features");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/inventory/features" />
      <LivePage file="products-inventory-features.html" title="EVOQ Inventory features" />
    </>
  );
}
