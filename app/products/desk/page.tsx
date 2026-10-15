import { LivePage } from "@/components/live/LivePage";

export const metadata = {
  title: "EVOQ Desk — EVOQ",
  description: "Support tickets and helpdesk in EVOQ Desk.",
  alternates: { canonical: "/products/desk" },
};

export default function Page() {
  return <LivePage file="products-desk.html" title="EVOQ Desk" />;
}
