import { ServiceOpsFeatures } from "@/components/serviceops/ServiceOpsFeatures";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/serviceops-v1/features");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/serviceops-v1/features" />
      <ServiceOpsFeatures />
    </>
  );
}
