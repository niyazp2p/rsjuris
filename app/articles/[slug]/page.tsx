import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Clock, 
  ArrowLeft, 
  Share2, 
  Calendar, 
  Scale, 
  BookOpen, 
  User, 
  CheckCircle2, 
  ChevronRight 
} from "lucide-react";
import type { Metadata } from "next";
import { ArticleResponse } from "@/types/cms";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function fetchArticle(slug: string): Promise<ArticleResponse | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
  try {
    const res = await fetch(`${apiUrl}/articles/feed/${slug}`, {
      // Revalidate every 60 seconds or opt out of cache during local dev
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found | RS Juris & Co.",
    };
  }

  return {
    title: `${article.meta_title || article.title} | RS Juris & Co.`,
    description: article.meta_description || article.summary,
    alternates: {
      canonical: article.canonical_url || `https://rsjuris.com/articles/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      images: article.cover_image_url ? [article.cover_image_url] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await fetchArticle(slug);

  if (!article) {
    notFound();
  }

  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Recently Published";

  return (
    <article className="min-h-screen w-full bg-[#FAF7F0] text-[#001C41] antialiased selection:bg-[#96702A]/20 selection:text-[#001C41]">
      {/* 1. Header Atmosphere */}
      <header className="relative w-full bg-[#00142B] text-slate-100 py-16 sm:py-24 border-b border-[#96702A]/30 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#C9A24D_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#96702A]/10 blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#E5BD79] uppercase mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#96702A]" />
            <Link href="/articles" className="hover:text-white transition-colors">Publications</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#96702A]" />
            <span className="text-white/60 truncate max-w-[200px]">{article.practice_area}</span>
          </div>

          {/* Practice Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-[#96702A]/15 border border-[#96702A]/40 text-[#E5BD79] text-[10.5px] font-mono uppercase tracking-[0.2em] mb-4">
            <Scale className="w-3 h-3 text-[#E5BD79]" />
            <span>{article.practice_area}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-tight tracking-tight">
            {article.title}
          </h1>

          {/* Author & Meta Bar */}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#000E1F] border border-[#96702A]/40 flex items-center justify-center font-serif text-sm font-semibold text-[#E5BD79]">
                {article.author?.full_name ? article.author.full_name[0] : "A"}
              </div>
              <div>
                <span className="text-white font-sans font-medium block">
                  {article.author?.full_name || "Advocate"}
                </span>
                <span className="text-[10px] text-slate-400">
                  {article.author?.designation || "Senior Counsel"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#96702A]" />
                {formattedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#96702A]" />
                {article.reading_time_min} min read
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Reader Deck */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Cover Photo */}
        {article.cover_image_url && (
          <div className="relative aspect-video w-full rounded-[3px] overflow-hidden border border-[#96702A]/25 mb-10 shadow-lg">
            <Image
              src={article.cover_image_url}
              alt={article.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Executive Abstract Callout */}
        <div className="p-6 sm:p-7 rounded-[3px] bg-white border-l-4 border-[#96702A] border border-[#96702A]/20 shadow-sm mb-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#96702A] font-semibold block mb-2">
            Executive Summary & Precedent Context
          </span>
          <p className="font-serif text-base sm:text-lg text-slate-800 leading-relaxed italic">
            "{article.summary}"
          </p>
        </div>

        {/* Core Analysis HTML Render */}
        <div 
          className="prose prose-slate max-w-none 
            prose-headings:font-serif prose-headings:text-[#001C41] prose-headings:font-medium
            prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-base
            prose-blockquote:border-l-[#96702A] prose-blockquote:bg-white prose-blockquote:p-4 prose-blockquote:border-l-2 prose-blockquote:italic
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-[#96702A]/15 prose-h2:pb-2
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-strong:text-[#001C41] prose-strong:font-semibold"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* 3. Statutory Consultation Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-[3px] bg-white border border-[#96702A]/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-xl font-medium text-[#001C41]">
              Consult Counsel Regarding This Matter
            </h3>
            <p className="text-xs text-slate-500 font-light max-w-md">
              Need statutory advisory or appellate representation under {article.practice_area}? Submit a confidential consultation brief.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 bg-[#001C41] hover:bg-[#96702A] text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors shrink-0"
          >
            Initiate Consultation
          </Link>
        </div>

        {/* 4. Navigation Footer */}
        <div className="mt-10 pt-6 border-t border-[#96702A]/20 flex items-center justify-between">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-[#001C41] hover:text-[#96702A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#96702A]" />
            <span>Return to Publications Index</span>
          </Link>
        </div>
      </main>
    </article>
  );
}