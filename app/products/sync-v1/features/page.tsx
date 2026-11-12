import { SyncV1Features } from "@/components/sync-v1/SyncV1Features";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/sync-v1/features");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/sync-v1/features" />
      <SyncV1Features />
    </>
  );
}
