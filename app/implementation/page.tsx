import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { ImplementationPage } from "@/components/implementation/ImplementationPage";

export const metadata = {
  title: "Implementation Services — EVOQ",
  description:
    "Deploy EVOQ with confidence. Professional implementation services covering configuration, data migration, integrations, training, and go-live.",
};

export default function Implementation() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <div style={{ background: "var(--soft)", position: "relative", zIndex: 10, borderBottom: "1px solid rgba(189,189,255,0.3)" }}>
        <Topbar darkCTA={false} constrained light />
      </div>
      <ImplementationPage />
      <Footer />
    </div>
  );
}
