import { HealthcareCrmFeaturesPage } from "@/components/healthcare/HealthcareCrmFeaturesPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/solutions/healthcare/patient-relationships/features");

export default function HealthcareCrmFeatures() {
  return (
    <>
      <PageJsonLd path="/solutions/healthcare/patient-relationships/features" />
      <HealthcareCrmFeaturesPage />
    </>
  );
}
