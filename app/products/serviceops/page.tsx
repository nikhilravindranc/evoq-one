import { LivePage } from "@/components/live/LivePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/serviceops");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/serviceops" />
      <LivePage file="products-serviceops.html" title="EVOQ ServiceOps" />
    </>
  );
}
