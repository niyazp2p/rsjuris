"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Scale, 
  Building, 
  User, 
  Clock, 
  Send, 
  MessageSquare, 
  Briefcase, 
  Award, 
  ShieldCheck, 
  DollarSign, 
  Loader2, 
  AlertCircle 
} from "lucide-react";
import { getLeadDetails, addLeadRemark } from "@/lib/api";
import { LeadItem, LeadStatus } from "@/types/lead";

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = params.id as string;

  const [lead, setLead] = useState<LeadItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New Remark State
  const [remarkText, setRemarkText] = useState("");
  const [nextStatus, setNextStatus] = useState<string>("");
  const [submittingRemark, setSubmittingRemark] = useState(false);

  const fetchDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLeadDetails(leadId);
      setLead(data);
      setNextStatus(data.status);
    } catch (err: any) {
      setError(err.message || "Failed to load lead docket details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (leadId) fetchDetails();
  }, [leadId]);

  const handleAddRemark = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!remarkText.trim() || !lead) return;

    setSubmittingRemark(true);
    try {
      await addLeadRemark(lead.id, {
        remark: remarkText.trim(),
        next_status: (nextStatus as LeadStatus) || undefined,
      });
      setRemarkText("");
      fetchDetails();
    } catch (err: any) {
      alert(err.message || "Failed to append case remark.");
    } finally {
      setSubmittingRemark(false);
    }
  };

  if (loading && !lead) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-[#96702A]" />
        <span className="text-xs font-mono text-[#001C41]">Loading Case Docket...</span>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 text-rose-800 rounded-[2px] flex items-center justify-between">
        <span>{error || "Matter file not found."}</span>
        <button onClick={() => router.back()} className="underline text-xs font-mono">
          Return to Ledger
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Top Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#96702A]/20">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/leads"
            className="p-1.5 rounded-[2px] bg-white border border-[#96702A]/30 text-[#001C41] hover:bg-[#FAF7F0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#96702A]" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#96702A] font-semibold">
                Docket: {lead.lead_number}
              </span>
            </div>
            <h1 className="font-serif text-2xl text-[#001C41] font-semibold tracking-tight">
              {lead.case_title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded-[2px] bg-[#001C41] text-[#E5BD79] font-bold">
            {lead.status.replace(/_/g, " ")}
          </span>
          <span className="px-2.5 py-1 rounded-[2px] bg-white border border-[#96702A]/30 text-[#001C41] font-semibold">
            PRIORITY: {lead.priority}
          </span>
        </div>
      </div>

      {/* 2. Main Two-Column Matter Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Case Profile & Registry Facts (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Card A: Client & Representation */}
          <div className="bg-white border border-[#96702A]/20 rounded-[3px] p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-base font-semibold text-[#001C41] border-b border-[#96702A]/15 pb-2">
              Client & Retainer Coordinates
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Client Entity</span>
                <span className="font-semibold text-sm text-[#001C41]">{lead.client_name}</span>
                <span className="text-slate-500 font-mono block text-[11px]">{lead.client_email}</span>
                <span className="text-slate-500 font-mono block text-[11px]">{lead.client_phone}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Audience Segment</span>
                <span className="font-semibold text-sm text-[#001C41]">{lead.audience}</span>
                <span className="text-[10px] font-mono uppercase text-slate-400 block mt-2">Practice Area</span>
                <span className="font-semibold text-[#001C41]">{lead.practice_area}</span>
              </div>
            </div>
          </div>

          {/* Card B: Litigation Metrics & Court Forum */}
          <div className="bg-white border border-[#96702A]/20 rounded-[3px] p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-base font-semibold text-[#001C41] border-b border-[#96702A]/15 pb-2">
              Judicial Forum & Claims Register
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Tribunal / Bench</span>
                <span className="font-medium text-[#001C41]">{lead.court_forum || "Pre-filing Advisory"}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Opposing Party</span>
                <span className="font-medium text-[#001C41]">{lead.opposing_party || "Unspecified"}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Case Filing Number</span>
                <span className="font-mono text-[#001C41]">{lead.case_filing_number || "Not Yet Registered"}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Claim Amount</span>
                <span className="font-mono font-bold text-[#96702A]">
                  {lead.claim_value ? `₹ ${Number(lead.claim_value).toLocaleString("en-IN")}` : "Non-Monetary Relief"}
                </span>
              </div>
            </div>
          </div>

          {/* Card C: Dispute Statement */}
          <div className="bg-white border border-[#96702A]/20 rounded-[3px] p-6 shadow-sm space-y-2">
            <h3 className="font-serif text-base font-semibold text-[#001C41] border-b border-[#96702A]/15 pb-2">
              Dispute Statement & Pleadings Summary
            </h3>
            <p className="font-serif text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
              {lead.case_description}
            </p>
          </div>
        </div>

        {/* Right Column: Case Timeline Ledger & Status Engine (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#96702A]/20 rounded-[3px] p-6 shadow-sm space-y-6">
          <div>
            <h3 className="font-serif text-base font-semibold text-[#001C41]">
              Procedural Timeline Ledger
            </h3>
            <p className="text-xs text-slate-500 font-light mt-0.5">
              Chronological hearing notes, advocate remarks, and status transitions
            </p>
          </div>

          {/* Log Remark Input Form */}
          <form onSubmit={handleAddRemark} className="p-4 bg-[#FAF7F0] border border-[#96702A]/20 rounded-[2px] space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-mono uppercase text-[10.5px] text-[#001C41] font-semibold block">
                Advance Procedural Status
              </label>
              <select
                value={nextStatus}
                onChange={(e) => setNextStatus(e.target.value)}
                className="w-full px-3 py-1.5 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-white font-mono uppercase"
              >
                <option value="INTAKE">INTAKE</option>
                <option value="PRE_LITIGATION_REVIEW">PRE LITIGATION REVIEW</option>
                <option value="RETAINED">RETAINED</option>
                <option value="IN_LITIGATION">IN LITIGATION</option>
                <option value="SETTLED">SETTLED</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-mono uppercase text-[10.5px] text-[#001C41] font-semibold block">
                Hearing Note / Advocate Remark *
              </label>
              <textarea
                rows={3}
                required
                value={remarkText}
                onChange={(e) => setRemarkText(e.target.value)}
                placeholder="Log procedural update, hearing date, judge remarks, or filing milestone..."
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-white focus:outline-none focus:border-[#96702A]"
              />
            </div>

            <button
              type="submit"
              disabled={submittingRemark}
              className="w-full py-2 bg-[#001C41] text-white hover:bg-[#96702A] transition-colors rounded-[2px] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {submittingRemark && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E5BD79]" />}
              <span>Commit Ledger Remark</span>
              <Send className="w-3.5 h-3.5 text-[#E5BD79]" />
            </button>
          </form>

          {/* Chronological Timeline Feed */}
          <div className="space-y-4">
            {lead.remarks.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-slate-400">
                No procedural remarks recorded yet.
              </div>
            ) : (
              <div className="relative pl-4 border-l-2 border-[#96702A]/20 space-y-6">
                {lead.remarks.map((rem) => (
                  <div key={rem.id} className="relative space-y-1 text-xs">
                    <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#96702A] border-2 border-white" />
                    <div className="flex items-center justify-between text-[10.5px] font-mono text-slate-500">
                      <span className="font-bold text-[#001C41]">
                        {rem.author_name || "Advocate"}
                      </span>
                      <span>
                        {new Date(rem.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="p-3 bg-[#FAF7F0]/60 border border-[#96702A]/15 rounded-[2px] text-[#001C41] leading-relaxed">
                      {rem.remark}
                    </div>

                    {rem.next_status && (
                      <span className="inline-block text-[9.5px] font-mono uppercase tracking-wider text-[#96702A] font-semibold">
                        Status Promoted: {rem.next_status.replace(/_/g, " ")}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}