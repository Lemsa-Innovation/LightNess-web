import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { FuneralCompanyProfile } from "@/types/database";

export interface SupabaseFuneralCompany extends FuneralCompanyProfile {
  user?: {
    first_name?: string;
    last_name?: string;
    email: string;
    avatar_image?: string;
    photo_url?: string;
  };
}

export function useSupabaseFuneralCompanies() {
  const [funeralCompanies, setFuneralCompanies] = useState<
    SupabaseFuneralCompany[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchFuneralCompanies() {
      try {
        setIsLoading(true);
        setError(null);

        const { data: funeralCompaniesData, error: fetchError } =
          await supabase.from("funeral_company_profiles").select(`
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
          setFuneralCompanies(funeralCompaniesData || []);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch funeral companies")
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchFuneralCompanies();
  }, []);

  return { funeralCompanies, isLoading, error };
}
