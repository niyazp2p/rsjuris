"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ChevronRight, BookOpen, ArrowUpRight, Loader2 } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import { ArticleListItem } from "@/types/cms";

const categories = [
  "ALL",
  "Corporate & Commercial Law",
  "Civil Litigation & Dispute Resolution",
  "Criminal Law",
  "Property & Real Estate Law",
  "Arbitration & Alternative Dispute Resolution",
  "Intellectual Property Rights",
];

export default function PublicArticlesPage() {
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      try {
        const query = selectedCategory !== "ALL" ? `?practice_area=${selectedCategory}` : "";
        const res = await fetch(`${API_BASE_URL}/articles/feed${query}`);
        const data = await res.json();
        setArticles(data);
      } catch {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, [selectedCategory]);

  return (
    <div className="w-full bg-[#FAF7F0] text-[#001C41] min-h-screen">
      {/* 1. Hero Atmosphere */}
      <section className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#000E1F] via-[#00142B] to-[#001C41] text-[#FAF7F0] px-4 sm:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[2px] border border-[#96702A]/40 bg-[#000E1F]/80 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5BD79] animate-pulse" />
            <span className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-[#E5BD79] font-semibold">
              Legal Insights & Doctrinal Analyses
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-tight">
            Chambers Publications & Briefings
          </h1>

          <p className="text-xs sm:text-base text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Statutory commentaries, case briefings, and appellate analyses authored by the advocates and partners of RS Juris & Co.
          </p>
        </div>
      </section>

      {/* 2. Practice Area Filter Bar */}
      <div className="border-b border-[#96702A]/20 bg-white py-3 px-4 sm:px-8 sticky top-0 z-20 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-[2px] border text-[11px] font-mono uppercase whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-[#001C41] text-white border-[#001C41]"
                  : "bg-[#FAF7F0] text-[#001C41] border-[#96702A]/20 hover:border-[#96702A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Articles Feed Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-[#96702A]" />
            <span className="text-xs font-mono text-[#001C41]">Loading publications...</span>
          </div>
        ) : articles.length === 0 ? (
          <div className="py-20 text-center text-xs font-mono text-slate-500">
            No published articles found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <Link
                key={art.id}
                href={`/articles/${art.slug}`}
                className="group bg-white border border-[#96702A]/20 rounded-[3px] overflow-hidden shadow-xs hover:border-[#96702A] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {art.cover_image_url ? (
                    <div className="relative aspect-video w-full overflow-hidden bg-[#001C41]">
                      <Image
                        src={art.cover_image_url}
                        alt={art.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video w-full bg-[#001C41] flex items-center justify-center text-[#E5BD79]">
                      <BookOpen className="w-8 h-8 opacity-40" />
                    </div>
                  )}

                  <div className="p-5 space-y-2.5">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-[#96702A] font-semibold block">
                      {art.practice_area}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-[#001C41] leading-snug group-hover:text-[#96702A] transition-colors">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-light line-clamp-3 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#001C41]/5 flex items-center justify-between text-[10.5px] font-mono text-slate-400 mt-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#96702A]" />
                    {art.reading_time_min} min read
                  </span>
                  <span className="text-[#001C41] font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Read Brief <ArrowUpRight className="w-3 h-3 text-[#96702A]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}