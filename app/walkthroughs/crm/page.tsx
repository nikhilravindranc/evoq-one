import { ExploreShell } from "@/components/explore/ExploreShell";
import { CrmWalkthrough } from "@/components/explore/CrmWalkthrough";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/walkthroughs/crm");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/walkthroughs/crm" />
      <ExploreShell
        kind="walkthrough"
        crumb="CRM"
        title="CRM walkthrough: how it works"
        intro="Explore how EVOQ CRM works, the capabilities it offers and the tasks it supports, from capturing leads to forecasting revenue."
      >
        <CrmWalkthrough />
      </ExploreShell>
    </>
  );
}
