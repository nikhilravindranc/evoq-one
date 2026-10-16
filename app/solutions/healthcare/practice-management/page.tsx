import { HealthcarePmPage } from "@/components/healthcare/HealthcarePmPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/solutions/healthcare/practice-management");

export default function HealthcarePracticeManagement() {
  return (
    <>
      <PageJsonLd path="/solutions/healthcare/practice-management" />
      <HealthcarePmPage />
    </>
  );
}
