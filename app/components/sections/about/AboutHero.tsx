"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";

const easeCurve = [0.16, 1, 0.3, 1] as const;

export default function AboutHero() {
  return (
    <section className="relative w-full min-h-[100svh] lg:min-h-[calc(100dvh-76px)] lg:h-[calc(100dvh-76px)] flex flex-col justify-between overflow-hidden bg-[#001730] text-slate-100 selection:bg-[#C9A24D]/25 selection:text-[#E8D091]">
      {/* 1. Background Visual Canvas */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        {/* Mobile Portrait Asset */}
        <motion.div
          initial={{ scale: 1.07, opacity: 0.2 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: easeCurve }}
          className="relative block sm:hidden w-full h-full"
        >
          <Image
            src="/mobilebanner2.png"
            alt="Chambers of RS Juris & Co."
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-[center_12%] filter brightness-[0.80] contrast-[1.05]"
          />
        </motion.div>

        {/* Desktop Landscape Asset */}
        <motion.div
          initial={{ scale: 1.04, opacity: 0.35 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: easeCurve }}
          className="relative hidden sm:block w-full h-full"
        >
          <Image
            src="/aboutbanner.png"
            alt="Chambers of RS Juris & Co. Supreme Court of India"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-[center_32%] filter brightness-[0.85] contrast-[1.05]"
          />
        </motion.div>

        {/* Mobile Pure Navy Scrim */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="absolute inset-0 bg-gradient-to-b from-[#001730]/45 via-[#001730]/85 to-[#001730] sm:hidden"
        />

        {/* Desktop Navy Scrim (Zero pure black, preserving dome) */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#001730]/98 via-[#001730]/85 to-transparent w-full md:w-[72%] lg:w-[60%]" />
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#001730] via-transparent to-[#001730]/35" />

        {/* Ambient Warm Gold Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-14 w-72 sm:w-[32rem] h-72 sm:h-[32rem] rounded-full bg-[#C9A24D]/10 blur-[130px]" />
      </div>

      {/* 2. Main Content Canvas - Balanced Spacing */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 flex-1 flex flex-col justify-center items-center sm:items-start text-center sm:text-left">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: easeCurve }}
          className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-sans mb-3 sm:mb-4 text-slate-300/85"
        >
          <Link href="/" className="hover:text-[#E8D091] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#C9A24D]" />
          <span className="text-[#E8D091] font-medium">About RS Juris & Co.</span>
        </motion.div>

        {/* Main Content Box */}
        <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl flex flex-col items-center sm:items-start">
          {/* Brand Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18, ease: easeCurve }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] border border-[#C9A24D]/40 bg-[#001730]/90 backdrop-blur-md shadow-[0_4px_16px_rgba(0,23,48,0.6)] mb-3.5 sm:mb-4"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 border border-[#E8D091] bg-transparent shadow-[0_0_6px_#C9A24D] shrink-0" />
            <span className="text-[9.5px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#E8D091] font-semibold leading-tight">
              RS Juris & Co. • Advocates
            </span>
          </motion.div>

          {/* Three-Tier Headline - Balanced Font Clamp */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26, ease: easeCurve }}
            className="font-serif text-[2.2rem] xs:text-[2.6rem] sm:text-4xl md:text-5xl lg:text-[3.65rem] text-white font-normal tracking-tight leading-[1.12]"
          >
            Doctrinal Precision. <br />
            Constitutional Stature. <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6E5] via-[#EED192] to-[#D8B467] drop-shadow-[0_2px_10px_rgba(0,23,48,0.95)]">
              Decisive Representation.
            </span>
          </motion.h1>

          {/* Sub-lead Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.36, ease: easeCurve }}
            className="mt-3.5 sm:mt-4 text-[13px] sm:text-[15px] lg:text-base text-slate-200/90 font-light leading-relaxed max-w-md sm:max-w-xl mx-auto sm:mx-0 drop-shadow-[0_1px_4px_rgba(0,23,48,0.9)] antialiased"
          >
            Delivering high-precision commercial litigation, regulatory counsel, and constitutional advocacy across the Supreme Court of India and High Courts.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.46, ease: easeCurve }}
            className="mt-5 sm:mt-6 flex flex-row items-center justify-center sm:justify-start gap-3 w-full max-w-sm sm:max-w-none"
          >
            {/* Primary Gold CTA */}
            <Link
              href="/practice-areas"
              className="flex-1 sm:flex-initial group inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 rounded-[2px] bg-gradient-to-r from-[#D4AF37] via-[#E2C374] to-[#B88E35] text-[#001730] font-semibold text-[11px] sm:text-xs tracking-[0.16em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(201,162,77,0.3)] hover:brightness-105 active:scale-[0.98]"
            >
              <span className="whitespace-nowrap">Practice Areas</span>
              <ArrowUpRight className="w-4 h-4 text-[#001730] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Secondary Navy Glass CTA */}
            <Link
              href="/contact"
              className="flex-1 sm:flex-initial group inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 rounded-[2px] border border-[#C9A24D]/40 bg-[#001730]/90 backdrop-blur-md text-[#E8D091] hover:text-white hover:border-[#D4AF37] hover:bg-[#002247] transition-all text-[11px] sm:text-xs tracking-[0.16em] uppercase font-semibold active:scale-[0.98]"
            >
              <span className="whitespace-nowrap">Consult Us</span>
              <ChevronRight className="w-4 h-4 text-[#C9A24D] transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 3. Bottom Architectural Navy Ribbon - Always Visible in 1 Screen */}
      <div className="relative z-10 w-full shrink-0 border-t border-[#C9A24D]/25 bg-[#001730]/95 backdrop-blur-md py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 text-center sm:text-left">
          {/* Chamber Jurisdiction */}
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[9.5px] xs:text-[10px] sm:text-[11px] font-mono tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#E8D091]/90">
            <span className="w-1 h-1 rounded-full bg-[#C9A24D] sm:hidden shrink-0" />
            <span>Apex Appellate & Commercial</span>
          </div>

          {/* Location Badge */}
          <div className="flex items-center justify-center gap-2 text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] font-mono tracking-[0.18em] uppercase text-slate-300/80">
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-[#C9A24D]/60" />
            <span>New Delhi</span>
            <span className="text-[#C9A24D]">•</span>
            <span>Pan-India</span>
          </div>
        </div>
      </div>
    </section>
  );
}