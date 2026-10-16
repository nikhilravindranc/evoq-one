import { LivePage } from "@/components/live/LivePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/hrms");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/hrms" />
      <LivePage file="products-hrms.html" title="EVOQ HRMS" />
    </>
  );
}
