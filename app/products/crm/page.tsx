import { CrmHome } from "@/components/crm/CrmHome";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/crm");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/products/crm" />
      <CrmHome />
    </>
  );
}
