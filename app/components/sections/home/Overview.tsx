"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Scale, Shield, BookOpenCheck } from "lucide-react";

const pillars = [
  {
    icon: BookOpenCheck,
    title: "Statutory Rigour",
    tagline: "Academic Depth & Research",
    description:
      "Every petition and advisory is grounded in rigorous constitutional interpretation, exhaustive case law forensics, and uncompromising doctrinal precision.",
  },
  {
    icon: Scale,
    title: "Trial Advocacy",
    tagline: "High-Stakes Courtroom Defense",
    description:
      "Formidable, strategic representation across the Supreme Court of India, High Courts, and specialized central tribunals.",
  },
  {
    icon: Shield,
    title: "Commercial Foresight",
    tagline: "Fiduciary Risk Insulation",
    description:
      "Protecting conglomerates, founders, and private wealth against nuanced regulatory scrutiny, compliance traps, and transactional inflection points.",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

export default function Overview() {
  return (
    <section
      id="about"
      className="relative w-full py-16 sm:py-24 lg:py-32 bg-[#FAF7F0] text-[#0B2545] overflow-hidden selection:bg-[#C9A24D]/25 selection:text-[#0B2545]"
    >
      {/* Background Texture with Medium-Navy Tint */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.045] bg-[radial-gradient(#0B2545_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* Ambient Gold Radial */}
      <div className="absolute top-1/3 -right-32 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#C9A24D]/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 lg:px-16">
        
        {/* UPPER BENTO: Editorial Charter vs Floating Monolith Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT: Text & Charter (7 Cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-[#96702A]/25 bg-[#0B2545]/[0.04]">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#96702A] shadow-[0_0_6px_#96702A] shrink-0" />
              <span className="text-[9.5px] sm:text-[10.5px] font-sans uppercase tracking-[0.22em] text-[#96702A] font-semibold truncate">
                Profile & Ethos
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-[2.85rem] text-[#0B2545] font-light tracking-tight leading-[1.14]">
              Vanguard Jurisprudence. <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#96702A] via-[#B38A33] to-[#735218]">
                Unyielding Integrity.
              </span>
            </h2>

            {/* Narrative Paragraphs */}
            <div className="space-y-3.5 sm:space-y-4 text-slate-700 font-light leading-relaxed text-[14px] sm:text-base antialiased">
              <p>
                Founded upon the bedrock of unyielding statutory integrity and academic rigour,{" "}
                <strong className="font-medium text-[#0B2545]">RS Juris & Co.</strong> operates at the
                vanguard of contemporary Indian jurisprudence. Our Firm combine high-stakes trial
                advocacy with commercial foresight to protect personal liberties and sovereign business interests.
              </p>
              <p className="text-slate-600">
                We act as trusted fiduciaries to conglomerates, founders, institutions, and individuals facing
                nuanced disputes, regulatory scrutiny, or transactional inflection points across India’s judicial landscape.
              </p>
            </div>

            {/* Consultation Action */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#96702A]/15">
              <div>
                <div className="font-serif text-sm font-semibold text-[#0B2545] tracking-wide">
                  RS JURIS & CO.
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#96702A] font-medium mt-0.5">
                  Your Rights | Our Priority
                </div>
              </div>

              <motion.div whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[2px] bg-[#0B2545] hover:bg-[#13315C] text-[#E8D091] border border-[#C9A24D]/40 text-xs uppercase tracking-[0.16em] font-medium transition-all shadow-[0_4px_16px_rgba(11,37,69,0.18)] w-full sm:w-auto"
                >
                  <span>Contact Us</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Monolith Card with Lighter Navy Palette (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease }}
              whileHover={{ y: -4 }}
              className="relative w-full max-w-[420px] rounded-[3px] bg-gradient-to-br from-[#0B2545] via-[#13315C] to-[#0B2545] text-white p-7 sm:p-9 shadow-[0_20px_50px_rgba(11,37,69,0.25)] border border-[#C9A24D]/40 overflow-hidden group"
            >
              {/* Concentric Ambient Radar Pulse */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ scale: [1, 1.35, 1], opacity: [0.15, 0.04, 0.15] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-48 sm:w-60 h-48 sm:h-60 rounded-full border border-[#C9A24D]"
                />
                <motion.div
                  animate={{ scale: [1, 1.55, 1], opacity: [0.1, 0.02, 0.1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="w-68 sm:w-84 h-68 sm:h-84 rounded-full border border-[#C9A24D]"
                />
              </div>

              {/* Shimmer line across top border */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

              {/* Central Content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Circular Logo Mask with Double Satin Gold Bezel */}
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4 rounded-full bg-[#FFFFFF] p-1.5 border-2 border-[#C9A24D] shadow-[0_0_30px_rgba(201,162,77,0.3)] ring-4 ring-[#13315C]/80 overflow-hidden shrink-0 flex items-center justify-center"
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                    <Image
                      src="/logo.jpeg"
                      alt="RS Juris & Co. Official Law Firm Seal"
                      fill
                      priority
                      quality={95}
                      className="object-contain p-1.5"
                    />
                  </div>
                </motion.div>

                {/* Subtitle Accent */}
                <div className="text-[10px] tracking-[0.24em] uppercase text-[#E8D091] font-semibold mt-1">
                  Advocates & Legal Consultants
                </div>

                {/* Badges within Monolith with Soft Lighter Navy Backdrop */}
                <div className="w-full grid grid-cols-2 gap-2.5 sm:gap-3 mt-6 pt-5 border-t border-white/10 text-left">
                  <div className="p-2.5 sm:p-3 rounded-[2px] bg-[#134074]/35 border border-[#C9A24D]/25 backdrop-blur-sm">
                    <div className="text-[9px] sm:text-[10px] text-slate-300 font-sans tracking-wide">Doctrine</div>
                    <div className="text-[11.5px] sm:text-xs font-serif text-[#F3DE9C] mt-0.5 font-medium truncate">
                      Statutory Precision
                    </div>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-[2px] bg-[#134074]/35 border border-[#C9A24D]/25 backdrop-blur-sm">
                    <div className="text-[9px] sm:text-[10px] text-slate-300 font-sans tracking-wide">Fiduciary</div>
                    <div className="text-[11.5px] sm:text-xs font-serif text-[#F3DE9C] mt-0.5 font-medium truncate">
                      100% Integrity
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* LOWER BENTO: Mobile Swipeable Carousel / Desktop 3-Column Grid */}
        <div className="mt-14 sm:mt-20 pt-10 sm:pt-12 border-t border-[#96702A]/20">
          
          {/* Mobile Swipe Hint */}
          <div className="flex sm:hidden items-center justify-between mb-4 px-1">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#96702A] font-semibold">
              Firm Pillars
            </span>
            <span className="text-[9.5px] text-slate-600 font-sans">
              Swipe to explore →
            </span>
          </div>

          <motion.div
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex sm:grid sm:grid-cols-3 gap-4 lg:gap-8 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-none -mx-5 px-5 sm:mx-0 sm:px-0"
          >
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  variants={cardItemVariants}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="min-w-[85%] sm:min-w-0 snap-center relative p-5 sm:p-7 rounded-[2px] bg-white border border-[#96702A]/20 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#96702A]/60 hover:shadow-[0_8px_30px_rgba(150,112,42,0.08)] transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                      <div className="p-2.5 rounded-[2px] bg-[#FAF7F0] border border-[#96702A]/25 text-[#96702A] group-hover:bg-[#0B2545] group-hover:text-[#D4AF37] group-hover:border-[#0B2545] transition-colors duration-300">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.65} />
                      </div>
                      <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-slate-600 font-medium">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Titles */}
                    <h3 className="font-serif text-base sm:text-lg font-medium text-[#0B2545] tracking-tight">
                      {pillar.title}
                    </h3>
                    <div className="text-[10.5px] sm:text-[11px] font-sans font-medium text-[#96702A] uppercase tracking-[0.14em] mt-0.5 mb-2">
                      {pillar.tagline}
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-xs sm:text-[13px] font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Hairline Accent */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-600">
                    <span className="uppercase tracking-wider">Practice Core</span>
                    <span className="text-[#96702A] font-serif italic">RS Juris & Co.</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}