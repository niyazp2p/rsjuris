"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";
import { deleteUser } from "@/lib/api";
import { UserItem } from "@/types/user";

interface Props {
  user: UserItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (id: string) => void;
}

export default function DeleteUserDialog({ user, isOpen, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !user) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteUser(user.id);
      onSuccess(user.id);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to remove user account.");
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
        className="w-full max-w-md bg-white border border-rose-300 rounded-[3px] p-6 shadow-xl"
      >
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-600 rounded-[2px]">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-lg font-bold text-[#001C41]">
              Revoke Counsel Access?
            </h4>
            <p className="text-xs text-[#555] mt-1 leading-relaxed">
              Are you sure you want to permanently delete the profile of{" "}
              <strong className="text-[#001C41]">{user.full_name}</strong> ({user.email})? This action cannot be reversed.
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-3 p-2 bg-rose-50 text-rose-800 text-xs rounded border border-rose-200">
            {error}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button suppressHydrationWarning
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs text-[#001C41] hover:bg-[#FAF7F0] rounded-[2px]"
          >
            Cancel
          </button>
          <button suppressHydrationWarning
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] flex items-center gap-1.5 disabled:opacity-50"
          >
            {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Revoke Access</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}