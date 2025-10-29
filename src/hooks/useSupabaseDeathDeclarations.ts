import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface SupabaseDeathDeclaration {
  uid: string;
  declared_by: string;
  matched_uid: string;
  status: "rejected" | "pending" | "approved";
  created_at: string;
  attachments?: string[];
  description?: string;
  declared_by_user?: {
    id: string;
    first_name?: string;
    last_name?: string;
    email: string;
    avatar_image?: string;
    photo_url?: string;
  };
  matched_user?: {
    id: string;
    first_name?: string;
    last_name?: string;
    email: string;
    avatar_image?: string;
    photo_url?: string;
  };
}

export function useSupabaseDeathDeclarations() {
  const [deathDeclarations, setDeathDeclarations] = useState<
    SupabaseDeathDeclaration[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDeathDeclarations = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: deathDeclarationsData, error: fetchError } = await supabase
        .from("death_declarations")
        .select(
          `
          uid,
          declared_by,
          matched_uid,
          status,
          created_at,
          attachments,
          description,
          declared_by_user:users!death_declarations_declared_by_fkey (
            id,
            first_name,
            last_name,
            email,
            avatar_image,
            photo_url
          ),
          matched_user:users!death_declarations_matched_uid_fkey (
            id,
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
        setDeathDeclarations((deathDeclarationsData as any) || []);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch death declarations")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDeathDeclarations();
  }, []);

  return {
    deathDeclarations,
    isLoading,
    error,
    refetch: fetchDeathDeclarations,
  };
}
