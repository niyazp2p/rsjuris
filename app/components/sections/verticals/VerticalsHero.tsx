"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ArrowUpRight, Phone, ShieldCheck } from "lucide-react";

export interface VerticalHeroProps {
  num?: string;
  roman?: string;
  title?: string;
  tagline?: string;
  focus?: string;
  forums?: string[];
}

const easeCurve = [0.16, 1, 0.3, 1] as const;

export default function VerticalHero({
  num = "01",
  roman = "I",
  title = "Core Practice Areas",
  tagline = "Strategic Legal Representation",
  focus = "Comprehensive legal support across dedicated practice disciplines for individuals and corporate entities.",
  forums = ["Supreme Court of India", "High Courts", "Appellate Tribunals"],
}: VerticalHeroProps) {
  const safeTitle = title || "Practice Areas";
  const hasAmpersand = safeTitle.includes("&");
  const titleParts = safeTitle.split("&");

  return (
    <section className="relative w-full overflow-hidden bg-[#001730] text-slate-100 selection:bg-[#C9A24D]/25 selection:text-[#E8D091]">
      {/* 1. Fluid Ambient Background with Dual Responsive Banners */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        {/* Mobile Portrait Asset (mobilebanner3.png) */}
        <div className="relative block sm:hidden w-full h-full">
          <Image
            src="/mobilebanner3.png"
            alt="RS Juris & Co. Appellate Chambers"
            fill
            priority
            quality={95}
            className="object-cover object-[center_26%] filter brightness-[0.82] contrast-[1.05]"
          />
        </div>

        {/* Desktop Landscape Asset (banner2.png) */}
        <div className="relative hidden sm:block w-full h-full">
          <Image
            src="/banner2.png"
            alt="Supreme Court of India & Appellate Jurisprudence"
            fill
            priority
            quality={95}
            className="object-cover object-[center_32%] filter brightness-[0.85] contrast-[1.04]"
          />
        </div>

        {/* Directional Optical Scrims */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001730]/88 via-[#001730]/55 to-[#001730]/95 sm:hidden" />
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#001730]/95 via-[#001730]/72 to-transparent w-full lg:w-[68%]" />
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#001730] via-transparent to-[#001730]/35" />

        {/* Ambient Gold Radial Diffusion */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-10 w-64 sm:w-[32rem] h-64 sm:h-[32rem] rounded-full bg-[#C9A24D]/10 blur-[110px]" />
      </div>

      {/* 2. Core Editorial Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-20 sm:pt-36 pb-8 sm:pb-16 flex flex-col items-center sm:items-start text-center sm:text-left">
        {/* Breadcrumb Navigation Strip */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeCurve }}
          className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-sans mb-3 sm:mb-6 text-slate-300/85"
        >
          <Link href="/" className="hover:text-[#E8D091] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#C9A24D]" />
          <Link
            href="/practice-areas"
            className="hover:text-[#E8D091] transition-colors"
          >
            Practice Areas
          </Link>
          <ChevronRight className="w-3 h-3 text-[#C9A24D]" />
          <span className="text-[#E8D091] font-semibold truncate max-w-[130px] sm:max-w-none">
            {safeTitle}
          </span>
        </motion.div>

        {/* Headline & Editorial Copy Container */}
        <div className="max-w-3xl space-y-3 sm:space-y-5">
          {/* Eyebrow Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06, ease: easeCurve }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-[#C9A24D]/35 bg-[#001730]/85 backdrop-blur-md shadow-sm"
          >
            <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37] shadow-[0_0_6px_#D4AF37] shrink-0" />
            <span className="text-[9.5px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-[#E8D091] font-semibold">
              Chamber Benchmark 
            </span>
          </motion.div>

          {/* Practice Area Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: easeCurve }}
            className="font-serif text-[1.95rem] sm:text-5xl lg:text-[3.85rem] text-white font-light tracking-tight leading-[1.14]"
          >
            {titleParts[0]}
            {hasAmpersand && titleParts[1] && (
              <>
                <span className="sm:hidden"> &amp; {titleParts.slice(1).join("&").trim()}</span>
                <span className="hidden sm:inline">
                  <br />
                  <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6E5] via-[#EED192] to-[#D8B467] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    &amp; {titleParts.slice(1).join("&").trim()}
                  </span>
                </span>
              </>
            )}
          </motion.h1>

          {/* Tagline Sub-header */}
          {tagline && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: easeCurve }}
              className="text-[11px] sm:text-sm font-sans uppercase tracking-[0.16em] text-[#E8D091] font-medium"
            >
              {tagline}
            </motion.div>
          )}

          {/* Verbatim PRD Focus Statement */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: easeCurve }}
            className="text-[13px] sm:text-base md:text-lg text-slate-200/95 font-light leading-relaxed max-w-xl mx-auto sm:mx-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] antialiased"
          >
            {focus}
          </motion.p>

          {/* Dual High-Intent Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: easeCurve }}
            className="pt-2 sm:pt-4 flex flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto sm:mx-0"
          >
            <Link
              href="#inquiry-desk"
              className="flex-1 sm:flex-initial group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-7 py-2.5 sm:py-3 rounded-[2px] bg-gradient-to-r from-[#C9A24D] via-[#DFBF6E] to-[#B38A33] text-[#001730] font-semibold text-[10.5px] sm:text-xs tracking-[0.12em] uppercase transition-all duration-300 shadow-[0_4px_18px_rgba(201,162,77,0.25)] text-center"
            >
              <span className="whitespace-nowrap">Initiate Review</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#001730] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <a
              href="tel:+9198100XXXXX"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-7 py-2.5 sm:py-3 rounded-[2px] border border-[#C9A24D]/40 bg-[#001730]/80 backdrop-blur-md text-[#E8D091] hover:text-white hover:border-[#D4AF37] hover:bg-[#001730] transition-all text-[10.5px] sm:text-xs tracking-[0.12em] uppercase font-medium text-center"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="whitespace-nowrap">Call Registry</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* 3. Chamber Forum Pill Ribbon */}
      <div className="relative z-10 w-full border-t border-[#C9A24D]/20 bg-[#00142B]/95 backdrop-blur-xl py-2.5 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 text-[9.5px] sm:text-[10.5px] uppercase font-sans tracking-[0.18em] text-[#E8D091] font-semibold shrink-0 justify-center md:justify-start">
            <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
            <span>Adjudication Forums:</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none justify-start md:justify-end">
            {(forums || []).map((forum, idx) => (
              <span
                key={idx}
                className="whitespace-nowrap px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[2px] bg-[#13315C]/50 border border-[#C9A24D]/25 text-[9.5px] sm:text-[11px] text-slate-200 font-light"
              >
                {forum}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}