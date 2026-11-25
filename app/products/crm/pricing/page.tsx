import { CrmPricingPage } from "@/components/crm/CrmPricingPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/crm/pricing");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/crm/pricing" />
      <CrmPricingPage />
    </>
  );
}
