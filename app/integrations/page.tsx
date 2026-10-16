import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { IntegrationsPage } from "@/components/integrations/IntegrationsPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/integrations");

export default function Integrations() {
  return (
    <>
      <PageJsonLd path="/integrations" />
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <div style={{ background: "var(--soft)", position: "relative", zIndex: 10, borderBottom: "1px solid rgba(189,189,255,0.3)" }}>
        <Topbar darkCTA={false} constrained light />
      </div>
      <IntegrationsPage />
      <Footer />
    </div>
    </>
  );
}
