export type LeadStatus =
  | "INTAKE"
  | "PRE_LITIGATION_REVIEW"
  | "RETAINED"
  | "IN_LITIGATION"
  | "SETTLED"
  | "CLOSED";

export type LeadPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type AudienceSegment = "INDIVIDUAL" | "BUSINESS";

export interface LeadRemarkItem {
  id: string;
  lead_id: string;
  author_id: string;
  author_name?: string | null;
  remark: string;
  prev_status?: LeadStatus | null;
  next_status?: LeadStatus | null;
  created_at: string;
}

export interface LeadItem {
  id: string;
  lead_number: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  alternate_phone?: string | null;
  audience: AudienceSegment;
  practice_area: string;
  case_title: string;
  case_description: string;
  court_forum?: string | null;
  opposing_party?: string | null;
  case_filing_number?: string | null;
  claim_value?: number | null;
  status: LeadStatus;
  priority: LeadPriority;
  enquiry_id?: string | null;
  assigned_to_id?: string | null;
  created_at: string;
  updated_at: string;
  remarks: LeadRemarkItem[];
}

export interface LeadCreatePayload {
  client_name: string;
  client_email: string;
  client_phone: string;
  alternate_phone?: string;
  audience: AudienceSegment;
  practice_area: string;
  case_title: string;
  case_description: string;
  court_forum?: string;
  opposing_party?: string;
  case_filing_number?: string;
  claim_value?: number;
  priority: LeadPriority;
  assigned_to_id?: string;
  initial_remark?: string;
}

export interface ConvertEnquiryPayload {
  case_title?: string;
  case_description?: string;
  court_forum?: string;
  audience: AudienceSegment;
  priority: LeadPriority;
  assigned_to_id?: string;
  initial_remark?: string;
}

export interface LeadRemarkCreatePayload {
  remark: string;
  next_status?: LeadStatus;
}