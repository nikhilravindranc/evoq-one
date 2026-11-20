import { SyncV1Pricing } from "@/components/sync-v1/SyncV1Pricing";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/sync/pricing");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/sync/pricing" />
      <SyncV1Pricing />
    </>
  );
}
