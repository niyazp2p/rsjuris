"use client";

import { motion, type Variants } from "framer-motion";
import {
  Scale,
  Shield,
  Gavel,
  FileText,
  Briefcase,
  Compass,
  Sparkles,
  Award,
} from "lucide-react";

export interface ServiceItem {
  title: string;
  description: string;
}

export interface SinglePracticeScopeProps {
  practiceTitle: string;
  practiceNumber: string;
  services: ServiceItem[];
  strategicApproachNote?: string;
}

const easeCurve = [0.16, 1, 0.3, 1] as const;
const badgeIcons = [Scale, Shield, Gavel, FileText, Briefcase, Compass];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
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

export default function SinglePracticeScope({
  practiceTitle,
  practiceNumber,
  services,
  strategicApproachNote,
}: SinglePracticeScopeProps) {
  return (
    <section
      id="scope-services"
      className="relative w-full py-16 sm:py-24 lg:py-28 bg-[#FAF7F0] text-[#0B2545] overflow-hidden selection:bg-[#C9A24D]/25 selection:text-[#0B2545]"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#0B2545_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="absolute top-1/4 -left-36 w-80 h-80 rounded-full bg-[#C9A24D]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[#13315C]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-[#96702A]/25 bg-[#0B2545]/[0.04] mb-3.5">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#96702A] shadow-[0_0_6px_#96702A] shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#96702A] font-semibold">
              Vertical {practiceNumber}/09 • Representation Scope
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#0B2545] tracking-tight leading-[1.14]">
            Chamber Competencies &amp; <br className="hidden sm:inline" />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#96702A] via-[#B38A33] to-[#735218]">
              Statutory Services.
            </span>
          </h2>

          <p className="mt-3.5 text-[13.5px] sm:text-base text-slate-600 font-light leading-relaxed max-w-2xl">
            Detailed procedural coverage for {practiceTitle}, grounded in trial preparation, appellate research, and strategic dispute resolution
          </p>
        </div>

        {/* Services Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {services.map((item, idx) => {
            const Icon = badgeIcons[idx % badgeIcons.length];
            const itemNumber = (idx + 1).toString().padStart(2, "0");

            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="group relative p-5 sm:p-6 rounded-[2px] border border-[#96702A]/20 bg-white/50 hover:bg-white/95 hover:border-[#96702A]/50 hover:shadow-[0_8px_24px_rgba(150,112,42,0.06)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-[2px] bg-[#FAF7F0] border border-[#96702A]/25 text-[#96702A] group-hover:bg-[#0B2545] group-hover:text-[#D4AF37] group-hover:border-[#0B2545] transition-colors duration-300 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-400">
                      {itemNumber}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-base sm:text-[17px] font-medium text-[#0B2545] leading-snug group-hover:text-[#96702A] transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[12.5px] sm:text-[13px] text-slate-600 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#96702A]/15 flex items-center justify-between text-[10.5px] font-mono text-slate-400">
                  <span>DISPUTE SCOPE</span>
                  <Sparkles className="w-3 h-3 text-[#96702A]/50 group-hover:text-[#96702A] transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Strategic Handling Directive Callout */}
        {strategicApproachNote && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: easeCurve }}
            className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-[2px] border border-[#96702A]/30 bg-[#FAF7F0] relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#96702A] via-[#C9A24D] to-[#96702A]" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-10 h-10 rounded-[2px] bg-[#0B2545] text-[#D4AF37] border border-[#C9A24D]/40 flex items-center justify-center shrink-0 shadow-sm">
                <Award className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-[#96702A] font-semibold">
                  Chambers Strategic Handling Directive
                </div>
                <p className="font-serif text-sm sm:text-base text-[#0B2545] font-light leading-relaxed italic">
                  &ldquo;{strategicApproachNote}&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}