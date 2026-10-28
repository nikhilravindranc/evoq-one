import { ExploreShell } from "@/components/explore/ExploreShell";
import { CrmPreview } from "@/components/explore/CrmPreview";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/previews/crm");

export default function Page() {
  return (
    <>
      <PageJsonLd path="/previews/crm" />
      <ExploreShell
        kind="preview"
        crumb="CRM"
        title="CRM application preview"
        intro="Get a closer look at the CRM interface: the pipeline, contact records and analytics screens, and what each one shows."
      >
        <CrmPreview />
      </ExploreShell>
    </>
  );
}
