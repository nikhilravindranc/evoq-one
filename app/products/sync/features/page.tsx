import { SyncV1Features } from "@/components/sync-v1/SyncV1Features";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/sync/features");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/sync/features" />
      <SyncV1Features />
    </>
  );
}
