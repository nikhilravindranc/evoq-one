import { ExploreShell } from "@/components/explore/ExploreShell";
import { EnquiryToInvoiceScenario } from "@/components/explore/EnquiryToInvoiceScenario";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/scenarios/enquiry-to-invoice");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/scenarios/enquiry-to-invoice" />
      <ExploreShell
        kind="scenario"
        crumb="Enquiry to invoice"
        title="From enquiry to invoice"
        intro="Follow one example process from a new enquiry to a paid invoice, and see how CRM and Billing share the same record along the way."
        label="Example scenario"
      >
        <EnquiryToInvoiceScenario />
      </ExploreShell>
    </>
  );
}
