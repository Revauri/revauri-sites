import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { HowItWorks } from "@/components/how-it-works";
import { Portfolio } from "@/components/portfolio";
import { Pricing } from "@/components/pricing";
import { About } from "@/components/about";
import { FAQ } from "@/components/faq";
import { Booking } from "@/components/booking";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <Portfolio />
        <Pricing />
        <About />
        <FAQ />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
