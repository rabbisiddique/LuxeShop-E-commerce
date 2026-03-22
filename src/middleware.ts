// src/middleware.ts

import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isAdminRoute =
    pathname.startsWith("/admin") && pathname !== "/admin/login";

  const isAdminLogin = pathname === "/admin/login";

  const isProtectedRoute =
    pathname.startsWith("/profile") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/orders");

  // Public auth routes
  // ONLY for customers
  const isAuthRoute = pathname === "/login" || pathname === "/register";

  try {
    const { supabaseResponse, user } = await updateSession(request);

    // ── ADMIN ROUTES ──

    // Not logged in → admin login
    if (isAdminRoute && !user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Already logged in admin
    // trying to visit /admin/login
    if (isAdminLogin && user) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // ── PUBLIC ROUTES ──

    // Not logged in → login
    if (isProtectedRoute && !user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // ⚠️ REMOVED THIS BLOCK
    // Don't redirect /login and /register
    // Let customers access freely
    // Even if admin is logged in

    return supabaseResponse;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
