import { Hero } from "@/components/hero";
import { AiHqDemo } from "@/components/ai-hq-demo/ai-hq-demo";
import { StatsBar } from "@/components/stats-bar";
import { WhatItDoes } from "@/components/what-it-does/what-it-does";
import { HowWeWork } from "@/components/how-we-work";
import { ToolsDemo } from "@/components/tools-demo/tools-demo";
import { TradesWordSearch } from "@/components/trades-word-search/trades-word-search";
import { FinalCTA } from "@/components/final-cta";
import { SupportChannels } from "@/components/support-channels";

export default function Home() {
  return (
    <>
      <Hero />
      <AiHqDemo />
      <StatsBar />
      <WhatItDoes />
      <HowWeWork />
      <ToolsDemo />
      <TradesWordSearch />
      <FinalCTA />
      <SupportChannels />
    </>
  );
}
