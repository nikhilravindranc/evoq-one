import { FinancePage } from "@/components/finance/FinancePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/solutions/finance");

export default function Finance() {
  return (
    <>
      <PageJsonLd path="/solutions/finance" />
      <FinancePage />
    </>
  );
}
