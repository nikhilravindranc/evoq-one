import { LivePage } from "@/components/live/LivePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/sync/features");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/sync/features" />
      <LivePage file="products-sync-features.html" title="EVOQ Sync features" />
    </>
  );
}
