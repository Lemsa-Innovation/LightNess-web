import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Handle authentication logic
  if (!session && req.nextUrl.pathname.startsWith("/private")) {
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

  // Check admin access for other protected routes
  if (
    session &&
    (req.nextUrl.pathname.startsWith("/users") ||
      req.nextUrl.pathname.startsWith("/blogs") ||
      req.nextUrl.pathname.startsWith("/announcements") ||
      req.nextUrl.pathname.startsWith("/washers") ||
      req.nextUrl.pathname.startsWith("/cemeteries") ||
      req.nextUrl.pathname.startsWith("/funeralServices") ||
      req.nextUrl.pathname.startsWith("/deathDeclarations"))
  ) {
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
