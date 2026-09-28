"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  FolderKanban,
  UploadCloud,
  RotateCw,
  FileText,
  Video,
  FileSpreadsheet,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { getMediaVaultAssets, uploadToVault, deleteVaultAsset } from "@/lib/api";
import { AssetResponse } from "@/types/cms";
import DeleteConfirmModal from "../../components/admin/ui/DeleteConfirmModal";

export default function MediaVaultPage() {
  const [assets, setAssets] = useState<AssetResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filterType, setFilterType] = useState<string>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal State
  const [assetToDelete, setAssetToDelete] = useState<AssetResponse | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAssets = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMediaVaultAssets(filterType);
      setAssets(data);
    } catch (err: any) {
      setError(err.message || "Failed to load document vault.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [filterType]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);
    try {
      for (let i = 0; i < files.length; i++) {
        await uploadToVault(files[i]);
      }
      await fetchAssets();
    } catch (err: any) {
      setError(err.message || "Upload failed. Verify Cloudinary credentials.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleConfirmDelete = async () => {
    if (!assetToDelete) return;
    setIsDeleting(true);
    try {
      await deleteVaultAsset(assetToDelete.id);
      setAssets((prev) => prev.filter((a) => a.id !== assetToDelete.id));
      setAssetToDelete(null);
    } catch (err: any) {
      alert(err.message || "Asset deletion failed.");
    } finally {
      setIsDeleting(false);
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case "VIDEO":
        return <Video className="w-8 h-8 text-[#96702A]" />;
      case "DOCUMENT_PDF":
        return <FileText className="w-8 h-8 text-rose-600" />;
      case "DOCUMENT_DOCX":
        return <FileSpreadsheet className="w-8 h-8 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#96702A]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#96702A] animate-pulse" />
            <span className="text-[10.5px] font-mono tracking-[0.22em] uppercase text-[#96702A] font-semibold">
              Chambers Digital Asset Vault
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#001C41] font-semibold tracking-tight mt-0.5">
            Cloudinary Documents & Media
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchAssets}
            disabled={loading}
            className="p-2 rounded-[2px] bg-white border border-[#96702A]/30 text-[#001C41] hover:bg-[#FAF7F0] transition-colors"
            title="Refresh Vault"
          >
            <RotateCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#96702A]" : ""}`} />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            className="hidden"
            accept="image/*,video/*,application/pdf,.docx,.doc"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 bg-[#001C41] text-white hover:bg-[#96702A] transition-colors rounded-[2px] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm disabled:opacity-60 cursor-pointer"
          >
            {uploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E5BD79]" />
            ) : (
              <UploadCloud className="w-3.5 h-3.5 text-[#E5BD79]" />
            )}
            <span>{uploading ? "Streaming to CDN..." : "Upload Asset"}</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Strip */}
      <div className="flex items-center justify-between bg-white border border-[#96702A]/20 p-3 rounded-[2px] shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          {["ALL", "IMAGE", "DOCUMENT_PDF", "DOCUMENT_DOCX", "VIDEO"].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 rounded-[2px] border text-[10.5px] font-mono uppercase whitespace-nowrap transition-colors ${
                filterType === t
                  ? "bg-[#001C41] text-white border-[#001C41]"
                  : "bg-[#FAF7F0] text-[#001C41]/80 border-[#96702A]/20 hover:border-[#96702A]"
              }`}
            >
              {t.replace(/_/g, " ")}
            </button>
          ))}
        </div>
        <span className="text-[11px] font-mono text-[#96702A] hidden sm:block">
          {assets.length} Assets Registered
        </span>
      </div>

      {/* 3. Error Banner */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-[2px] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* 4. Asset Grid */}
      {loading && assets.length === 0 ? (
        <div className="py-24 flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-[#96702A]" />
          <span className="text-xs font-mono text-[#001C41]/70">Accessing Cloudinary Vault...</span>
        </div>
      ) : assets.length === 0 ? (
        <div className="py-20 text-center text-xs font-mono text-[#555] bg-white border border-[#96702A]/20 rounded-[2px]">
          No digital assets stored in this category. Click "Upload Asset" to add PDF briefs, videos, or imagery.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="group bg-white border border-[#96702A]/20 rounded-[2px] p-2.5 flex flex-col justify-between shadow-xs hover:border-[#96702A]/60 transition-all"
            >
              <div className="relative aspect-video w-full rounded-[2px] overflow-hidden bg-[#FAF7F0] flex items-center justify-center border border-[#96702A]/10">
                {asset.type === "IMAGE" ? (
                  <Image
                    src={asset.secure_url}
                    alt={asset.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  renderIcon(asset.type)
                )}
              </div>

              <div className="mt-2.5 space-y-1">
                <span className="text-xs font-semibold text-[#001C41] truncate block" title={asset.name}>
                  {asset.name}
                </span>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#555]">
                  <span>{asset.format.toUpperCase()}</span>
                  <span>{formatBytes(asset.file_size)}</span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-[#001C41]/5 flex items-center justify-between gap-1">
                <button
                  onClick={() => copyToClipboard(asset.secure_url, asset.id)}
                  className="p-1 text-[#001C41] hover:text-[#96702A] transition-colors"
                  title="Copy CDN Link"
                >
                  {copiedId === asset.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <a
                  href={asset.secure_url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 text-[#001C41] hover:text-[#96702A] transition-colors"
                  title="Open Asset"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setAssetToDelete(asset)}
                  className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Destroy Asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!assetToDelete}
        title="Destroy Vault Asset"
        itemDescription={assetToDelete?.name}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setAssetToDelete(null)}
      />
    </div>
  );
}