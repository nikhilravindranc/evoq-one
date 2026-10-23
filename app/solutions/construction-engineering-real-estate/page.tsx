import { ConstructionPage } from "@/components/construction/ConstructionPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/solutions/construction-engineering-real-estate");

export default function Construction() {
  return (
    <>
      <PageJsonLd path="/solutions/construction-engineering-real-estate" />
      <ConstructionPage />
    </>
  );
}
