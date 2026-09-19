"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  MailIcon,
} from "../ui/Icons";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

// Exactly mapped from PRD Section 5 & 6.9 (Quick links)
const menuLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Practice Areas", href: "/practice-areas" },
  { name: "Our Team", href: "/team" },
  { name: "Insights", href: "/insights" },
  { name: "Contact", href: "/contact" },
];

// 9 core verticals defined in PRD Section 5 & 6.3
const serviceLinks = [
  { name: "Corporate & Commercial Law", href: "/practice-areas/corporate-commercial" },
  { name: "Civil Litigation & Dispute Resolution", href: "/practice-areas/civil-litigation" },
  { name: "Criminal Law", href: "/practice-areas/criminal-law" },
  { name: "Property & Real Estate Law", href: "/practice-areas/property-real-estate" },
  { name: "Family & Matrimonial Law", href: "/practice-areas/family-matrimonial" },
  { name: "Employment & Labour Law", href: "/practice-areas/employment-labour" },
  { name: "Banking & Financial Disputes", href: "/practice-areas/banking-financial" },
  { name: "Intellectual Property Rights", href: "/practice-areas/intellectual-property" },
  { name: "Arbitration & ADR", href: "/practice-areas/arbitration-adr" },
];

const socials = [
  { href: "https://facebook.com", icon: FacebookIcon, label: "Facebook" },
  { href: "https://instagram.com", icon: InstagramIcon, label: "Instagram" },
  { href: "https://linkedin.com", icon: LinkedinIcon, label: "LinkedIn" },
  { href: "https://twitter.com", icon: TwitterIcon, label: "X" },
  { href: "mailto:contact@rsjuris.com", icon: MailIcon, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#001730] text-slate-300 border-t border-[#C9A24D]/25 overflow-hidden selection:bg-[#C9A24D]/25 selection:text-[#E8D091]">
      {/* Background Micro Lattice & Deep Atmospheric Radial */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#C9A24D_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#134074]/20 blur-[140px]" />
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-[#C9A24D]/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 pt-16 sm:pt-20 pb-8">
        
        {/* 4-COLUMN MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* COLUMN 1: BRAND LOGO, DESCRIPTION & SOCIAL ICONS (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3.5 group inline-flex">
              <div className="relative w-12 h-12 rounded-full bg-white p-1 border border-[#C9A24D] shadow-[0_0_15px_rgba(201,162,77,0.25)] ring-2 ring-[#001730] overflow-hidden shrink-0">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                  <Image
                    src="/logo.jpeg"
                    alt="RS Juris & Co. Official Seal"
                    fill
                    sizes="48px"
                    className="object-contain p-0.5"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-medium text-xl tracking-[0.06em] text-white group-hover:text-[#E8D091] transition-colors leading-tight">
                  RS JURIS & CO.
                </span>
                <span className="text-[9px] tracking-[0.24em] text-[#E8D091] font-semibold uppercase leading-none mt-1">
                  Your Rights | Our Priority
                </span>
              </div>
            </Link>

            <p className="text-slate-300/80 text-[13px] font-light leading-relaxed max-w-sm">
              Full-service advocates and legal consultants delivering strategic, commercial-grade counsel and appellate advocacy across India’s regulatory forums, High Courts, and the Supreme Court.
            </p>

            {/* Social Icons Strip */}
            <div className="pt-2 flex items-center gap-2">
              {socials.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-[2px] bg-[#00142B] border border-[#C9A24D]/30 text-[#E8D091] hover:text-[#001730] hover:bg-[#D4AF37] hover:border-[#D4AF37] flex items-center justify-center transition-all duration-300 shadow-sm"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* COLUMN 2: QUICK MENU (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-[11px] uppercase font-sans font-semibold tracking-[0.2em] text-[#E8D091] flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#D4AF37] rotate-45 shrink-0" />
              <span>Navigation</span>
            </div>

            <ul className="space-y-2.5 text-xs font-light">
              {menuLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-300/80 hover:text-[#E8D091] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: PRACTICE VERTICALS (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-[11px] uppercase font-sans font-semibold tracking-[0.2em] text-[#E8D091] flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#D4AF37] rotate-45 shrink-0" />
              <span>Practice Verticals</span>
            </div>

            <ul className="space-y-2 text-xs font-light">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-slate-300/80 hover:text-[#E8D091] transition-colors line-clamp-1 group flex items-center justify-between"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200 truncate">
                      {service.name}
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: CHAMBER CONTACT DETAILS (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-[11px] uppercase font-sans font-semibold tracking-[0.2em] text-[#E8D091] flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#D4AF37] rotate-45 shrink-0" />
              <span>Chamber Registry</span>
            </div>

            <div className="space-y-3.5 text-xs font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-slate-300/80 leading-snug">
                  Supreme Court & High Court Bar Chambers, New Delhi, Delhi 110001, India
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="flex flex-col space-y-0.5">
                  <a href="tel:+9198100XXXXX" className="hover:text-[#E8D091] transition-colors">
                    +91 98100 XXXXX
                  </a>
                  <span className="text-[11px] text-slate-400 font-mono">+91 (011) 2338-XXXX</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <a href="mailto:contact@rsjuris.com" className="hover:text-[#E8D091] transition-colors truncate">
                  contact@rsjuris.com
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-slate-300/80 leading-snug text-[11.5px]">
                  Mon – Fri: 09:30 AM – 07:30 PM <br />
                  Sat: 10:00 AM – 03:00 PM (Appt)
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* STATUTORY LEGAL DISCLAIMER (Bar Council of India Rule Compliance) */}
        <div className="py-6 border-b border-white/10 text-justify sm:text-left">
          <p className="text-[11px] font-sans text-slate-400 font-light leading-relaxed">
            <strong className="text-slate-300 font-medium">Statutory Legal Disclaimer:</strong> As per the rules of the Bar Council of India, law firms and advocates are not permitted to solicit work or advertise in any form or manner. By accessing this website, the user acknowledges that the information provided herein is solely available for informational purposes at their specific request and does not create an advocate-client relationship. RS Juris & Co. is not liable for any consequence of any action taken by the user relying on material or information provided on this platform.
          </p>
        </div>

        {/* BOTTOM STRIP: COPYRIGHT & LEGAL PAGES */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3.5 text-xs text-slate-400 font-light">
          <div>
            &copy; 2026 RS Juris & Co. All Rights Reserved.
          </div>

          <div className="flex items-center gap-5 text-[11.5px]">
            <Link href="/privacy-policy" className="hover:text-[#E8D091] transition-colors">
              Privacy Policy
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/terms-of-use" className="hover:text-[#E8D091] transition-colors">
              Terms of Use
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/disclaimer" className="hover:text-[#E8D091] transition-colors">
              Chamber Disclaimer
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}