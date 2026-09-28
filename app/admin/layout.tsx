"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  FileSpreadsheet,
  Newspaper,
  FolderKanban,
  Users2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Bell,
  Search,
} from "lucide-react";
import { authStorage, UserSession } from "@/lib/auth";

const navigationModules = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, badge: null },
  { name: "Enquiries Desk", href: "/admin/enquiries", icon: Inbox, badge: "Live" },
  { name: "Master Lead Ledger", href: "/admin/leads", icon: FileSpreadsheet, badge: null },
  { name: "Articles & CMS", href: "/admin/articles", icon: Newspaper, badge: null },
  { name: "Document & Media Vault", href: "/admin/media", icon: FolderKanban, badge: null },
  { name: "User Management (RBAC)", href: "/admin/users", icon: Users2, badge: "Admin" },
];

export default function AdminShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<UserSession | null>(null);

  const isLoginPage = pathname === "/admin/login" || pathname === "/login";

  useEffect(() => {
  if (!isLoginPage) {
    const activeSession = authStorage.getUser();
    if (!activeSession) {
      window.location.href = "/admin/login";
    } else {
      setUser(activeSession);
    }
  }
}, [pathname, isLoginPage]);

 const handleLogout = () => {
  authStorage.clearSession();
  // Redirect strictly to /login (app/login/page.tsx)
  window.location.href = "/login";
};

  // If on login, render children only without sidebar or top header
  if (isLoginPage) {
    return <div className="min-h-screen w-full bg-[#FAF7F0]">{children}</div>;
  }

  return (
    <div className="min-h-screen w-full bg-[#FAF7F0] text-[#001C41] flex flex-col antialiased">
      {/* 1. Top Ribbon */}
      <header className="h-10 bg-[#001C41] border-b border-[#96702A]/30 px-4 sm:px-6 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5BD79] animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#FAF7F0]/90">
            Chambers of RS Juris & Co. • Advocate Management Terminal
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono text-[#E5BD79]">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors text-[10.5px]"
          >
            <span>Live Public Portal</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <div className="w-[1px] h-3 bg-white/20 hidden sm:block" />
          <span className="text-[10px] text-[#FAF7F0]/60">v1.0.0-PROD</span>
        </div>
      </header>

      {/* 2. Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`relative bg-white border-r border-[#96702A]/20 transition-all duration-300 flex flex-col justify-between z-20 shadow-[2px_0_15px_rgba(0,28,65,0.03)] ${
            collapsed ? "w-20" : "w-64 sm:w-72"
          }`}
        >
          <div>
            <div className="h-16 border-b border-[#96702A]/15 px-4 flex items-center justify-between">
              <Link href="/admin/dashboard" className="flex items-center gap-3 overflow-hidden">
                <div className="relative w-9 h-9 rounded-full bg-white border border-[#96702A]/40 p-0.5 shrink-0 shadow-sm">
                  <Image
                    src="/logo.jpeg"
                    alt="RS Juris & Co."
                    width={36}
                    height={36}
                    className="object-contain rounded-full"
                    priority
                  />
                </div>
                {!collapsed && (
                  <div className="flex flex-col truncate">
                    <span className="font-serif font-bold text-sm tracking-tight text-[#001C41] truncate leading-tight">
                      RS JURIS & CO.
                    </span>
                    <span className="text-[8.5px] font-mono tracking-[0.2em] text-[#96702A] uppercase font-semibold">
                      Chambers Console
                    </span>
                  </div>
                )}
              </Link>

              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-1 rounded bg-[#FAF7F0] border border-[#96702A]/20 text-[#001C41] hover:text-[#96702A] transition-colors"
                aria-label="Toggle Navigation Sidebar"
              >
                {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
              </button>
            </div>

            <nav className="p-3 space-y-1">
              {!collapsed && (
                <div className="px-3 pt-2 pb-1.5 text-[9.5px] font-mono tracking-[0.24em] text-[#96702A] uppercase font-semibold">
                  Chamber Modules
                </div>
              )}

              {navigationModules.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-[2px] text-xs transition-all duration-200 group ${
                      isActive
                        ? "bg-[#001C41] text-white font-medium shadow-[0_2px_10px_rgba(0,28,65,0.1)]"
                        : "text-[#001C41]/80 hover:bg-[#FAF7F0] hover:text-[#001C41]"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                        isActive ? "text-[#E5BD79]" : "text-[#96702A]"
                      }`}
                    />
                    {!collapsed && <span className="truncate flex-1 tracking-wide">{item.name}</span>}
                    {!collapsed && item.badge && (
                      <span
                        className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-[2px] ${
                          isActive ? "bg-[#E5BD79] text-[#001C41]" : "bg-[#001C41]/10 text-[#001C41]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Profile Bar */}
          <div className="p-3 border-t border-[#96702A]/15 bg-white">
            <div className="flex items-center justify-between gap-2 p-2 rounded-[2px] bg-[#FAF7F0] border border-[#96702A]/20">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-[#001C41] text-[#E5BD79] flex items-center justify-center font-serif text-xs font-semibold shrink-0">
                  {user?.full_name ? user.full_name[0] : "A"}
                </div>
                {!collapsed && (
                  <div className="flex flex-col truncate leading-tight">
                    <span className="text-xs font-semibold text-[#001C41] truncate">
                      {user?.full_name || "Advocate Terminal"}
                    </span>
                    <span className="text-[9.5px] font-mono tracking-wider text-[#96702A] uppercase truncate mt-0.5">
                      {user?.role?.replace("_", " ") || "SUPER ADMIN"}
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="p-1.5 rounded-[2px] text-[#001C41]/60 hover:text-rose-600 hover:bg-white transition-colors"
                title="End Session"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-[#FAF7F0]">
          <div className="h-14 border-b border-[#96702A]/15 bg-white/70 backdrop-blur-sm px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-xs text-[#001C41]/60">
              <span className="capitalize">{pathname.replace("/admin/", "").replace("/", " • ") || "Dashboard"}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search docket, case ref, client..."
                  className="w-64 pl-8 pr-3 py-1.5 rounded-[2px] bg-[#FAF7F0] border border-[#96702A]/25 text-xs text-[#001C41] placeholder-[#888] focus:bg-white focus:outline-none focus:border-[#96702A] transition-all"
                />
                <Search className="w-3.5 h-3.5 text-[#96702A] absolute left-2.5 top-2.5 pointer-events-none" />
              </div>

              <button
                aria-label="Notifications"
                className="p-1.5 rounded-[2px] bg-[#FAF7F0] border border-[#96702A]/20 text-[#001C41] hover:text-[#96702A] transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#96702A] rounded-full" />
              </button>
            </div>
          </div>

          <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}