import { PatientRelationshipsFeaturesV1Page } from "@/components/healthcare-v1/PatientRelationshipsFeaturesV1Page";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/solutions/healthcare/patient-relationships/features-v1");

export default function PatientRelationshipsFeaturesV1() {
  return (
    <>
      <PageJsonLd path="/solutions/healthcare/patient-relationships/features-v1" />
      <PatientRelationshipsFeaturesV1Page />
    </>
  );
}
