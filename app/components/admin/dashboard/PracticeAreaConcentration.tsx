"use client";

import React from "react";
import { Building2, User, Layers } from "lucide-react";
import { PracticeAreaStat, AudienceBreakdown } from "@/types/dashboard";

interface Props {
  concentration: PracticeAreaStat[];
  audience: AudienceBreakdown;
}

export default function PracticeAreaConcentration({ concentration, audience }: Props) {
  const maxCount = Math.max(...concentration.map((c) => c.count), 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* 1. Practice Verticals Distribution */}
      <div className="lg:col-span-8 bg-white border border-[#96702A]/20 rounded-[3px] p-6 shadow-[0_4px_20px_rgba(0,28,65,0.03)]">
        <div className="flex items-center justify-between pb-4 border-b border-[#96702A]/15 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-[2px] bg-[#FAF7F0] text-[#96702A]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#001C41]">
                Practice Area Concentration
              </h2>
              <p className="text-xs text-[#444444] font-light">
                Matter distribution across active chambers retainers
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-[#96702A]">
            {concentration.length} Active Verticals
          </span>
        </div>

        {concentration.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#444444] font-mono">
            No active practice matters currently logged in ledger.
          </div>
        ) : (
          <div className="space-y-4">
            {concentration.map((stat, idx) => {
              const percentage = Math.round((stat.count / maxCount) * 100);
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#001C41] truncate max-w-[320px]">
                      {stat.practice_area}
                    </span>
                    <span className="font-mono text-[#96702A] font-semibold">
                      {stat.count} {stat.count === 1 ? "matter" : "matters"}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-[#FAF7F0] rounded-full overflow-hidden border border-[#96702A]/15">
                    <div
                      className="h-full bg-gradient-to-r from-[#96702A] to-[#E5BD79] rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Client Audience Segmentation Ratio */}
      <div className="lg:col-span-4 bg-white border border-[#96702A]/20 rounded-[3px] p-6 shadow-[0_4px_20px_rgba(0,28,65,0.03)] flex flex-col justify-between">
        <div>
          <div className="pb-4 border-b border-[#96702A]/15 mb-5">
            <h2 className="font-serif text-lg font-semibold text-[#001C41]">
              Audience Split
            </h2>
            <p className="text-xs text-[#444444] font-light">
              Corporate vs Individual representation
            </p>
          </div>

          <div className="space-y-4 my-2">
            {/* Business / Corporate */}
            <div className="p-3.5 rounded-[2px] bg-[#FAF7F0] border border-[#96702A]/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#96702A]" />
                  <span className="text-xs font-semibold text-[#001C41]">
                    Corporate / Business
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-[#001C41]">
                  {audience.business_pct}%
                </span>
              </div>
              <div className="text-[11px] text-[#444444] font-mono">
                {audience.business_count} Active Retainers
              </div>
            </div>

            {/* Individual */}
            <div className="p-3.5 rounded-[2px] bg-[#FAF7F0] border border-[#96702A]/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#96702A]" />
                  <span className="text-xs font-semibold text-[#001C41]">
                    Private Individuals
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-[#001C41]">
                  {audience.individual_pct}%
                </span>
              </div>
              <div className="text-[11px] text-[#444444] font-mono">
                {audience.individual_count} Active Retainers
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#001C41]/5 text-[11px] font-mono text-[#96702A] text-center">
          Standardized under PRD §6.8 Audience Logic[cite: 1, 9]
        </div>
      </div>
    </div>
  );
}