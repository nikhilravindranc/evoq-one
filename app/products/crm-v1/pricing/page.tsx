import { CrmV1PricingPage } from "@/components/crm-v1/CrmV1PricingPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/crm-v1/pricing");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/crm-v1/pricing" />
      <CrmV1PricingPage />
    </>
  );
}
