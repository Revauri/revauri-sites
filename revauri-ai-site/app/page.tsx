import { Hero } from "@/components/hero";
import { StatsBar } from "@/components/stats-bar";
import { HireComparison } from "@/components/hire-comparison";
import { JobPicker } from "@/components/job-picker";
import { FinalCTA } from "@/components/final-cta";
import { SupportChannels } from "@/components/support-channels";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <HireComparison />
      <JobPicker />
      <FinalCTA />
      <SupportChannels />
    </>
  );
}
