"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  UploadCloud,
  FileCheck,
  Search,
  Eye,
  Loader2,
  AlertCircle,
  Save,
} from "lucide-react";
import { createArticle, uploadToVault } from "@/lib/api";
import { AudienceSegment, ContentStatus } from "@/types/cms";
import RichEditorToolbar from "../../../components/admin/articles/RichEditorToolbar";
const practiceOptions = [
  "Corporate & Commercial Law",
  "Civil Litigation & Dispute Resolution",
  "Criminal Law",
  "Property & Real Estate Law",
  "Family & Matrimonial Law",
  "Employment & Labour Law",
  "Banking & Financial Disputes",
  "Intellectual Property Rights",
  "Arbitration & Alternative Dispute Resolution",
  "General Chamber Advisory / Other",
];

export default function NewArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Core Document State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    practice_area: "Corporate & Commercial Law",
    target_audience: "BUSINESS" as AudienceSegment,
    summary: "",
    content: "",
    cover_image_url: "",
    cover_public_id: "",
    meta_title: "",
    meta_description: "",
    canonical_url: "",
    status: "DRAFT" as ContentStatus,
  });

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    try {
      const asset = await uploadToVault(file, "rsjuris/articles/covers");
      setFormData((prev) => ({
        ...prev,
        cover_image_url: asset.secure_url,
        cover_public_id: asset.public_id,
      }));
    } catch (err: any) {
      alert(err.message || "Cover image upload failed.");
    } finally {
      setUploadingCover(false);
    }
  };

  const handleSubmit = async (submitStatus: ContentStatus) => {
    if (!formData.title || !formData.summary || !formData.content) {
      setError("Title, summary, and content body are required.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await createArticle({
        ...formData,
        status: submitStatus,
        meta_title: formData.meta_title.trim() || formData.title,
        meta_description: formData.meta_description.trim() || formData.summary.slice(0, 155),
      });
      router.push("/admin/articles");
    } catch (err: any) {
      setError(err.message || "Failed to create article.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#96702A]/20">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles"
            className="p-1.5 rounded-[2px] bg-white border border-[#96702A]/30 text-[#001C41] hover:bg-[#FAF7F0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#96702A] font-semibold">
              Editorial Drafting Console
            </span>
            <h1 className="font-serif text-2xl text-[#001C41] font-semibold tracking-tight">
              Create Legal Publication
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleSubmit("DRAFT")}
            disabled={loading}
            className="px-4 py-2 border border-[#96702A]/30 bg-white hover:bg-[#FAF7F0] text-[#001C41] text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSubmit("PUBLISHED")}
            disabled={loading}
            className="px-5 py-2 bg-[#001C41] text-white hover:bg-[#96702A] transition-colors rounded-[2px] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
          >
            {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E5BD79]" />}
            <span>Publish Live</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-[2px] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* 2. Main Editor Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Drafting Area (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Title & Slug */}
          <div className="p-6 bg-white border border-[#96702A]/20 rounded-[3px] shadow-sm space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Publication Headline *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Insolvency Resolution Under the IBC: 2026 Jurisprudential Trends"
                className="w-full px-3.5 py-2.5 border border-[#96702A]/30 rounded-[2px] text-sm font-serif text-[#001C41] focus:bg-white focus:outline-none focus:border-[#96702A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Custom URL Slug (Leave blank for auto-generation)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="insolvency-resolution-ibc-2026-trends"
                className="w-full px-3 py-1.5 border border-[#96702A]/25 rounded-[2px] text-xs font-mono text-slate-600 bg-[#FAF7F0]/40 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Executive Summary */}
          <div className="p-6 bg-white border border-[#96702A]/20 rounded-[3px] shadow-sm space-y-1">
            <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
              Executive Abstract / Summary *
            </label>
            <textarea
              rows={3}
              required
              minLength={20}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="Provide a statutory summary of judicial precedents and key strategic takeaways..."
              className="w-full px-3.5 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0]/30 focus:bg-white focus:outline-none focus:border-[#96702A] leading-relaxed"
            />
          </div>

          {/* Rich Content Area */}
          <div className="p-6 bg-white border border-[#96702A]/20 rounded-[3px] shadow-sm space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-[#96702A]/15">
              <label className="text-[11px] font-mono uppercase text-[#001C41] font-semibold">
                Full Document Analysis (HTML or Rich Text) *
              </label>
              <span className="text-[10px] font-mono text-[#96702A]">HTML Tags Permitted</span>
            </div>
            <RichEditorToolbar
    value={formData.content}
    onChange={(nextContent) =>
      setFormData((prev) => ({ ...prev, content: nextContent }))
    }
  />
          </div>
        </div>

        {/* Right Column: Taxonomy, Media & SERP Simulator (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Categorization Card */}
          <div className="p-5 bg-white border border-[#96702A]/20 rounded-[3px] shadow-sm space-y-4 text-xs">
            <h3 className="font-serif text-sm font-semibold text-[#001C41] border-b border-[#96702A]/15 pb-2">
              Practice Taxonomy
            </h3>

            <div className="space-y-1">
              <label className="text-[10.5px] font-mono uppercase text-[#001C41] font-semibold">
                Practice Area Vertical *
              </label>
              <select
                value={formData.practice_area}
                onChange={(e) => setFormData({ ...formData, practice_area: e.target.value })}
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0] focus:bg-white focus:outline-none"
              >
                {practiceOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10.5px] font-mono uppercase text-[#001C41] font-semibold">
                Audience Segmentation
              </label>
              <select
                value={formData.target_audience}
                onChange={(e) => setFormData({ ...formData, target_audience: e.target.value as AudienceSegment })}
                className="w-full px-3 py-2 border border-[#96702A]/30 rounded-[2px] text-xs text-[#001C41] bg-[#FAF7F0] focus:bg-white focus:outline-none"
              >
                <option value="BUSINESS">Corporate / Business</option>
                <option value="INDIVIDUAL">Private Individuals</option>
              </select>
            </div>
          </div>

          {/* Cover Media Upload */}
          <div className="p-5 bg-white border border-[#96702A]/20 rounded-[3px] shadow-sm space-y-3 text-xs">
            <h3 className="font-serif text-sm font-semibold text-[#001C41] border-b border-[#96702A]/15 pb-2">
              Cover Imagery (Cloudinary)
            </h3>

            {formData.cover_image_url ? (
              <div className="relative aspect-video rounded-[2px] overflow-hidden border border-[#96702A]/20">
                <img
                  src={formData.cover_image_url}
                  alt="Cover Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="border border-dashed border-[#96702A]/40 rounded-[2px] p-6 text-center bg-[#FAF7F0]/40">
                <UploadCloud className="w-6 h-6 text-[#96702A] mx-auto mb-1" />
                <span className="text-[11px] text-slate-500 font-mono block">
                  {uploadingCover ? "Uploading to Cloudinary..." : "Select Cover Image"}
                </span>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              disabled={uploadingCover}
              className="text-[11px] text-[#001C41] font-mono file:mr-2 file:py-1 file:px-2 file:rounded-[2px] file:border file:border-[#96702A]/30 file:bg-[#FAF7F0] file:text-[10px]"
            />
          </div>

          {/* SERP Search Simulator Card */}
          <div className="p-5 bg-white border border-[#96702A]/20 rounded-[3px] shadow-sm space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-[#96702A]/15 pb-2">
              <h3 className="font-serif text-sm font-semibold text-[#001C41]">
                Search Engine Simulation (SERP)
              </h3>
              <Search className="w-3.5 h-3.5 text-[#96702A]" />
            </div>

            {/* Google Result Preview */}
            <div className="p-3 bg-[#FAF7F0] border border-slate-200 rounded-[2px] space-y-1 font-sans">
              <span className="text-[10px] text-slate-500 block truncate">
                https://rsjuris.com/articles/{formData.slug || "publication-slug"}
              </span>
              <span className="text-xs font-medium text-blue-800 hover:underline block truncate">
                {formData.meta_title || formData.title || "Article Headline Preview"}
              </span>
              <span className="text-[11px] text-slate-600 block line-clamp-2 leading-tight">
                {formData.meta_description || formData.summary || "Search engine result snippet preview..."}
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-slate-500">
                Meta Title ({formData.meta_title.length}/60)
              </label>
              <input
                type="text"
                value={formData.meta_title}
                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                placeholder="Target SERP Title"
                className="w-full px-2.5 py-1.5 border border-[#96702A]/25 rounded-[2px] text-xs text-[#001C41]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-slate-500">
                Meta Description ({formData.meta_description.length}/155)
              </label>
              <textarea
                rows={2}
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                placeholder="Target SERP Description Snippet"
                className="w-full px-2.5 py-1.5 border border-[#96702A]/25 rounded-[2px] text-xs text-[#001C41]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}