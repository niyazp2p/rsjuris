"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  itemDescription?: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  title,
  itemDescription,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000E1F]/60 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md bg-white border border-[#96702A]/30 rounded-[3px] p-6 shadow-2xl space-y-5"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-[2px] bg-rose-50 border border-rose-200 text-rose-600 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-semibold text-[#001C41]">
                  {title}
                </h3>
                {itemDescription && (
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    Are you sure you want to permanently delete{" "}
                    <strong className="text-[#001C41] font-medium font-mono">
                      "{itemDescription}"
                    </strong>
                    ? This action will remove the record and purge linked assets from Cloudinary.
                  </p>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#001C41]/10 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onCancel}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#001C41] hover:bg-[#FAF7F0] border border-[#96702A]/25 rounded-[2px] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isDeleting}
                className="px-5 py-2 bg-rose-700 hover:bg-rose-800 text-white text-xs font-mono uppercase tracking-wider rounded-[2px] flex items-center gap-1.5 transition-colors disabled:opacity-50 shadow-sm"
              >
                {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{isDeleting ? "Purging..." : "Confirm Delete"}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}