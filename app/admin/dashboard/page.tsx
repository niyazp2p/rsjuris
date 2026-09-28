"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  RotateCw, 
  AlertCircle, 
  FilePlus, 
  PlusCircle, 
  ExternalLink,
  ShieldCheck,
  Loader2
} from "lucide-react";
import { getDashboardStats } from "@/lib/api";
import { DashboardMetricsResponse } from "@/types/dashboard";
import DashboardMetricCards from "../../components/admin/dashboard/DashboardMetricCards";
import PracticeAreaConcentration from "../../components/admin/dashboard/PracticeAreaConcentration";
import ChamberActivityFeed from "../../components/admin/dashboard/ChamberActivityFeed";

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardMetricsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const stats = await getDashboardStats();
      setData(stats);
    } catch (err: any) {
      setError(err.message || "Failed to load Firm metrics.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#96702A]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#96702A] animate-pulse" />
            <span className="text-[10.5px] font-mono tracking-[0.22em] uppercase text-[#96702A] font-semibold">
              Executive Terminal
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#001C41] font-semibold tracking-tight mt-0.5">
            Firm Master Overview
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadStats}
            disabled={isLoading}
            className="p-2 rounded-[2px] bg-white border border-[#96702A]/30 text-[#001C41] hover:bg-[#FAF7F0] transition-colors disabled:opacity-50"
            title="Refresh Metrics"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#96702A]" : ""}`} />
          </button>

          <Link
            href="/admin/leads"
            className="px-3.5 py-2 rounded-[2px] bg-white border border-[#96702A]/30 text-xs font-semibold text-[#001C41] hover:border-[#96702A] transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#96702A]" />
            <span>New Matter</span>
          </Link>

          <Link
            href="/admin/articles/new"
            className="px-3.5 py-2 rounded-[2px] bg-[#001C41] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#96702A] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <FilePlus className="w-3.5 h-3.5 text-[#E5BD79]" />
            <span>Draft Insight</span>
          </Link>
        </div>
      </div>

      {/* 2. Loading & Error States */}
      {isLoading && !data && (
        <div className="py-24 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#96702A]" />
          <span className="text-xs font-mono tracking-wider text-[#001C41]/70">
            Querying Firm metrics & ledger...
          </span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-[2px] bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={loadStats}
            className="text-[11px] font-mono underline font-medium hover:text-rose-950"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* 3. Main Data Content */}
      {data && (
        <div className="space-y-6">
          <DashboardMetricCards pipeline={data.pipeline} editorial={data.editorial} />
          <PracticeAreaConcentration
            concentration={data.practice_concentration}
            audience={data.audience}
          />
          <ChamberActivityFeed activity={data.recent_activity} />
        </div>
      )}
    </div>
  );
}