import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Add connection pooling and timeout settings
      global: {
        headers: {
          Connection: "keep-alive",
        },
      },
      db: {
        schema: "public",
      },
      auth: {
        // Increase auth timeout
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
      realtime: {
        // Disable realtime if not needed to reduce overhead
        enabled: false,
      },
    }
  );
}
