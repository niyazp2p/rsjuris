"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  ArrowUpRight,
  ShieldCheck,
  Scale,
  FileText,
  Home,
  Users2,
  Building2,
  Landmark,
  Gavel,
  CheckCircle2,
  HelpCircle,
  Eye,
  X,
} from "lucide-react";

const allIndividualServices = [
  { name: "Civil Disputes", desc: "Contract breaches, property claims, and civil suits", icon: Scale, featured: true },
  { name: "Criminal Matters", desc: "Defense representation, bail applications, and quashing", icon: ShieldCheck, featured: true },
  { name: "Property Disputes", desc: "Title disputes, inheritance partition, and boundary conflicts", icon: Home, featured: true },
  { name: "Matrimonial & Family Matters", desc: "Divorce, maintenance, custody, and family settlements", icon: Users2, featured: true },
  { name: "Employment Matters", desc: "Wrongful termination, service dues, and executive contracts", icon: Briefcase, featured: true },
  { name: "Consumer Disputes", desc: "Deficiency of service and unfair trade practice claims", icon: HelpCircle, featured: false },
  { name: "Recovery Claims", desc: "Debt recovery, summary suits, and commercial dues", icon: Landmark, featured: false },
  { name: "Legal Notices", desc: "Statutory demands, rejoinders, and formal contestations", icon: FileText, featured: false },
  { name: "Documentation & Agreements", desc: "Wills, deeds, gift instruments, and affidavits", icon: CheckCircle2, featured: false },
];

const allBusinessServices = [
  { name: "Contracts & Agreements", desc: "Commercial drafting, MSAs, vendor and licensing covenants", icon: FileText, featured: true },
  { name: "Corporate Documentation", desc: "Shareholder pacts, board charters, and JV instruments", icon: Building2, featured: true },
  { name: "Commercial Transactions", desc: "Asset deals, buyouts, and business restructuring", icon: Landmark, featured: true },
  { name: "Regulatory Compliance", desc: "FEMA, statutory disclosures, and ROC governance", icon: CheckCircle2, featured: true },
  { name: "Litigation & Arbitration", desc: "Ad-hoc, institutional arbitrations, and high court defense", icon: Gavel, featured: true },
  { name: "Employment Matters", desc: "HR policies, POSH compliance, and executive severance", icon: Briefcase, featured: false },
  { name: "Business Disputes", desc: "Partnership exits, director deadlock, and commercial claims", icon: Gavel, featured: false },
  { name: "Recovery Matters", desc: "Corporate debt enforcement, summary suits, and IBC filings", icon: Scale, featured: false },
  { name: "Legal Notices", desc: "Cease & desist, breach notifications, and statutory replies", icon: ShieldCheck, featured: false },
  { name: "Due Diligence", desc: "Title search, corporate audit, and transaction risk clearance", icon: HelpCircle, featured: false },
];

const featuredIndividuals = allIndividualServices.filter((s) => s.featured);
const featuredBusinesses = allBusinessServices.filter((s) => s.featured);

const ease = [0.16, 1, 0.3, 1] as const;

export default function ServicesSplit() {
  const [activeTab, setActiveTab] = useState<"individual" | "business">("individual");
  const [modalType, setModalType] = useState<"individual" | "business" | null>(null);

  const activeModalData =
    modalType === "individual"
      ? {
          title: "Personal Legal Matters",
          eyebrow: "Comprehensive Individual Advisory",
          badge: "09 Practice Areas",
          icon: User,
          ctaText: "Get Personal Legal Help",
          ctaHref: "/contact?type=individual",
          items: allIndividualServices,
        }
      : {
          title: "Commercial & Corporate Services",
          eyebrow: "Institutional Enterprise Counsel",
          badge: "10 Practice Areas",
          icon: Briefcase,
          ctaText: "Talk to Our Business Team",
          ctaHref: "/contact?type=business",
          items: allBusinessServices,
        };

  return (
    <section
      id="services-split"
      className="relative w-full py-14 sm:py-20 lg:py-32 bg-gradient-to-b from-[#0B2545] via-[#13315C] to-[#0B2545] text-slate-100 overflow-hidden selection:bg-[#C9A24D]/25 selection:text-[#E8D091]"
    >
      {/* Background Architectural Lattice & Radials */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#C9A24D_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute -top-32 left-1/4 w-[32rem] h-[32rem] rounded-full bg-[#134074]/40 blur-[130px]" />
        <div className="absolute -bottom-32 right-1/4 w-[36rem] h-[36rem] rounded-full bg-[#C9A24D]/10 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* Header Block with Tight Mobile Spacing */}
        <div className="text-left sm:text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-[#C9A24D]/35 bg-[#134074]/40 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37] shadow-[0_0_6px_#D4AF37] shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-[#E8D091] font-semibold">
              Tailored Legal Counsel
            </span>
          </div>

          <h2 className="font-serif text-[1.85rem] sm:text-4xl lg:text-5xl text-white font-light tracking-tight leading-[1.14]">
            Dedicated Representation for <br className="hidden sm:inline" />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6E5] via-[#EED192] to-[#D8B467]">
              Individuals & Businesses.
            </span>
          </h2>

          <p className="text-slate-300 text-[13.5px] sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Strategic, confidentiality-led advocacy calibrated to your legal standing—from personal statutory rights to complex corporate transactions.
          </p>
        </div>

        {/* Segmented Switcher for Mobile & Tablet */}
        <div className="flex lg:hidden justify-center mt-6 sm:mt-8">
          <div className="grid grid-cols-2 p-1 rounded-[3px] bg-[#07192E]/90 border border-[#C9A24D]/35 backdrop-blur-md w-full max-w-md gap-1">
            <button
              onClick={() => setActiveTab("individual")}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-[2px] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] transition-all cursor-pointer ${
                activeTab === "individual"
                  ? "bg-gradient-to-r from-[#C9A24D] via-[#DFBF6E] to-[#B38A33] text-[#001730] shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <User className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Individuals</span>
            </button>

            <button
              onClick={() => setActiveTab("business")}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-[2px] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] transition-all cursor-pointer ${
                activeTab === "business"
                  ? "bg-gradient-to-r from-[#C9A24D] via-[#DFBF6E] to-[#B38A33] text-[#001730] shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Businesses</span>
            </button>
          </div>
        </div>

        {/* Mobile View Single Panel */}
        <div className="block lg:hidden mt-6">
          <AnimatePresence mode="wait">
            {activeTab === "individual" ? (
              <motion.div
                key="mobile-individual"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease }}
                className="rounded-[3px] bg-[#FAF7F0] text-[#001730] p-4 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)] border border-[#C9A24D]/40 relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#C9A24D] to-transparent" />

                {/* Card Top Strip with Aligned Header and Eye Action */}
                <div className="flex items-center justify-between pb-4 border-b border-[#96702A]/20 gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-[2px] bg-[#0B2545] text-[#D4AF37] border border-[#C9A24D]/35 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] uppercase font-sans tracking-[0.18em] text-[#96702A] font-semibold block leading-none truncate">
                        Private Advocacy
                      </span>
                      <h3 className="font-serif text-lg font-medium text-[#001730] mt-0.5 leading-tight truncate">
                        For Individuals
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => setModalType("individual")}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[2px] bg-[#0B2545]/10 hover:bg-[#0B2545] text-[#0B2545] hover:text-[#E8D091] text-[11px] font-sans font-medium transition-colors shrink-0"
                    aria-label="View all individual services"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#96702A]" />
                    <span>View (9)</span>
                  </button>
                </div>

                {/* 5 Core Services List */}
                <div className="mt-3.5 space-y-2">
                  {featuredIndividuals.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-2.5 rounded-[2px] bg-white border border-[#96702A]/15 shadow-xs"
                      >
                        <div className="p-1.5 rounded-[2px] bg-[#FAF7F0] text-[#96702A] shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[13px] font-serif font-medium text-[#001730] leading-snug">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-500 font-sans mt-0.5 leading-tight">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Primary CTA */}
                <div className="mt-5 pt-4 border-t border-[#96702A]/20">
                  <Link
                    href="/contact?type=individual"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-[2px] bg-gradient-to-r from-[#C9A24D] via-[#DFBF6E] to-[#B38A33] text-[#001730] font-semibold text-xs uppercase tracking-[0.14em] shadow-md text-center"
                  >
                    <span>Get Personal Legal Help</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#001730]" />
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="mobile-business"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease }}
                className="rounded-[3px] bg-[#FAF7F0] text-[#001730] p-4 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)] border border-[#C9A24D]/40 relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#C9A24D] to-transparent" />

                {/* Card Top Strip with Aligned Header and Eye Action */}
                <div className="flex items-center justify-between pb-4 border-b border-[#96702A]/20 gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-[2px] bg-[#0B2545] text-[#D4AF37] border border-[#C9A24D]/35 flex items-center justify-center shrink-0">
                      <Briefcase className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] uppercase font-sans tracking-[0.18em] text-[#96702A] font-semibold block leading-none truncate">
                        Enterprise Counsel
                      </span>
                      <h3 className="font-serif text-lg font-medium text-[#001730] mt-0.5 leading-tight truncate">
                        For Businesses
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => setModalType("business")}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[2px] bg-[#0B2545]/10 hover:bg-[#0B2545] text-[#0B2545] hover:text-[#E8D091] text-[11px] font-sans font-medium transition-colors shrink-0"
                    aria-label="View all business services"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#96702A]" />
                    <span>View (10)</span>
                  </button>
                </div>

                {/* 5 Core Services List */}
                <div className="mt-3.5 space-y-2">
                  {featuredBusinesses.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-2.5 rounded-[2px] bg-white border border-[#96702A]/15 shadow-xs"
                      >
                        <div className="p-1.5 rounded-[2px] bg-[#FAF7F0] text-[#96702A] shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[13px] font-serif font-medium text-[#001730] leading-snug">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-500 font-sans mt-0.5 leading-tight">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Primary CTA */}
                <div className="mt-5 pt-4 border-t border-[#96702A]/20">
                  <Link
                    href="/contact?type=business"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-[2px] bg-[#0B2545] text-[#E8D091] border border-[#C9A24D]/40 font-semibold text-xs uppercase tracking-[0.14em] shadow-md text-center"
                  >
                    <span>Talk to Our Business Team</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop View Side-by-Side Panels */}
        <div className="hidden lg:grid mt-16 grid-cols-2 gap-8 items-stretch">
          {/* FOR INDIVIDUALS */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease }}
            className="rounded-[3px] bg-[#FAF7F0] text-[#001730] p-8 lg:p-9 shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-[#C9A24D]/40 hover:border-[#D4AF37] transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#C9A24D] via-[#DFBF6E] to-[#B38A33]" />

            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#96702A]/20">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-[2px] bg-[#0B2545] text-[#D4AF37] border border-[#C9A24D]/35 flex items-center justify-center shadow-sm">
                    <User className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#96702A] font-semibold block">
                      Private Advocacy
                    </span>
                    <h3 className="font-serif text-2xl font-medium text-[#001730]">
                      For Individuals
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setModalType("individual")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-white hover:bg-[#0B2545] text-[#001730] hover:text-[#E8D091] border border-[#96702A]/20 transition-all cursor-pointer shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5 text-[#96702A]" />
                  <span className="text-[11px] font-sans font-medium">All Services (9)</span>
                </button>
              </div>

              <div className="mt-6 space-y-2.5">
                {featuredIndividuals.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="group/item flex items-start gap-3 p-2.5 rounded-[2px] bg-white/70 hover:bg-white border border-[#96702A]/10 hover:border-[#96702A]/35 transition-all"
                    >
                      <div className="p-1.5 rounded-[2px] bg-[#FAF7F0] text-[#96702A] group-hover/item:text-[#0B2545] transition-colors shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13px] font-serif font-medium text-[#001730] group-hover/item:text-[#96702A] transition-colors">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-sans tracking-tight">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#96702A]/20">
              <Link
                href="/contact?type=individual"
                className="group flex items-center justify-center gap-2.5 w-full py-3.5 rounded-[2px] bg-gradient-to-r from-[#C9A24D] via-[#DFBF6E] to-[#B38A33] hover:brightness-110 text-[#001730] font-semibold text-xs uppercase tracking-[0.16em] transition-all shadow-[0_4px_16px_rgba(201,162,77,0.25)]"
              >
                <span>Get Personal Legal Help</span>
                <ArrowUpRight className="w-4 h-4 text-[#001730] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* FOR BUSINESSES */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease }}
            className="rounded-[3px] bg-[#FAF7F0] text-[#001730] p-8 lg:p-9 shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-[#C9A24D]/40 hover:border-[#D4AF37] transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0B2545] via-[#13315C] to-[#0B2545]" />

            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#96702A]/20">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-[2px] bg-[#0B2545] text-[#D4AF37] border border-[#C9A24D]/35 flex items-center justify-center shadow-sm">
                    <Briefcase className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#96702A] font-semibold block">
                      Enterprise Counsel
                    </span>
                    <h3 className="font-serif text-2xl font-medium text-[#001730]">
                      For Businesses
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setModalType("business")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-white hover:bg-[#0B2545] text-[#001730] hover:text-[#E8D091] border border-[#96702A]/20 transition-all cursor-pointer shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5 text-[#96702A]" />
                  <span className="text-[11px] font-sans font-medium">All Services (10)</span>
                </button>
              </div>

              <div className="mt-6 space-y-2.5">
                {featuredBusinesses.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="group/item flex items-start gap-3 p-2.5 rounded-[2px] bg-white/70 hover:bg-white border border-[#96702A]/10 hover:border-[#96702A]/35 transition-all"
                    >
                      <div className="p-1.5 rounded-[2px] bg-[#FAF7F0] text-[#96702A] group-hover/item:text-[#0B2545] transition-colors shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13px] font-serif font-medium text-[#001730] group-hover/item:text-[#96702A] transition-colors">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-sans tracking-tight">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#96702A]/20">
              <Link
                href="/contact?type=business"
                className="group flex items-center justify-center gap-2.5 w-full py-3.5 rounded-[2px] bg-[#0B2545] hover:bg-[#13315C] text-[#E8D091] border border-[#C9A24D]/40 font-semibold text-xs uppercase tracking-[0.16em] transition-all shadow-[0_4px_16px_rgba(11,37,69,0.22)]"
              >
                <span>Talk to Our Business Team</span>
                <ArrowUpRight className="w-4 h-4 text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full Catalog Modal with Responsive Layout */}
      <AnimatePresence>
        {modalType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalType(null)}
              className="fixed inset-0 bg-[#001730]/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 14 }}
              transition={{ duration: 0.28, ease }}
              className="relative w-full max-w-3xl rounded-[3px] bg-[#FAF7F0] text-[#001730] p-4 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-[#C9A24D]/50 z-10 overflow-hidden max-h-[90vh] flex flex-col justify-between"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#C9A24D] via-[#EED192] to-[#96702A]" />

              <button
                onClick={() => setModalType(null)}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-slate-500 hover:text-[#001730] hover:bg-slate-200/60 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto pr-1 space-y-4">
                {/* Modal Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-[#96702A]/20">
                  <div className="w-10 h-10 rounded-[2px] bg-[#0B2545] text-[#D4AF37] border border-[#C9A24D]/35 flex items-center justify-center shrink-0">
                    <activeModalData.icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 pr-8">
                    <div className="text-[9.5px] uppercase font-sans tracking-[0.2em] text-[#96702A] font-semibold truncate">
                      {activeModalData.eyebrow}
                    </div>
                    <h3 className="font-serif text-lg sm:text-2xl text-[#001730] font-medium tracking-tight truncate">
                      {activeModalData.title}
                    </h3>
                  </div>
                </div>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {activeModalData.items.map((service, idx) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-[2px] bg-white border border-[#96702A]/15 shadow-xs"
                      >
                        <div className="p-1.5 rounded-[2px] bg-[#FAF7F0] text-[#96702A] shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs sm:text-[13px] font-serif font-medium text-[#001730] flex items-center gap-1.5">
                            <span className="truncate">{service.name}</span>
                            {service.featured && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#96702A] shrink-0" title="Core Focus" />
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 font-sans mt-0.5 leading-snug">
                            {service.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="mt-4 pt-3.5 border-t border-[#96702A]/20 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <span className="hidden sm:inline text-[11px] text-slate-500 font-sans">
                  Direct consultation with senior litigation partners.
                </span>

                <Link
                  href={activeModalData.ctaHref}
                  onClick={() => setModalType(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[2px] bg-[#0B2545] hover:bg-[#13315C] text-[#E8D091] text-xs font-semibold uppercase tracking-[0.14em] transition-all shadow-md text-center"
                >
                  <span>{activeModalData.ctaText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}