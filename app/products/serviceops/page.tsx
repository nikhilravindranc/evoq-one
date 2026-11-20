import { ServiceOpsV2 } from "@/components/serviceops-v2/ServiceOpsV2";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/serviceops");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/serviceops" />
      <ServiceOpsV2 />
    </>
  );
}
