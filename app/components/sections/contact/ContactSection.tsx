"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  ShieldCheck,
  Send,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  CalendarCheck,
  Scale,
} from "lucide-react";

// Verbatim 9 practice areas from PRD §6.3
const practiceVerticalOptions = [
  "Corporate & Commercial Law",
  "Civil Litigation & Dispute Resolution",
  "Criminal Law",
  "Property & Real Estate Law",
  "Family & Matrimonial Law",
  "Employment & Labour Law",
  "Banking & Financial Disputes",
  "Intellectual Property Rights",
  "Arbitration & Alternative Dispute Resolution",
  "General Chamber Advisory / Other",
];

const easeCurve = [0.16, 1, 0.3, 1] as const;

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    matterType: "Corporate & Commercial Law",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-brand-cream text-[#0B2545] selection:bg-[#96702A]/25 selection:text-[#001C41]">
      
      {/* =========================================================================
          ZONE 1: CONTACT HERO BANNER (Dark Navy Atmosphere #001C41 / #0B2545)
         ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#00142D] via-[#001C41] to-[#0B2545] text-slate-100 py-20 sm:py-28 lg:py-32">
        {/* Ambient Dark Navy Diffusions & Radial Brass Glow */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 sm:w-[32rem] h-96 sm:h-[32rem] rounded-full bg-[#13315C]/40 blur-[130px]" />
          <div className="absolute bottom-6 right-1/4 w-80 h-80 rounded-full bg-[#96702A]/15 blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#C9A24D_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col items-center text-center">
          
          {/* Breadcrumb Navigation Strip */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: easeCurve }}
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-sans mb-4 sm:mb-6 text-slate-300/80"
          >
            <Link href="/" className="hover:text-[#E5BD79] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-[#96702A]" />
            <span className="text-[#E5BD79] font-semibold">Contact Firm</span>
          </motion.div>

          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: easeCurve }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] border border-[#96702A]/40 bg-[#00142D]/85 backdrop-blur-md mb-4 sm:mb-5 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rotate-45 bg-[#E5BD79] shadow-[0_0_6px_#E5BD79] shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#E5BD79] font-semibold">
              Advocate Consultation 
            </span>
          </motion.div>

          {/* Stately Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: easeCurve }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-tight max-w-3xl tracking-tight"
          >
            Speak With Our <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6E5] via-[#E5BD79] to-[#96702A] drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
            Legal Team
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease: easeCurve }}
            className="mt-4 text-xs sm:text-base text-slate-200/90 font-light leading-relaxed max-w-2xl"
          >
            Initiate a confidential brief submission, book a senior advocate consultation, or connect directly
            with our administrative registry across High Court and Supreme Court benches.
          </motion.p>
        </div>
      </section>

      {/* =========================================================================
          ZONE 2: DETAILS DESK & INTERACTIVE FORM (Light Canvas #FAF7F0)
         ========================================================================= */}
      <section className="relative w-full py-14 sm:py-20 lg:py-28 overflow-hidden">
        {/* Architectural Lattice Texture */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#001C41_1px,transparent_1px)] [background-size:22px_22px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: REGISTRY DETAILS DESK (5 cols) */}
            <div className="lg:col-span-5 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-[#96702A]/25 bg-[#001C41]/[0.04]">
                <span className="w-1.5 h-1.5 rotate-45 bg-[#96702A] shadow-[0_0_6px_#96702A] shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#96702A] font-semibold">
                  RS JURIS & CO
                </span>
              </div>

              <div className="space-y-2 max-w-md lg:max-w-none">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#001C41] font-light tracking-tight">
                  Direct Inquiries &amp; Confidential Intake
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                  For urgent appellate mentions, trial dates, or commercial transactions, reach out
                  directly to the registry clerks or submit an electronic brief.
                </p>
              </div>

              {/* Verified Chamber Contact Card - Strict Left Alignment on All Devices */}
              <div className="p-5 sm:p-7 rounded-[2px] border border-[#96702A]/25 bg-white/80 space-y-5 w-full max-w-xl lg:max-w-none shadow-[0_8px_30px_rgba(11,37,69,0.04)] text-left">
                
                {/* Brand Header */}
                <div className="flex items-center gap-3.5 pb-4 border-b border-[#96702A]/15">
                  <div className="relative w-12 h-12 rounded-full bg-white p-1 border border-[#96702A] shrink-0 overflow-hidden shadow-xs">
                    <Image
                      src="/logo.jpeg"
                      alt="RS Juris & Co. Official Seal"
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-serif text-base sm:text-lg font-semibold text-[#001C41] tracking-wide leading-tight">
                      RS JURIS &amp; CO.
                    </div>
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#96702A] font-medium mt-0.5 truncate">
                      Advocates &amp; Legal Consultants
                    </div>
                  </div>
                </div>

                {/* Structured Contact Details List */}
                <div className="space-y-4 text-xs text-slate-700">
                  
                  {/* 1. Chambers Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[2px] bg-brand-cream border border-[#96702A]/30 text-[#96702A] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5 leading-relaxed">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-[#96702A] font-semibold">
                        Firm Address:
                      </span>
                      <div className="text-slate-800 font-medium">
                        Firm Precinct, Lawyers Block,
                      </div>
                      <div className="text-slate-600 font-light">
                        Supreme Court &amp; Delhi High Court Environs, New Delhi - 110001
                      </div>
                    </div>
                  </div>

                  {/* 2. Direct Telephone Lines */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[2px] bg-brand-cream border border-[#96702A]/30 text-[#96702A] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5 leading-relaxed">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-[#96702A] font-semibold">
                        Direct Telephone Line:
                      </span>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                        <a
                          href="tel:+9198100XXXXX"
                          className="text-sm font-semibold text-[#001C41] hover:text-[#96702A] transition-colors"
                        >
                          +91 98100 XXXXX
                        </a>
                        <span className="text-xs text-slate-500 font-mono">
                          +91 (011) 2338-XXXX
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3. Registry Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[2px] bg-brand-cream border border-[#96702A]/30 text-[#96702A] flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5 leading-relaxed">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-[#96702A] font-semibold">
                        Registry Email:
                      </span>
                      <a
                        href="mailto:contact@rsjuris.com"
                        className="text-slate-800 font-medium hover:text-[#96702A] transition-colors block break-all"
                      >
                        contact@rsjuris.com
                      </a>
                    </div>
                  </div>

                  {/* 4. Chamber Operational Hours */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[2px] bg-brand-cream border border-[#96702A]/30 text-[#96702A] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 leading-relaxed w-full">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-[#96702A] font-semibold">
                        Firm Hours:
                      </span>
                      <div className="flex flex-col gap-0.5 text-xs">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-slate-600 font-light">Monday – Friday:</span>
                          <span className="font-mono text-slate-800 font-medium text-[11.5px]">09:30 AM – 07:30 PM</span>
                        </div>
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-slate-600 font-light">Saturday:</span>
                          <span className="font-mono text-slate-800 font-medium text-[11.5px]">10:00 AM – 02:00 PM</span>
                        </div>
                        <span className="text-[10.5px] text-[#96702A] italic mt-0.5">
                          *Pre-Scheduled Consultations
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Privilege Assurance Banner */}
                <div className="pt-3.5 border-t border-[#96702A]/15 flex items-center gap-2.5 text-[11px] text-slate-500 font-light">
                  <ShieldCheck className="w-4 h-4 text-[#96702A] shrink-0" />
                  <span>Advocate-Client Privilege &amp; Statutory Non-Disclosure Assured.</span>
                </div>

                {/* Mobile Instant 1-Tap Action Bar */}
                <div className="pt-1 flex sm:hidden items-center gap-2">
                  <a
                    href="tel:+9198100XXXXX"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-[2px] bg-[#001C41] text-[#E5BD79] font-semibold text-[11px] uppercase tracking-wider"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#E5BD79]" />
                    <span>Call Registry</span>
                  </a>
                  <a
                    href="mailto:contact@rsjuris.com"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-[2px] border border-[#96702A]/40 bg-brand-cream text-[#001C41] font-semibold text-[11px] uppercase tracking-wider"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#96702A]" />
                    <span>Email Brief</span>
                  </a>
                </div>

              </div>

              {/* Urgent Court Filing Mention Notice */}
              <div className="p-4 rounded-[2px] bg-[#001C41] text-white flex items-center gap-3 w-full max-w-md lg:max-w-none shadow-sm text-left">
                <CalendarCheck className="w-5 h-5 text-[#E5BD79] shrink-0" />
                <div className="text-xs">
                  <div className="font-semibold text-[#E5BD79] uppercase tracking-wider text-[10px]">
                    Urgent Appellate Mentions
                  </div>
                  <div className="text-slate-300 font-light text-[11px] leading-tight mt-0.5">
                    For emergency stay motions or anticipatory bail petitions, note urgency in the summary.
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: CONSULTATION ENQUIRY FORM (7 cols) */}
            <div className="lg:col-span-7 w-full flex flex-col items-center lg:items-stretch">
              <div className="p-6 sm:p-10 rounded-[2px] border border-[#96702A]/25 bg-white shadow-[0_12px_40px_rgba(11,37,69,0.06)] relative overflow-hidden w-full max-w-xl lg:max-w-none">
                
                {/* Top Gold Satin Trim */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#96702A] via-[#E5BD79] to-[#96702A]" />

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-14 text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#001C41] text-[#E5BD79] flex items-center justify-center mx-auto mb-2 shadow-md">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#001C41]">
                      Matter Brief Received
                    </h3>
                    <p className="text-sm text-slate-600 font-light max-w-md mx-auto leading-relaxed">
                      Your brief has been securely routed to our administrative registry.
                      A partner will contact you within 24 business hours to coordinate documentation review.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2.5 text-xs uppercase tracking-widest font-semibold text-[#001C41] border border-[#96702A]/40 rounded-[2px] hover:bg-brand-cream transition-colors"
                    >
                      Submit Another Brief
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div className="border-b border-[#96702A]/15 pb-3 text-left">
                      <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#96702A] font-semibold block">
                        Confidential Client Intake Form
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#001C41] font-normal mt-0.5">
                        Initiate Firm Review
                      </h3>
                    </div>

                    {/* Inputs Row 1: Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5 text-left">
                        <label className="block text-[11px] font-sans uppercase tracking-wider text-[#001C41] font-semibold">
                          Full Name / Corporate Entity *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Aditi Sharma"
                          className="w-full px-3.5 py-2.5 rounded-[2px] border border-[#96702A]/25 bg-brand-cream/60 text-[#001C41] text-xs focus:outline-none focus:border-[#96702A] focus:bg-white transition-all"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="block text-[11px] font-sans uppercase tracking-wider text-[#001C41] font-semibold">
                          Contact Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98100 XXXXX"
                          className="w-full px-3.5 py-2.5 rounded-[2px] border border-[#96702A]/25 bg-brand-cream/60 text-[#001C41] text-xs focus:outline-none focus:border-[#96702A] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Inputs Row 2: Email & Matter Dropdown */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5 text-left">
                        <label className="block text-[11px] font-sans uppercase tracking-wider text-[#001C41] font-semibold">
                          Official Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@domain.com"
                          className="w-full px-3.5 py-2.5 rounded-[2px] border border-[#96702A]/25 bg-brand-cream/60 text-[#001C41] text-xs focus:outline-none focus:border-[#96702A] focus:bg-white transition-all"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="block text-[11px] font-sans uppercase tracking-wider text-[#001C41] font-semibold">
                          Matter Type (PRD §6.3) *
                        </label>
                        <select
                          value={formData.matterType}
                          onChange={(e) => setFormData({ ...formData, matterType: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-[2px] border border-[#96702A]/25 bg-brand-cream/60 text-[#001C41] text-xs focus:outline-none focus:border-[#96702A] focus:bg-white transition-all"
                        >
                          {practiceVerticalOptions.map((opt, idx) => (
                            <option key={idx} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Dispute Brief Summary */}
                    <div className="space-y-1.5 text-left">
                      <label className="block text-[11px] font-sans uppercase tracking-wider text-[#001C41] font-semibold">
                        Dispute or Legal Advisory Summary *
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="State relevant facts, forum status (if pending in court), opposing parties, and key strategic objectives..."
                        className="w-full px-3.5 py-2.5 rounded-[2px] border border-[#96702A]/25 bg-brand-cream/60 text-[#001C41] text-xs focus:outline-none focus:border-[#96702A] focus:bg-white transition-all leading-relaxed"
                      />
                    </div>

                    {/* Submit Button & Disclaimer */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-[10.5px] text-slate-500 font-light text-left">
                        Submitting this brief does not constitute an advocate-client retention until formally accepted per Bar Council norms.
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[2px] bg-[#001C41] hover:bg-[#0B2545] text-[#E5BD79] font-semibold text-xs uppercase tracking-[0.16em] transition-all shadow-[0_4px_16px_rgba(0,28,65,0.22)] shrink-0"
                      >
                        <span>Submit Brief</span>
                        <Send className="w-3.5 h-3.5 text-[#E5BD79]" />
                      </button>
                    </div>

                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          ZONE 3: JURISDICTION PRECINCT & LOCATION MAP
         ========================================================================= */}
      <section className="relative w-full py-14 sm:py-16 bg-brand-cream border-t border-[#96702A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6 text-left">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#96702A] font-semibold">
                Judicial Environs &amp; Appellate Precinct
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#001C41] font-light">
                Supreme Court &amp; High Court Chambers Precinct
              </h2>
            </div>

            <a
              href="https://maps.google.com/?q=Supreme+Court+of+India+New+Delhi"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#001C41] hover:text-[#96702A] font-semibold tracking-wider uppercase transition-colors"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#96702A]" />
            </a>
          </div>

          {/* Interactive Responsive Map Frame */}
          <div className="relative w-full h-[360px] sm:h-[420px] rounded-[3px] border-2 border-[#96702A]/25 overflow-hidden shadow-[0_12px_36px_rgba(11,37,69,0.06)]">
            <iframe
              title="Chambers Location Precinct Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.562092193755!2d77.2370123762692!3d28.61291197567678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2d1c68f1267%3A0x67db9138092cb412!2sSupreme%20Court%20of%20India!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter contrast-[1.02] grayscale-[0.08]"
            />
          </div>

        </div>
      </section>

    </div>
  );
}