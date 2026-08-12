import { HeroSection } from "@/components/hero/HeroSection";
import { SectionPlatform } from "@/components/sections/SectionPlatform";
import { SectionAI } from "@/components/sections/SectionAI";
import { SectionTeams } from "@/components/sections/SectionTeams";
import { SectionImpact } from "@/components/sections/SectionImpact";
import { SectionCTA } from "@/components/sections/SectionCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <SectionPlatform />
      <SectionAI />
      <SectionTeams />
      <SectionImpact />
      <SectionCTA />
      <Footer />
    </main>
  );
}
