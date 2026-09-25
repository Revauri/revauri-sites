import { Hero } from "@/components/hero";
import { StatsBar } from "@/components/stats-bar";
import { HowItWorks } from "@/components/how-it-works";
import { Portfolio } from "@/components/portfolio";
import { ClientReviews } from "@/components/client-reviews";
import { FinalCTA } from "@/components/final-cta";
import { SupportChannels } from "@/components/support-channels";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <HowItWorks />
      <Portfolio />
      <ClientReviews />
      <FinalCTA />
      <SupportChannels />
    </>
  );
}
