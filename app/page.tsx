import { HeroSection } from "@/components/hero/HeroSection";
import { SectionPlatform } from "@/components/sections/SectionPlatform";
import { SectionSolutions } from "@/components/sections/SectionSolutions";
import { SectionAI } from "@/components/sections/SectionAI";
import { SectionWorkContext } from "@/components/sections/SectionWorkContext";
import { SectionIntegrations } from "@/components/sections/SectionIntegrations";
import { SectionProof } from "@/components/sections/SectionProof";
import { SectionCTA } from "@/components/sections/SectionCTA";
import { Footer } from "@/components/sections/Footer";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/");

export default function Home() {
  return (
    <>
      <PageJsonLd path="/" />
    <main className="min-h-screen bg-white">
      <HeroSection />
      <SectionPlatform />
      <SectionSolutions />
      <SectionWorkContext />
      <SectionAI />
      <SectionIntegrations />
      <SectionProof />
      <SectionCTA />
      <Footer />
    </main>
    </>
  );
}
