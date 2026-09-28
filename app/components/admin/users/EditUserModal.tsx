"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, ShieldAlert, Edit, Loader2 } from "lucide-react";
import { updateUser } from "@/lib/api";
import { UserItem, UserRole } from "@/types/user";

interface Props {
  user: UserItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updated: UserItem) => void;
}

export default function EditUserModal({ user, isOpen, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    full_name: "",
    designation: "",
    bar_council_id: "",
    role: "ASSOCIATE_EDITOR" as UserRole,
    is_active: true,
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name,
        designation: user.designation,
        bar_council_id: user.bar_council_id || "",
        role: user.role,
        is_active: user.is_active,
        password: "",
      });
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload: any = {
        full_name: formData.full_name,
        designation: formData.designation,
        bar_council_id: formData.bar_council_id.trim() || null,
        role: formData.role,
        is_active: formData.is_active,
      };

      if (formData.password.trim()) {
        payload.password = formData.password.trim();
      }

      const updated = await updateUser(user.id, payload);
      onSuccess(updated);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to update counsel details.");
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
            <Edit className="w-4 h-4 text-[#96702A]" />
            <h3 className="font-serif text-lg font-semibold text-[#001C41]">
              Modify Credentials: {user.full_name}
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
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] focus:outline-none focus:border-[#96702A] bg-[#FAF7F0]/40"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Designation
              </label>
              <input
                type="text"
                required
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] focus:outline-none focus:border-[#96702A] bg-[#FAF7F0]/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Bar Council ID
              </label>
              <input
                type="text"
                value={formData.bar_council_id}
                onChange={(e) => setFormData({ ...formData, bar_council_id: e.target.value })}
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] focus:outline-none focus:border-[#96702A] bg-[#FAF7F0]/40 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                RBAC Role Delegation
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Reset Password (Optional)
              </label>
              <input
                type="password"
                minLength={8}
                placeholder="Leave blank to preserve"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] focus:outline-none focus:border-[#96702A] bg-[#FAF7F0]/40"
              />
            </div>

            <div className="flex items-center gap-3 pt-4">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 accent-[#001C41]"
              />
              <label htmlFor="is_active" className="text-xs text-[#001C41] font-medium cursor-pointer">
                Account Active & Authorized
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-[#96702A]/15 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#001C41] hover:bg-[#FAF7F0] border border-transparent rounded-[2px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-[#001C41] text-white hover:bg-[#96702A] transition-colors rounded-[2px] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-60 shadow-sm"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E5BD79]" />}
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}