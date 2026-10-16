import { BillingShell } from "@/components/billing/BillingShell";
import { BillingPricingContent } from "@/components/billing/BillingPricingContent";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/billing/pricing");

export default function BillingPricingPage() {
  return (
    <>
      <PageJsonLd path="/products/billing/pricing" />
    <BillingShell>
      <BillingPricingContent />
    </BillingShell>
    </>
  );
}
