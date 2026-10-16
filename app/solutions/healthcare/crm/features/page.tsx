import { HealthcareCrmFeaturesPage } from "@/components/healthcare/HealthcareCrmFeaturesPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/solutions/healthcare/crm/features");

export default function HealthcareCrmFeatures() {
  return (
    <>
      <PageJsonLd path="/solutions/healthcare/crm/features" />
      <HealthcareCrmFeaturesPage />
    </>
  );
}
