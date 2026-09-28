export type EnquiryStatus = 
  | "NEW" 
  | "CONTACTED" 
  | "CONVERTED_TO_LEAD" 
  | "ARCHIVED" 
  | "SPAM";

export type MatterType =
  | "Corporate & Commercial Law"
  | "Civil Litigation & Dispute Resolution"
  | "Criminal Law"
  | "Property & Real Estate Law"
  | "Family & Matrimonial Law"
  | "Employment & Labour Law"
  | "Banking & Financial Disputes"
  | "Intellectual Property Rights"
  | "Arbitration & Alternative Dispute Resolution"
  | "General Chamber Advisory / Other";

export interface EnquiryCreatePayload {
  full_name: string;
  phone: string;
  email: string;
  matter_type: MatterType;
  summary: string;
}

export interface EnquiryPublicConfirmation {
  reference_number: string;
  message: string;
  received_at: string;
}

export interface EnquiryItem {
  id: string;
  reference_number: string;
  full_name: string;
  phone: string;
  email: string;
  matter_type: MatterType;
  summary: string;
  status: EnquiryStatus;
  ip_address?: string | null;
  user_agent?: string | null;
  created_at: string;
  updated_at: string;
}