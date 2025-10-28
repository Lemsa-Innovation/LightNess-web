import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { WasherProfile } from "@/types/database";

export interface SupabaseWasher extends WasherProfile {
  uid: string; // Add uid property for table key
  user?: {
    first_name?: string;
    last_name?: string;
    email: string;
    avatar_image?: string;
    photo_url?: string;
  };
}

export interface WasherSummaryStats {
  totalWashers: number;
  validated: number;
  pending: number;
}

export function useSupabaseWashers() {
  const [washers, setWashers] = useState<SupabaseWasher[]>([]);
  const [summaryStats, setSummaryStats] = useState<WasherSummaryStats>({
    totalWashers: 0,
    validated: 0,
    pending: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchWashers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch washers sorted by created_at in descending order (newest first)
      const { data: washersData, error: fetchError } = await supabase
        .from("washer_profiles")
        .select(
          `
            *,
            user:users (
              first_name,
              last_name,
              email,
              avatar_image,
              photo_url
            )
          `
        )
        .order("created_at", { ascending: false });

      if (fetchError) {
        setError(new Error(fetchError.message));
      } else {
        const washersDataArray = (washersData as any) || [];
        // The uid field is already provided by the database
        setWashers(washersDataArray);

        // Calculate summary statistics
        const totalWashers = washersDataArray.length;
        const validated = washersDataArray.filter(
          (washer: any) =>
            washer.is_validated_identity && washer.is_validated_certification
        ).length;
        const pending = totalWashers - validated;

        setSummaryStats({
          totalWashers,
          validated,
          pending,
        });
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch washers")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWashers();
  }, []);

  return { washers, summaryStats, isLoading, error, refetch: fetchWashers };
}
