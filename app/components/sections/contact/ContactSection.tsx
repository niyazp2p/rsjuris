"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  AlertCircle,
  Loader2,
} from "lucide-react";
import { submitPublicEnquiry } from "@/lib/api";
import { MatterType, EnquiryPublicConfirmation } from "@/types/enquiry";

const practiceVerticalOptions: MatterType[] = [
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
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    matterType: "Corporate & Commercial Law" as MatterType,
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<EnquiryPublicConfirmation | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await submitPublicEnquiry({
        full_name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        matter_type: formData.matterType,
        summary: formData.message.trim(),
      });
      setConfirmation(res);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit consultation brief. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setConfirmation(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      matterType: "Corporate & Commercial Law",
      message: "",
    });
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#001C41] selection:bg-[#96702A]/25 selection:text-[#001C41]">
      {/* ZONE 1: HERO */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#000E1F] via-[#00142B] to-[#001C41] text-[#FAF7F0] py-16 sm:py-24 lg:py-28">
        <div className="absolute inset-0 pointer-events-none select-none opacity-20 bg-[radial-gradient(#96702A_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-xs tracking-[0.2em] uppercase font-mono mb-4 text-[#E5BD79]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#96702A]" />
            <span className="font-semibold">Contact Chambers</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-[#96702A]/40 bg-[#000E1F]/80 backdrop-blur-md mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5BD79] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#E5BD79] font-semibold">
              Registry &amp; Consultation Intake
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-tight max-w-3xl">
            Speak With Our <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6E5] via-[#E5BD79] to-[#96702A]">
              Firm Legal Team
            </span>
          </h1>

          <p className="mt-4 text-xs sm:text-base text-[#FAF7F0]/80 font-light leading-relaxed max-w-2xl">
            Submit a confidential brief, coordinate documentation review, or connect directly with our administrative registry across Supreme Court and High Court benches.
          </p>
        </div>
      </section>

      {/* ZONE 2: DESK & FORM */}
      <section className="relative w-full py-14 sm:py-20 lg:py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Desk Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-[#96702A]/25 bg-[#001C41]/[0.04] mb-3">
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#96702A]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#96702A] font-semibold">
                    Firm Coordinates
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#001C41] font-medium tracking-tight">
                  Direct Inquiries &amp; Intake
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm font-light mt-1.5 leading-relaxed">
                  For emergency appellate mentions, trial dates, or contractual transactions, submit an electronic brief or contact the clerks directly.
                </p>
              </div>

              {/* Contact Card */}
              <div className="p-6 rounded-[3px] border border-[#96702A]/25 bg-white space-y-4 shadow-[0_8px_30px_rgba(0,28,65,0.04)]">
                <div className="flex items-center gap-3.5 pb-4 border-b border-[#96702A]/15">
                  <div className="relative w-12 h-12 rounded-full bg-white p-1 border border-[#96702A] shrink-0">
                    <Image src="/logo.jpeg" alt="RS Juris Seal" fill className="object-contain p-0.5" />
                  </div>
                  <div>
                    <div className="font-serif text-base font-semibold text-[#001C41]">RS JURIS &amp; CO.</div>
                    <div className="text-[10px] uppercase font-mono tracking-widest text-[#96702A] font-semibold">
                      Advocates &amp; Legal Consultants
                    </div>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs text-slate-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#96702A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#001C41]">Chambers Address:</strong>
                      <span>Eden Tower, 4th floor, 7th Cabin, Elev8 co-working, &amp;  91 Sector, Mohali</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#96702A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#001C41]">Telephone Registry:</strong>
                      <a href="tel:+9198100XXXXX" className="hover:text-[#96702A] font-medium text-[#001C41]">
                        +91 98100 XXXXX
                      </a>
                      <span className="text-[11px] text-slate-500 font-mono block">+91 (011) 2338-XXXX</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#96702A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#001C41]">Official Email:</strong>
                      <a href="mailto:contact@rsjuris.com" className="hover:text-[#96702A]">contact@rsjuris.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#96702A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#001C41]">Firm Operational Hours:</strong>
                      <span>Mon – Fri: 09:30 AM – 07:30 PM</span>
                      <span className="block text-[11px] text-slate-500">Sat: 10:00 AM – 02:00 PM (By Appointment)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#96702A]/15 flex items-center gap-2 text-[11px] text-slate-500 font-light">
                  <ShieldCheck className="w-4 h-4 text-[#96702A] shrink-0" />
                  <span>Advocate-Client Privilege &amp; Statutory Confidentiality Assured.</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Consultation Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-9 rounded-[3px] border border-[#96702A]/25 bg-white shadow-[0_12px_40px_rgba(0,28,65,0.06)] relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#96702A] via-[#E5BD79] to-[#96702A]" />

                {confirmation ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#001C41] text-[#E5BD79] flex items-center justify-center mx-auto mb-2 shadow-md">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    
                    <span className="inline-block px-3 py-1 rounded-[2px] bg-[#FAF7F0] border border-[#96702A]/30 text-xs font-mono font-bold text-[#001C41]">
                      REF: {confirmation.reference_number}
                    </span>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#001C41] font-medium">
                      Brief Logged in Registry
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 font-light max-w-md mx-auto leading-relaxed">
                      {confirmation.message}
                    </p>

                    <div className="pt-4">
                      <button
                        onClick={handleReset}
                        className="px-6 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold text-[#001C41] border border-[#96702A]/40 rounded-[2px] hover:bg-[#FAF7F0] transition-colors"
                      >
                        Submit Additional Matter
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="border-b border-[#96702A]/15 pb-3">
                      <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#96702A] font-semibold block">
                        Confidential Client Intake Form
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#001C41] font-normal mt-0.5">
                        Initiate Chamber Review
                      </h3>
                    </div>

                    <AnimatePresence>
                      {errorMessage && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-3 rounded-[2px] bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2"
                        >
                          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                          <span>{errorMessage}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-mono uppercase text-[#001C41] font-medium">
                          Full Name / Corporate Entity *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Aditi Sharma"
                          className="w-full px-3.5 py-2.5 rounded-[2px] border border-[#96702A]/25 bg-[#FAF7F0]/60 text-[#001C41] text-xs focus:bg-white focus:outline-none focus:border-[#96702A]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-mono uppercase text-[#001C41] font-medium">
                          Contact Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98100 XXXXX"
                          className="w-full px-3.5 py-2.5 rounded-[2px] border border-[#96702A]/25 bg-[#FAF7F0]/60 text-[#001C41] text-xs focus:bg-white focus:outline-none focus:border-[#96702A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-mono uppercase text-[#001C41] font-medium">
                          Official Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="counsel@domain.com"
                          className="w-full px-3.5 py-2.5 rounded-[2px] border border-[#96702A]/25 bg-[#FAF7F0]/60 text-[#001C41] text-xs focus:bg-white focus:outline-none focus:border-[#96702A]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-mono uppercase text-[#001C41] font-medium">
                          Matter Type (PRD §6.3) *
                        </label>
                        <select
                          value={formData.matterType}
                          onChange={(e) => setFormData({ ...formData, matterType: e.target.value as MatterType })}
                          className="w-full px-3.5 py-2.5 rounded-[2px] border border-[#96702A]/25 bg-[#FAF7F0]/60 text-[#001C41] text-xs focus:bg-white focus:outline-none focus:border-[#96702A]"
                        >
                          {practiceVerticalOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono uppercase text-[#001C41] font-medium">
                        Dispute or Legal Advisory Summary *
                      </label>
                      <textarea
                        rows={4}
                        required
                        minLength={15}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="State relevant facts, forum stage, opposing parties, and required relief..."
                        className="w-full px-3.5 py-2.5 rounded-[2px] border border-[#96702A]/25 bg-[#FAF7F0]/60 text-[#001C41] text-xs focus:bg-white focus:outline-none focus:border-[#96702A]"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <span className="text-[10px] text-slate-500 font-light">
                        Submitting this brief does not constitute an advocate-client retention until formally accepted per Bar Council norms.
                      </span>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-[2px] bg-[#001C41] hover:bg-[#96702A] text-white font-semibold text-xs uppercase tracking-wider transition-all disabled:opacity-60 shrink-0"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E5BD79]" />
                            <span>Transmitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Brief</span>
                            <Send className="w-3.5 h-3.5 text-[#E5BD79]" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ZONE 3: MAP */}
      <section className="relative w-full py-12 bg-[#FAF7F0] border-t border-[#96702A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#96702A] font-semibold">
                Judicial Environs &amp; Appellate Precinct
              </span>
              <h2 className="font-serif text-2xl text-[#001C41] font-normal">
                Supreme Court &amp; High Court Chambers
              </h2>
            </div>
            <a
              href="https://maps.google.com/?q=Supreme+Court+of+India+New+Delhi"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#001C41] hover:text-[#96702A] font-mono font-semibold uppercase"
            >
              <span>Directions</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#96702A]" />
            </a>
          </div>

          <div className="relative w-full h-[320px] rounded-[3px] border border-[#96702A]/25 overflow-hidden shadow-sm">
            <iframe
              title="Chamber Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.562092193755!2d77.2370123762692!3d28.61291197567678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2d1c68f1267%3A0x67db9138092cb412!2sSupreme%20Court%20of%20India!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}