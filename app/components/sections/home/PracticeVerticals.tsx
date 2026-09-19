"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants, type PanInfo } from "framer-motion";
import {
  Building2,
  Gavel,
  ShieldAlert,
  Home,
  Users2,
  Briefcase,
  Landmark,
  Scale,
  Handshake,
  Eye,
  ArrowUpRight,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

interface PracticeVertical {
  id: string;
  name: string;
  icon: React.ElementType;
  tagline: string;
  summary: string;
  detailedOverview: string;
  keyHighlights: string[];
  href: string;
}

const practiceVerticals: PracticeVertical[] = [
  {
    id: "corporate-commercial",
    name: "Corporate & Commercial Law",
    icon: Building2,
    tagline: "Mergers, Governance & Strategic Contracts",
    summary:
      "Advising enterprise boards, founders, and cross-border ventures on corporate compliance, M&A transactions, and shareholder agreements.",
    detailedOverview:
      "Our Corporate & Commercial practice acts as institutional counsel across high-value mergers and acquisitions, joint ventures, regulatory compliance frameworks, and corporate structuring. We minimize transactional friction while safeguarding fiduciary interests against regulatory scrutiny.",
    keyHighlights: [
      "Cross-Border M&A & Private Equity",
      "Corporate Governance & Board Advisory",
      "Commercial Contracts & Licensing",
      "Foreign Exchange Management (FEMA)",
    ],
    href: "/practice-areas/corporate-commercial",
  },
  {
    id: "civil-litigation",
    name: "Civil Litigation & Dispute Resolution",
    icon: Gavel,
    tagline: "Appellate Advocacy & High-Stakes Suits",
    summary:
      "Formidable courtroom representation across High Courts and the Supreme Court of India in commercial, civil, and constitutional disputes.",
    detailedOverview:
      "We provide seasoned advocacy before original and appellate jurisdictions nationwide. From high-value breach-of-contract trials and recovery suits to constitutional writ proceedings, our litigation chambers prioritize strategic precision and interim injunctive relief.",
    keyHighlights: [
      "Commercial Suits & Injunctions",
      "Supreme Court Special Leave Petitions",
      "Writ Jurisdiction & Constitutional Writs",
      "Specific Performance & Recovery",
    ],
    href: "/practice-areas/civil-litigation",
  },
  {
    id: "criminal-law",
    name: "Criminal Law & White-Collar Defense",
    icon: ShieldAlert,
    tagline: "Economic Offenses & Trial Representation",
    summary:
      "Strategic trial and defense counsel covering economic offenses, enforcement agency inquiries, and constitutional liberty safeguards.",
    detailedOverview:
      "Handling complex white-collar crime defenses, corporate investigations, prevention of money laundering proceedings (PMLA), and specialized financial fraud investigations. We ensure robust pre-arrest protection, bail advocacy, and cross-examination at trial.",
    keyHighlights: [
      "PMLA, CBI & ED Defense Advocacy",
      "Corporate Fraud & Insider Investigations",
      "Anticipatory & Regular Bail Petitions",
      "Statutory Quashing Proceedings",
    ],
    href: "/practice-areas/criminal-law",
  },
  {
    id: "property-real-estate",
    name: "Property & Real Estate Law",
    icon: Home,
    tagline: "Title Forensics, RERA & Infrastructure",
    summary:
      "Comprehensive real estate title due diligence, regulatory clearances, builder-buyer disputes, and property litigation.",
    detailedOverview:
      "Providing institutional real estate advisory covering multi-jurisdictional title searches, infrastructure concession agreements, and high-stakes builder-buyer litigation before RERA authorities, appellate tribunals, and civil courts.",
    keyHighlights: [
      "Comprehensive Title Search & Due Diligence",
      "RERA Litigation & Developer Disputes",
      "Leasehold Structuring & Land Acquisition",
      "Partition Suits & Boundary Settlements",
    ],
    href: "/practice-areas/property-real-estate",
  },
  {
    id: "family-matrimonial",
    name: "Family & Matrimonial Law",
    icon: Users2,
    tagline: "Private Wealth, Estates & Family Settlements",
    summary:
      "Discreet advisory for family succession, trust structuring, matrimonial proceedings, and multi-asset partition settlements.",
    detailedOverview:
      "Our chambers manage sensitive domestic relations, high-net-worth matrimonial disputes, custody litigation, and multi-generational estate partitioning with utmost discretion and empathetic fiduciary care.",
    keyHighlights: [
      "HNW Matrimonial & Divorce Proceedings",
      "Child Custody & Guardianship Litigations",
      "Private Family Trusts & Estate Succession",
      "Amicable Mediation & Asset Settlement",
    ],
    href: "/practice-areas/family-matrimonial",
  },
  {
    id: "employment-labour",
    name: "Employment & Labour Law",
    icon: Briefcase,
    tagline: "Workforce Restructuring & Executive Covenants",
    summary:
      "Guiding corporations through industrial relations, statutory labor compliance, POSH implementation, and executive contracts.",
    detailedOverview:
      "We counsel multinational employers and leadership on non-compete enforceability, trade secret preservation, collective bargaining negotiations, industrial tribunal defense, and statutory workplace regulations.",
    keyHighlights: [
      "Executive Severance & Non-Compete Agreements",
      "Workplace POSH Audits & Inquiries",
      "Industrial Disputes & Labor Tribunal Trials",
      "Redundancy & Workforce Restructuring",
    ],
    href: "/practice-areas/employment-labour",
  },
  {
    id: "banking-financial",
    name: "Banking & Financial Disputes",
    icon: Landmark,
    tagline: "Insolvency, DRT & Structured Debt Recovery",
    summary:
      "Representing financial institutions, corporate debtors, and creditors in IBC insolvency processes, DRT proceedings, and debt restructuring.",
    detailedOverview:
      "Expert representation across National Company Law Tribunals (NCLT) and the appellate forum (NCLAT) for corporate insolvency resolution, asset liquidation, SARFAESI enforcement, and consortium loan disputes.",
    keyHighlights: [
      "IBC Corporate Insolvency (CIRP) Proceedings",
      "Debt Recovery Tribunals (DRT / DRAT)",
      "SARFAESI Enforcement & Security Actions",
      "Debt Restructuring & Resolution Plans",
    ],
    href: "/practice-areas/banking-financial",
  },
  {
    id: "intellectual-property",
    name: "Intellectual Property Rights",
    icon: Scale,
    tagline: "Trademark, Patent & Copyright Protection",
    summary:
      "Holistic IP portfolio prosecution, registration, passing-off injunctions, and anti-counterfeiting enforcement.",
    detailedOverview:
      "Safeguarding intangible assets through trademark prosecution, patent filing strategies, copyright litigation, design registration, and urgent dynamic injunctions against trademark infringement.",
    keyHighlights: [
      "Trademark & Patent Portfolio Management",
      "Passing-Off & Trademark Infringement Suits",
      "Trade Secret Protection & NDAs",
      "Domain Name & Digital Piracy Injunctions",
    ],
    href: "/practice-areas/intellectual-property",
  },
  {
    id: "arbitration-adr",
    name: "Arbitration & Alternative Dispute Resolution",
    icon: Handshake,
    tagline: "Domestic & International Commercial Tribunals",
    summary:
      "Strategic arbitral representation and post-award enforcement under the Arbitration and Conciliation Act.",
    detailedOverview:
      "Appearing before ad-hoc and institutional tribunals (SIAC, LCIA, MCIA) in domestic and cross-border commercial claims, challenging or defending arbitral awards under Section 34/37, and securing Section 9 interim measures.",
    keyHighlights: [
      "Institutional & Ad-Hoc Commercial Arbitrations",
      "Enforcement & Section 34 Award Challenges",
      "Section 9 Interim Protection Applications",
      "Commercial Mediation & Conciliation",
    ],
    href: "/practice-areas/arbitration-adr",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

// Desktop variants
const desktopContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const desktopCardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

// Mobile cyclic swipe variants
const swipeVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 140 : -140,
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 320, damping: 32 },
      opacity: { duration: 0.28 },
      scale: { duration: 0.28 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 140 : -140,
    opacity: 0,
    scale: 0.94,
    transition: {
      x: { type: "spring" as const, stiffness: 320, damping: 32 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  }),
};

export default function PracticeVerticals() {
  const [activeModal, setActiveModal] = useState<PracticeVertical | null>(null);
  
  // Mobile cyclic slider state
  const [[currentIndex, direction], setPage] = useState<[number, number]>([0, 0]);

  const paginate = (newDirection: number) => {
    setPage(([prevIndex]) => {
      const nextIndex =
        (prevIndex + newDirection + practiceVerticals.length) % practiceVerticals.length;
      return [nextIndex, newDirection];
    });
  };

  const handleDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    const swipeConfidenceThreshold = 10000;
    const swipePower = Math.abs(offset.x) * velocity.x;

    if (swipePower < -swipeConfidenceThreshold || offset.x < -60) {
      paginate(1);
    } else if (swipePower > swipeConfidenceThreshold || offset.x > 60) {
      paginate(-1);
    }
  };

  const currentItem = practiceVerticals[currentIndex];
  const CurrentIcon = currentItem.icon;

  return (
    <section
      id="practice-areas"
      className="relative w-full py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-[#0B2545] via-[#13315C] to-[#0B2545] text-slate-100 overflow-hidden selection:bg-[#C9A24D]/25 selection:text-[#E8D091]"
    >
      {/* 1. Refined Ambient Glow & Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#C9A24D_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] rounded-full bg-[#134074]/50 blur-[130px]" />
        <div className="absolute top-1/2 -right-40 w-[38rem] h-[38rem] rounded-full bg-[#C9A24D]/10 blur-[150px]" />
        <div className="absolute -bottom-32 left-1/3 w-[30rem] h-[30rem] rounded-full bg-[#1D4E89]/40 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 lg:px-16">
        
        {/* 2. Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-8 sm:pb-16 border-b border-[#C9A24D]/20">
          <div className="max-w-2xl space-y-2.5 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-[#C9A24D]/35 bg-[#134074]/40 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37] shadow-[0_0_6px_#D4AF37]" />
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#E8D091] font-semibold truncate">
                Chambers Specializations
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-white font-light tracking-tight leading-[1.14]">
              Core Practice <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6E5] via-[#EED192] to-[#D8B467]">Verticals.</span>
            </h2>

            <p className="text-slate-300/90 text-[13.5px] sm:text-base font-light leading-relaxed max-w-xl">
              Precision legal counsel, structured litigation defense, and institutional corporate advisory spanning nine specialized disciplines across India.
            </p>
          </div>

          {/* Desktop Counter Block */}
          <div className="hidden md:flex items-center gap-4 p-3.5 sm:p-4 rounded-[2px] border border-white/10 bg-white/[0.04] backdrop-blur-sm self-end">
            <div className="font-serif text-3xl sm:text-4xl font-light text-[#E8D091] tracking-tight">
              09
            </div>
            <div className="text-[11px] uppercase tracking-wider text-slate-300 font-sans leading-tight">
              Specialized <br />
              Verticals
            </div>
          </div>
        </div>

        {/* 3. MOBILE VIEW: CYCLIC SWIPE STACK (Zero Scroll Overhead) */}
        <div className="block md:hidden mt-7">
          {/* Header Bar with Counter & Navigation Pill Buttons */}
          <div className="flex items-center justify-between mb-3.5 px-1">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-sm font-semibold text-[#E8D091]">
                {(currentIndex + 1).toString().padStart(2, "0")}
              </span>
              <span className="text-[11px] font-mono text-slate-400">/ 09</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => paginate(-1)}
                className="p-2 rounded-[2px] border border-[#C9A24D]/30 bg-[#134074]/50 text-[#E8D091] active:scale-90 transition-transform"
                aria-label="Previous vertical"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => paginate(1)}
                className="p-2 rounded-[2px] border border-[#C9A24D]/30 bg-[#134074]/50 text-[#E8D091] active:scale-90 transition-transform"
                aria-label="Next vertical"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Touch Swiper Container */}
          <div className="relative h-[340px] w-full flex items-center justify-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={swipeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={handleDragEnd}
                className="absolute inset-x-0 top-0 bottom-0 rounded-[3px] bg-[#FAF7F0] text-[#001730] p-6 shadow-[0_12px_35px_rgba(0,0,0,0.22)] border border-[#C9A24D]/40 flex flex-col justify-between cursor-grab active:cursor-grabbing select-none"
              >
                {/* Gold Sheen Line Top */}
                <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#C9A24D] to-transparent" />

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-[2px] bg-[#0B2545] text-[#D4AF37] border border-[#C9A24D]/30 flex items-center justify-center shadow-sm">
                      <CurrentIcon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <span className="text-[10px] font-sans font-semibold tracking-[0.2em] text-[#96702A] uppercase">
                      Swipe or Tap
                    </span>
                  </div>

                  {/* Title & Tagline with strict baseline alignment */}
                  <h3 className="font-serif text-xl font-medium text-[#001730] tracking-tight leading-snug line-clamp-2">
                    {currentItem.name}
                  </h3>
                  <div className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.14em] text-[#96702A] mt-1 mb-2.5 truncate">
                    {currentItem.tagline}
                  </div>

                  {/* Summary Text clamped to avoid vertical stretch */}
                  <p className="text-slate-700 text-[13px] font-light leading-relaxed line-clamp-3">
                    {currentItem.summary}
                  </p>
                </div>

                {/* Bottom Interactive Bar */}
                <div className="pt-3 border-t border-[#96702A]/15 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModal(currentItem)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#001730] text-[#E8D091] text-xs font-medium"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Quick View</span>
                  </button>

                  <Link
                    href={`#contact?practice=${currentItem.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-[0.14em] text-[#001730] font-semibold"
                  >
                    <span>Engage</span>
                    <div className="w-6 h-6 rounded-full bg-[#96702A] flex items-center justify-center">
                      <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Cyclic Micro-Indicators (Pagination Dots) */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {practiceVerticals.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage([idx, idx > currentIndex ? 1 : -1])}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-6 bg-[#E8D091]" : "w-1.5 bg-white/20"
                }`}
                aria-label={`Jump to vertical ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 4. DESKTOP VIEW: FULL 9-CARD GRID */}
        <motion.div
          variants={desktopContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="hidden md:grid mt-16 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
        >
          {practiceVerticals.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={desktopCardVariants}
                whileHover={{ y: -5 }}
                className="group relative flex flex-col justify-between rounded-[3px] bg-[#FAF7F0] text-[#001730] p-6 lg:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.14)] border border-[#C9A24D]/35 hover:border-[#D4AF37] hover:shadow-[0_16px_40px_rgba(201,162,77,0.18)] transition-all duration-300"
              >
                <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#C9A24D] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-[2px] bg-[#0B2545] text-[#D4AF37] border border-[#C9A24D]/30 flex items-center justify-center shadow-sm group-hover:bg-[#13315C] transition-colors duration-300">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#96702A] tracking-wider">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg lg:text-[1.28rem] font-medium text-[#001730] tracking-tight leading-snug group-hover:text-[#96702A] transition-colors duration-200">
                    {item.name}
                  </h3>

                  <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-[#96702A] mt-1 mb-3">
                    {item.tagline}
                  </div>

                  <p className="text-slate-600 text-xs lg:text-[13px] font-light leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#96702A]/15 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModal(item)}
                    className="group/btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#001730]/[0.05] hover:bg-[#001730] text-[#001730] hover:text-[#E8D091] transition-all duration-200 text-xs font-medium cursor-pointer"
                    aria-label={`Preview ${item.name}`}
                  >
                    <Eye className="w-3.5 h-3.5 text-[#96702A] group-hover/btn:text-[#E8D091] transition-colors" />
                    <span className="text-[11px] font-sans tracking-wide">Quick View</span>
                  </button>

                  <Link
                    href={`#contact?practice=${item.id}`}
                    className="group/link inline-flex items-center gap-1 text-[11px] font-sans uppercase tracking-[0.14em] text-[#001730] hover:text-[#96702A] font-semibold transition-colors"
                  >
                    <span>Engage</span>
                    <div className="w-6 h-6 rounded-full bg-[#001730]/[0.05] group-hover/link:bg-[#96702A] flex items-center justify-center transition-all duration-200">
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#001730] group-hover/link:text-white transition-colors" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 5. Bottom Consultation Prompt Banner */}
        <div className="mt-12 sm:mt-20 p-5 sm:p-8 rounded-[3px] border border-[#C9A24D]/30 bg-[#134074]/30 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-5">
          <div className="space-y-1">
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#E8D091] font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Multi-Jurisdictional Representation
            </div>
            <div className="font-serif text-sm sm:text-lg text-white font-light">
              Facing complex legal proceedings spanning multiple judicial forums?
            </div>
          </div>

          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-[2px] bg-gradient-to-r from-[#C9A24D] via-[#DFBF6E] to-[#B38A33] hover:brightness-110 text-[#001730] font-semibold text-xs tracking-[0.16em] uppercase transition-all shadow-[0_4px_20px_rgba(201,162,77,0.22)] shrink-0 text-center"
          >
            <span>Consult Our Chambers</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#001730]" />
          </Link>
        </div>

      </div>

      {/* 6. Quick-View Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-[#001730]/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.3, ease }}
              className="relative w-full max-w-2xl rounded-[3px] bg-[#FAF7F0] text-[#001730] p-5 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-[#C9A24D]/50 z-10 overflow-hidden max-h-[90vh] flex flex-col justify-between"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#C9A24D] via-[#EED192] to-[#96702A]" />

              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-500 hover:text-[#001730] hover:bg-slate-200/60 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto pr-1 space-y-4 sm:space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[2px] bg-[#0B2545] text-[#D4AF37] border border-[#C9A24D]/35 flex items-center justify-center shrink-0">
                    <activeModal.icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#96702A] font-semibold">
                      Chambers Vertical Overview
                    </div>
                    <h4 className="font-serif text-lg sm:text-2xl text-[#001730] font-medium tracking-tight">
                      {activeModal.name}
                    </h4>
                    <div className="text-xs text-slate-500 font-sans mt-0.5">
                      {activeModal.tagline}
                    </div>
                  </div>
                </div>

                <div className="text-slate-700 text-xs sm:text-sm font-light leading-relaxed border-t border-[#96702A]/15 pt-3.5">
                  <p>{activeModal.detailedOverview}</p>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-[#001730] font-semibold font-sans">
                    Key Practice Dimensions
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeModal.keyHighlights.map((point, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 rounded-[2px] bg-white border border-[#96702A]/15 text-xs text-slate-700 font-light"
                      >
                        <span className="w-1.5 h-1.5 rotate-45 bg-[#96702A] shrink-0" />
                        <span className="truncate">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#96702A]/20 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <Link
                  href={`#contact?vertical=${activeModal.id}`}
                  onClick={() => setActiveModal(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[2px] border border-[#96702A]/40 hover:border-[#96702A] bg-white hover:bg-slate-50 text-[#001730] text-xs font-semibold uppercase tracking-[0.14em] transition-all text-center"
                >
                  <span>Engage in This Area</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#96702A]" />
                </Link>

                <Link
                  href={activeModal.href}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[2px] bg-[#0B2545] hover:bg-[#13315C] text-[#E8D091] text-xs font-semibold uppercase tracking-[0.14em] transition-all shadow-[0_4px_16px_rgba(11,37,69,0.2)] text-center"
                >
                  <span>View Full Vertical Detail</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}