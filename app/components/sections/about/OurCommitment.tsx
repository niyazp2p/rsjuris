"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Scale,
  FileCheck,
  Phone,
  ArrowUpRight,
  Stamp,
} from "lucide-react";

// Verbatim trust pillars from PRD §6.7
const commitmentPillars = [
  {
    icon: Award,
    title: "Professionalism & Diligence",
    tagline: "Unrelenting Procedural Rigour",
    description:
      "Every brief receives exhaustive forensic analysis, rigorous case law research, and timely, proactive trial filings across all forums.",
  },
  {
    icon: ShieldCheck,
    title: "Uncompromising Confidentiality",
    tagline: "Privilege & Absolute Discretion",
    description:
      "Fiduciary non-disclosure protocols and advocate-client privilege govern every corporate transaction, dispute, and personal briefing.",
  },
  {
    icon: Scale,
    title: "Statutory & Doctrinal Integrity",
    tagline: "Constitutional & Ethical Bedrock",
    description:
      "Unflinching adherence to statutory ethics, Bar Council standards, and transparent counsel that prioritizes our clients' sovereign interests.",
  },
  {
    icon: FileCheck,
    title: "Transparent & Actionable Counsel",
    tagline: "Clarity over Complexity",
    description:
      "Demystifying complex procedural jurisprudence into clear, strategic, and practical legal roadmaps for decisive execution.",
  },
];

const easeCurve = [0.16, 1, 0.3, 1] as const;

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeCurve },
  },
};

export default function OurCommitment() {
  return (
    <section
      id="commitment"
      className="relative w-full py-16 sm:py-24 lg:py-32 bg-[#FAF7F0] text-[#0B2545] overflow-hidden selection:bg-[#C9A24D]/25 selection:text-[#0B2545]"
    >
      {/* Background Micro Lattice Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#0B2545_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* Warm Ambient Accents */}
      <div className="absolute top-1/3 -left-36 w-80 h-80 rounded-full bg-[#C9A24D]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[#13315C]/5 blur-[120px] pointer-events-none" />

      {/* Watermarked Logo Centerpiece on Canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.028] select-none">
        <div className="relative w-[320px] h-[320px] sm:w-[540px] sm:h-[540px]">
          <Image
            src="/logo.jpeg"
            alt="RS Juris & Co. Watermark Seal"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-[#96702A]/25 bg-[#0B2545]/[0.04]">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#96702A] shadow-[0_0_6px_#96702A] shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#96702A] font-semibold">
              Fiduciary Charter
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0B2545] font-light tracking-tight leading-[1.14]">
            Our Institutional{" "}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#96702A] via-[#B38A33] to-[#735218]">
              Commitment.
            </span>
          </h2>
        </div>

        {/* Central Charter Seal & Covenant */}
        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5 pb-10 sm:pb-14 border-b border-[#96702A]/20">
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-1 border-2 border-[#C9A24D] shadow-[0_0_24px_rgba(201,162,77,0.22)] ring-4 ring-[#FAF7F0] overflow-hidden"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                <Image
                  src="/logo.jpeg"
                  alt="RS Juris & Co. Official Seal"
                  fill
                  priority
                  className="object-contain p-1"
                />
              </div>
            </motion.div>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-[#96702A]">
              Chambers Trust Covenant
            </div>
            <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#0B2545] font-light italic">
              &ldquo;Your Rights | Our Priority&rdquo;
            </h3>
          </div>

          <p className="font-serif text-slate-700 text-sm sm:text-base lg:text-lg font-light leading-relaxed italic max-w-2xl mx-auto">
            The firm commits to unwavering professionalism, relentless diligence, strict
            confidentiality, and absolute integrity—communicating complex legal matters in a
            straightforward, actionable manner.
          </p>
        </div>

        {/* 4 Pillars of Commitment Grid (Placed Directly on Light Canvas) */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 pt-10 sm:pt-14"
        >
          {commitmentPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                variants={cardItemVariants}
                whileHover={{ y: -3 }}
                className="p-5 sm:p-6 rounded-[2px] bg-white/40 hover:bg-white/80 border border-[#96702A]/20 hover:border-[#96702A]/45 hover:shadow-[0_8px_24px_rgba(150,112,42,0.06)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-[2px] bg-[#FAF7F0] border border-[#96702A]/30 text-[#96702A] group-hover:bg-[#0B2545] group-hover:text-[#D4AF37] group-hover:border-[#0B2545] transition-colors duration-300 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 font-semibold">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif text-base sm:text-[17px] font-medium text-[#0B2545] leading-snug">
                      {pillar.title}
                    </h4>
                    <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.14em] text-[#96702A] mt-1">
                      {pillar.tagline}
                    </div>
                  </div>

                  <p className="text-[12.5px] text-slate-600 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-[#96702A]/15 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>STANDARD 0{idx + 1}</span>
                  <Stamp className="w-3.5 h-3.5 text-[#96702A]/60" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Interactive Call-to-Action Strip Directly on Canvas */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[#96702A]/20 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left space-y-1">
            <div className="text-xs uppercase font-sans tracking-[0.16em] text-[#0B2545] font-semibold">
              Engage Senior Chambers Counsel
            </div>
            <div className="text-xs text-slate-500 font-light">
              Direct consultation before the Supreme Court, High Courts, and Central Tribunals.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <a
              href="tel:+9198100XXXXX"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[2px] border border-[#96702A]/35 hover:border-[#96702A] bg-transparent hover:bg-white/60 text-[#0B2545] hover:text-[#96702A] font-semibold text-xs uppercase tracking-[0.14em] transition-colors text-center"
            >
              <Phone className="w-3.5 h-3.5 text-[#96702A]" />
              <span>Call Chamber Registry</span>
            </a>

            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[2px] bg-[#0B2545] hover:bg-[#13315C] text-[#E8D091] border border-[#C9A24D]/40 font-semibold text-xs uppercase tracking-[0.16em] transition-all shadow-[0_4px_16px_rgba(11,37,69,0.18)] text-center"
            >
              <span>Initiate Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}