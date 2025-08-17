import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { WasherProfile } from "@/types/database";

export interface SupabaseWasher extends WasherProfile {
  user?: {
    first_name?: string;
    last_name?: string;
    email: string;
    avatar_image?: string;
    photo_url?: string;
  };
}

export function useSupabaseWashers() {
  const [washers, setWashers] = useState<SupabaseWasher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchWashers() {
      try {
        setIsLoading(true);
        setError(null);

        const { data: washersData, error: fetchError } = await supabase.from(
          "washer_profiles"
        ).select(`
            *,
            user:users (
              first_name,
              last_name,
              email,
              avatar_image,
              photo_url
            )
          `);

        if (fetchError) {
          setError(new Error(fetchError.message));
        } else {
          setWashers(washersData || []);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch washers")
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchWashers();
  }, []);

  return { washers, isLoading, error };
}
