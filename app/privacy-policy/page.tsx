import { LegalPage } from "@/components/legal/LegalPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/privacy-policy");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/privacy-policy" />
      <LegalPage doc="privacy-policy" />
    </>
  );
}
