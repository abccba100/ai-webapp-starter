import {
  Navbar,
  Hero,
  Features,
  HowItWorks,
  CTA,
  SocialProof,
  Footer,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
        <SocialProof />
      </main>
      <Footer />
    </div>
  );
}
