"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ChevronDownIcon,
  MenuIcon,
  CloseIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  MailIcon,
  BuildingIcon,
  GavelIcon,
  ShieldAlertIcon,
  HomeIcon,
  UsersIcon,
  BriefcaseIcon,
  LandmarkIcon,
  ScaleIcon,
  HandshakeIcon,
} from "../ui/Icons";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Articles", href: "/articles" },
  { name: "Contact", href: "/contact" },
];

const socials = [
  { href: "https://facebook.com", icon: FacebookIcon, label: "Facebook" },
  { href: "https://instagram.com", icon: InstagramIcon, label: "Instagram" },
  { href: "https://linkedin.com", icon: LinkedinIcon, label: "LinkedIn" },
  { href: "https://twitter.com", icon: TwitterIcon, label: "X" },
  { href: "mailto:contact@rsjuris.com", icon: MailIcon, label: "Email" },
];

const practiceAreas = [
  { name: "Corporate & Commercial Law", desc: "M&A, Governance & Advisory", href: "/practice-areas/corporate-commercial", icon: BuildingIcon },
  { name: "Civil Litigation & Disputes", desc: "High Courts & Commercial Suits", href: "/practice-areas/civil-litigation", icon: GavelIcon },
  { name: "Criminal Defense & Trial", desc: "Economic Offenses & White Collar", href: "/practice-areas/criminal-law", icon: ShieldAlertIcon },
  { name: "Property & Real Estate Law", desc: "Title Diligence & RERA Matters", href: "/practice-areas/property-real-estate", icon: HomeIcon },
  { name: "Family & Matrimonial Law", desc: "Estate Succession & Custody", href: "/practice-areas/family-matrimonial", icon: UsersIcon },
  { name: "Employment & Labour Law", desc: "Executive Contracts & Compliance", href: "/practice-areas/employment-labour", icon: BriefcaseIcon },
  { name: "Banking & Financial Disputes", desc: "IBC, NCLT & Debt Recovery", href: "/practice-areas/banking-financial", icon: LandmarkIcon },
  { name: "Intellectual Property Rights", desc: "Trademarks, Patents & Filings", href: "/practice-areas/intellectual-property", icon: ScaleIcon },
  { name: "Arbitration & Conciliation", desc: "Institutional & Domestic ADR", href: "/practice-areas/arbitration-adr", icon: HandshakeIcon },
];

const ease = [0.16, 1, 0.3, 1] as const;

const megaVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease, staggerChildren: 0.03, delayChildren: 0.04 },
  },
  exit: { opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18, ease } },
};

const drawerVariants: Variants = {
  closed: { opacity: 0, y: -10, transition: { duration: 0.18 } },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease, staggerChildren: 0.05, delayChildren: 0.06 },
  },
};

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePracticeOpen, setMobilePracticeOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#96702A]/20 shadow-[0_2px_15px_rgba(0,28,65,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Lockup */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image src="/icon.png" alt="RS Juris & Co." fill priority className="object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-semibold text-lg sm:text-[1.25rem] tracking-[0.06em] text-[#001730] group-hover:text-[#96702A] transition-colors leading-tight">
              RS JURIS & CO.
            </span>
            <span className="text-[8.5px] tracking-[0.24em] text-[#96702A] font-semibold uppercase leading-none mt-0.5">
              Your Rights | Our Priority
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 justify-center">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-[11px] uppercase tracking-[0.2em] font-medium text-[#001730] hover:text-[#96702A] transition-colors group py-1"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#96702A] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          {/* Practice Areas Mega-Menu */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              aria-expanded={dropdownOpen}
              className="relative inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-medium text-[#001730] hover:text-[#96702A] transition-colors py-2 cursor-pointer group"
            >
              <span>Practice Areas</span>
              <ChevronDownIcon
                className={`w-3.5 h-3.5 text-[#96702A] transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
              />
              <span
                className={`absolute bottom-1 left-0 h-[1.5px] bg-[#96702A] transition-all duration-300 ${
                  dropdownOpen ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  variants={megaVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 w-[660px] rounded-[2px] bg-[#001730] border border-[#C9A24D]/35 shadow-[0_20px_50px_rgba(0,23,48,0.4)] p-4 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-2 pb-2.5 mb-2 border-b border-white/10">
                    <span className="text-[10px] uppercase font-sans font-semibold text-[#E8D091] tracking-[0.2em]">
                      Practice Verticals & Chambers Specializations
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-sans">
                      Litigation & Advisory
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {practiceAreas.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={idx} variants={itemVariants}>
                          <Link
                            href={item.href}
                            onClick={() => setDropdownOpen(false)}
                            className="group flex items-start gap-2.5 p-2 rounded-[2px] hover:bg-white/[0.04] border border-transparent hover:border-[#C9A24D]/30 transition-colors"
                          >
                            <div className="p-1.5 rounded-[2px] bg-[#00142B] border border-[#C9A24D]/25 text-[#D4AF37] group-hover:border-[#D4AF37] group-hover:bg-[#C9A24D]/15 transition-colors shrink-0 mt-0.5">
                              <Icon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-[12px] text-slate-100 group-hover:text-[#E8D091] font-serif transition-colors truncate">
                                {item.name}
                              </div>
                              <div className="text-[9.5px] text-slate-400 font-sans tracking-tight truncate">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.slice(2).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-[11px] uppercase tracking-[0.2em] font-medium text-[#001730] hover:text-[#96702A] transition-colors group py-1"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#96702A] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop Socials */}
        <div className="hidden lg:flex items-center gap-1 shrink-0">
          {socials.map((s, idx) => {
            const Icon = s.icon;
            return (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#001730]/75 hover:text-[#96702A] hover:bg-[#96702A]/10 transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            );
          })}
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded text-[#001730] hover:bg-[#001730]/5 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-20 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-x-0 top-20 z-40 bg-[#FAF7F0] border-b border-[#96702A]/25 shadow-2xl px-6 py-6 lg:hidden max-h-[calc(100vh-5rem)] overflow-y-auto"
            >
              <div className="flex flex-col space-y-3.5">
                {navLinks.slice(0, 2).map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-lg text-[#001730] hover:text-[#96702A] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Mobile Practice Areas Accordion */}
                <div className="py-1">
                  <button
                    onClick={() => setMobilePracticeOpen(!mobilePracticeOpen)}
                    className="w-full flex items-center justify-between font-serif text-lg text-[#001730] hover:text-[#96702A] transition-colors"
                  >
                    <span>Practice Areas</span>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-[#96702A] transition-transform duration-300 ${
                        mobilePracticeOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobilePracticeOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease }}
                        className="overflow-hidden pl-3 pt-2 space-y-2 border-l border-[#96702A]/30 mt-2"
                      >
                        {practiceAreas.map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={idx}
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2.5 text-xs text-[#444] hover:text-[#001730] py-1"
                            >
                              <Icon className="w-3.5 h-3.5 text-[#96702A] shrink-0" />
                              <span>{item.name}</span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {navLinks.slice(2).map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-lg text-[#001730] hover:text-[#96702A] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Socials */}
              <div className="pt-5 mt-5 border-t border-[#96702A]/20 flex items-center justify-center gap-4 text-[#001730]">
                {socials.map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={idx}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="p-1 text-[#001730]/80 hover:text-[#96702A] transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}