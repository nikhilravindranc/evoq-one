import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { IntegrationsPage } from "@/components/integrations/IntegrationsPage";

export const metadata = {
  title: "Integrations — EVOQ",
  description:
    "Connect your EVOQ apps with the business systems, platforms, and services your teams already rely on.",
};

export default function Integrations() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <div style={{ background: "var(--soft)", position: "relative", zIndex: 10, borderBottom: "1px solid rgba(189,189,255,0.3)" }}>
        <Topbar darkCTA={false} constrained light />
      </div>
      <IntegrationsPage />
      <Footer />
    </div>
  );
}
