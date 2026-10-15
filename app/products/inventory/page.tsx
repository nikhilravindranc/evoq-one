import { LivePage } from "@/components/live/LivePage";

export const metadata = {
  title: "EVOQ Inventory — EVOQ",
  description: "Stock and supply tracking in EVOQ Inventory.",
  alternates: { canonical: "/products/inventory" },
};

export default function Page() {
  return <LivePage file="products-inventory.html" title="EVOQ Inventory" />;
}
