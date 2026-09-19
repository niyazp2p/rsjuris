import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { practiceAreasData } from "../../data/practiceAreasData";
import VerticalHero from "../../components/sections/verticals/VerticalsHero";
import SinglePracticeScope from "../../components/sections/verticals/SinglePracticeScope";
import VerticalInquiryDesk from "../../components/sections/verticals/VerticalInquiryDesk";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Pre-builds all 9 routes at compile-time for instant static page loading
export async function generateStaticParams() {
  return Object.keys(practiceAreasData).map((slug) => ({
    slug,
  }));
}

// Generates SEO meta tags dynamically for each practice area (PRD §8)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = practiceAreasData[slug];

  if (!data) return {};

  return {
    title: `${data.title} | RS Juris & Co.`,
    description: data.focus,
  };
}

export default async function PracticeAreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = practiceAreasData[slug];

  if (!data) {
    notFound();
  }

  // Calculate Cyclic Previous and Next Verticals for the bottom traversal bar
  const slugs = Object.keys(practiceAreasData);
  const currentIndex = slugs.indexOf(slug);
  const prevSlug = slugs[(currentIndex - 1 + slugs.length) % slugs.length];
  const nextSlug = slugs[(currentIndex + 1) % slugs.length];
  const prevArea = practiceAreasData[prevSlug];
  const nextArea = practiceAreasData[nextSlug];

  return (
    <main className="min-h-screen bg-brand-cream selection:bg-[#C9A24D]/25 selection:text-[#0B2545]">
      {/* 1. Practice Vertical Hero with Responsive Dual Banners */}
      <VerticalHero
        num={data.num}
        roman={data.roman}
        title={data.title}
        tagline={data.tagline}
        focus={data.focus}
        forums={data.forums}
      />

      {/* 2. Detailed Scope Bento on Light Canvas */}
      <SinglePracticeScope
        practiceTitle={data.title}
        practiceNumber={data.num}
        services={data.services}
        strategicApproachNote={data.strategicApproachNote}
      />

      {/* 3. Pre-Selected Consultation Inquiry Desk */}
      <VerticalInquiryDesk practiceTitle={data.title} />

      {/* 4. Cyclic Practice Traversal Navigator */}
      <div className="border-t border-[#96702A]/20 bg-brand-cream py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          <Link
            href={`/practice-areas/${prevSlug}`}
            className="inline-flex items-center gap-2 text-xs font-serif text-[#0B2545] hover:text-[#96702A] transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-[#96702A]" />
            <span>Previous</span>
          </Link>

          <Link
            href={`/practice-areas/${nextSlug}`}
            className="inline-flex items-center gap-2 text-xs font-serif text-[#0B2545] hover:text-[#96702A] transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4 text-[#96702A]" />
          </Link>
        </div>
      </div>
    </main>
  );
}