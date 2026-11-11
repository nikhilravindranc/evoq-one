import { ServiceOpsV2Features } from "@/components/serviceops-v2/ServiceOpsV2Features";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/serviceops-v2/features");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/serviceops-v2/features" />
      <ServiceOpsV2Features />
    </>
  );
}
