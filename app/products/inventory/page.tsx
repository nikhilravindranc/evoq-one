import { LivePage } from "@/components/live/LivePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/inventory");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/inventory" />
      <LivePage file="products-inventory.html" title="EVOQ Inventory" />
    </>
  );
}
