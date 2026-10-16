import { ManufacturingPage } from "@/components/manufacturing/ManufacturingPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/solutions/manufacturing");

export default function Manufacturing() {
  return (
    <>
      <PageJsonLd path="/solutions/manufacturing" />
      <ManufacturingPage />
    </>
  );
}
