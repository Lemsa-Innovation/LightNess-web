import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Define protected routes that require authentication
  const protectedRoutes = [
    "/", // Root route
    "/users",
    "/blogs",
    "/announcements",
    "/washers",
    "/cemeteries",
    "/funeralServices",
    "/deathDeclarations",
    "/app",
  ];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      req.nextUrl.pathname === route ||
      req.nextUrl.pathname.startsWith(route + "/")
  );

  // Handle authentication logic - redirect to /auth if no session and trying to access protected route
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Check admin access for admin routes
  if (session && req.nextUrl.pathname.startsWith("/app")) {
    const { data: role } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .single();

    if (role?.role !== "admin" && role?.role !== "super_admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  // Check admin access for admin-only routes
  const adminOnlyRoutes = [
    "/users",
    "/blogs",
    "/announcements",
    "/washers",
    "/cemeteries",
    "/funeralServices",
    "/deathDeclarations",
  ];

  const isAdminRoute = adminOnlyRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (session && isAdminRoute) {
    const { data: role } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .single();

    if (role?.role !== "admin" && role?.role !== "super_admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    "/",
    "/((?!_next|favicon.ico|api|.*\\.).*)",
    "/api/login",
    "/api/logout",
  ],
};
