import { HeroSection } from "@/components/hero/HeroSection";
import { SectionPlatform } from "@/components/sections/SectionPlatform";
import { SectionSolutions } from "@/components/sections/SectionSolutions";
import { SectionAI } from "@/components/sections/SectionAI";
import { SectionContext } from "@/components/sections/SectionContext";
import { SectionImpact } from "@/components/sections/SectionImpact";
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
      <SectionContext />
      <SectionPlatform />
      <SectionSolutions />
      <SectionAI />
      <SectionImpact />
      <SectionCTA />
      <Footer />
    </main>
    </>
  );
}
