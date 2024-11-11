import {NextRequest, NextResponse} from "next/server";
import {authConfig} from "./firebase/config/server-config";
import {
  authMiddleware,
  redirectToLogin,
} from "next-firebase-auth-edge/lib/next/middleware";

import {UserStatus, UserRole} from "./firebase/firestore/collections/users/models";
import {
  AUTH_PATHS,
  MERGED_PUBLIC_PATHS,
  PROTECTED_PATHS,
  PUBLIC_PATHS,
  SIDEBAR_ROUTES,
} from "./routes";

function notFound(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/500";
  return NextResponse.redirect(url);
}
function alreadyAuthenticated(request: NextRequest, headers: Headers) {
  const redirect = request.nextUrl.searchParams.get("redirect");
  const url = request.nextUrl.clone();
  url.pathname = redirect ?? SIDEBAR_ROUTES.dashboard.path;
  url.search = "";
  return NextResponse.redirect(url);
}

function redirectToHome(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = SIDEBAR_ROUTES.dashboard.path;
  url.search = "";
  return NextResponse.redirect(url);
}
export function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    ...authConfig,
    handleValidToken: async ({token, decodedToken}, headers) => {
      const allowedRoutes: string[] = PUBLIC_PATHS;
      const userRole = decodedToken?.["role"] as UserRole | undefined;
      const userStatus = decodedToken?.["status"] as UserStatus;
      if (userRole === "admin") {
        //Authenticated user should not be able to access auth routes
        if (AUTH_PATHS.includes(request.nextUrl.pathname)) {
          return alreadyAuthenticated(request, headers);
        }
        if (userStatus === "active") {
          allowedRoutes.push(...PROTECTED_PATHS);
        }
      } else {
        allowedRoutes.push(...AUTH_PATHS);
      }

      if (
        allowedRoutes.some((path) => request.nextUrl.pathname.startsWith(path))
      ) {
        return NextResponse.next({
          request: {
            headers, // Pass modified request headers to skip token verification in subsequent getTokens and getTokensFromObject calls
          },
        });
      } else if (request.nextUrl.pathname === "/") {
        console.log("Redirect to home ");

        redirectToHome(request);
      }
      return notFound(request);
    },
    handleInvalidToken: async () => {
      return redirectToLogin(request, {
        path: "/auth",
        publicPaths: MERGED_PUBLIC_PATHS,
      });
    },
    handleError: async (error) => {
      return redirectToLogin(request, {
        path: "/auth",
        publicPaths: MERGED_PUBLIC_PATHS,
      });
    },
  });
}

export const config = {
  matcher: [
    "/",
    "/((?!_next|favicon.ico|api|.*\\.).*)",
    "/api/login",
    "/api/logout",
  ],
};
