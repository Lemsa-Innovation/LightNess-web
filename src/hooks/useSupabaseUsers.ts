import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export interface SupabaseUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  created_at: string;
  updated_at: string;
  role: string;
  account_status?: string;
  avatar_image?: string;
  photo_url?: string;
  verification_steps?: {
    email?: {
      verified: boolean;
    };
  };
}

export function useSupabaseUsers() {
  const [users, setUsers] = useState<SupabaseUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        setError(null);

        const supabase = createClient();

        console.log("👥 [useSupabaseUsers] Starting fetch...");
        console.log(
          "👥 [useSupabaseUsers] Supabase URL:",
          process.env.NEXT_PUBLIC_SUPABASE_URL
        );
        console.log(
          "👥 [useSupabaseUsers] Supabase Key exists:",
          !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );

        // Try a simpler query first to debug
        const { data: usersData, error: fetchError } = await supabase
          .from("users")
          .select("*");

        console.log(
          "👥 [useSupabaseUsers] fetched:",
          JSON.stringify({
            count: usersData?.length || 0,
            hasError: !!fetchError,
            errorMessage: fetchError?.message,
          })
        );

        if (fetchError) {
          console.log("👥 [useSupabaseUsers] fetch error:", fetchError.message);
          setError(new Error(fetchError.message));
        } else {
          // For now, set default role since we're not joining with user_roles
          const formattedUsers =
            usersData?.map((u: any) => {
              const base = u as Record<string, unknown>;
              return {
                ...base,
                role: "user", // Default role for now
              } as SupabaseUser;
            }) || [];
          setUsers(formattedUsers);
          console.log(
            `👥 [useSupabaseUsers] Successfully loaded ${formattedUsers.length} users`
          );
        }
      } catch (err) {
        console.log("👥 [useSupabaseUsers] unexpected error:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to fetch users")
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return { users, isLoading, error };
}
