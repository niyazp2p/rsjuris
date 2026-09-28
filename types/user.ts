export type UserRole = 
  | "SUPER_ADMIN" 
  | "SENIOR_PARTNER" 
  | "ASSOCIATE_EDITOR" 
  | "INQUIRY_OFFICER";

export interface UserItem {
  id: string;
  email: string;
  full_name: string;
  designation: string;
  bar_council_id?: string | null;
  avatar_url?: string | null;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserCreatePayload {
  email: string;
  password: string;
  full_name: string;
  designation: string;
  bar_council_id?: string;
  avatar_url?: string;
  role: UserRole;
}

export interface UserUpdatePayload {
  full_name?: string;
  designation?: string;
  bar_council_id?: string;
  avatar_url?: string;
  role?: UserRole;
  is_active?: boolean;
  password?: string;
}