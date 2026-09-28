export type ContentStatus = "DRAFT" | "PENDING_REVIEW" | "PUBLISHED" | "ARCHIVED";
export type AssetType = "IMAGE" | "VIDEO" | "DOCUMENT_PDF" | "DOCUMENT_DOCX";
export type AudienceSegment = "INDIVIDUAL" | "BUSINESS";

export interface AssetResponse {
  id: string;
  name: string;
  public_id: string;
  secure_url: string;
  resource_type: string;
  format: string;
  file_size: number;
  type: AssetType;
  created_at: string;
}

export interface AuthorSnippet {
  id: string;
  full_name: string;
  designation: string;
  avatar_url?: string | null;
}

export interface ArticleListItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  cover_image_url?: string | null;
  practice_area: string;
  target_audience: AudienceSegment;
  status: ContentStatus;
  reading_time_min: number;
  author_name?: string | null;
  published_at?: string | null;
  created_at: string;
}

export interface ArticleResponse {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  cover_image_url?: string | null;
  cover_public_id?: string | null;
  practice_area: string;
  target_audience: AudienceSegment;
  status: ContentStatus;
  reading_time_min: number;
  meta_title?: string | null;
  meta_description?: string | null;
  canonical_url?: string | null;
  author_id: string;
  author?: AuthorSnippet | null;
  media_assets: AssetResponse[];
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ArticleCreatePayload {
  title: string;
  slug?: string;
  summary: string;
  content: string;
  cover_image_url?: string;
  cover_public_id?: string;
  practice_area: string;
  target_audience: AudienceSegment;
  status?: ContentStatus;
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
}

export interface MediaSignatureResponse {
  signature: string;
  timestamp: number;
  cloud_name: string;
  api_key: string;
  folder: string;
}