import AboutDescription from "../components/sections/about/AboutDescription";
import AboutHero from "../components/sections/about/AboutHero";
import OurApproach from "../components/sections/about/OurApproach";
import OurCommitment from "../components/sections/about/OurCommitment";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <AboutHero/>
      <AboutDescription/>
      <OurApproach/>
      <OurCommitment/>
    </main>
  );
}