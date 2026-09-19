"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Scale, ShieldCheck, Award, MapPin } from "lucide-react";

const stats = [
  {
    icon: Scale,
    value: "9+",
    label: "Practice Verticals",
  },
  {
    icon: Award,
    value: "Apex & High Courts",
    label: "Litigation & Dispute",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Fiduciary Integrity",
  },
  {
    icon: MapPin,
    value: "Pan-India",
    label: "Jurisdictional Advisory",
  },
];

const easeCurve = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100svh-76px)] lg:h-[calc(100vh-76px)] lg:min-h-[640px] lg:max-h-[880px] flex flex-col justify-between overflow-hidden bg-[#001730] text-slate-100 selection:bg-[#C9A24D]/25 selection:text-[#E8D091]">
      {/* 1. Fluid Ambient Background Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Mobile Portrait Asset - Smooth entrance without dizzying loops */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0.3 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: easeCurve }}
          className="relative block sm:hidden w-full h-full"
        >
          <Image
            src="/mobilebanner.png"
            alt="Chambers of RS Juris & Co."
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-[center_28%] filter brightness-[0.88] contrast-[1.04]"
          />
        </motion.div>

        {/* Desktop Landscape Asset */}
        <motion.div
          initial={{ scale: 1.04, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: easeCurve }}
          className="relative hidden sm:block w-full h-full"
        >
          <Image
            src="/banner1.png"
            alt="Chambers of RS Juris & Co."
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-[72%_center] md:object-[78%_center] lg:object-[86%_center] xl:object-right filter brightness-[0.85] contrast-[1.04]"
          />
        </motion.div>

        {/* Optical Scrims */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="absolute inset-0 bg-gradient-to-b from-[#001730]/75 via-[#001730]/45 to-[#001730]/90 sm:hidden"
        />
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#001730] via-[#001730]/90 md:via-[#001730]/75 to-transparent w-full md:w-[68%] lg:w-[58%]" />
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#001730] via-transparent to-[#001730]/40" />

        {/* Warm Ambient Gold Radial Glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.04, 0.09, 0.04], scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-6 sm:left-10 w-72 sm:w-[32rem] h-72 sm:h-[32rem] rounded-full bg-[#C9A24D]/15 blur-[100px] sm:blur-[140px]"
        />
      </div>

      {/* 2. Executive Copy & Staggered Entrance Elements */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 pt-8 sm:pt-12 my-auto">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: easeCurve }}
            className="relative inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-4 sm:mb-5 rounded-[2px] border border-[#C9A24D]/30 bg-[#001730]/85 backdrop-blur-md overflow-hidden shadow-sm"
          >
            {/* Subtle Glint Sweep */}
            <motion.span
              animate={{ x: ["-150%", "200%"] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", repeatDelay: 2.5 }}
              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent skew-x-12 pointer-events-none"
            />
            <span className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37] bg-[#D4AF37]/40 shadow-[0_0_8px_#D4AF37] shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#E8D091] font-semibold">
              Chambers of RS Juris & Co. • Advocates
            </span>
          </motion.div>

          {/* Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: easeCurve }}
            className="font-serif text-[2.15rem] sm:text-5xl lg:text-[3.75rem] text-white font-light tracking-tight leading-[1.1] sm:leading-[1.08]"
          >
            Trusted Legal Counsel. <br />
            Strategic Representation. <br />
            <span className="relative inline-block font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6E5] via-[#EED192] to-[#D8B467] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              Decisive Execution.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: easeCurve }}
            className="mt-3.5 sm:mt-5 max-w-lg text-[13.5px] sm:text-base text-slate-300/90 font-light leading-relaxed antialiased"
          >
            Delivering high-precision commercial litigation, regulatory counsel, and
            constitutional advocacy across the Supreme Court of India and High Courts.
          </motion.p>
        </div>

        {/* Action Suite */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: easeCurve }}
          className="mt-7 sm:mt-10 flex flex-row items-center sm:justify-end gap-2.5 sm:gap-4 w-full"
        >
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="flex-1 sm:flex-initial">
            <Link
              href="#practice-areas"
              className="relative group overflow-hidden flex items-center justify-center gap-2 px-4 sm:px-7 py-3 rounded-[2px] bg-gradient-to-r from-[#C9A24D] via-[#DFBF6E] to-[#B38A33] text-[#001730] font-semibold text-[11px] sm:text-xs tracking-[0.14em] uppercase shadow-[0_4px_22px_rgba(201,162,77,0.25)] text-center w-full transition-all duration-300 hover:brightness-105"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative z-10 whitespace-nowrap">Practice Areas</span>
              <ArrowUpRight className="relative z-10 w-3.5 h-3.5 text-[#001730] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="flex-1 sm:flex-initial">
            <Link
              href="#contact"
              className="relative group flex items-center justify-center gap-1.5 px-4 sm:px-7 py-3 rounded-[2px] border border-[#C9A24D]/40 bg-[#001730]/80 backdrop-blur-md text-[#E8D091] transition-all duration-300 hover:border-[#D4AF37] hover:text-white hover:bg-[#001730] text-[11px] sm:text-xs tracking-[0.14em] uppercase font-medium text-center w-full shadow-sm"
            >
              <span className="whitespace-nowrap">Consult Us</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* 3. Strip: Continuous Flow Marquee on Mobile / Crisp Animated Grid on Desktop */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: easeCurve }}
        className="relative z-10 w-full border-t border-[#C9A24D]/15 bg-[#00142B]/95 sm:bg-[#00142B]/90 backdrop-blur-xl overflow-hidden py-3 sm:py-4"
      >
        {/* Soft Edge Masking for Mobile Ribbon */}
        <div className="sm:hidden absolute left-0 inset-y-0 w-8 bg-gradient-to-r from-[#00142B] to-transparent z-20 pointer-events-none" />
        <div className="sm:hidden absolute right-0 inset-y-0 w-8 bg-gradient-to-l from-[#00142B] to-transparent z-20 pointer-events-none" />

        {/* Mobile View: Smooth Gliding Marquee Strip */}
        <div className="flex sm:hidden w-full overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex flex-nowrap items-center gap-3 shrink-0 will-change-transform"
          >
            {[...stats, ...stats].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-[2px] border border-white/[0.08] bg-white/[0.03] shrink-0"
                >
                  <div className="p-1.5 rounded-[2px] border border-[#C9A24D]/30 bg-[#001730] text-[#D4AF37] shrink-0">
                    <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                  </div>
                  <div className="whitespace-nowrap">
                    <div className="font-serif text-xs font-normal text-white tracking-wide">
                      {item.value}
                    </div>
                    <div className="text-[10px] text-[#E8D091]/85 font-sans tracking-tight">
                      {item.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Desktop View: Architectural Grid with Staggered Entrance */}
        <div className="hidden sm:block max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.65 + idx * 0.08, ease: easeCurve }}
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-3 group transition-colors duration-300"
                >
                  <div className="p-2 rounded-[2px] border border-[#C9A24D]/25 bg-[#001730] text-[#D4AF37] shrink-0 transition-all duration-300 group-hover:border-[#D4AF37]/70 group-hover:bg-[#C9A24D]/15 group-hover:shadow-[0_0_12px_rgba(201,162,77,0.2)]">
                    <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-serif text-sm sm:text-base font-normal text-white tracking-wide truncate">
                      {item.value}
                    </div>
                    <div className="text-[11px] text-[#E8D091]/80 font-sans tracking-tight truncate">
                      {item.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}