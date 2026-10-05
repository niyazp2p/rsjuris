"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Mail,
  ArrowUpRight,
  FileSearch,
  ShieldCheck,
  Scale,
} from "lucide-react";

const easeCurve = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: easeCurve,
    },
  },
};

const approachHighlights = [
  {
    icon: FileSearch,
    title: "Forensic Case Deconstruction",
    desc: "Exhaustive statutory scrutiny and early procedural vulnerability audits before entering any judicial or regulatory arena.",
  },
  {
    icon: Scale,
    title: "Precision Strategic Pathways",
    desc: "Custom-formulated representation designed to eliminate exposure and build decisive leverage across civil, criminal, and appellate matters.",
  },
  {
    icon: ShieldCheck,
    title: "Client-Centric Fiduciary Shield",
    desc: "Protecting individual and corporate interests through unwavering confidentiality, proactive risk mitigation, and sustainable outcomes.",
  },
];

export default function FounderSection() {
  return (
    <section
      id="founder"
      className="relative w-full pt-16 sm:pt-24 pb-16 sm:pb-20 px-5 sm:px-8 lg:px-12 bg-[#FAF7F0] overflow-hidden selection:bg-[#96702A]/20 selection:text-[#001C41]"
    >
      {/* Subtle Ambient Light Glows */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-1/3 -left-20 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#E5BD79]/20 blur-[130px]" />
        <div className="absolute bottom-10 right-0 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#96702A]/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Founder Portrait Card */}
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
                
                {/* Contrast Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001C41]/85 via-transparent to-transparent pointer-events-none" />

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

              {/* Sub-photo Direct Email Line */}
              <div className="mt-3.5 pt-3 border-t border-[#001C41]/10 flex items-center justify-center">
                <a
                  href="mailto:devanshu@rsjuris.com"
                  className="group/mail inline-flex items-center gap-2 text-xs font-mono tracking-wider text-[#001C41] hover:text-[#96702A] transition-colors duration-200"
                >
                  <Mail className="w-3.5 h-3.5 text-[#96702A] transition-transform duration-200 group-hover/mail:scale-110" />
                  <span className="font-medium">devanshu@rsjuris.com</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Method & Philosophy Narrative */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-7 flex flex-col items-center sm:items-start text-center sm:text-left"
          >
            {/* Tag Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-[#96702A]/30 bg-white/80 backdrop-blur-sm mb-3">
                <span className="w-1.5 h-1.5 rotate-45 bg-[#96702A] shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#96702A] font-semibold">
                  Founding Perspective • Method
                </span>
              </div>

              {/* Headline */}
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[#001C41] font-light leading-[1.15]">
                Strategic Discipline. <br />
                <span className="font-normal italic text-[#96702A]">
                  Defensible Outcomes.
                </span>
              </h2>
            </motion.div>

            {/* Approach Narrative */}
            <motion.div
              variants={itemVariants}
              className="mt-5 space-y-3.5 text-sm sm:text-base text-[#444444] font-light leading-relaxed max-w-xl"
            >
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
                    className="p-3 sm:p-3.5 rounded-[3px] bg-white border border-[#96702A]/20 shadow-[0_2px_12px_rgba(0,28,65,0.03)] flex items-start gap-3.5 text-left transition-colors duration-200 hover:border-[#96702A]/40"
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

            {/* Quick Action Consultation CTA */}
            <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-[#001C41]/10 w-full max-w-xl flex items-center justify-between sm:justify-start gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[2px] bg-[#001C41] text-white hover:bg-[#96702A] transition-colors duration-300 text-xs font-semibold uppercase tracking-[0.16em] shadow-sm"
              >
                <span>Consult Chambers</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#E5BD79] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <span className="text-[11px] text-[#777777] font-mono tracking-wider uppercase hidden sm:inline-block">
                RS JURIS & CO.
              </span>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}