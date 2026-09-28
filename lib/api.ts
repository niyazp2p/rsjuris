// lib/api.ts
import { authStorage } from "@/lib/auth";
import { DashboardMetricsResponse } from "@/types/dashboard";
import { UserItem, UserCreatePayload, UserUpdatePayload } from "@/types/user";
import { EnquiryCreatePayload,  EnquiryPublicConfirmation, EnquiryItem, EnquiryStatus } from "@/types/enquiry";
import { 
  LeadItem, 
  LeadCreatePayload, 
  ConvertEnquiryPayload, 
  LeadRemarkCreatePayload,
  LeadRemarkItem 
} from "@/types/lead";
import {
  ArticleListItem,
  ArticleResponse,
  ArticleCreatePayload,
  ContentStatus,
  AssetResponse,
  MediaSignatureResponse,
} from "@/types/cms";
export const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL || "https://rsjuris-backend.onrender.com/api/v1";

/**
 * Universal JSON API fetch wrapper with Bearer token injection
 */
export async function apiFetch<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const token = authStorage.getToken();
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return {} as T;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || `Request failed with status ${response.status}`);
  }

  return data;
}

/**
 * Direct file upload handler supporting Cloudinary and backend storage
 */
export async function uploadMediaToCloudinary(file: File): Promise<{
  secure_url: string;
  public_id: string;
  format: string;
  bytes: number;
  resource_type: string;
}> {
  const token = authStorage.getToken();
  
  // 1. Fetch timestamped HMAC-SHA1 signature from FastAPI backend
  const signRes = await fetch(`${API_BASE_URL}/media/sign?folder=rsjuris/cms`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!signRes.ok) {
    throw new Error("Failed to obtain media signature from chamber registry.");
  }

  const signData = await signRes.json();

  // 2. Stream binary directly to Cloudinary CDN
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signData.api_key);
  formData.append("timestamp", signData.timestamp.toString());
  formData.append("signature", signData.signature);
  formData.append("folder", signData.folder);

  const resourceType = file.type.startsWith("video/") 
    ? "video" 
    : file.type.startsWith("image/") 
    ? "image" 
    : "raw";

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || signData.cloud_name;
  
  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const uploadResult = await uploadRes.json();

  if (!uploadRes.ok) {
    throw new Error(uploadResult.error?.message || "Cloudinary direct upload failed.");
  }

  return {
    secure_url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
    format: uploadResult.format || file.name.split(".").pop() || "",
    bytes: uploadResult.bytes || file.size,
    resource_type: resourceType,
  };
}

export async function getDashboardStats(): Promise<DashboardMetricsResponse> {
  return await apiFetch<DashboardMetricsResponse>("/dashboard/stats", {
    method: "GET",
  });
}

export async function getUsers(skip = 0, limit = 50): Promise<UserItem[]> {
  return await apiFetch<UserItem[]>(`/users?skip=${skip}&limit=${limit}`, {
    method: "GET",
  });
}

export async function createUser(payload: UserCreatePayload): Promise<UserItem> {
  return await apiFetch<UserItem>("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateUser(id: string, payload: UserUpdatePayload): Promise<UserItem> {
  return await apiFetch<UserItem>(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteUser(id: string): Promise<void> {
  await apiFetch<void>(`/users/${id}`, {
    method: "DELETE",
  });
}

/**
 * Public Endpoint: Submits brief from the website contact page
 */
export async function submitPublicEnquiry(
  payload: EnquiryCreatePayload
): Promise<EnquiryPublicConfirmation> {
  const res = await fetch(`${API_BASE_URL}/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || "Unable to submit your legal brief. Please try again.");
  }
  return data;
}

/**
 * Admin Protected: Lists and filters enquiries with query params
 */
export async function getAdminEnquiries(params?: {
  status?: string;
  matter_type?: string;
  search?: string;
  skip?: number;
  limit?: number;
}): Promise<EnquiryItem[]> {
  const query = new URLSearchParams();
  if (params?.status && params.status !== "ALL") query.append("status", params.status);
  if (params?.matter_type && params.matter_type !== "ALL") query.append("matter_type", params.matter_type);
  if (params?.search) query.append("search", params.search);
  if (params?.skip !== undefined) query.append("skip", params.skip.toString());
  if (params?.limit !== undefined) query.append("limit", params.limit.toString());

  const qs = query.toString();
  return await apiFetch<EnquiryItem[]>(`/enquiries/admin${qs ? `?${qs}` : ""}`, {
    method: "GET",
  });
}

/**
 * Admin Protected: Update enquiry triage status
 */
export async function updateEnquiryStatus(
  enquiryId: string, 
  status: EnquiryStatus
): Promise<EnquiryItem> {
  return await apiFetch<EnquiryItem>(`/enquiries/admin/${enquiryId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

/**
 * Admin Protected: Delete enquiry (Super Admin only)
 */
export async function deleteEnquiry(enquiryId: string): Promise<void> {
  await apiFetch<void>(`/enquiries/admin/${enquiryId}`, {
    method: "DELETE",
  });
}

/**
 * Fetch all leads from the Master Ledger with optional filtering
 */
export async function getLeads(params?: {
  status?: string;
  priority?: string;
  practice_area?: string;
  search?: string;
  skip?: number;
  limit?: number;
}): Promise<LeadItem[]> {
  const query = new URLSearchParams();
  if (params?.status && params.status !== "ALL") query.append("status", params.status);
  if (params?.priority && params.priority !== "ALL") query.append("priority", params.priority);
  if (params?.practice_area && params.practice_area !== "ALL") query.append("practice_area", params.practice_area);
  if (params?.search) query.append("search", params.search);
  if (params?.skip !== undefined) query.append("skip", params.skip.toString());
  if (params?.limit !== undefined) query.append("limit", params.limit.toString());

  const qs = query.toString();
  return await apiFetch<LeadItem[]>(`/leads${qs ? `?${qs}` : ""}`, {
    method: "GET",
  });
}

/**
 * Retrieve full case profile and timeline ledger for a single lead
 */
export async function getLeadDetails(leadId: string): Promise<LeadItem> {
  return await apiFetch<LeadItem>(`/leads/${leadId}`, {
    method: "GET",
  });
}

/**
 * Manually register a new prospective/retained matter directly
 */
export async function createLeadManually(payload: LeadCreatePayload): Promise<LeadItem> {
  return await apiFetch<LeadItem>("/leads", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Convert a public intake brief into an active case docket
 */
export async function convertEnquiryToLead(
  enquiryId: string, 
  payload: ConvertEnquiryPayload
): Promise<LeadItem> {
  return await apiFetch<LeadItem>(`/leads/convert-enquiry/${enquiryId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Update case registry fields (tribunal forum, filing numbers, priority, claim amount)
 */
export async function updateLeadDetails(
  leadId: string, 
  payload: Partial<LeadCreatePayload>
): Promise<LeadItem> {
  return await apiFetch<LeadItem>(`/leads/${leadId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

/**
 * Append a procedural timeline remark and optionally advance the case status
 */
export async function addLeadRemark(
  leadId: string, 
  payload: LeadRemarkCreatePayload
): Promise<LeadRemarkItem> {
  return await apiFetch<LeadRemarkItem>(`/leads/${leadId}/remarks`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Permanently purge a case record (Super Admin only)
 */
export async function deleteLead(leadId: string): Promise<void> {
  await apiFetch<void>(`/leads/${leadId}`, {
    method: "DELETE",
  });
}

// --- Articles Endpoints ---

export async function getAdminArticles(params?: {
  status?: string;
  search?: string;
  skip?: number;
  limit?: number;
}): Promise<ArticleListItem[]> {
  const query = new URLSearchParams();
  if (params?.status && params.status !== "ALL") query.append("status", params.status);
  if (params?.search) query.append("search", params.search);
  if (params?.skip !== undefined) query.append("skip", params.skip.toString());
  if (params?.limit !== undefined) query.append("limit", params.limit.toString());

  const qs = query.toString();
  return await apiFetch<ArticleListItem[]>(`/articles/admin${qs ? `?${qs}` : ""}`, {
    method: "GET",
  });
}

export async function getAdminArticle(id: string): Promise<ArticleResponse> {
  return await apiFetch<ArticleResponse>(`/articles/admin/${id}`, {
    method: "GET",
  });
}

export async function createArticle(payload: ArticleCreatePayload): Promise<ArticleResponse> {
  return await apiFetch<ArticleResponse>("/articles/admin", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateArticle(
  id: string,
  payload: Partial<ArticleCreatePayload>
): Promise<ArticleResponse> {
  return await apiFetch<ArticleResponse>(`/articles/admin/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function updateArticleStatus(
  id: string,
  status: ContentStatus
): Promise<ArticleResponse> {
  return await apiFetch<ArticleResponse>(`/articles/admin/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function deleteArticle(id: string): Promise<void> {
  const token = authStorage.getToken();
  const url = `${API_BASE_URL}/articles/admin/${id}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  // FastAPI returns 204 on successful DELETE. Do not parse JSON.
  if (res.status === 204) {
    return;
  }

  if (!res.ok) {
    let errorDetail = `Delete failed with status ${res.status}`;
    try {
      const data = await res.json();
      errorDetail = data.detail || errorDetail;
    } catch {}
    throw new Error(errorDetail);
  }
}

// --- Cloudinary Vault Endpoints ---

export async function getMediaVaultAssets(typeFilter?: string): Promise<AssetResponse[]> {
  const query = typeFilter && typeFilter !== "ALL" ? `?type=${typeFilter}` : "";
  return await apiFetch<AssetResponse[]>(`/media${query}`, {
    method: "GET",
  });
}

export async function deleteVaultAsset(id: string): Promise<void> {
  await apiFetch<void>(`/media/${id}`, {
    method: "DELETE",
  });
}

/**
 * Direct Client-to-Cloudinary Upload:
 * 1. Fetches HMAC-SHA1 signature from backend
 * 2. Streams binary to Cloudinary API
 * 3. Commits asset record to PostgreSQL via POST /media/confirm
 */
export async function uploadToVault(
  file: File,
  folder = "rsjuris/articles",
  articleId?: string
): Promise<AssetResponse> {
  // Step 1: Sign upload parameters
  const signData = await apiFetch<MediaSignatureResponse>(`/media/sign?folder=${folder}`, {
    method: "POST",
  });

  // Step 2: Stream binary directly to Cloudinary
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signData.api_key);
  formData.append("timestamp", signData.timestamp.toString());
  formData.append("signature", signData.signature);
  formData.append("folder", signData.folder);

  let resourceType = "raw";
  let assetType = "DOCUMENT_PDF";

  if (file.type.startsWith("image/")) {
    resourceType = "image";
    assetType = "IMAGE";
  } else if (file.type.startsWith("video/")) {
    resourceType = "video";
    assetType = "VIDEO";
  } else if (file.name.endsWith(".docx") || file.name.endsWith(".doc")) {
    resourceType = "raw";
    assetType = "DOCUMENT_DOCX";
  }

  const cloudUploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${signData.cloud_name}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const uploadResult = await cloudUploadRes.json();
  if (!cloudUploadRes.ok) {
    throw new Error(uploadResult.error?.message || "Cloudinary direct upload failed.");
  }

  // Step 3: Confirm asset in PostgreSQL
  return await apiFetch<AssetResponse>("/media/confirm", {
    method: "POST",
    body: JSON.stringify({
      name: file.name,
      public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url,
      resource_type: resourceType,
      format: uploadResult.format || file.name.split(".").pop() || "",
      file_size: uploadResult.bytes || file.size,
      type: assetType,
      article_id: articleId || null,
    }),
  });
}