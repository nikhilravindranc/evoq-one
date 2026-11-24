import { CrmV1FeaturesPage } from "@/components/crm-v1/CrmV1FeaturesPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/crm-v1/features");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/crm-v1/features" />
      <CrmV1FeaturesPage />
    </>
  );
}
