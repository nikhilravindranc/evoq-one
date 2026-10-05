import { BillingShell } from "@/components/billing/BillingShell";
import { BillingHomeContent } from "@/components/billing/BillingHomeContent";

export const metadata = {
  title: "EVOQ Billing — Invoicing, payments and revenue in one place",
  description: "EVOQ Billing brings invoicing, payments, tax compliance, and revenue tracking together with the rest of your EVOQ suite.",
};

export default function BillingPage() {
  return (
    <BillingShell>
      <BillingHomeContent />
    </BillingShell>
  );
}
