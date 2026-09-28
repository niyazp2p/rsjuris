export interface PipelineCounts {
  total_enquiries: number;
  new_enquiries: number;
  converted_to_leads: number;
  total_active_leads: number;
  retained_cases: number;
  in_litigation_cases: number;
}

export interface EditorialCounts {
  total_articles: number;
  published: number;
  drafts: number;
  pending_review: number;
}

export interface AudienceBreakdown {
  individual_count: number;
  business_count: number;
  individual_pct: number;
  business_pct: number;
}

export interface PracticeAreaStat {
  practice_area: string;
  count: number;
}

export interface ActivityFeedItem {
  id: string;
  type: "ENQUIRY_RECEIVED" | "LEAD_STATUS_UPGRADED" | "LEAD_REMARK" | "ARTICLE_PUBLISHED";
  title: string;
  subtitle: string;
  timestamp: string;
  badge?: string | null;
}

export interface DashboardMetricsResponse {
  pipeline: PipelineCounts;
  editorial: EditorialCounts;
  audience: AudienceBreakdown;
  practice_concentration: PracticeAreaStat[];
  recent_activity: ActivityFeedItem[];
}