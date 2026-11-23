import { ServiceOpsPricing } from "@/components/serviceops/ServiceOpsPricing";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/serviceops/pricing");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/serviceops/pricing" />
      <ServiceOpsPricing />
    </>
  );
}
