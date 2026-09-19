// app/practice-areas/page.tsx
import VerticalHero from "../components/sections/verticals/VerticalsHero";
import VerticalScopeGrid from "../components/sections/verticals/VerticalScopeGrid";

export default function PracticeAreasPage() {
  return (
    <main>
      <VerticalHero
        num="01"
        roman="I"
        title="Practice Areas & Specializations"
        tagline="Appellate & Commercial Jurisprudence"
        focus="Comprehensive legal support across nine dedicated practice disciplines for individuals and corporate entities."
        forums={[
          "Supreme Court of India",
          "High Courts",
          "Commercial Benches",
          "Arbitration Tribunals",
        ]}
      />

      {/* Render the 9-card grid directly */}
      <VerticalScopeGrid />
    </main>
  );
}