import { LivePage } from "@/components/live/LivePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/desk");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/desk" />
      <LivePage file="products-desk.html" title="EVOQ Desk" />
    </>
  );
}
