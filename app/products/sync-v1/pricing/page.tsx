import { SyncV1Pricing } from "@/components/sync-v1/SyncV1Pricing";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/sync-v1/pricing");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/sync-v1/pricing" />
      <SyncV1Pricing />
    </>
  );
}
