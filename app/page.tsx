import CredoraIntro from "@/components/home/CredoraIntro";
import FinalCTA from "@/components/home/FinalCTA";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import ProfilePreview from "@/components/home/ProfilePreview";
import UseCases from "@/components/home/UseCases";
import VerificationSection from "@/components/home/VerificationSection";

const Home = () => {
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.09),transparent_35%)]" />

      <HeroSection />
      <CredoraIntro />
      <HowItWorks />
      <ProfilePreview />
      <UseCases />
      <VerificationSection />
      <FinalCTA />
    </main>
  );
};

export default Home;
