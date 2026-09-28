"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldAlert, UserPlus, Lock, Mail, User, Briefcase, Award, Loader2 } from "lucide-react";
import { createUser } from "@/lib/api";
import { UserItem, UserRole } from "@/types/user";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserItem) => void;
}

export default function CreateUserModal({ isOpen, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    designation: "",
    bar_council_id: "",
    role: "ASSOCIATE_EDITOR" as UserRole,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newUser = await createUser({
        ...formData,
        bar_council_id: formData.bar_council_id.trim() || undefined,
      });
      onSuccess(newUser);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to provision advocate account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000E1F]/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-lg bg-white border border-[#96702A]/30 rounded-[3px] shadow-[0_16px_50px_rgba(0,28,65,0.15)] overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-[#96702A]/20 flex items-center justify-between bg-[#FAF7F0]">
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-[#96702A]" />
            <h3 className="font-serif text-lg font-semibold text-[#001C41]">
              Provision Chamber Counsel
            </h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-[#96702A] text-[#001C41]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-[2px] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Full Legal Name *
              </label>
              <div className="relative">
                <input suppressHydrationWarning
                  type="text"
                  required
                  placeholder="Adv. Vikramaditya"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] focus:outline-none focus:border-[#96702A] bg-[#FAF7F0]/40"
                />
                <User className="w-3.5 h-3.5 text-[#96702A] absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Official Email *
              </label>
              <div className="relative">
                <input suppressHydrationWarning
                  type="email"
                  required
                  placeholder="counsel@rsjuris.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] focus:outline-none focus:border-[#96702A] bg-[#FAF7F0]/40"
                />
                <Mail className="w-3.5 h-3.5 text-[#96702A] absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Designation *
              </label>
              <div className="relative">
                <input suppressHydrationWarning
                  type="text"
                  required
                  placeholder="Senior Associate"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] focus:outline-none focus:border-[#96702A] bg-[#FAF7F0]/40"
                />
                <Briefcase className="w-3.5 h-3.5 text-[#96702A] absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Bar Council ID
              </label>
              <div className="relative">
                <input suppressHydrationWarning
                  type="text"
                  placeholder="D/1842/2018"
                  value={formData.bar_council_id}
                  onChange={(e) => setFormData({ ...formData, bar_council_id: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] focus:outline-none focus:border-[#96702A] bg-[#FAF7F0]/40 font-mono"
                />
                <Award className="w-3.5 h-3.5 text-[#96702A] absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Initial Password *
              </label>
              <div className="relative">
                <input suppressHydrationWarning
                  type="password"
                  required
                  minLength={8}
                  placeholder="Min 8 chars"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] focus:outline-none focus:border-[#96702A] bg-[#FAF7F0]/40"
                />
                <Lock className="w-3.5 h-3.5 text-[#96702A] absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Assigned RBAC Role *
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] focus:outline-none focus:border-[#96702A] bg-[#FAF7F0]/40 font-medium"
              >
                <option value="SUPER_ADMIN">SUPER ADMIN</option>
                <option value="SENIOR_PARTNER">SENIOR PARTNER</option>
                <option value="ASSOCIATE_EDITOR">ASSOCIATE EDITOR</option>
                <option value="INQUIRY_OFFICER">INQUIRY OFFICER</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-[#96702A]/15 flex items-center justify-end gap-3">
            <button suppressHydrationWarning
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#001C41] hover:bg-[#FAF7F0] border border-transparent rounded-[2px]"
            >
              Cancel
            </button>
            <button suppressHydrationWarning
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-[#001C41] text-white hover:bg-[#96702A] transition-colors rounded-[2px] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-60 shadow-sm"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E5BD79]" />}
              <span>Provision Account</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}