import { LivePage } from "@/components/live/LivePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/sync");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/sync" />
      <LivePage file="products-sync.html" title="EVOQ Sync" />
    </>
  );
}
