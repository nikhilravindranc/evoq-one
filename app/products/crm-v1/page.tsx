import { CrmV1Home } from "@/components/crm-v1/CrmV1Home";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/crm-v1");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/crm-v1" />
      <CrmV1Home />
    </>
  );
}
