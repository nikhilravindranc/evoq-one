import { ServiceOpsV2Pricing } from "@/components/serviceops-v2/ServiceOpsV2Pricing";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/serviceops-v2/pricing");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/serviceops-v2/pricing" />
      <ServiceOpsV2Pricing />
    </>
  );
}
