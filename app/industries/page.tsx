import { IndustriesPage } from "@/components/industries/IndustriesPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/industries");

export default function Industries() {
  return (
    <>
      <PageJsonLd path="/industries" />
      <IndustriesPage />
    </>
  );
}
