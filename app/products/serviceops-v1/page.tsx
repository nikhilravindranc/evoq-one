import { ServiceOpsHome } from "@/components/serviceops/ServiceOpsHome";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/serviceops-v1");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/serviceops-v1" />
      <ServiceOpsHome />
    </>
  );
}
