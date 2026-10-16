import { LivePage } from "@/components/live/LivePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/crm/features");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/crm/features" />
      <LivePage file="products-crm-features.html" title="EVOQ CRM features — Sell smarter, faster and better" />
    </>
  );
}
