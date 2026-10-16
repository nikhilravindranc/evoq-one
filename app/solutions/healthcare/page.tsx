import { HealthcarePage } from "@/components/healthcare/HealthcarePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/solutions/healthcare");

export default function Healthcare() {
  return (
    <>
      <PageJsonLd path="/solutions/healthcare" />
      <HealthcarePage />
    </>
  );
}
