"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  CalendarCheck,
} from "lucide-react";

// Fields mapped directly from PRD Section 6.8 ("Contact Us")
const contactDetails = [
  {
    icon: MapPin,
    title: "Chamber Address",
    primary: "Chambers of RS Juris & Co.",
    secondary: "Supreme Court & Delhi High Court Bar Chambers",
    detail: "New Delhi, Delhi 110001, India",
    actionLabel: "View on Map",
    actionHref: "https://maps.google.com",
  },
  {
    icon: Phone,
    title: "Direct Registry Lines",
    primary: "+91 (011) 2338-XXXX",
    secondary: "+91 98100 XXXXX",
    detail: "Prior appointment required for senior briefings",
    actionLabel: "Call Registry",
    actionHref: "tel:+9198100XXXXX",
  },
  {
    icon: Mail,
    title: "Official Communication",
    primary: "contact@rsjuris.com",
    secondary: "registry@rsjuris.com",
    detail: "Strict non-disclosure & fiduciary discretion observed",
    actionLabel: "Email Registry",
    actionHref: "mailto:contact@rsjuris.com",
  },
  {
    icon: Clock,
    title: "Chamber Hours",
    primary: "Monday – Friday: 09:30 AM – 07:30 PM",
    secondary: "Saturday: 10:00 AM – 03:00 PM (By Appointment)",
    detail: "Court vacation & urgent filing desk operational",
    actionLabel: "Schedule Slot",
    actionHref: "/contact",
  },
];

export default function PreFooterContact() {
  return (
    <section
      id="chamber-access"
      className="relative w-full py-16 sm:py-24 lg:py-28 bg-[#FAF7F0] text-[#0B2545] overflow-hidden selection:bg-[#C9A24D]/25 selection:text-[#0B2545]"
    >
      {/* Background Architectural Lattice Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#0B2545_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* Subtle Warm Brass Ambient Light */}
      <div className="absolute top-1/4 -left-36 w-80 h-80 rounded-full bg-[#C9A24D]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[#13315C]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* 1. Header & Call-to-Action Placed Directly on Canvas */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 sm:pb-14 border-b border-[#96702A]/20">
          <div className="space-y-3.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-[#96702A]/25 bg-[#0B2545]/[0.04]">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#96702A] shadow-[0_0_6px_#96702A] shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#96702A] font-semibold">
                Direct Chamber Registry
              </span>
            </div>

            <div className="flex items-center gap-4 sm:gap-5 pt-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white p-1 border-2 border-[#C9A24D] shadow-[0_0_18px_rgba(201,162,77,0.22)] ring-4 ring-[#FAF7F0] overflow-hidden shrink-0"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                  <Image
                    src="/logo.jpeg"
                    alt="RS Juris & Co. Official Seal"
                    fill
                    priority
                    quality={95}
                    className="object-contain p-1"
                  />
                </div>
              </motion.div>

              <div>
                <h2 className="font-serif text-2xl sm:text-4xl lg:text-[2.6rem] text-[#0B2545] font-light tracking-tight leading-[1.14]">
                  Schedule a Consultation. <br className="hidden sm:inline" />
                  <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#96702A] via-[#B38A33] to-[#735218]">
                    Engage Our Chambers.
                  </span>
                </h2>
              </div>
            </div>

            <p className="text-slate-600 text-[13.5px] sm:text-base font-light leading-relaxed max-w-xl">
              Direct access to our senior advocates, litigation defense teams, and corporate advisory partners across Indian judicial forums.
            </p>
          </div>

          {/* Action Buttons Hub */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-[2px] bg-[#0B2545] hover:bg-[#13315C] text-[#E8D091] border border-[#C9A24D]/40 font-semibold text-xs uppercase tracking-[0.16em] transition-all shadow-[0_4px_16px_rgba(11,37,69,0.18)] text-center w-full sm:w-auto"
            >
              <span>Initiate Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <a
              href="tel:+9198100XXXXX"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-[2px] border border-[#96702A]/35 hover:border-[#96702A] bg-transparent hover:bg-white/60 text-[#0B2545] text-xs font-semibold uppercase tracking-[0.14em] transition-colors text-center w-full sm:w-auto"
            >
              <Phone className="w-3.5 h-3.5 text-[#96702A]" />
              <span>Call Registry</span>
            </a>
          </div>
        </div>

        {/* 2. Seamless Architectural Tiles Placed Seamlessly on the #FAF7F0 Canvas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-10 sm:pt-14">
          {contactDetails.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between p-5 sm:p-6 rounded-[2px] border border-[#96702A]/20 bg-white/40 hover:bg-white/80 transition-all duration-300 group hover:border-[#96702A]/45 hover:shadow-[0_8px_24px_rgba(150,112,42,0.06)]"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-[2px] bg-[#FAF7F0] border border-[#96702A]/30 text-[#96702A] group-hover:bg-[#0B2545] group-hover:text-[#D4AF37] group-hover:border-[#0B2545] transition-colors duration-300 flex items-center justify-center">
                      <Icon className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase font-sans tracking-[0.18em] text-[#96702A] font-semibold">
                      {item.title}
                    </div>
                    <div className="font-serif text-[14.5px] font-medium text-[#0B2545] mt-1 leading-snug">
                      {item.primary}
                    </div>
                    <div className="text-xs text-slate-600 font-light mt-0.5 leading-snug">
                      {item.secondary}
                    </div>
                  </div>

                  <p className="text-[11.5px] text-slate-500 font-sans font-light leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#96702A]/15 flex items-center justify-between">
                  <a
                    href={item.actionHref}
                    className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold uppercase tracking-wider text-[#0B2545] hover:text-[#96702A] transition-colors"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#96702A]" />
                  </a>
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#C9A24D] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Bottom Trust Guarantee Strip */}
        {/* <div className="mt-12 sm:mt-16 pt-6 border-t border-[#96702A]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-slate-500 font-light">
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-[#96702A] shrink-0" />
            <span>Advocate-Client privilege and strict confidentiality maintained per statutory codes.</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-3.5 h-3.5 text-[#0B2545] shrink-0" />
            <span className="text-[#0B2545] font-medium">Urgent High Court & SLP mentions handled on priority[cite: 10].</span>
          </div>
        </div> */}
      </div>
    </section>
  );
}