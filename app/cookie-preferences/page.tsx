import { LegalPage } from "@/components/legal/LegalPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/cookie-preferences");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/cookie-preferences" />
      <LegalPage doc="cookie-preferences" />
    </>
  );
}
