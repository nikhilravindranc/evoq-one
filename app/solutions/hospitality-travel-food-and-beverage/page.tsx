import { HospitalityPage } from "@/components/hospitality/HospitalityPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/solutions/hospitality-travel-food-and-beverage");

export default function Hospitality() {
  return (
    <>
      <PageJsonLd path="/solutions/hospitality-travel-food-and-beverage" />
      <HospitalityPage />
    </>
  );
}
