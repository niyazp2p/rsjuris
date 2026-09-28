"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  X, 
  Mail, 
  Phone, 
  Clock, 
  Briefcase, 
  Trash2, 
  CheckCircle, 
  Scale, 
  Laptop 
} from "lucide-react";
import { EnquiryItem, EnquiryStatus } from "@/types/enquiry";
import { updateEnquiryStatus, deleteEnquiry } from "@/lib/api";
import ConvertEnquiryModal from "../../../components/admin/leads/ConvertEnquiryModal";

interface Props {
  enquiry: EnquiryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (updated: EnquiryItem) => void;
  onDeleteSuccess: (id: string) => void;
}

export default function EnquiryDetailDrawer({
  enquiry,
  isOpen,
  onClose,
  onStatusChange,
  onDeleteSuccess,
}: Props) {
  const [updating, setUpdating] = useState(false);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);

  if (!isOpen || !enquiry) return null;

  const handleStatusUpdate = async (status: EnquiryStatus) => {
    setUpdating(true);
    try {
      const res = await updateEnquiryStatus(enquiry.id, status);
      onStatusChange(res);
    } catch (err: any) {
      alert(err.message || "Failed to update triage status.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to permanently delete brief ${enquiry.reference_number}?`)) return;
    setUpdating(true);
    try {
      await deleteEnquiry(enquiry.id);
      onDeleteSuccess(enquiry.id);
      onClose();
    } catch (err: any) {
      alert(err.message || "Failed to delete brief.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 overflow-hidden bg-[#000E1F]/50 backdrop-blur-xs flex justify-end">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl bg-white border-l border-[#96702A]/30 h-full flex flex-col justify-between shadow-2xl overflow-y-auto"
        >
          {/* Top Dossier Header */}
          <div>
            <div className="p-5 border-b border-[#96702A]/20 bg-[#FAF7F0] flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#96702A] font-semibold">
                  Client Intake Dossier
                </span>
                <h3 className="font-serif text-lg font-semibold text-[#001C41]">
                  {enquiry.reference_number}
                </h3>
              </div>
              <button onClick={onClose} className="p-1.5 text-[#001C41] hover:text-[#96702A]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dossier Body */}
            <div className="p-6 space-y-6 text-xs text-[#001C41]">
              <div className="p-4 rounded-[2px] bg-[#FAF7F0] border border-[#96702A]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{enquiry.full_name}</span>
                  <span className="px-2 py-0.5 rounded-[2px] bg-white border border-[#96702A]/30 font-mono text-[9.5px]">
                    {enquiry.status}
                  </span>
                </div>
                <div className="space-y-1.5 font-mono text-[11px] text-[#555]">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#96702A]" />
                    <a href={`mailto:${enquiry.email}`} className="hover:text-[#001C41] underline">
                      {enquiry.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#96702A]" />
                    <a href={`tel:${enquiry.phone}`} className="hover:text-[#001C41]">
                      {enquiry.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#96702A]" />
                    <span>Received: {new Date(enquiry.created_at).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#96702A] font-semibold">
                  Practice Area Vertical
                </span>
                <div className="font-semibold text-sm flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#96702A]" />
                  <span>{enquiry.matter_type}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#96702A] font-semibold">
                  Dispute Statement Brief
                </span>
                <div className="p-4 rounded-[2px] bg-white border border-[#96702A]/20 font-serif text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
                  {enquiry.summary}
                </div>
              </div>

              <div className="p-3.5 rounded-[2px] bg-slate-50 border border-slate-200 text-[10.5px] font-mono text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <Laptop className="w-3.5 h-3.5 text-[#96702A]" />
                  <span>Origin Audit Metadata</span>
                </div>
                <div>IP Source: {enquiry.ip_address || "127.0.0.1"}</div>
                <div className="truncate">Browser: {enquiry.user_agent || "Web Client"}</div>
              </div>
            </div>
          </div>

          {/* Action Footer with Convert Action */}
          <div className="p-5 border-t border-[#96702A]/20 bg-[#FAF7F0] flex items-center justify-between gap-2">
            <button
              onClick={handleDelete}
              disabled={updating}
              className="p-2 text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-[2px] text-xs transition-colors"
              title="Purge Enquiry"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleStatusUpdate("CONTACTED")}
                disabled={updating || enquiry.status === "CONTACTED" || enquiry.status === "CONVERTED_TO_LEAD"}
                className="px-3 py-1.5 text-xs font-semibold uppercase font-mono tracking-wider border border-[#96702A]/40 bg-white hover:bg-[#FAF7F0] text-[#001C41] rounded-[2px] disabled:opacity-50"
              >
                Mark Contacted
              </button>

              {/* Conversion Button */}
              {enquiry.status !== "CONVERTED_TO_LEAD" ? (
                <button
                  onClick={() => setIsConvertModalOpen(true)}
                  className="px-3 py-1.5 text-xs font-semibold uppercase font-mono tracking-wider bg-[#001C41] text-[#E5BD79] hover:bg-[#96702A] hover:text-white transition-colors rounded-[2px] flex items-center gap-1.5 shadow-sm"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Convert to Matter</span>
                </button>
              ) : (
                <span className="px-3 py-1.5 text-xs font-mono uppercase bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-[2px] font-semibold">
                  Converted to Case
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <ConvertEnquiryModal
        enquiry={enquiry}
        isOpen={isConvertModalOpen}
        onClose={() => setIsConvertModalOpen(false)}
        onSuccess={() => {
          onStatusChange({ ...enquiry, status: "CONVERTED_TO_LEAD" });
        }}
      />
    </>
  );
}