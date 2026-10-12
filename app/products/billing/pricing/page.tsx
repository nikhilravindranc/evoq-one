import { BillingShell } from "@/components/billing/BillingShell";
import { BillingPricingContent } from "@/components/billing/BillingPricingContent";

export const metadata = {
  title: "EVOQ Billing pricing",
  description: "Simple, transparent EVOQ Billing pricing. Compare plans, choose monthly or yearly billing, and pick your currency.",
};

export default function BillingPricingPage() {
  return (
    <BillingShell>
      <BillingPricingContent />
    </BillingShell>
  );
}
