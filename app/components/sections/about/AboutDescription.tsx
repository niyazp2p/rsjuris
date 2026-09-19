"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  Scale,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

const easeCurve = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeCurve },
  },
};

const doctrinalPillars = [
  {
    id: "01",
    icon: Scale,
    title: "Doctrinal Rigour",
    subtitle: "Constitutional & Statutory Forensic Depth",
    desc: "Every advisory and courtroom submission is anchored in exhaustive precedent benchmarking, statutory deconstruction, and defensible constitutional interpretation across appellate benches.",
    badge: "Appellate & Trial Depth",
  },
  {
    id: "02",
    icon: TrendingUp,
    title: "Risk-Aware Commercial Foresight",
    subtitle: "Pre-Dispute Mitigation & Advisory",
    desc: "We formulate commercial-grade strategy before disputes escalate—anticipating transactional exposure, shareholder friction, and regulatory scrutiny across enforcement bodies.",
    badge: "Commercial Governance",
  },
  {
    id: "03",
    icon: ShieldCheck,
    title: "Fiduciary Discretion",
    subtitle: "100% Privilege & Client Sanctity",
    desc: "Upholding uncompromising statutory privilege and ethical confidentiality per the Advocates Act and BCI codes, shielding high-profile clients, founders, and statutory boards.",
    badge: "Statutory Privilege",
  },
];

export default function AboutDescription() {
  return (
    <section
      id="firm-philosophy"
      className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#FAF7F0] text-[#001C41] overflow-hidden selection:bg-[#96702A]/20 selection:text-[#001C41]"
    >
      {/* Background Architectural Watermark & Ambient Accents */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Subtle Gold Ambient Radial Bloom */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#E5BD79]/20 blur-[120px]" />
        <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[#96702A]/10 blur-[100px]" />

        {/* Fine Architectural Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#001C41 1px, transparent 1px), linear-gradient(to right, #001C41 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Top Header Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easeCurve }}
          className="flex items-center gap-2 mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] border border-[#96702A]/30 bg-white/80 backdrop-blur-sm shadow-sm">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#96702A] shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.24em] text-[#96702A] font-semibold">
              Institutional Narrative • Ethos
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#96702A]/30 via-[#96702A]/10 to-transparent" />
        </motion.div>

        {/* Asymmetric Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* =========================================================================
              LEFT COLUMN (Institutional Narrative) - lg:col-span-5
             ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: easeCurve }}
            className="lg:col-span-5 flex flex-col justify-start"
          >
            {/* Section Taxonomy */}
            <span className="text-xs font-mono tracking-[0.22em] text-[#96702A] uppercase font-semibold">
              01 Institutional Philosophy
            </span>

            {/* Serif Heading */}
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-[2.65rem] text-[#001C41] font-light leading-[1.18] tracking-tight">
              Beyond Legal Interpretation. <br />
              <span className="font-normal italic text-[#96702A]">
                Commercial-Grade Strategy.
              </span>
            </h2>

            {/* Narrative Body Paragraphs */}
            <div className="mt-6 space-y-4 text-sm sm:text-[15.5px] text-[#444444] font-light leading-relaxed">
              <p>
                RS Juris & Co. was founded on an exacting premise: that modern legal counsel must transcend literal statutory interpretation. We serve as fiduciaries to conglomerates, entrepreneurs, institutions, and individuals navigating intricate disputes or intense regulatory inquiry.
              </p>
              <p>
                By synthesizing doctrinal legal research with assertive courtroom advocacy, our chambers bridge the divide between theoretical jurisprudence and practical commercial dispute resolution before India&apos;s trial courts, tribunals, and apex appellate benches.
              </p>
            </div>

            {/* Chamber Standards Check-list */}
            <div className="mt-8 pt-6 border-t border-[#001C41]/10 space-y-3">
              {[
                "Multi-tiered precedent benchmarking",
                "Pre-dispute mitigation & exposure auditing",
                "Senior appellate briefing & trial-stage advocacy",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#96702A] shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-[#001C41]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Approach Link */}
            <div className="mt-8">
              <Link
                href="/approach"
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-sans uppercase tracking-[0.16em] font-semibold text-[#001C41] hover:text-[#96702A] transition-colors"
              >
                <span>Examine Our Method</span>
                <ArrowRight className="w-4 h-4 text-[#96702A] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* =========================================================================
              RIGHT COLUMN (The 3 Doctrinal Pillars Bento) - lg:col-span-7
             ========================================================================= */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-7 flex flex-col gap-4 sm:gap-5"
          >
            {doctrinalPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.id}
                  variants={itemVariants}
                  whileHover={{ y: -3, transition: { duration: 0.25 } }}
                  className="group relative p-6 sm:p-7 rounded-[4px] bg-white border border-[#96702A]/20 shadow-[0_4px_20px_rgba(0,28,65,0.04)] hover:shadow-[0_8px_30px_rgba(150,112,42,0.12)] hover:border-[#96702A]/50 transition-all duration-300"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-[2px] bg-[#FAF7F0] border border-[#96702A]/30 text-[#96702A] group-hover:bg-[#001C41] group-hover:text-[#E5BD79] group-hover:border-[#001C41] transition-colors duration-300">
                        <Icon className="w-5 h-5" strokeWidth={1.8} />
                      </div>
                      <div>
                        <span className="inline-block text-[10px] font-mono uppercase tracking-[0.18em] text-[#96702A] font-semibold">
                          {pillar.badge}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl text-[#001C41] font-normal tracking-tight">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>

                    {/* Monospace Pillar Index */}
                    <span className="font-mono text-sm font-semibold text-[#96702A]/40 group-hover:text-[#96702A] transition-colors duration-300">
                      {pillar.id}
                    </span>
                  </div>

                  {/* Subtitle */}
                  <div className="text-[12px] sm:text-xs font-sans uppercase tracking-[0.14em] font-medium text-[#96702A] mb-2.5">
                    {pillar.subtitle}
                  </div>

                  {/* Body description */}
                  <p className="text-[13px] sm:text-[14.5px] text-[#444444] font-light leading-relaxed">
                    {pillar.desc}
                  </p>

                  {/* Subtle Bottom Accent Glow Line */}
                  <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#96702A]/0 to-transparent group-hover:via-[#96702A]/50 transition-all duration-500" />
                </motion.div>
              );
            })}

            {/* Fiduciary Commitment Disclaimer Strip */}
            <motion.div
              variants={itemVariants}
              className="mt-2 p-4 rounded-[2px] border border-[#001C41]/10 bg-[#FAF7F0]/60 flex items-center justify-between text-[11px] sm:text-xs font-mono tracking-[0.14em] uppercase text-[#444444]"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-[#96702A] shrink-0" />
                <span>Advocates Act & Bar Council Code Compliant</span>
              </div>
              <span className="hidden sm:inline text-[#96702A] font-semibold">
                Privilege Absolute
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}