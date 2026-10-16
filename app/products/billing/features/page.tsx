import { BillingShell } from "@/components/billing/BillingShell";
import { BillingFeaturesContent } from "@/components/billing/BillingFeaturesContent";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/billing/features");

export default function BillingFeaturesPage() {
  return (
    <>
      <PageJsonLd path="/products/billing/features" />
    <BillingShell>
      <BillingFeaturesContent />
    </BillingShell>
    </>
  );
}
