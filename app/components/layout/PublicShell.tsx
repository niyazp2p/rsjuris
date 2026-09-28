"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./'Footer";

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide the public website Navbar and Footer on login AND on all admin views
  const isAuthOrAdmin = pathname.startsWith("/admin") || pathname === "/login";

  if (isAuthOrAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}