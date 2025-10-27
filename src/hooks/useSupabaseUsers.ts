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

        // Fetch users sorted by created_at in descending order (newest first)
        const { data: usersData, error: fetchError } = await supabase
          .from("users")
          .select("*")
          .order("created_at", { ascending: false });

        if (fetchError) {
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
        }
      } catch (err) {
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
