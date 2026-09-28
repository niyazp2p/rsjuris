"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Briefcase, Plus, AlertCircle, Loader2 } from "lucide-react";
import { createLeadManually } from "@/lib/api";
import { AudienceSegment, LeadPriority, LeadItem } from "@/types/lead";

const practiceOptions = [
  "Corporate & Commercial Law",
  "Civil Litigation & Dispute Resolution",
  "Criminal Law",
  "Property & Real Estate Law",
  "Family & Matrimonial Law",
  "Employment & Labour Law",
  "Banking & Financial Disputes",
  "Intellectual Property Rights",
  "Arbitration & Alternative Dispute Resolution",
  "General Chamber Advisory / Other",
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (lead: LeadItem) => void;
}

export default function CreateLeadModal({ isOpen, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    alternate_phone: "",
    audience: "BUSINESS" as AudienceSegment,
    practice_area: "Corporate & Commercial Law",
    case_title: "",
    case_description: "",
    court_forum: "High Court of Delhi",
    opposing_party: "",
    case_filing_number: "",
    claim_value: "",
    priority: "HIGH" as LeadPriority,
    initial_remark: "Direct walk-in retainer logged in ledger.",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newLead = await createLeadManually({
        ...formData,
        alternate_phone: formData.alternate_phone.trim() || undefined,
        opposing_party: formData.opposing_party.trim() || undefined,
        case_filing_number: formData.case_filing_number.trim() || undefined,
        claim_value: formData.claim_value ? parseFloat(formData.claim_value) : undefined,
      });

      onSuccess(newLead);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to register new case file.");
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
        className="w-full max-w-2xl bg-white border border-[#96702A]/30 rounded-[3px] shadow-[0_16px_50px_rgba(0,28,65,0.15)] overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-[#96702A]/20 flex items-center justify-between bg-[#FAF7F0]">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#96702A]" />
            <h3 className="font-serif text-lg font-semibold text-[#001C41]">
              Manual Lead & Retainer Registration
            </h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-[#96702A] text-[#001C41]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-[2px] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Row 1: Client Coordinates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Client / Company *
              </label>
              <input
                type="text"
                required
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                placeholder="Apex Logistics Ltd"
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0]/40 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Official Email *
              </label>
              <input
                type="email"
                required
                value={formData.client_email}
                onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                placeholder="legal@apex.com"
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0]/40 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.client_phone}
                onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                placeholder="+91 98111 22334"
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0]/40 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Row 2: Practice & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Practice Vertical *
              </label>
              <select
                value={formData.practice_area}
                onChange={(e) => setFormData({ ...formData, practice_area: e.target.value })}
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0]/40 focus:bg-white focus:outline-none"
              >
                {practiceOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Segment
              </label>
              <select
                value={formData.audience}
                onChange={(e) => setFormData({ ...formData, audience: e.target.value as AudienceSegment })}
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0]/40 focus:bg-white focus:outline-none"
              >
                <option value="INDIVIDUAL">Private Individual</option>
                <option value="BUSINESS">Corporate / Business</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Priority Tier
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as LeadPriority })}
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0]/40 focus:bg-white focus:outline-none"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="URGENT">URGENT</option>
              </select>
            </div>
          </div>

          {/* Row 3: Case Title & Forum */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Case Title *
              </label>
              <input
                type="text"
                required
                value={formData.case_title}
                onChange={(e) => setFormData({ ...formData, case_title: e.target.value })}
                placeholder="Apex Logistics vs Union of India"
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0]/40 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Tribunal / Forum
              </label>
              <input
                type="text"
                value={formData.court_forum}
                onChange={(e) => setFormData({ ...formData, court_forum: e.target.value })}
                placeholder="High Court of Delhi - Commercial Bench"
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0]/40 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Row 4: Opposing Party & Claim Value */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Opposing Party
              </label>
              <input
                type="text"
                value={formData.opposing_party}
                onChange={(e) => setFormData({ ...formData, opposing_party: e.target.value })}
                placeholder="State Infrastructure Corp"
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0]/40 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Claim Value (INR)
              </label>
              <input
                type="number"
                value={formData.claim_value}
                onChange={(e) => setFormData({ ...formData, claim_value: e.target.value })}
                placeholder="e.g. 5000000"
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0]/40 focus:bg-white focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
              Dispute Statement / Case Facts *
            </label>
            <textarea
              rows={3}
              required
              minLength={10}
              value={formData.case_description}
              onChange={(e) => setFormData({ ...formData, case_description: e.target.value })}
              className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0]/40 focus:bg-white focus:outline-none"
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
              className="px-5 py-2 bg-[#001C41] text-white hover:bg-[#96702A] transition-colors rounded-[2px] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-50"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E5BD79]" />}
              <span>Register Lead</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}