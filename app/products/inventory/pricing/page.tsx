import { LivePage } from "@/components/live/LivePage";

export const metadata = {
  title: "EVOQ Inventory pricing — EVOQ",
  description: "Pricing for EVOQ Inventory.",
  alternates: { canonical: "/products/inventory/pricing" },
};

export default function Page() {
  return <LivePage file="products-inventory-pricing.html" title="EVOQ Inventory pricing" />;
}
