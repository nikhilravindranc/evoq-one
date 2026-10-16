import { LivePage } from "@/components/live/LivePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/hrms/features");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/hrms/features" />
      <LivePage file="products-hrms-features.html" title="EVOQ HRMS features" />
    </>
  );
}
