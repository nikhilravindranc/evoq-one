import { CrmFeaturesPage } from "@/components/crm/CrmFeaturesPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/crm/features");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/crm/features" />
      <CrmFeaturesPage />
    </>
  );
}
