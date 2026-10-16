import { LivePage } from "@/components/live/LivePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/configx");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/configx" />
      <LivePage file="products-configx.html" title="EVOQ ConfigX — Make complex products easier to buy" />
    </>
  );
}
