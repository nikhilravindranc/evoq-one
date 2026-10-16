import { BillingShell } from "@/components/billing/BillingShell";
import { BillingHomeContent } from "@/components/billing/BillingHomeContent";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/billing");

export default function BillingPage() {
  return (
    <>
      <PageJsonLd path="/products/billing" />
    <BillingShell>
      <BillingHomeContent />
    </BillingShell>
    </>
  );
}
