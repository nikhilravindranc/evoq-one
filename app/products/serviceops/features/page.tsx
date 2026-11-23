import { ServiceOpsFeatures } from "@/components/serviceops/ServiceOpsFeatures";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/serviceops/features");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/serviceops/features" />
      <ServiceOpsFeatures />
    </>
  );
}
