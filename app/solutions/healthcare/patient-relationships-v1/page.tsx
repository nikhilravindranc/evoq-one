import { PatientRelationshipsV1Page } from "@/components/healthcare-v1/PatientRelationshipsV1Page";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/solutions/healthcare/patient-relationships-v1");

export default function PatientRelationshipsV1() {
  return (
    <>
      <PageJsonLd path="/solutions/healthcare/patient-relationships-v1" />
      <PatientRelationshipsV1Page />
    </>
  );
}
