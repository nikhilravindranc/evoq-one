import { LivePage } from "@/components/live/LivePage";

export const metadata = {
  title: "EVOQ Projects — EVOQ",
  description: "Plan and run work end to end with EVOQ Projects.",
  alternates: { canonical: "/products/projects" },
};

export default function Page() {
  return <LivePage file="products-projects.html" title="EVOQ Projects" />;
}
