"use client";

import React, { useEffect, useState, useMemo, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, BookOpen, ArrowUpRight } from "lucide-react";
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

// Lightweight Card Skeleton to eliminate layout shifts (CLS)
function ArticleCardSkeleton() {
  return (
    <div className="bg-white border border-[#96702A]/15 rounded-[3px] overflow-hidden shadow-xs animate-pulse flex flex-col justify-between">
      <div>
        <div className="aspect-video w-full bg-[#001C41]/10" />
        <div className="p-5 space-y-3">
          <div className="h-2.5 w-24 bg-[#96702A]/20 rounded-[2px]" />
          <div className="h-5 w-4/5 bg-slate-200 rounded-[2px]" />
          <div className="space-y-1.5 pt-1">
            <div className="h-3 w-full bg-slate-100 rounded-[2px]" />
            <div className="h-3 w-5/6 bg-slate-100 rounded-[2px]" />
          </div>
        </div>
      </div>
      <div className="p-5 pt-0 border-t border-[#001C41]/5 flex items-center justify-between mt-4">
        <div className="h-3 w-16 bg-slate-200 rounded-[2px]" />
        <div className="h-3 w-20 bg-[#96702A]/20 rounded-[2px]" />
      </div>
    </div>
  );
}

export default function PublicArticlesPage() {
  const [allArticles, setAllArticles] = useState<ArticleListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [, startTransition] = useTransition();

  // 1. Fetch publication feed once & cache in memory
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function loadFeed() {
      try {
        const res = await fetch(`${API_BASE_URL}/articles/feed`, {
          signal: controller.signal,
          // Leverage browser HTTP cache
          headers: { Accept: "application/json" },
        });

        if (!res.ok) throw new Error("Failed to load feed");
        const data = await res.json();

        if (isMounted) {
          setAllArticles(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      } catch (err: unknown) {
        if ((err as Error).name !== "AbortError" && isMounted) {
          setAllArticles([]);
          setLoading(false);
        }
      }
    }

    loadFeed();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // 2. Instant 0ms filtering via memory
  const filteredArticles = useMemo(() => {
    if (selectedCategory === "ALL") return allArticles;
    return allArticles.filter((art) => art.practice_area === selectedCategory);
  }, [allArticles, selectedCategory]);

  const handleSelectCategory = (cat: string) => {
    startTransition(() => {
      setSelectedCategory(cat);
    });
  };

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
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleSelectCategory(cat)}
              className={`px-3.5 py-1.5 rounded-[2px] border text-[11px] font-mono uppercase whitespace-nowrap transition-all duration-150 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#001C41] text-white border-[#001C41] shadow-xs"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="py-20 text-center text-xs font-mono text-slate-500">
            No published articles found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art, idx) => (
              <Link
                key={art.id}
                href={`/articles/${art.slug}`}
                prefetch={idx < 6}
                className="group bg-white border border-[#96702A]/20 rounded-[3px] overflow-hidden shadow-xs hover:border-[#96702A] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {art.cover_image_url ? (
                    <div className="relative aspect-video w-full overflow-hidden bg-[#001C41]">
                      <Image
                        src={art.cover_image_url}
                        alt={art.title}
                        fill
                        // Constrains download size to card width instead of 100vw
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={idx < 3}
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