"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Mail,
  ArrowUpRight,
  ChevronRight,
  Compass,
  BrainCircuit,
  Scale,
  ShieldCheck,
} from "lucide-react";

const easeCurve = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeCurve },
  },
};

const approachHighlights = [
  {
    icon: Compass,
    title: "Pre-Litigation Precision",
    desc: "Rigorous statutory deconstruction and documentary audit before committing to a judicial forum.",
  },
  {
    icon: BrainCircuit,
    title: "Tactical Commercial Foresight",
    desc: "Synthesizing legal doctrine with commercial reality to structure pragmatic, dispute-resilient trajectories.",
  },
  {
    icon: Scale,
    title: "Decisive Courtroom Clarity",
    desc: "Persuasive and targeted appellate advocacy designed around bench temperament and judicial precedents.",
  },
];

export default function ManagementPage() {
  return (
    <main className="w-full bg-[#FAF7F0] text-[#001C41] selection:bg-[#96702A]/20 selection:text-[#001C41] antialiased overflow-x-hidden">
      {/* =========================================================================
          1. MANAGEMENT HERO SECTION (Centered on Desktop & Mobile)
         ========================================================================= */}
      <section className="relative w-full min-h-[46svh] lg:min-h-[52svh] flex flex-col justify-center items-center overflow-hidden bg-[#001730] text-slate-100 border-b border-[#C9A24D]/20">
        {/* Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 sm:w-[38rem] h-80 sm:h-[38rem] rounded-full bg-[#C9A24D]/10 blur-[135px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000E1F]/70 via-[#001730]/60 to-[#001730]" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-12 sm:pb-16 flex flex-col items-center text-center">
          {/* Breadcrumb Navigation - Centered */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: easeCurve }}
            className="inline-flex items-center justify-center gap-1.5 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-sans mb-3 sm:mb-4 text-slate-300/85"
          >
            <Link href="/" className="hover:text-[#E8D091] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-[#C9A24D]" />
            <span className="text-[#E8D091] font-medium">Chamber Leadership</span>
          </motion.div>

          {/* Eyebrow Pill - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: easeCurve }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] border border-[#C9A24D]/40 bg-[#001730]/90 backdrop-blur-md shadow-sm mb-4"
          >
            <span className="w-1.5 h-1.5 rotate-45 border border-[#E8D091] bg-transparent shadow-[0_0_6px_#C9A24D] shrink-0" />
            <span className="text-[9.5px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#E8D091] font-semibold leading-tight">
              RS Juris & Co. • Leadership
            </span>
          </motion.div>

          {/* Display Headline - Centered */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: easeCurve }}
            className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-[3.8rem] text-white font-light tracking-tight leading-[1.14] max-w-4xl"
          >
            Chamber Leadership & <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6E5] via-[#EED192] to-[#D8B467] drop-shadow-[0_2px_10px_rgba(0,23,48,0.9)]">
              Founding Philosophy.
            </span>
          </motion.h1>

          {/* Subtitle - Centered */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: easeCurve }}
            className="mt-4 sm:mt-5 text-[13.5px] sm:text-base md:text-lg text-slate-300/90 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-[0_1px_3px_rgba(0,23,48,0.8)]"
          >
            Guided by academic rigour, unyielding statutory ethics, and strategic clarity across every matter entrusted to our chambers.
          </motion.p>
        </div>
      </section>

      {/* =========================================================================
          2. ABOUT FOUNDER (Light Aesthetic #FAF7F0 + Mobile Perfected CTAs)
         ========================================================================= */}
      <section className="relative w-full py-16 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 bg-[#FAF7F0] overflow-hidden">
        {/* Subtle Ambient Light Glows */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute top-1/3 -left-20 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#E5BD79]/20 blur-[130px]" />
          <div className="absolute bottom-10 right-0 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#96702A]/10 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left: Founder Portrait Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: easeCurve }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-[4px] p-3 sm:p-3.5 bg-white border border-[#96702A]/25 shadow-[0_12px_40px_rgba(0,28,65,0.08)] group">
                
                {/* Image Container with Inner Border */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px] bg-[#FAF7F0] border border-[#001C41]/10">
                  <Image
                    src="/founder.jpeg"
                    alt="Adv Devanshu Goyal - Founder, RS Juris & Co."
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover object-[center_18%] filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001C41]/85 via-transparent to-transparent" />
                  
                  {/* Floating Identity Strip on Image Bottom */}
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-[2px] bg-white/95 backdrop-blur-md border border-[#96702A]/30 text-center shadow-md">
                    <div className="font-serif text-base sm:text-lg text-[#001C41] font-medium tracking-wide">
                      Adv. Devanshu Goyal
                    </div>
                    <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#96702A] font-semibold mt-0.5">
                      Founder & Managing Counsel
                    </div>
                  </div>
                </div>

                {/* Direct Chamber Email Route under Photo */}
                <div className="mt-3.5 pt-3 border-t border-[#001C41]/10 flex items-center justify-center">
                  <a
                    href="mailto:devanshu@rsjuris.com"
                    className="group/mail inline-flex items-center gap-2.5 text-xs font-mono tracking-wider text-[#001C41] hover:text-[#96702A] transition-colors duration-200"
                  >
                    <div className="p-1.5 rounded-[2px] bg-[#FAF7F0] border border-[#96702A]/35 text-[#96702A] group-hover/mail:bg-[#001C41] group-hover/mail:text-white transition-colors duration-200">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">devanshu@rsjuris.com</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right: Method & Philosophy Narrative */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="lg:col-span-7 flex flex-col items-center sm:items-start text-center sm:text-left"
            >
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-[#96702A]/30 bg-white/80 backdrop-blur-sm mb-3">
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#96702A] shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#96702A] font-semibold">
                    Founding Perspective • Method
                  </span>
                </div>

                <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[#001C41] font-light leading-[1.15]">
                  Strategic Discipline. <br />
                  <span className="font-normal italic text-[#96702A]">
                    Defensible Outcomes.
                  </span>
                </h2>
              </motion.div>

              {/* Approach Narrative */}
              <motion.div variants={itemVariants} className="mt-5 space-y-3.5 text-sm sm:text-base text-[#444444] font-light leading-relaxed max-w-xl">
                <p>
                  Adv. Devanshu Goyal anchors his legal practice in a disciplined, multi-layered approach: viewing every dispute not as an isolated conflict, but as a complex statutory framework requiring preventive foresight and uncompromised precision.
                </p>
                <p>
                  His working philosophy prioritizes deep documentary deconstruction before courtroom advocacy—identifying systemic procedural weaknesses early and structuring customized legal pathways that shield client interests and deliver sustainable, decisive resolution.
                </p>
              </motion.div>

              {/* 3 Core Approach Pillars */}
              <motion.div variants={itemVariants} className="mt-6 w-full space-y-3 max-w-xl">
                {approachHighlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-[3px] bg-white border border-[#96702A]/20 shadow-[0_2px_12px_rgba(0,28,65,0.03)] flex items-start gap-3.5 text-left"
                    >
                      <div className="p-2 rounded-[2px] bg-[#FAF7F0] border border-[#96702A]/30 text-[#96702A] shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                      </div>
                      <div>
                        <div className="font-serif text-sm text-[#001C41] font-medium">
                          {item.title}
                        </div>
                        <div className="text-xs text-[#555555] font-light leading-relaxed mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Action Buttons Suite - Full Width & Clean on Mobile, Row on Desktop */}
              <motion.div
                variants={itemVariants}
                className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3 sm:gap-4 w-full max-w-md sm:max-w-none"
              >
                {/* Contact CTA */}
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-[2px] bg-gradient-to-r from-[#96702A] via-[#B88E35] to-[#7A5B20] text-white font-semibold text-[11px] sm:text-xs tracking-[0.16em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(150,112,42,0.25)] hover:brightness-105 active:scale-[0.98] text-center"
                >
                  <span className="whitespace-nowrap">Schedule Consultation</span>
                  <ArrowUpRight className="w-4 h-4 text-white shrink-0" />
                </Link>

                {/* Direct Mail CTA */}
                <a
                  href="mailto:devanshu@rsjuris.com"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-[2px] border border-[#96702A]/40 bg-white/90 text-[#001C41] hover:bg-[#001C41] hover:text-white hover:border-[#001C41] transition-all text-[11px] sm:text-xs tracking-[0.16em] uppercase font-semibold active:scale-[0.98] shadow-sm text-center"
                >
                  <Mail className="w-4 h-4 text-[#96702A] group-hover:text-white shrink-0" />
                  <span className="whitespace-nowrap">Direct Email</span>
                </a>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          3. STATUTORY COMPLIANCE / FOOTER STRIP
         ========================================================================= */}
      <div className="relative z-10 w-full border-t border-[#001C41]/10 bg-white py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[9.5px] xs:text-[10px] sm:text-[11px] font-mono tracking-[0.18em] uppercase text-[#96702A] font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#96702A] shrink-0" />
            <span>Advocates Act (1961) • Strict Statutory Privilege Maintained</span>
          </div>

          <div className="text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] font-mono tracking-[0.18em] uppercase text-[#555555]">
            Chambers of RS Juris & Co. • New Delhi
          </div>
        </div>
      </div>
    </main>
  );
}