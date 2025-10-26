import { useState, useEffect } from "react";
import { getAllUsers } from "@/lib/supabase";

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
        const { users: fetchedUsers, error: fetchError } = await getAllUsers();
        console.log(
          "👥 [useSupabaseUsers] fetched:",
          JSON.stringify({
            count: fetchedUsers?.length || 0,
            hasError: !!fetchError,
          })
        );

        if (fetchError) {
          console.log("👥 [useSupabaseUsers] fetch error:", fetchError.message);
          setError(new Error(fetchError.message));
        } else {
          setUsers(fetchedUsers);
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
