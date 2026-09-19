"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Building2,
  Gavel,
  ShieldAlert,
  Home,
  Users,
  Briefcase,
  Landmark,
  Scale,
  Handshake,
  ArrowUpRight,
} from "lucide-react";

export interface ServiceItem {
  title: string;
  description: string;
}

export interface PracticeVerticalCard {
  num: string;
  roman: string;
  slug: string;
  title: string;
  tagline: string;
  focus: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Exactly 9 practice areas mapped verbatim from PRD Section 5 & 6.3
export const allPracticeVerticals: PracticeVerticalCard[] = [
  {
    num: "01",
    roman: "I",
    slug: "corporate-commercial",
    title: "Corporate & Commercial Law",
    tagline: "Institutional Governance & Structuring",
    focus:
      "Comprehensive legal support for businesses, companies, entrepreneurs, and commercial organizations.",
    icon: Building2,
  },
  {
    num: "02",
    roman: "II",
    slug: "civil-litigation",
    title: "Civil Litigation & Dispute Resolution",
    tagline: "Trial Advocacy & Appellate Benches",
    focus:
      "We provide representation and legal assistance in civil disputes before appropriate courts and forums.",
      icon: Building2,
  },
  {
    num: "03",
    roman: "III",
    slug: "criminal-law",
    title: "Criminal Law",
    tagline: "Liberty Defense & Trial Advocacy",
    focus:
      "Legal representation and assistance in criminal proceedings at various stages.",
    icon: ShieldAlert,
  },
  {
    num: "04",
    roman: "IV",
    slug: "property-real-estate",
    title: "Property & Real Estate Law",
    tagline: "Title Forensics, Conveyancing & RERA",
    focus:
      "Assistance navigating the legal aspects of property transactions and disputes.",
    icon: Home,
  },
  {
    num: "05",
    roman: "V",
    slug: "family-matrimonial",
    title: "Family & Matrimonial Law",
    tagline: "Succession, Custody & Family Settlements",
    focus:
      "Sensitive and confidential legal assistance in family and matrimonial matters.",
    icon: Users,
  },
  {
    num: "06",
    roman: "VI",
    slug: "employment-labour",
    title: "Employment & Labour Law",
    tagline: "Workforce Governance & Labour Compliance",
    focus:
      "Advice to employers, employees, and organizations on employment-related legal matters.",
    icon: Briefcase,
  },
  {
    num: "07",
    roman: "VII",
    slug: "banking-financial",
    title: "Banking & Financial Disputes",
    tagline: "Insolvency (IBC), DRT & Recovery Claims",
    focus:
      "Assistance to individuals, businesses, and financial institutions in banking and financial disputes.",
    icon: Landmark,
  },
  {
    num: "08",
    roman: "VIII",
    slug: "intellectual-property",
    title: "Intellectual Property Rights",
    tagline: "Brand Defense, Trademarks & Patents",
    focus:
      "Assistance protecting and enforcing intellectual property rights.",
    icon: Scale,
  },
  {
    num: "09",
    roman: "IX",
    slug: "arbitration-adr",
    title: "Arbitration & ADR",
    tagline: "Domestic & Cross-Border Tribunals",
    focus:
      "Advisory and representation in alternative dispute-resolution mechanisms.",
    icon: Handshake,
  },
];

export interface VerticalScopeGridProps {
  practiceTitle?: string;
  practiceNumber?: string;
  items?: PracticeVerticalCard[];
  services?: ServiceItem[];
  strategicApproachNote?: string;
}
const easeCurve = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeCurve },
  },
};

export default function VerticalScopeGrid({
  practiceTitle = "Core Practice Verticals",
  practiceNumber = "09",
  items = allPracticeVerticals,
}: VerticalScopeGridProps) {
  // Ensure the grid renders exactly 9 cards
  const displayItems = items.slice(0, 9);

  return (
    <section
      id="scope-grid"
      className="relative w-full py-16 sm:py-24 lg:py-28 bg-[#FAF7F0] text-[#0B2545] overflow-hidden selection:bg-[#C9A24D]/25 selection:text-[#0B2545]"
    >
      {/* Background Architectural Lattice Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#0B2545_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* Subtle Warm Brass Ambient Light */}
      <div className="absolute top-1/4 -left-36 w-80 h-80 rounded-full bg-[#C9A24D]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[#13315C]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left max-w-3xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-[#96702A]/25 bg-[#0B2545]/[0.04] mb-3.5">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#96702A] shadow-[0_0_6px_#96702A] shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#96702A] font-semibold">
              9 Core Practice Verticals
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#0B2545] tracking-tight leading-[1.14]">
            Chamber Competencies & <br className="hidden sm:inline" />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#96702A] via-[#B38A33] to-[#735218]">
              Practice Specializations.
            </span>
          </h2>

          <p className="mt-3 text-[13.5px] sm:text-base text-slate-600 font-light leading-relaxed max-w-2xl">
            Select a specialized practice vertical to review procedural coverage, statutory dispute
            roadmaps, and dedicated trial representation across Indian judicial forums.
          </p>
        </div>

        {/* 9-Card Responsive Grid on Light Canvas (#FAF7F0) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {displayItems.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.slug}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="h-full"
              >
                <Link
                  href={`/practice-areas/${item.slug}`}
                  className="group relative p-5 sm:p-6 rounded-[2px] border border-[#96702A]/20 bg-white/50 hover:bg-white/95 hover:border-[#96702A]/50 hover:shadow-[0_8px_24px_rgba(150,112,42,0.08)] transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
                >
                  <div className="space-y-3.5">
                    {/* Card Top: Icon & Numeric Code */}
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-[2px] bg-[#FAF7F0] border border-[#96702A]/25 text-[#96702A] group-hover:bg-[#0B2545] group-hover:text-[#D4AF37] group-hover:border-[#0B2545] transition-colors duration-300 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex items-center gap-1.5 font-mono text-xs">
                        <span className="text-slate-400 font-semibold">{item.num}</span>
                        <span className="text-slate-300">/</span>
                        <span className="text-[#96702A] font-medium">{item.roman}</span>
                      </div>
                    </div>

                    {/* Title, Tagline & PRD Verbatim Focus */}
                    <div>
                      <h3 className="font-serif text-lg font-medium text-[#0B2545] leading-snug group-hover:text-[#96702A] transition-colors duration-200">
                        {item.title}
                      </h3>

                      <div className="text-[10px] uppercase font-sans tracking-[0.14em] text-[#96702A] font-semibold mt-1">
                        {item.tagline}
                      </div>

                      <p className="mt-2 text-[12.5px] sm:text-[13px] text-slate-600 font-light leading-relaxed">
                        {item.focus}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Direct Slug Link Trigger */}
                  <div className="mt-5 pt-3 border-t border-[#96702A]/15 flex items-center justify-between text-xs text-[#0B2545] font-sans font-semibold group-hover:text-[#96702A] transition-colors">
                    <span className="text-[11px] uppercase tracking-wider">
                      Explore Practice
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#96702A] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}