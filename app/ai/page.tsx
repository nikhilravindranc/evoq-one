import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { AIPage } from "@/components/ai/AIPage";

export const metadata = {
  title: "EVOQ AI — AI That Runs Your Processes",
  description:
    "EVI is the assistant, AI agents are the specialists. See how EVOQ fuses AI into your sales, service, operations, finance, and people systems.",
};

export default function AI() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <div style={{ background: "#fff", position: "relative", zIndex: 10, borderBottom: "1px solid rgba(230,234,240,0.8)" }}>
        <Topbar darkCTA={false} constrained light />
      </div>
      <AIPage />
      <Footer />
    </div>
  );
}
