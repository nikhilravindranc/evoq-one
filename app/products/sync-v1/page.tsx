import { SyncV1 } from "@/components/sync-v1/SyncV1";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/sync-v1");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/sync-v1" />
      <SyncV1 />
    </>
  );
}
