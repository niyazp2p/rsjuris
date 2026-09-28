"use client";

import React, { useEffect, useState } from "react";
import { FolderKanban, Briefcase, FileText, Scale } from "lucide-react";
import { PipelineCounts, EditorialCounts } from "@/types/dashboard";
import { getMediaVaultAssets } from "@/lib/api";

interface Props {
  pipeline: PipelineCounts;
  editorial: EditorialCounts;
}

export default function DashboardMetricCards({ pipeline, editorial }: Props) {
  const [vaultCount, setVaultCount] = useState<number | null>(null);

  useEffect(() => {
    async function loadVaultTotal() {
      try {
        const assets = await getMediaVaultAssets();
        setVaultCount(assets.length);
      } catch {
        setVaultCount(0);
      }
    }
    loadVaultTotal();
  }, []);

  const cards = [
    {
      title: "Vault Assets",
      value: vaultCount === null ? "..." : vaultCount,
      sublabel: "Cloudinary CDN Vault",
      trend: "Legal Briefs, DOCX & PDFs",
      icon: FolderKanban,
      highlight: false,
    },
    {
      title: "Active Matters",
      value: pipeline.total_active_leads,
      sublabel: `${pipeline.retained_cases} Retained Retainers`,
      trend: `${pipeline.in_litigation_cases} In Active Litigation`,
      icon: Briefcase,
      highlight: false,
    },
    {
      title: "Legal Insights",
      value: editorial.published,
      sublabel: `${editorial.total_articles} Registered Articles`,
      trend: `${editorial.pending_review} In Review • ${editorial.drafts} Drafts`,
      icon: FileText,
      highlight: false,
    },
    {
      title: "Litigation Matters",
      value: pipeline.in_litigation_cases,
      sublabel: "Appellate & High Courts",
      trend: "Doctrinal Filings Active",
      icon: Scale,
      highlight: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="relative bg-white border border-[#96702A]/20 rounded-[3px] p-5 shadow-[0_4px_20px_rgba(0,28,65,0.03)] hover:border-[#96702A]/40 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#001C41]/70 font-medium">
                {card.title}
              </span>
              <div className="w-8 h-8 rounded-[2px] bg-[#FAF7F0] border border-[#96702A]/20 flex items-center justify-center text-[#96702A] group-hover:bg-[#001C41] group-hover:text-[#E5BD79] transition-colors">
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-serif text-3xl font-semibold text-[#001C41]">
                {card.value}
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-[#001C41]/5 flex flex-col gap-0.5">
              <span className="text-xs text-[#001C41] font-medium">
                {card.sublabel}
              </span>
              <span className="text-[11px] font-mono text-[#96702A]">
                {card.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}