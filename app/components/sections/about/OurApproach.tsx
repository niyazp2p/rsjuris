"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  FileSearch,
  BrainCircuit,
  Gavel,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const easeCurve = [0.16, 1, 0.3, 1] as const;

interface StepData {
  roman: string;
  num: string;
  stage: string;
  description: string;
  deliverables: string[];
  icon: React.ComponentType<{ className?: string }>;
}

// Exactly mapped from PRD Section 6.5: "Our Approach"
const approachSteps: StepData[] = [
  {
    roman: "I",
    num: "01",
    stage: "Understand",
    description:
      "We begin by understanding the client's objectives, circumstances, documentation, and legal concerns.",
    deliverables: [
      "Objective & Circumstance Intake",
      "Documentary Evidence Audit",
      "Statutory Concern Mapping",
    ],
    icon: Compass,
  },
  {
    roman: "II",
    num: "02",
    stage: "Analyse",
    description:
      "We examine the applicable legal framework, facts, evidence, contractual obligations, and potential risks.",
    deliverables: [
      "Applicable Statutory Framework",
      "Contractual & Evidentiary Scrutiny",
      "Exposure & Risk Assessment",
    ],
    icon: FileSearch,
  },
  {
    roman: "III",
    num: "03",
    stage: "Strategise",
    description:
      "We develop a legal strategy based on the specific requirements and circumstances of the matter.",
    deliverables: [
      "Custom Strategic Roadmap",
      "Multi-Forum Dispute Trajectory",
      "Commercial & Settlement Modeling",
    ],
    icon: BrainCircuit,
  },
  {
    roman: "IV",
    num: "04",
    stage: "Represent",
    description:
      "We represent and advise our clients through the relevant legal process while keeping them informed of significant developments.",
    deliverables: [
      "Apex & Trial Court Advocacy",
      "Continuous Client Briefings",
      "Enforcement & Post-Adjudication",
    ],
    icon: Gavel,
  },
];

export default function OurApproach() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % approachSteps.length);
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + approachSteps.length) % approachSteps.length);
  };

  const ActiveIcon = approachSteps[activeStep].icon;

  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-[#0B2545] via-[#13315C] to-[#0B2545] text-slate-100 overflow-hidden selection:bg-[#C9A24D]/25 selection:text-[#E8D091]">
      {/* Ambient Radial Lighting */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] rounded-full bg-[#134074]/40 blur-[130px]" />
        <div className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] rounded-full bg-[#C9A24D]/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header: Centered on Desktop & Mobile */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeCurve }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] border border-[#C9A24D]/35 bg-[#134074]/40 backdrop-blur-md mb-4"
          >
            <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37] shadow-[0_0_6px_#D4AF37]" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#E8D091] font-semibold">
               Methodology
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeCurve }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight"
          >
            Our Working Method: <br className="hidden sm:inline" />
            <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6E5] via-[#EED192] to-[#D8B467]">
              From Fact Intake to Apex Execution.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeCurve }}
            className="mt-4 text-sm sm:text-base text-slate-300/90 font-light leading-relaxed max-w-2xl"
          >
            A disciplined four-stage procedural lifecycle ensuring doctrinal thoroughness, tactical
            advantage, and complete transparency at every judicial milestone.
          </motion.p>
        </div>

        {/* =========================================================================
            DESKTOP INTERACTION: SEQUENTIAL DIAL RAILWAY + HARMONIZED STAGE CARD
           ========================================================================= */}
        <div className="hidden lg:block w-full max-w-5xl mx-auto">
          {/* Connected Railway Line */}
          <div className="relative w-full mb-12">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-[#C9A24D]/25" />
            <motion.div
              className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-[#C9A24D] via-[#DFBF6E] to-[#E8D091]"
              animate={{
                width: `${(activeStep / (approachSteps.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: easeCurve }}
            />

            <div className="relative flex justify-between items-center w-full">
              {approachSteps.map((step, idx) => {
                const isPassed = idx <= activeStep;
                const isActive = idx === activeStep;
                return (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className="group flex flex-col items-center focus:outline-none cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.96 }}
                      className={`relative flex items-center justify-center w-12 h-12 rounded-[2px] transition-all duration-300 ${
                        isActive
                          ? "bg-[#0B2545] border-2 border-[#D4AF37] shadow-[0_0_22px_rgba(212,175,55,0.4)]"
                          : isPassed
                          ? "bg-[#13315C] border border-[#C9A24D] text-[#E8D091]"
                          : "bg-[#0B2545]/80 border border-[#C9A24D]/25 text-slate-400"
                      }`}
                    >
                      <span className="font-serif text-sm font-semibold tracking-wider text-[#E8D091]">
                        {step.roman}
                      </span>
                    </motion.div>

                    <div className="mt-3 flex flex-col items-center">
                      <span className="text-[10px] font-mono tracking-widest text-[#E8D091]/80">
                        STAGE {step.num}
                      </span>
                      <span
                        className={`text-sm font-serif transition-colors duration-200 ${
                          isActive
                            ? "text-white font-medium"
                            : "text-slate-400 group-hover:text-slate-200 font-light"
                        }`}
                      >
                        {step.stage}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Stage Breakdown Card in Light Navy Styling */}
          <div className="relative p-8 lg:p-10 rounded-[3px] border border-[#C9A24D]/35 bg-[#FAF7F0] text-[#001730] shadow-[0_16px_45px_rgba(0,0,0,0.22)] overflow-hidden">
            {/* Top Satin Gold Trim */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#C9A24D] via-[#DFBF6E] to-[#B38A33]" />

            <div className="grid grid-cols-12 gap-8 items-center">
              <div className="col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-[2px] bg-[#0B2545] text-[#D4AF37] border border-[#C9A24D]/35 flex items-center justify-center shrink-0 shadow-sm">
                    <ActiveIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#96702A] font-semibold">
                      PHASE {approachSteps[activeStep].roman} • PROCEDURAL BENCHMARK
                    </div>
                    <h3 className="font-serif text-2xl lg:text-3xl text-[#001730] font-medium tracking-tight mt-0.5">
                      {approachSteps[activeStep].stage}
                    </h3>
                  </div>
                </div>

                <p className="text-base text-slate-700 font-light leading-relaxed pt-1">
                  {approachSteps[activeStep].description}
                </p>
              </div>

              <div className="col-span-5 border-l border-[#96702A]/20 pl-8 space-y-3">
                <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#96702A] font-semibold">
                  Chamber Deliverables:
                </h4>
                <ul className="space-y-2.5">
                  {approachSteps[activeStep].deliverables.map((d, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.28 }}
                      className="flex items-center gap-2.5 text-xs text-slate-700 font-light"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#96702A] shrink-0" />
                      <span>{d}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MOBILE INTERACTION: CYCLIC STEP SWITCHER / COMPACT ACCORDION-STYLE CARD
           ========================================================================= */}
        <div className="block lg:hidden w-full max-w-md mx-auto">
          {/* Quick-Tap Segmented Progress Pills */}
          <div className="grid grid-cols-4 gap-1 p-1 rounded-[3px] bg-[#07192E]/90 border border-[#C9A24D]/30 mb-5">
            {approachSteps.map((step, idx) => (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`py-2 px-1 text-center rounded-[2px] transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${
                  activeStep === idx
                    ? "bg-gradient-to-r from-[#C9A24D] via-[#DFBF6E] to-[#B38A33] text-[#001730] font-semibold shadow-sm"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <span className="text-[9px] font-mono leading-none">{step.num}</span>
                <span className="text-[10px] font-serif truncate w-full mt-0.5">{step.stage}</span>
              </button>
            ))}
          </div>

          {/* Animated Stage Card on Clean Ivory Background */}
          <div className="relative min-h-[310px] p-5 sm:p-6 rounded-[3px] border border-[#C9A24D]/40 bg-[#FAF7F0] text-[#001730] shadow-[0_12px_40px_rgba(0,0,0,0.22)] flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#C9A24D] to-transparent" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.28, ease: easeCurve }}
                className="space-y-3.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#96702A] uppercase font-semibold">
                    STAGE {approachSteps[activeStep].num} // {approachSteps[activeStep].roman}
                  </span>
                  <span className="px-2 py-0.5 rounded-[2px] bg-[#0B2545] text-[#E8D091] text-[10px] font-mono">
                    Step {activeStep + 1} of 4
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[2px] bg-[#0B2545] text-[#D4AF37] border border-[#C9A24D]/35 flex items-center justify-center shrink-0 shadow-sm">
                    <ActiveIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#001730] font-medium">
                    {approachSteps[activeStep].stage}
                  </h3>
                </div>

                <p className="text-[13.5px] text-slate-700 font-light leading-relaxed">
                  {approachSteps[activeStep].description}
                </p>

                <div className="pt-3 border-t border-[#96702A]/20 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#96702A] block font-semibold">
                    Deliverables:
                  </span>
                  {approachSteps[activeStep].deliverables.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#96702A] shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Tap Navigation Footbar */}
            <div className="mt-5 pt-3 border-t border-[#96702A]/20 flex items-center justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center gap-1 text-xs text-[#0B2545] hover:text-[#96702A] px-2 py-1 font-medium transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-[#96702A]" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-1 text-xs text-[#0B2545] hover:text-[#96702A] px-2 py-1 font-semibold transition-colors"
              >
                <span>Next Stage</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#96702A]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}