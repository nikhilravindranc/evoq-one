import { HealthcarePePage } from "@/components/healthcare/HealthcarePePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/solutions/healthcare/patient-engagement");

export default function HealthcarePatientEngagement() {
  return (
    <>
      <PageJsonLd path="/solutions/healthcare/patient-engagement" />
      <HealthcarePePage />
    </>
  );
}
