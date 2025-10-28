import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { MERGED_PUBLIC_PATHS } from "@/config/routes";

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if current path is public
  const isPublicPath = MERGED_PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // If it's a public path, skip authentication check
  if (isPublicPath) {
    return NextResponse.next({ request });
  }

  // Check if Supabase is properly configured
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    // Redirect to auth if Supabase is not configured (only for protected routes)
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    // IMPORTANT: Don't remove getUser()
    const { data, error } = await supabase.auth.getUser();

    // If there's an error getting the user, redirect to auth
    if (error) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }

    // Only handle basic auth redirects - no database calls in middleware
    const user = data?.user;

    // Simple redirect logic without database calls
    if (request.nextUrl.pathname === "/") {
      if (!user) {
        const url = request.nextUrl.clone();
        url.pathname = "/auth";
        return NextResponse.redirect(url);
      }
      // Let the client-side handle role-based redirects
    }

    // Handle auth pages - redirect authenticated users away
    if (request.nextUrl.pathname.startsWith("/auth") && user) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is
    return supabaseResponse;
  } catch (error) {
    // If Supabase connection fails, redirect to auth
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }
}
