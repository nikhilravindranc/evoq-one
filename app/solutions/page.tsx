import { SolutionsPage } from "@/components/solutions/SolutionsPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/solutions");

export default function Solutions() {
  return (
    <>
      <PageJsonLd path="/solutions" />
      <SolutionsPage />
    </>
  );
}
