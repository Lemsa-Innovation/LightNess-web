import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(request: Request) {
  const { event, session } = await request.json();

  let response = NextResponse.json({ ok: true });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = request.headers.get("cookie") || "";
          const match = cookie.match(new RegExp(`${name}=([^;]+)`));
          return match ? match[1] : undefined;
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          response.cookies.set({ name, value: "", maxAge: 0, ...options });
        },
      },
    }
  );

  try {
    if ((event === "SIGNED_IN" || event === "TOKEN_REFRESHED") && session) {
      await supabase.auth.setSession(session);
    }
    if (event === "SIGNED_OUT") {
      await supabase.auth.signOut();
    }
  } catch (_e) {
    // no-op; return ok to avoid client errors
  }

  return response;
}
