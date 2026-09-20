"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  UserCheck,
  Compass,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ChevronDown,
  Award,
} from "lucide-react";

interface Differentiator {
  num: string;
  roman: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  metric: string;
  metricLabel: string;
}

// Exactly mapped from PRD Section 6.4: "Why RS Juris & Co."
const differentiators: Differentiator[] = [
  {
    num: "01",
    roman: "I",
    title: "Client-Centric Approach",
    tagline: "Tailored Case Assessment",
    description:
      "Every matter is treated with individualized attention before any strategy is formulated. We align directly with your underlying commercial and personal priorities.",
    icon: UserCheck,
    metric: "1:1",
    metricLabel: "Dedicated Strategy",
  },
  {
    num: "02",
    roman: "II",
    title: "Strategic Legal Advice",
    tagline: "Long-Term Commercial Foresight",
    description:
      "Our counsel extends beyond immediate disputes to account for long-term legal, reputational, and regulatory implications across your personal and commercial ventures.",
    icon: Compass,
    metric: "360°",
    metricLabel: "Risk Assessment",
  },
  {
    num: "03",
    roman: "III",
    title: "Professional Integrity",
    tagline: "Statutory Ethics & Discretion",
    description:
      "Absolute confidentiality, ethical diligence, and statutory transparency serve as our core fiduciary bedrock in all regulatory forums and appellate courts.",
    icon: ShieldCheck,
    metric: "100%",
    metricLabel: "Fiduciary Discretion",
  },
  {
    num: "04",
    roman: "IV",
    title: "Practical Solutions",
    tagline: "Commercially Actionable Guidance",
    description:
      "We demystify complex procedural statutes into clear, actionable roadmaps designed to resolve high-stakes disputes swiftly and pragmatically.",
    icon: CheckCircle2,
    metric: "Direct",
    metricLabel: "Actionable Pathways",
  },
  {
    num: "05",
    roman: "V",
    title: "Responsive Representation",
    tagline: "Proactive Communication",
    description:
      "Prompt, direct partner communication through each trial milestone, hearing, and statutory filing, keeping you constantly apprised of critical developments.",
    icon: Clock,
    metric: "24/7",
    metricLabel: "Active Vigilance",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function WhyUs() {
  // Desktop interactive hover state
  const [hoveredIdx, setHoveredIdx] = useState(0);

  // Mobile segmented accordion state (replaces the carousel swipe)
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(0);

  const activeItem = differentiators[hoveredIdx];
  const ActiveIcon = activeItem.icon;

  return (
    <section
      id="why-us"
      className="relative w-full py-16 sm:py-24 lg:py-32 bg-[#FAF7F0] text-[#0B2545] overflow-hidden selection:bg-[#C9A24D]/25 selection:text-[#0B2545]"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#0B2545_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* Ambient Gold Radial Accents */}
      <div className="absolute top-1/4 -left-36 w-80 h-80 rounded-full bg-[#C9A24D]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[#13315C]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 lg:px-16">
        {/* Header Section */}
        <div className="max-w-3xl space-y-3 sm:space-y-4 pb-10 sm:pb-14 border-b border-[#96702A]/20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-[#96702A]/25 bg-[#0B2545]/[0.04]">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#96702A] shadow-[0_0_6px_#96702A] shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#96702A] font-semibold">
              The  Advantage
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0B2545] font-light tracking-tight leading-[1.14]">
            Why RS Juris & Co. <br className="hidden sm:inline" />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#96702A] via-[#B38A33] to-[#735218]">
              Decisive Advocacy. Measured Strategy.
            </span>
          </h2>

          <p className="text-slate-600 text-[13.5px] sm:text-base font-light leading-relaxed max-w-2xl">
            We bridge statutory rigor with modern commercial insight. Here is why institutions,
            founders, and families place their trust in our firm.
          </p>
        </div>

        {/* 1. MOBILE VIEW: LUXURY STEP ACCORDION (All 5 points visible, no swiping) */}
        <div className="block lg:hidden mt-8 space-y-2.5">
          {differentiators.map((diff, index) => {
            const Icon = diff.icon;
            const isOpen = mobileExpanded === index;

            return (
              <div
                key={diff.num}
                className={`rounded-[3px] transition-all duration-300 border overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#96702A]/50 shadow-[0_6px_20px_rgba(11,37,69,0.07)]"
                    : "bg-white/60 border-[#96702A]/15"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => setMobileExpanded(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-[2px] flex items-center justify-center font-mono text-xs font-semibold shrink-0 transition-colors duration-300 ${
                        isOpen
                          ? "bg-[#0B2545] text-[#D4AF37]"
                          : "bg-[#FAF7F0] text-[#96702A] border border-[#96702A]/25"
                      }`}
                    >
                      {diff.roman}
                    </div>

                    <div className="min-w-0">
                      <div className="font-serif text-base font-medium text-[#0B2545] tracking-tight leading-snug truncate">
                        {diff.title}
                      </div>
                      <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.14em] text-[#96702A] mt-0.5">
                        {diff.tagline}
                      </div>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-[#96702A] shrink-0 ml-2 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Collapsible Content Drawer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 border-t border-[#96702A]/10">
                        <p className="text-slate-600 text-[13px] font-light leading-relaxed mb-4">
                          {diff.description}
                        </p>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-500 font-sans uppercase tracking-wider">
                              {diff.metricLabel}:
                            </span>
                            <span className="font-serif text-xs font-semibold text-[#0B2545]">
                              {diff.metric}
                            </span>
                          </div>

                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-1 text-[11px] font-sans uppercase tracking-wider text-[#0B2545] hover:text-[#96702A] font-semibold"
                          >
                            <span>Consult</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#96702A]" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* 2. DESKTOP VIEW: HOVER STEPPER + INSTANT POPUP STAGE */}
        <div className="hidden lg:grid mt-14 grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive 5-Point Stepper (Hover Triggered) */}
          <div className="col-span-6 space-y-3">
            {differentiators.map((item, idx) => {
              const Icon = item.icon;
              const isHovered = hoveredIdx === idx;

              return (
                <div
                  key={item.num}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className={`group relative p-4 rounded-[2px] cursor-pointer transition-all duration-300 border ${
                    isHovered
                      ? "bg-white border-[#96702A]/50 shadow-[0_8px_30px_rgba(11,37,69,0.08)] translate-x-2"
                      : "bg-white/50 hover:bg-white border-transparent hover:border-[#96702A]/25"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Roman Index Node */}
                      <div
                        className={`w-9 h-9 rounded-[2px] flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                          isHovered
                            ? "bg-[#0B2545] text-[#D4AF37] shadow-[0_0_10px_rgba(11,37,69,0.3)] scale-105"
                            : "bg-[#FAF7F0] text-[#96702A] border border-[#96702A]/25 group-hover:bg-[#0B2545] group-hover:text-[#D4AF37]"
                        }`}
                      >
                        {item.roman}
                      </div>

                      <div>
                        <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#96702A]">
                          {item.tagline}
                        </div>
                        <h3 className="font-serif text-lg font-medium text-[#0B2545] leading-tight mt-0.5">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <Icon
                      className={`w-4 h-4 transition-colors duration-300 ${
                        isHovered ? "text-[#D4AF37]" : "text-slate-400 group-hover:text-[#96702A]"
                      }`}
                    />
                  </div>

                  {/* Active Indicator Bar */}
                  {isHovered && (
                    <motion.div
                      layoutId="activeBar"
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#96702A]"
                      transition={{ duration: 0.25, ease }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Pop-Up Stage for the Hovered Point */}
          <div className="col-span-6 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.num}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.25, ease }}
                className="relative rounded-[3px] bg-gradient-to-br from-[#0B2545] via-[#13315C] to-[#0B2545] text-white p-8 lg:p-9 shadow-[0_20px_50px_rgba(11,37,69,0.22)] border border-[#C9A24D]/40 overflow-hidden"
              >
                {/* Top Gold Shimmer Border */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#C9A24D] via-[#EED192] to-[#96702A]" />

                {/* Ambient Concentric Radiance in Card */}
                <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-[#C9A24D]/10 blur-[60px] pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  {/* Eyebrow & Metric Flag */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#E8D091] font-semibold">
                        Pillar {activeItem.roman} • {activeItem.num}
                      </span>
                    </div>

                    <div className="px-2.5 py-1 rounded-[2px] bg-white/[0.08] border border-white/10 text-right">
                      <span className="font-mono text-xs font-semibold text-[#E8D091] block">
                        {activeItem.metric}
                      </span>
                      <span className="text-[8.5px] uppercase font-sans tracking-wide text-slate-300 block">
                        {activeItem.metricLabel}
                      </span>
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-[2px] bg-[#134074]/50 border border-[#C9A24D]/40 text-[#D4AF37] flex items-center justify-center shrink-0 shadow-inner">
                      <ActiveIcon className="w-6 h-6" strokeWidth={1.75} />
                    </div>
                    <div>
                      <div className="text-[10.5px] uppercase font-sans tracking-[0.16em] text-[#E8D091] font-semibold">
                        {activeItem.tagline}
                      </div>
                      <h3 className="font-serif text-2xl lg:text-3xl font-light text-white leading-tight mt-0.5">
                        {activeItem.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description Box */}
                  <p className="text-slate-200 text-sm font-light leading-relaxed border-t border-white/10 pt-4">
                    {activeItem.description}
                  </p>

                  {/* Fiduciary Confirmation Line & CTA */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10.5px] uppercase tracking-wider text-slate-400 font-sans">
                      RS Juris & Co. Institutional Charter
                    </span>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] bg-gradient-to-r from-[#C9A24D] via-[#DFBF6E] to-[#B38A33] hover:brightness-110 text-[#001730] font-semibold text-xs tracking-[0.14em] uppercase transition-all shadow-[0_4px_16px_rgba(201,162,77,0.2)]"
                    >
                      <span>Engage Counsel</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#001730]" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}