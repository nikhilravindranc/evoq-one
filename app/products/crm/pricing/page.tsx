import { LivePage } from "@/components/live/LivePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/crm/pricing");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/crm/pricing" />
      <LivePage file="products-crm-pricing.html" title="EVOQ CRM pricing — Powerful CRM, simple pricing" />
    </>
  );
}
