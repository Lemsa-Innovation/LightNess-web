import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Allow access to auth routes only
  const allowedPaths = [
    "/auth/reset-password",
    "/auth/reset-password/confirm",
    "/auth/signup",
  ];
  const isAllowedPath = allowedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!isAllowedPath) {
    // Redirect all other routes to the external Lightness website
    return NextResponse.redirect("https://lightness.world/");
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|.*\\.).*)"],
};
