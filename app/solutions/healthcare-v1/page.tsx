import { HealthcareV1Page } from "@/components/healthcare-v1/HealthcareV1Page";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/solutions/healthcare-v1");

export default function HealthcareV1() {
  return (
    <>
      <PageJsonLd path="/solutions/healthcare-v1" />
      <HealthcareV1Page />
    </>
  );
}
