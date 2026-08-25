import { Hero } from "@/components/hero";
import { HireComparison } from "@/components/hire-comparison";
import { JobPicker } from "@/components/job-picker";
import { FinalCTA } from "@/components/final-cta";
import { SupportChannels } from "@/components/support-channels";

export default function Home() {
  return (
    <>
      <Hero />
      <HireComparison />
      <JobPicker />
      <FinalCTA />
      <SupportChannels />
    </>
  );
}
