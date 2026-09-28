"use client";

import React, { useEffect, useState } from "react";
import { 
  Inbox, 
  RotateCw, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Briefcase,
  Loader2 
} from "lucide-react";
import { getAdminEnquiries } from "@/lib/api";
import { EnquiryItem, EnquiryStatus } from "@/types/enquiry";
import EnquiryDetailDrawer from "../../components/admin/enquiries/EnquiryDetailDrawer";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminEnquiries({
        status: statusFilter !== "ALL" ? statusFilter : undefined,
        search: searchTerm.trim() || undefined,
      });
      setEnquiries(data);
    } catch (err: any) {
      setError(err.message || "Failed to load enquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case "NEW":
        return "bg-rose-50 text-rose-700 border-rose-200 font-bold";
      case "CONTACTED":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "CONVERTED_TO_LEAD":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "ARCHIVED":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-amber-50 text-amber-800 border-amber-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Top Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#96702A]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#96702A] animate-pulse" />
            <span className="text-[10.5px] font-mono tracking-[0.22em] uppercase text-[#96702A] font-semibold">
              Live Intake Desk
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#001C41] font-semibold tracking-tight mt-0.5">
            Client Inquiries &amp; Consultation Briefs
          </h1>
        </div>

        <button
          onClick={fetchEnquiries}
          disabled={loading}
          className="p-2 rounded-[2px] bg-white border border-[#96702A]/30 text-[#001C41] hover:bg-[#FAF7F0] transition-colors self-start sm:self-auto"
          title="Refresh Intake"
        >
          <RotateCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#96702A]" : ""}`} />
        </button>
      </div>

      {/* 2. Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-white border border-[#96702A]/20 p-3 rounded-[2px] shadow-sm">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search by client name, email, or ref code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-[#96702A]/25 rounded-[2px] text-xs text-[#001C41] focus:outline-none focus:border-[#96702A] bg-[#FAF7F0]/40 font-sans"
          />
          <Search className="w-3.5 h-3.5 text-[#96702A] absolute left-2.5 top-2.5 pointer-events-none" />
        </form>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {["ALL", "NEW", "CONTACTED", "CONVERTED_TO_LEAD", "ARCHIVED", "SPAM"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-[2px] border text-[10.5px] font-mono uppercase whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? "bg-[#001C41] text-white border-[#001C41]"
                  : "bg-[#FAF7F0] text-[#001C41]/80 border-[#96702A]/20 hover:border-[#96702A]"
              }`}
            >
              {st.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Error Banner */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-[2px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={fetchEnquiries} className="underline font-mono text-[11px]">
            Retry
          </button>
        </div>
      )}

      {/* 4. Enquiries DataGrid */}
      <div className="bg-white border border-[#96702A]/20 rounded-[3px] shadow-[0_4px_20px_rgba(0,28,65,0.03)] overflow-hidden">
        {loading && enquiries.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-7 h-7 animate-spin text-[#96702A]" />
            <span className="text-xs font-mono text-[#001C41]/70">Querying registry briefs...</span>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="py-16 text-center text-xs font-mono text-[#555]">
            No client enquiries found matching your filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF7F0] text-[#001C41] border-b border-[#96702A]/20 uppercase tracking-wider text-[10px] font-mono">
                  <th className="py-3 px-4">Ref Code &amp; Received</th>
                  <th className="py-3 px-4">Prospective Client</th>
                  <th className="py-3 px-4">Practice Vertical</th>
                  <th className="py-3 px-4">Triage Status</th>
                  <th className="py-3 px-4 text-right">Inspect Brief</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#001C41]/5">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-[#FAF7F0]/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-semibold text-[#001C41] block">
                        {enq.reference_number}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {new Date(enq.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-[#001C41] block">
                        {enq.full_name}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {enq.phone} • {enq.email}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[#001C41]">
                      <span className="font-medium truncate max-w-[200px] block">
                        {enq.matter_type}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-[2px] text-[9.5px] font-mono uppercase tracking-wider border ${getStatusBadge(enq.status)}`}>
                        {enq.status.replace(/_/g, " ")}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedEnquiry(enq)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F0] border border-[#96702A]/30 text-[#001C41] hover:bg-[#001C41] hover:text-white transition-colors rounded-[2px] font-mono text-[10.5px]"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#96702A]" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. Detail Slide-over Drawer */}
      <EnquiryDetailDrawer
        enquiry={selectedEnquiry}
        isOpen={!!selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        onStatusChange={(updated) => {
          setEnquiries(enquiries.map((e) => (e.id === updated.id ? updated : e)));
          setSelectedEnquiry(updated);
        }}
        onDeleteSuccess={(deletedId) => {
          setEnquiries(enquiries.filter((e) => e.id !== deletedId));
          setSelectedEnquiry(null);
        }}
      />
    </div>
  );
}