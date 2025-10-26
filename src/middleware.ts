import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          req.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          req.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log("🔍 Middleware - getUser error:", userError.message);
  }

  console.log(
    `🔍 Middleware - Path: ${
      req.nextUrl.pathname
    }, Has User: ${!!user}, User ID: ${user?.id || "none"}`
  );

  // Define protected routes that require authentication
  const protectedRoutes = [
    "/users",
    "/blogs",
    "/announcements",
    "/washers",
    "/cemeteries",
    "/funeralServices",
    "/deathDeclarations",
  ];

  // Define admin-only routes
  const adminOnlyRoutes = [
    "/users",
    "/blogs",
    "/announcements",
    "/washers",
    "/cemeteries",
    "/funeralServices",
    "/deathDeclarations",
  ];

  // Handle root route - redirect authenticated users to appropriate page
  if (req.nextUrl.pathname === "/") {
    if (!user) {
      console.log(
        `🚫 Middleware - Root route: No session, redirecting to /auth`
      );
      return NextResponse.redirect(new URL("/auth", req.url));
    } else {
      // Check user role for root route redirect
      const { data: role } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      console.log(
        `🏠 Middleware - Root route: User role: ${role?.role || "none"}`
      );

      if (role?.role === "admin" || role?.role === "super_admin") {
        console.log(
          `✅ Middleware - Root route: Admin user, redirecting to /users`
        );
        return NextResponse.redirect(new URL("/users", req.url));
      } else {
        console.log(
          `❌ Middleware - Root route: Regular user, redirecting to /unauthorized`
        );
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
  }

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      req.nextUrl.pathname === route ||
      req.nextUrl.pathname.startsWith(route + "/")
  );

  // Handle authentication logic - redirect to /auth if no session and trying to access protected route
  if (!user && isProtectedRoute) {
    console.log(
      `🚫 Middleware - Protected route ${req.nextUrl.pathname}: No session, redirecting to /auth`
    );
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Check admin access for /app route - redirect to /users
  if (user && req.nextUrl.pathname.startsWith("/app")) {
    const { data: role } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    console.log(
      `🔐 Middleware - /app route: User role: ${role?.role || "none"}`
    );

    if (role?.role === "admin" || role?.role === "super_admin") {
      console.log(
        `✅ Middleware - /app route: Admin user, redirecting to /users`
      );
      return NextResponse.redirect(new URL("/users", req.url));
    } else {
      console.log(
        `❌ Middleware - /app route: Non-admin user, redirecting to /unauthorized`
      );
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  // Check admin access for admin-only routes
  const isAdminRoute = adminOnlyRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (user && isAdminRoute) {
    const { data: role } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    console.log(
      `🔐 Middleware - Admin route ${req.nextUrl.pathname}: User role: ${
        role?.role || "none"
      }`
    );

    if (role?.role !== "admin" && role?.role !== "super_admin") {
      console.log(
        `❌ Middleware - Admin route ${req.nextUrl.pathname}: Non-admin user, redirecting to /unauthorized`
      );
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    } else {
      console.log(
        `✅ Middleware - Admin route ${req.nextUrl.pathname}: Admin user, allowing access`
      );
    }
  }

  console.log(`✅ Middleware - Allowing access to ${req.nextUrl.pathname}`);
  return response;
}

export const config = {
  matcher: [
    "/",
    "/((?!_next|favicon.ico|api|.*\\.).*)",
    "/api/login",
    "/api/logout",
  ],
};
