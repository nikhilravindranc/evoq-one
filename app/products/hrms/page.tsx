import { LivePage } from "@/components/live/LivePage";

export const metadata = {
  title: "EVOQ HRMS — EVOQ",
  description: "Core HR and workforce data in EVOQ HRMS.",
  alternates: { canonical: "/products/hrms" },
};

export default function Page() {
  return <LivePage file="products-hrms.html" title="EVOQ HRMS" />;
}
