"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants, type PanInfo } from "framer-motion";
import {
  Mail,
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  Compass,
  BrainCircuit,
  Scale,
  ShieldCheck,
  FileCheck,
  Users2,
  Lock,
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

// Delivery Pillars (Post-Description Deck)
const deliveryCompetencies = [
  {
    id: "01",
    tagline: "CLIENT SPECTRUM & ADVOCACY",
    title: "Counsel & Representation",
    summary:
      "Strategic legal counsel and representation to businesses, companies, entrepreneurs, professionals, and individuals.",
    icon: Users2,
    badge: "Broad Spectrum Standing",
  },
  {
    id: "02",
    tagline: "PROCEDURAL & FORENSIC RIGOUR",
    title: "Analysis & Evidentiary Scrutiny",
    summary:
      "Legal analysis, strategic evidence assessment, precise documentation, confidentiality, and professional advocacy.",
    icon: FileCheck,
    badge: "Statutory Precision",
  },
  {
    id: "03",
    tagline: "ETHICAL SANCTITY",
    title: "Fiduciary Confidentiality",
    summary:
      "Absolute statutory client-privilege and disciplined defense safeguarding private wealth and corporate reputation.",
    icon: Lock,
    badge: "Advocates Act Privileged",
  },
];

// Carousel Variants
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
    },
  },
  exit: (dir: number) => ({
    x: dir < 0 ? 120 : -120,
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  }),
};

export default function ManagementPage() {
  const [[activeCard, direction], setActiveCard] = useState<[number, number]>([0, 0]);

  const paginate = (newDirection: number) => {
    setActiveCard(([prev]) => {
      const next = (prev + newDirection + deliveryCompetencies.length) % deliveryCompetencies.length;
      return [next, newDirection];
    });
  };

  const handleDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    const swipeThreshold = 10000;
    const swipePower = Math.abs(offset.x) * velocity.x;

    if (swipePower < -swipeThreshold || offset.x < -60) {
      paginate(1);
    } else if (swipePower > swipeThreshold || offset.x > 60) {
      paginate(-1);
    }
  };

  const currentCompetency = deliveryCompetencies[activeCard];
  const CardIcon = currentCompetency.icon;

  return (
    <main className="w-full bg-[#FAF7F0] text-[#001C41] selection:bg-[#96702A]/20 selection:text-[#001C41] antialiased overflow-x-hidden">
      {/* =========================================================================
          1. MANAGEMENT HERO SECTION (Centered on Desktop & Mobile)
         ========================================================================= */}
      <section className="relative w-full min-h-[44svh] lg:min-h-[50svh] flex flex-col justify-center items-center overflow-hidden bg-[#001730] text-slate-100 border-b border-[#C9A24D]/20">
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
            <span className="text-[#E8D091] font-medium">Firm Leadership</span>
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
            Firm Leadership & <br />
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
            Guided by academic rigour, unyielding statutory ethics, and strategic clarity across every matter entrusted to our Firms.
          </motion.p>
        </div>
      </section>

      {/* =========================================================================
          2. ABOUT FOUNDER (Light Aesthetic #FAF7F0 + Approach Narrative)
         ========================================================================= */}
      <section className="relative w-full pt-16 sm:pt-24 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-12 bg-[#FAF7F0] overflow-hidden">
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

                  {/* Floating Identity Strip */}
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-[2px] bg-white/95 backdrop-blur-md border border-[#96702A]/30 text-center shadow-md">
                    <div className="font-serif text-base sm:text-lg text-[#001C41] font-medium tracking-wide">
                      Adv. Devanshu Goyal
                    </div>
                    <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#96702A] font-semibold mt-0.5">
                      Founder & Managing Counsel
                    </div>
                  </div>
                </div>

                {/* Sub-photo email line */}
                <div className="mt-3.5 pt-3 border-t border-[#001C41]/10 flex items-center justify-center">
                  <a
                    href="mailto:devanshu@rsjuris.com"
                    className="group/mail inline-flex items-center gap-2 text-xs font-mono tracking-wider text-[#001C41] hover:text-[#96702A] transition-colors duration-200"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#96702A]" />
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
              <motion.div variants={itemVariants} className="mt-6 w-full space-y-2.5 max-w-xl">
                {approachHighlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3 sm:p-3.5 rounded-[3px] bg-white border border-[#96702A]/20 shadow-[0_2px_12px_rgba(0,28,65,0.03)] flex items-start gap-3.5 text-left"
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
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CORE DELIVERY PILLARS (Swipeable Mobile / Stepped Desktop)
         ========================================================================= */}
      <section className="relative w-full py-12 sm:py-16 px-5 sm:px-8 lg:px-12 bg-gradient-to-b from-[#FAF7F0] via-white to-[#FAF7F0] border-t border-[#96702A]/20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header with Desktop Navigation Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-5 border-b border-[#96702A]/15">
            <div className="text-center sm:text-left max-w-xl">
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.24em] text-[#96702A] uppercase font-semibold">
                Firm SCOPE & ADVOCACY MATRIX
              </span>
              <h3 className="mt-2 font-serif text-2xl sm:text-3xl text-[#001C41] font-normal">
                Commitment to Representation
              </h3>
            </div>

            {/* Desktop Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-3">
              <span className="font-mono text-xs text-[#96702A] mr-2">
                0{activeCard + 1} / 0{deliveryCompetencies.length}
              </span>
              <button
                type="button"
                onClick={() => paginate(-1)}
                className="p-2.5 rounded-[2px] border border-[#96702A]/35 bg-white text-[#001C41] hover:bg-[#001C41] hover:text-white transition-all shadow-sm active:scale-95"
                aria-label="Previous deliverable"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                className="p-2.5 rounded-[2px] border border-[#96702A]/35 bg-white text-[#001C41] hover:bg-[#001C41] hover:text-white transition-all shadow-sm active:scale-95"
                aria-label="Next deliverable"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* =====================================================================
              A. MOBILE SWIPER VIEW (Touch Gestures + Spring Physics)
             ===================================================================== */}
          <div className="block sm:hidden">
            <div className="flex items-center justify-between text-xs font-mono text-[#96702A] mb-3 px-1">
              <span>SWIPE TO NAVIGATE</span>
              <span>
                0{activeCard + 1} / 0{deliveryCompetencies.length}
              </span>
            </div>

            <div className="relative min-h-[240px] w-full flex items-center justify-center overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeCard}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0 rounded-[4px] bg-white border border-[#96702A]/35 p-6 shadow-[0_8px_30px_rgba(0,28,65,0.08)] flex flex-col justify-between cursor-grab active:cursor-grabbing select-none"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#96702A] via-[#C9A24D] to-[#96702A]" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-[2px] bg-[#FAF7F0] text-[#96702A] border border-[#96702A]/30">
                        <CardIcon className="w-5 h-5" strokeWidth={1.8} />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider uppercase text-[#96702A] bg-[#FAF7F0] px-2.5 py-1 rounded-[2px] border border-[#96702A]/20">
                        {currentCompetency.badge}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-medium text-[#001C41]">
                      {currentCompetency.title}
                    </h4>

                    <p className="mt-2 text-xs text-[#444444] font-light leading-relaxed">
                      {currentCompetency.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#001C41]/10 flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    <span>RS Juris Competency</span>
                    <span className="text-[#96702A]">Phase {currentCompetency.id}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Dots Indicator */}
            <div className="flex items-center justify-center gap-1.5 mt-4">
              {deliveryCompetencies.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveCard([idx, idx > activeCard ? 1 : -1])}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeCard ? "w-6 bg-[#96702A]" : "w-1.5 bg-[#96702A]/30"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* =====================================================================
              B. DESKTOP VIEW (Active Slide Presentation with Synchronized Cards)
             ===================================================================== */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-6">
            {deliveryCompetencies.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === activeCard;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveCard([idx, idx > activeCard ? 1 : -1])}
                  className={`relative p-6 sm:p-7 rounded-[4px] transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-white border-2 border-[#96702A] shadow-[0_12px_35px_rgba(150,112,42,0.15)] -translate-y-1"
                      : "bg-white/80 border border-[#96702A]/20 hover:border-[#96702A]/50 shadow-sm"
                  }`}
                >
                  <div
                    className={`absolute top-0 inset-x-0 h-1 transition-opacity ${
                      isSelected
                        ? "opacity-100 bg-gradient-to-r from-[#96702A] via-[#C9A24D] to-[#96702A]"
                        : "opacity-0"
                    }`}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-2.5 rounded-[2px] border transition-colors ${
                          isSelected
                            ? "bg-[#001C41] text-[#E5BD79] border-[#001C41]"
                            : "bg-[#FAF7F0] text-[#96702A] border-[#96702A]/30"
                        }`}
                      >
                        <Icon className="w-5 h-5" strokeWidth={1.8} />
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#96702A]">
                        {item.id}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#96702A] block mb-1">
                      {item.tagline}
                    </span>

                    <h4 className="font-serif text-lg font-medium text-[#001C41] mb-2.5">
                      {item.title}
                    </h4>

                    <p className="text-xs sm:text-[13px] text-[#444444] font-light leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#001C41]/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#96702A]">
                    <span>{item.badge}</span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? "translate-x-1 text-[#96702A]" : "text-slate-400"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. FINAL ACTIONS SUITE (Schedule Consultation & Direct Email)
         ========================================================================= */}
      <section className="relative w-full py-16 sm:py-20 px-5 sm:px-8 lg:px-12 bg-[#FAF7F0] border-t border-[#96702A]/20">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.24em] text-[#96702A] uppercase font-semibold mb-2">
            ENGAGE FirmS OF ADV. DEVANSHU GOYAL
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#001C41] font-light">
            Retain Counsel for Complex Matters
          </h2>
          <p className="mt-3 text-sm text-[#444444] font-light max-w-lg leading-relaxed">
            Direct briefings, legal opinions, and appellate representations are conducted under strict statutory privilege and fiduciary discretion.
          </p>

          {/* Action Buttons Suite - Full Width on Mobile, Row on Desktop */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md">
            {/* Schedule Consultation CTA */}
            <Link
              href="/contact"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[2px] bg-gradient-to-r from-[#96702A] via-[#B88E35] to-[#7A5B20] text-white font-semibold text-[11px] sm:text-xs tracking-[0.16em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(150,112,42,0.25)] hover:brightness-105 active:scale-[0.98] text-center"
            >
              <span className="whitespace-nowrap">Schedule Consultation</span>
              <ArrowUpRight className="w-4 h-4 text-white shrink-0" />
            </Link>

            {/* Direct Mail CTA */}
            <a
              href="mailto:devanshu@rsjuris.com"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[2px] border border-[#96702A]/40 bg-white/90 text-[#001C41] hover:bg-[#001C41] hover:text-white hover:border-[#001C41] transition-all text-[11px] sm:text-xs tracking-[0.16em] uppercase font-semibold active:scale-[0.98] shadow-sm text-center"
            >
              <Mail className="w-4 h-4 text-[#96702A] group-hover:text-white shrink-0" />
              <span className="whitespace-nowrap">Direct Email</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. STATUTORY COMPLIANCE / FOOTER STRIP
         ========================================================================= */}
      <div className="relative z-10 w-full border-t border-[#001C41]/10 bg-white py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[9.5px] xs:text-[10px] sm:text-[11px] font-mono tracking-[0.18em] uppercase text-[#96702A] font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#96702A] shrink-0" />
            <span>Advocates Act (1961) • Strict Statutory Privilege Maintained</span>
          </div>

          <div className="text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] font-mono tracking-[0.18em] uppercase text-[#555555]">
            Firms of RS Juris & Co. • New Delhi
          </div>
        </div>
      </div>
    </main>
  );
}