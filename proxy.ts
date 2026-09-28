// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("rsj_session");

  // 1. If user is on the login page and already authenticated, redirect to dashboard
  if (pathname === "/admin/login") {
    if (sessionCookie?.value === "true") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // 2. Intercept protected /admin routes when unauthenticated
  if (pathname.startsWith("/admin")) {
    if (!sessionCookie || sessionCookie.value !== "true") {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};