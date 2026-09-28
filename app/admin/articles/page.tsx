"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Newspaper,
  FilePlus,
  RotateCw,
  Search,
  Eye,
  Edit,
  Trash2,
  Clock,
  Send,
  Loader2,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import { getAdminArticles, updateArticleStatus, deleteArticle } from "@/lib/api";
import { ArticleListItem, ContentStatus } from "@/types/cms";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State for Deletion
  const [articleToDelete, setArticleToDelete] = useState<ArticleListItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminArticles({
        status: statusFilter !== "ALL" ? statusFilter : undefined,
        search: searchTerm.trim() || undefined,
      });
      setArticles(data);
    } catch (err: any) {
      setError(err.message || "Failed to load publications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [statusFilter]);

  const handleStatusChange = async (id: string, newStatus: ContentStatus) => {
    try {
      await updateArticleStatus(id, newStatus);
      fetchArticles();
    } catch (err: any) {
      alert(err.message || "Role permission insufficient to update status.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!articleToDelete) return;
    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteArticle(articleToDelete.id);
      // Remove from table UI immediately
      setArticles((prev) => prev.filter((a) => a.id !== articleToDelete.id));
      setArticleToDelete(null);
    } catch (err: any) {
      setDeleteError(
        err.message || "Failed to delete article. Confirm Super Admin or Senior Partner role."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (st: ContentStatus) => {
    switch (st) {
      case "PUBLISHED":
        return "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold";
      case "PENDING_REVIEW":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "DRAFT":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-rose-50 text-rose-700 border-rose-200";
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
              Editorial CMS Engine
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#001C41] font-semibold tracking-tight mt-0.5">
            Legal Articles & Publications
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchArticles}
            disabled={loading}
            className="p-2 rounded-[2px] bg-white border border-[#96702A]/30 text-[#001C41] hover:bg-[#FAF7F0] transition-colors"
            title="Refresh Publications"
          >
            <RotateCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#96702A]" : ""}`} />
          </button>

          <Link
            href="/admin/articles/new"
            className="px-4 py-2 rounded-[2px] bg-[#001C41] text-white hover:bg-[#96702A] transition-colors text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
          >
            <FilePlus className="w-3.5 h-3.5 text-[#E5BD79]" />
            <span>Draft Publication</span>
          </Link>
        </div>
      </div>

      {/* 2. Filter Matrix */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between bg-white border border-[#96702A]/20 p-3 rounded-[2px] shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchArticles();
          }}
          className="relative flex-1 max-w-sm"
        >
          <input
            type="text"
            placeholder="Search article titles or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-[#96702A]/25 rounded-[2px] text-xs text-[#001C41] focus:outline-none focus:border-[#96702A] bg-[#FAF7F0]/40 font-sans"
          />
          <Search className="w-3.5 h-3.5 text-[#96702A] absolute left-2.5 top-2.5 pointer-events-none" />
        </form>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {["ALL", "DRAFT", "PENDING_REVIEW", "PUBLISHED", "ARCHIVED"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 rounded-[2px] border text-[10.5px] font-mono uppercase whitespace-nowrap transition-colors ${
                statusFilter === s
                  ? "bg-[#001C41] text-white border-[#001C41]"
                  : "bg-[#FAF7F0] text-[#001C41]/80 border-[#96702A]/20 hover:border-[#96702A]"
              }`}
            >
              {s.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-[2px] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 3. Publications DataGrid */}
      <div className="bg-white border border-[#96702A]/20 rounded-[3px] shadow-[0_4px_20px_rgba(0,28,65,0.03)] overflow-hidden">
        {loading && articles.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-7 h-7 animate-spin text-[#96702A]" />
            <span className="text-xs font-mono text-[#001C41]/70">Querying publications...</span>
          </div>
        ) : articles.length === 0 ? (
          <div className="py-16 text-center text-xs font-mono text-[#555]">
            No legal insights found in this view.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF7F0] text-[#001C41] border-b border-[#96702A]/20 uppercase tracking-wider text-[10px] font-mono">
                  <th className="py-3 px-4">Publication Title & Slug</th>
                  <th className="py-3 px-4">Practice Vertical</th>
                  <th className="py-3 px-4">Author & Reading Time</th>
                  <th className="py-3 px-4">Editorial Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#001C41]/5">
                {articles.map((art) => (
                  <tr key={art.id} className="hover:bg-[#FAF7F0]/40 transition-colors">
                    <td className="py-3.5 px-4 max-w-[320px]">
                      <span className="font-semibold text-sm text-[#001C41] block truncate">
                        {art.title}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 block truncate">
                        /{art.slug}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[#001C41]">
                      <span className="font-medium truncate max-w-[180px] block">
                        {art.practice_area}
                      </span>
                      <span className="text-[10px] font-mono text-[#96702A]">
                        {art.target_audience}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#001C41]">{art.author_name || "Advocate"}</div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 mt-0.5">
                        <Clock className="w-3 h-3 text-[#96702A]" />
                        <span>{art.reading_time_min} min read</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-[2px] text-[9.5px] font-mono uppercase tracking-wider border ${getStatusBadge(
                          art.status
                        )}`}
                      >
                        {art.status.replace(/_/g, " ")}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {art.status !== "PUBLISHED" && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(art.id, "PUBLISHED")}
                            className="p-1.5 rounded hover:bg-emerald-50 text-slate-400 hover:text-emerald-700 transition-colors"
                            title="Publish Directly"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        )}
                        <Link
                          href={`/articles/${art.slug}`}
                          target="_blank"
                          className="p-1.5 rounded hover:bg-[#FAF7F0] text-[#001C41] hover:text-[#96702A] transition-colors"
                          title="Preview Live"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/articles/${art.id}/edit`}
                          className="p-1.5 rounded hover:bg-[#FAF7F0] text-[#001C41] hover:text-[#96702A] transition-colors"
                          title="Edit Document"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDeleteError(null);
                            setArticleToDelete(art);
                          }}
                          className="p-1.5 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete Document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. Modal Stacking Layer (z-[100] with Backdrop Blur) */}
      {articleToDelete && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#000E1F]/60 backdrop-blur-xs"
          onClick={() => {
            if (!isDeleting) setArticleToDelete(null);
          }}
        >
          <div
            className="w-full max-w-md bg-white border border-[#96702A]/30 rounded-[3px] p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-[2px] bg-rose-50 border border-rose-200 text-rose-600 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-semibold text-[#001C41]">
                  Revoke &amp; Delete Publication
                </h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Are you sure you want to permanently delete{" "}
                  <strong className="text-[#001C41] font-semibold">
                    "{articleToDelete.title}"
                  </strong>
                  ? This will delete the publication record and any linked Cloudinary media assets.
                </p>
              </div>
            </div>

            {deleteError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-[2px] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{deleteError}</span>
              </div>
            )}

            <div className="pt-3 border-t border-[#001C41]/10 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setArticleToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#001C41] hover:bg-[#FAF7F0] border border-[#96702A]/25 rounded-[2px] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-5 py-2 bg-rose-700 hover:bg-rose-800 text-white text-xs font-mono uppercase tracking-wider rounded-[2px] flex items-center gap-1.5 transition-colors disabled:opacity-50 shadow-sm cursor-pointer"
              >
                {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{isDeleting ? "Purging..." : "Confirm Delete"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}