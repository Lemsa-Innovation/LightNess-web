import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Only allow access to reset password routes
  const allowedPaths = ["/auth/reset-password", "/auth/reset-password/confirm"];
  const isAllowedPath = allowedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!isAllowedPath) {
    // Redirect all other routes to a simple page or return 404
    return NextResponse.redirect(new URL("/auth/reset-password", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|.*\\.).*)"],
};
