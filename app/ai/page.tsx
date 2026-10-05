import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { EvoqAIPage } from "@/components/evoq-ai/EvoqAIPage";

export const metadata = {
  title: "EVOQ AI — AI That Gets Work Done",
  description:
    "EVOQ AI brings AI into the applications, systems, and processes where your work happens. Ask EVI for help, assign work to AI agents, or let AI work automatically.",
};

export default function AI() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#fff" }}>
      {/* nav floats over the hero gradient */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 50 }}>
        <Topbar darkCTA={false} />
      </div>
      <EvoqAIPage />
      <Footer />
    </div>
  );
}
