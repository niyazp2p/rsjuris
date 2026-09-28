"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  X, 
  ArrowRight, 
  Scale, 
  Building, 
  User, 
  AlertCircle, 
  Loader2 
} from "lucide-react";
import { EnquiryItem } from "@/types/enquiry";
import { convertEnquiryToLead } from "@/lib/api";
import { AudienceSegment, LeadPriority } from "@/types/lead";

interface Props {
  enquiry: EnquiryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (leadNumber: string) => void;
}

export default function ConvertEnquiryModal({
  enquiry,
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const router = useRouter();
  const [caseTitle, setCaseTitle] = useState("");
  const [courtForum, setCourtForum] = useState("High Court of Delhi");
  const [audience, setAudience] = useState<AudienceSegment>("INDIVIDUAL");
  const [priority, setPriority] = useState<LeadPriority>("MEDIUM");
  const [initialRemark, setInitialRemark] = useState("Enquiry reviewed and converted to active chamber matter.");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !enquiry) return null;

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const createdLead = await convertEnquiryToLead(enquiry.id, {
        case_title: caseTitle.trim() || `Matter: ${enquiry.matter_type} - ${enquiry.full_name}`,
        case_description: enquiry.summary,
        court_forum: courtForum.trim() || undefined,
        audience,
        priority,
        initial_remark: initialRemark.trim(),
      });

      onSuccess(createdLead.lead_number);
      onClose();
      router.push(`/admin/leads/${createdLead.id}`);
    } catch (err: any) {
      setError(err.message || "Failed to upgrade enquiry to active lead.");
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
            <Scale className="w-4 h-4 text-[#96702A]" />
            <h3 className="font-serif text-lg font-semibold text-[#001C41]">
              Convert Intake Brief to Lead Ledger
            </h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-[#96702A] text-[#001C41]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleConvert} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-[2px] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <div className="p-3 bg-[#FAF7F0] border border-[#96702A]/20 rounded-[2px] space-y-1">
            <span className="font-mono text-[10px] text-[#96702A] uppercase font-semibold">
              Inherited Intake Record
            </span>
            <div className="font-semibold text-sm text-[#001C41]">{enquiry.full_name}</div>
            <div className="font-mono text-[11px] text-slate-500">
              {enquiry.reference_number} • {enquiry.matter_type}
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-mono uppercase text-[#001C41] font-semibold">
              Assigned Case Docket Title *
            </label>
            <input
              type="text"
              required
              value={caseTitle}
              onChange={(e) => setCaseTitle(e.target.value)}
              placeholder={`e.g. ${enquiry.full_name} vs. Opposing Party`}
              className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0]/40 focus:bg-white focus:outline-none focus:border-[#96702A]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Client Segmentation
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value as AudienceSegment)}
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0]/40 font-medium focus:bg-white focus:outline-none"
              >
                <option value="INDIVIDUAL">Private Individual</option>
                <option value="BUSINESS">Corporate / Business</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Priority Tier
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as LeadPriority)}
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0]/40 font-medium focus:bg-white focus:outline-none"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="URGENT">URGENT</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-mono uppercase text-[#001C41] font-semibold">
              Judicial Tribunal / Court Forum
            </label>
            <input
              type="text"
              value={courtForum}
              onChange={(e) => setCourtForum(e.target.value)}
              placeholder="Supreme Court of India, High Court, NCLT, DRT..."
              className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0]/40 focus:bg-white focus:outline-none focus:border-[#96702A]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-mono uppercase text-[#001C41] font-semibold">
              Initial Procedural Remark *
            </label>
            <textarea
              rows={2}
              required
              value={initialRemark}
              onChange={(e) => setInitialRemark(e.target.value)}
              className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0]/40 focus:bg-white focus:outline-none focus:border-[#96702A]"
            />
          </div>

          <div className="pt-3 border-t border-[#96702A]/15 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-[#001C41] hover:bg-[#FAF7F0] rounded-[2px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#001C41] text-white hover:bg-[#96702A] transition-colors rounded-[2px] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-50"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E5BD79]" />}
              <span>Promote to Active Lead</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E5BD79]" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}