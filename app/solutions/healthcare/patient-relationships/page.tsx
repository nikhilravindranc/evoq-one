import { HealthcareCrmPage } from "@/components/healthcare/HealthcareCrmPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/solutions/healthcare/patient-relationships");

export default function HealthcareCrm() {
  return (
    <>
      <PageJsonLd path="/solutions/healthcare/patient-relationships" />
      <HealthcareCrmPage />
    </>
  );
}
