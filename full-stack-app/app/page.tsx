import { Navbar } from '@/components/navbar/Navbar';
import { Hero } from '@/components/hero/Hero';
import { Problem } from '@/components/problem/Problem';
import { SaturationRadar } from '@/components/saturation-radar/SaturationRadar';
import { CompetitorIntelligence } from '@/components/competitor-intelligence/CompetitorIntelligence';
import { GapAnalysis } from '@/components/gap-analysis/GapAnalysis';
import { WebsiteIntelligence } from '@/components/website-intelligence/WebsiteIntelligence';
import { VibeCode } from '@/components/vibe-code/VibeCode';
import { Security } from '@/components/security/Security';
import { HowItWorks } from '@/components/how-it-works/HowItWorks';
import { FinalCta } from '@/components/final-cta/FinalCta';
import { Footer } from '@/components/footer/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <SaturationRadar />
        <CompetitorIntelligence />
        <GapAnalysis />
        <WebsiteIntelligence />
        <VibeCode />
        <Security />
        <HowItWorks />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
