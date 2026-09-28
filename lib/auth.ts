// lib/auth.ts
export interface UserSession {
  id: string;
  email: string;
  full_name: string;
  designation: string;
  role: "SUPER_ADMIN" | "SENIOR_PARTNER" | "ASSOCIATE_EDITOR" | "INQUIRY_OFFICER";
  avatar_url?: string | null;
}

const TOKEN_KEY = "rsjuris_access_token";
const USER_KEY = "rsjuris_user_session";

export const authStorage = {
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setSession: (token: string, user: UserSession) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    document.cookie = "rsj_session=true; path=/; max-age=28800; SameSite=Lax";
  },

  getUser: (): UserSession | null => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  clearSession: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    // Expire the session cookie immediately across all paths
    document.cookie = "rsj_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
  },
};