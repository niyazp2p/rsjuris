"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  Eye, 
  EyeOff,
  Gavel
} from "lucide-react";
import { authStorage } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("from") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://rsjuris-backend.onrender.com/api/v1";

      const loginRes = await fetch(`${apiUrl}/auth/login/json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        throw new Error(loginData.detail || "Authentication failed. Invalid Firm credentials.");
      }

      const token = loginData.access_token;

      const meRes = await fetch(`${apiUrl}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!meRes.ok) {
        throw new Error("Unable to verify Firm advocate access authorization.");
      }

      const profile = await meRes.json();

      // Persist authenticated credentials
      authStorage.setSession(token, profile);
      router.push(redirectTarget);
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || "A secure connection error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center bg-[#FAF7F0] px-4 py-8 sm:py-12 selection:bg-[#96702A]/20 selection:text-[#001C41]">
      {/* Top Security Banner */}
      <header className="w-full max-w-4xl flex items-center justify-between border-b border-[#96702A]/20 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#96702A] animate-pulse" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[#001C41] font-semibold">
            Firms Security Terminal
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#96702A]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">256-Bit SSL Encrypted Console</span>
        </div>
      </header>

      {/* Centered Isolated Form Box */}
      <main className="w-full max-w-[420px] my-auto py-8">
        <div className="flex flex-col items-center text-center mb-7">
          <div className="relative w-16 h-16 rounded-full bg-white border-2 border-[#96702A] p-1.5 shadow-[0_8px_24px_rgba(150,112,42,0.18)] mb-3.5">
            <Image 
              src="/logo.jpeg" 
              alt="RS Juris & Co. Seal" 
              width={64} 
              height={64} 
              className="object-contain rounded-full"
              priority
            />
          </div>

          <h1 className="font-serif text-2xl sm:text-[1.75rem] text-[#001C41] font-semibold tracking-tight leading-tight">
            RS JURIS & CO.
          </h1>
          <p className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#96702A] font-semibold mt-1">
            Your Rights | Our Priority
          </p>
          <div className="w-10 h-[1.5px] bg-[#96702A]/40 mt-3" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative bg-white border border-[#96702A]/25 rounded-[3px] p-7 sm:p-8 shadow-[0_12px_40px_rgba(0,28,65,0.06)]"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#96702A] to-transparent" />

          <div className="mb-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#001C41]">
              Advocate Authentication
            </h2>
            <p className="text-xs text-[#555] font-light mt-0.5">
              Enter your designated Firm credentials to proceed.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 rounded-[2px] bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{errorMessage}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono tracking-wider uppercase text-[#001C41] font-medium">
                Firm Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rsjuris.com"
                  autoComplete="email"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-[2px] bg-[#FAF7F0]/60 border border-[#96702A]/30 text-xs text-[#001C41] placeholder-[#888] focus:bg-white focus:outline-none focus:border-[#96702A] focus:ring-1 focus:ring-[#96702A]/40 transition-all font-sans"
                />
                <Mail className="w-3.5 h-3.5 text-[#96702A] absolute left-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-mono tracking-wider uppercase text-[#001C41] font-medium">
                  Access Key
                </label>
                <span className="text-[10px] text-[#96702A] font-mono tracking-tight cursor-default">
                  Strict Clearance
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full pl-9 pr-10 py-2.5 rounded-[2px] bg-[#FAF7F0]/60 border border-[#96702A]/30 text-xs text-[#001C41] placeholder-[#888] focus:bg-white focus:outline-none focus:border-[#96702A] focus:ring-1 focus:ring-[#96702A]/40 transition-all font-sans"
                />
                <Lock className="w-3.5 h-3.5 text-[#96702A] absolute left-3 top-3.5 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#666] hover:text-[#001C41] transition-colors p-0.5"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full group overflow-hidden mt-6 px-4 py-3 rounded-[2px] bg-[#001C41] text-white text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#96702A] transition-all duration-300 shadow-[0_4px_16px_rgba(0,28,65,0.18)] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#E5BD79]" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Authenticate Session</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5BD79] group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-[#96702A]/15 flex items-center justify-between text-[10.5px] font-mono text-[#666]">
            <span className="flex items-center gap-1.5">
              <Gavel className="w-3.5 h-3.5 text-[#96702A]" />
              <span>Firm Portal</span>
            </span>
            <span>v1.0.0-PROD</span>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl border-t border-[#96702A]/20 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <p className="text-[11px] text-[#666]">
          &copy; 2026 RS Juris & Co. Advocates & Legal Consultants. All rights reserved.
        </p>
        <p className="text-[10px] font-mono uppercase tracking-wider text-[#96702A]">
          Authorized Advocate Access Only
        </p>
      </footer>
    </div>
  );
}