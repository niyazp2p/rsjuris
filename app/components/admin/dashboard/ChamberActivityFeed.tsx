"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Inbox, Clock, CheckCircle2, MessageSquare } from "lucide-react";
import { ActivityFeedItem } from "@/types/dashboard";

interface Props {
  activity: ActivityFeedItem[];
}

// Lightweight native relative time formatter (no external packages required)
function formatTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
  } catch {
    return "recently";
  }
}

export default function ChamberActivityFeed({ activity }: Props) {
  const getIcon = (type: string) => {
    switch (type) {
      case "ENQUIRY_RECEIVED":
        return <Inbox className="w-3.5 h-3.5 text-[#96702A]" />;
      case "LEAD_STATUS_UPGRADED":
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />;
      default:
        return <MessageSquare className="w-3.5 h-3.5 text-[#001C41]" />;
    }
  };

  return (
    <div className="bg-white border border-[#96702A]/20 rounded-[3px] p-6 shadow-[0_4px_20px_rgba(0,28,65,0.03)]">
      <div className="flex items-center justify-between pb-4 border-b border-[#96702A]/15 mb-4">
        <div>
          <h2 className="font-serif text-lg font-semibold text-[#001C41]">
            Chamber Procedural Timeline
          </h2>
          <p className="text-xs text-[#444444] font-light">
            Real-time feed of intake briefs, status promotions, and ledger remarks
          </p>
        </div>
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1 text-xs font-mono text-[#96702A] hover:text-[#001C41] transition-colors"
        >
          <span>Full Case Ledger</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {activity.length === 0 ? (
        <div className="py-12 text-center text-xs text-[#444444] font-mono">
          No recent activity events recorded.
        </div>
      ) : (
        <div className="divide-y divide-[#001C41]/5">
          {activity.map((item) => (
            <div key={item.id} className="py-3.5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-[2px] bg-[#FAF7F0] border border-[#96702A]/20 shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#001C41]">
                    {item.title}
                  </div>
                  <div className="text-[11.5px] text-[#444444] font-light mt-0.5">
                    {item.subtitle}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0 gap-1">
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-[2px] bg-[#FAF7F0] border border-[#96702A]/30 text-[9.5px] font-mono uppercase text-[#001C41] font-medium">
                    {item.badge}
                  </span>
                )}
                <span className="text-[10px] font-mono text-[#444444]/70 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#96702A]" />
                  {formatTimeAgo(item.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}