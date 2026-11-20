import { ServiceOpsV2Features } from "@/components/serviceops-v2/ServiceOpsV2Features";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/serviceops/features");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/serviceops/features" />
      <ServiceOpsV2Features />
    </>
  );
}
