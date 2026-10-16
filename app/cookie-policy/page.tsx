import { LegalPage } from "@/components/legal/LegalPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/cookie-policy");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/cookie-policy" />
      <LegalPage doc="cookie-policy" />
    </>
  );
}
