import { LivePage } from "@/components/live/LivePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/crm");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/crm" />
      <LivePage file="products-crm.html" title="EVOQ CRM — Sell smarter, close faster, grow better" />
    </>
  );
}
