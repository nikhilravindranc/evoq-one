import { BillingShell } from "@/components/billing/BillingShell";
import { BillingFeaturesContent } from "@/components/billing/BillingFeaturesContent";

export const metadata = {
  title: "EVOQ Billing features — Invoicing, payments, tax and automation",
  description: "Explore EVOQ Billing features: invoicing, product catalog, payments, tax compliance, workflow automation and financial insight.",
};

export default function BillingFeaturesPage() {
  return (
    <BillingShell>
      <BillingFeaturesContent />
    </BillingShell>
  );
}
