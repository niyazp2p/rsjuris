"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FileSpreadsheet, 
  PlusCircle, 
  RotateCw, 
  Search, 
  Eye, 
  Briefcase, 
  Building, 
  User, 
  Clock, 
  AlertCircle,
  Loader2 
} from "lucide-react";
import { getLeads } from "@/lib/api";
import { LeadItem, LeadStatus, LeadPriority } from "@/types/lead";
import CreateLeadModal from "../../components/admin/leads/CreateLeadModal";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLeads({
        status: statusFilter !== "ALL" ? statusFilter : undefined,
        priority: priorityFilter !== "ALL" ? priorityFilter : undefined,
        search: search.trim() || undefined,
      });
      setLeads(data);
    } catch (err: any) {
      setError(err.message || "Failed to load master case ledger.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, priorityFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const getStatusBadge = (st: LeadStatus) => {
    switch (st) {
      case "INTAKE":
        return "bg-rose-50 text-rose-700 border-rose-200 font-bold";
      case "PRE_LITIGATION_REVIEW":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "RETAINED":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "IN_LITIGATION":
        return "bg-purple-50 text-purple-800 border-purple-200 font-bold";
      case "SETTLED":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getPriorityBadge = (pr: LeadPriority) => {
    switch (pr) {
      case "URGENT":
        return "text-rose-700 bg-rose-50 border-rose-300 font-bold";
      case "HIGH":
        return "text-amber-800 bg-amber-50 border-amber-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#96702A]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#96702A] animate-pulse" />
            <span className="text-[10.5px] font-mono tracking-[0.22em] uppercase text-[#96702A] font-semibold">
              Chambers Case Ledger
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#001C41] font-semibold tracking-tight mt-0.5">
            Master Lead & Litigation Ledger
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="p-2 rounded-[2px] bg-white border border-[#96702A]/30 text-[#001C41] hover:bg-[#FAF7F0] transition-colors"
            title="Refresh Ledger"
          >
            <RotateCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#96702A]" : ""}`} />
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-2 rounded-[2px] bg-[#001C41] text-white hover:bg-[#96702A] transition-colors text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#E5BD79]" />
            <span>New Matter File</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Matrix Bar */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between bg-white border border-[#96702A]/20 p-3 rounded-[2px] shadow-sm">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search docket number, client, case title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-[#96702A]/25 rounded-[2px] text-xs text-[#001C41] focus:outline-none focus:border-[#96702A] bg-[#FAF7F0]/40 font-sans"
          />
          <Search className="w-3.5 h-3.5 text-[#96702A] absolute left-2.5 top-2.5 pointer-events-none" />
        </form>

        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          {/* Status Select */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 border border-[#96702A]/25 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0] font-mono uppercase"
          >
            <option value="ALL">All Statuses</option>
            <option value="INTAKE">INTAKE</option>
            <option value="PRE_LITIGATION_REVIEW">PRE LITIGATION REVIEW</option>
            <option value="RETAINED">RETAINED</option>
            <option value="IN_LITIGATION">IN LITIGATION</option>
            <option value="SETTLED">SETTLED</option>
            <option value="CLOSED">CLOSED</option>
          </select>

          {/* Priority Select */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-1.5 border border-[#96702A]/25 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0] font-mono uppercase"
          >
            <option value="ALL">All Priorities</option>
            <option value="URGENT">URGENT</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
        </div>
      </div>

      {/* 3. Error Banner */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-[2px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={fetchLeads} className="underline font-mono text-[11px]">
            Retry
          </button>
        </div>
      )}

      {/* 4. Ledger DataGrid */}
      <div className="bg-white border border-[#96702A]/20 rounded-[3px] shadow-[0_4px_20px_rgba(0,28,65,0.03)] overflow-hidden">
        {loading && leads.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-7 h-7 animate-spin text-[#96702A]" />
            <span className="text-xs font-mono text-[#001C41]/70">Querying chamber ledger...</span>
          </div>
        ) : leads.length === 0 ? (
          <div className="py-16 text-center text-xs font-mono text-[#555]">
            No legal matters logged matching the filter parameters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF7F0] text-[#001C41] border-b border-[#96702A]/20 uppercase tracking-wider text-[10px] font-mono">
                  <th className="py-3 px-4">Case Docket No.</th>
                  <th className="py-3 px-4">Client & Segment</th>
                  <th className="py-3 px-4">Case Title & Forum</th>
                  <th className="py-3 px-4">Practice Area</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Case File</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#001C41]/5">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#FAF7F0]/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#001C41]">
                      {lead.lead_number}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#001C41]">{lead.client_name}</div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                        {lead.audience === "BUSINESS" ? (
                          <span className="inline-flex items-center gap-0.5 text-[#001C41]">
                            <Building className="w-3 h-3 text-[#96702A]" /> Corp
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 text-slate-600">
                            <User className="w-3 h-3 text-[#96702A]" /> Indiv
                          </span>
                        )}
                        <span>•</span>
                        <span>{lead.client_phone}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-[240px]">
                      <div className="font-medium text-[#001C41] truncate">{lead.case_title}</div>
                      <div className="text-[11px] text-slate-500 truncate font-light">
                        {lead.court_forum || "Pre-filing Chamber Review"}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-[#001C41]">
                      <span className="font-medium truncate max-w-[180px] block">
                        {lead.practice_area}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded-[2px] text-[9.5px] font-mono uppercase tracking-wider border ${getPriorityBadge(lead.priority)}`}>
                        {lead.priority}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-[2px] text-[9.5px] font-mono uppercase tracking-wider border ${getStatusBadge(lead.status)}`}>
                        {lead.status.replace(/_/g, " ")}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F0] border border-[#96702A]/30 text-[#001C41] hover:bg-[#001C41] hover:text-white transition-colors rounded-[2px] font-mono text-[10.5px]"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#96702A]" />
                        <span>Inspect</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CreateLeadModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={(newLead) => setLeads([newLead, ...leads])}
      />
    </div>
  );
}