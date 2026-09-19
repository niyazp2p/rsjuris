"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
} from "lucide-react";

export interface VerticalInquiryDeskProps {
  practiceTitle: string;
}

export default function VerticalInquiryDesk({ practiceTitle }: VerticalInquiryDeskProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    matterType: practiceTitle,
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="inquiry-desk"
      className="relative w-full py-14 sm:py-20 lg:py-28 bg-[#FAF7F0] text-[#0B2545] overflow-hidden selection:bg-[#C9A24D]/25 selection:text-[#0B2545]"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#0B2545_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Chamber Registry Contacts */}
          <div className="lg:col-span-5 space-y-5 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-[#96702A]/25 bg-[#0B2545]/[0.04]">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#96702A] shadow-[0_0_6px_#96702A] shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#96702A] font-semibold">
                Direct Consultation Desk
              </span>
            </div>

            <div className="space-y-2 max-w-md lg:max-w-none">
              <h2 className="font-serif text-2xl sm:text-4xl text-[#0B2545] font-light tracking-tight leading-tight">
                Engage Counsel for <br className="hidden sm:inline" />
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#96702A] via-[#B38A33] to-[#735218]">
                  {practiceTitle}.
                </span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                Connect with our senior litigation and advisory advocates for comprehensive matter review and immediate strategic guidance.
              </p>
            </div>

            {/* Registry Info Block */}
            <div className="p-5 sm:p-6 rounded-[2px] border border-[#96702A]/20 bg-white/70 space-y-4 w-full max-w-md lg:max-w-none shadow-xs">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 pb-3 border-b border-[#96702A]/15 text-center sm:text-left">
                <div className="relative w-12 h-12 rounded-full bg-white p-1 border border-[#C9A24D] shrink-0 overflow-hidden shadow-xs">
                  <Image
                    src="/logo.jpeg"
                    alt="RS Juris & Co. Seal"
                    fill
                    className="object-contain p-0.5"
                  />
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <div className="font-serif text-sm font-medium text-[#0B2545]">
                    RS Juris &amp; Co. Registry
                  </div>
                  <div className="text-[10.5px] uppercase tracking-wider text-[#96702A] font-semibold">
                    Supreme Court &amp; High Court Benches
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600 font-light flex flex-col items-center sm:items-start">
                <div className="flex items-center sm:items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#96702A] shrink-0" />
                  <div className="text-center sm:text-left">
                    <a href="tel:+9198100XXXXX" className="font-medium text-[#0B2545] hover:text-[#96702A] transition-colors">
                      +91 98100 XXXXX
                    </a>
                    <div className="text-[11px] text-slate-500 font-mono">+91 (011) 2338-XXXX</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#96702A] shrink-0" />
                  <a href="mailto:contact@rsjuris.com" className="hover:text-[#96702A] transition-colors">
                    contact@rsjuris.com
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#96702A] shrink-0" />
                  <span>Mon – Fri: 09:30 AM – 07:30 PM</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#96702A]/15 flex items-center justify-center sm:justify-start gap-2 text-[11px] text-slate-500 font-light">
                <ShieldCheck className="w-4 h-4 text-[#96702A] shrink-0" />
                <span>Advocate-client privilege strictly maintained.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-7 w-full flex flex-col items-center lg:items-stretch">
            <div className="p-5 sm:p-8 rounded-[2px] border border-[#96702A]/25 bg-white shadow-[0_8px_30px_rgba(11,37,69,0.06)] relative overflow-hidden w-full max-w-xl lg:max-w-none">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#96702A] via-[#C9A24D] to-[#96702A]" />

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#0B2545] text-[#D4AF37] flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#0B2545]">Brief Received</h3>
                  <p className="text-sm text-slate-600 font-light max-w-md mx-auto">
                    Your inquiry regarding <strong className="text-[#0B2545]">{practiceTitle}</strong> has been routed to our registry. A partner will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <label className="block text-[11px] font-sans uppercase tracking-wider text-[#0B2545] font-semibold">
                        Full Name / Entity
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Aditi Sharma"
                        className="w-full px-3.5 py-2.5 rounded-[2px] border border-[#96702A]/25 bg-[#FAF7F0]/60 text-[#0B2545] text-xs focus:outline-none focus:border-[#96702A] text-center sm:text-left"
                      />
                    </div>

                    <div className="space-y-1 text-center sm:text-left">
                      <label className="block text-[11px] font-sans uppercase tracking-wider text-[#0B2545] font-semibold">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98100 XXXXX"
                        className="w-full px-3.5 py-2.5 rounded-[2px] border border-[#96702A]/25 bg-[#FAF7F0]/60 text-[#0B2545] text-xs focus:outline-none focus:border-[#96702A] text-center sm:text-left"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <label className="block text-[11px] font-sans uppercase tracking-wider text-[#0B2545] font-semibold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-[2px] border border-[#96702A]/25 bg-[#FAF7F0]/60 text-[#0B2545] text-xs focus:outline-none focus:border-[#96702A] text-center sm:text-left"
                      />
                    </div>

                    <div className="space-y-1 text-center sm:text-left">
                      <label className="block text-[11px] font-sans uppercase tracking-wider text-[#0B2545] font-semibold">
                        Matter Classification
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={formData.matterType}
                        className="w-full px-3.5 py-2.5 rounded-[2px] border border-[#96702A]/35 bg-[#FAF7F0] text-[#0B2545] text-xs font-medium cursor-not-allowed text-center sm:text-left"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-center sm:text-left">
                    <label className="block text-[11px] font-sans uppercase tracking-wider text-[#0B2545] font-semibold">
                      Dispute or Advisory Summary
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your objectives, forum stage, or contractual concerns..."
                      className="w-full px-3.5 py-2.5 rounded-[2px] border border-[#96702A]/25 bg-[#FAF7F0]/60 text-[#0B2545] text-xs focus:outline-none focus:border-[#96702A] text-center sm:text-left"
                    />
                  </div>

                  <div className="pt-2 flex justify-center sm:justify-start">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[2px] bg-[#0B2545] hover:bg-[#13315C] text-[#E8D091] font-semibold text-xs uppercase tracking-[0.16em] transition-all shadow-[0_4px_16px_rgba(11,37,69,0.18)]"
                    >
                      <span>Submit Brief for Chamber Review</span>
                      <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}