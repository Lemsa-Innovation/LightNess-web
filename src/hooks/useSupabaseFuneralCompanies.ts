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

export interface FuneralCompanySummaryStats {
  totalCompanies: number;
  validated: number;
  pending: number;
}

export function useSupabaseFuneralCompanies() {
  const [funeralCompanies, setFuneralCompanies] = useState<
    SupabaseFuneralCompany[]
  >([]);
  const [summaryStats, setSummaryStats] = useState<FuneralCompanySummaryStats>({
    totalCompanies: 0,
    validated: 0,
    pending: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFuneralCompanies = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch funeral companies sorted by created_at in descending order (newest first)
      const { data: funeralCompaniesData, error: fetchError } = await supabase
        .from("funeral_company_profiles")
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
        const companiesDataArray = (funeralCompaniesData as any) || [];
        setFuneralCompanies(companiesDataArray);

        // Calculate summary statistics
        const totalCompanies = companiesDataArray.length;
        const validated = companiesDataArray.filter(
          (company: any) => company.is_validated_identity
        ).length;
        const pending = totalCompanies - validated;

        setSummaryStats({
          totalCompanies,
          validated,
          pending,
        });
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
  };

  useEffect(() => {
    fetchFuneralCompanies();
  }, []);

  return {
    funeralCompanies,
    summaryStats,
    isLoading,
    error,
    refetch: fetchFuneralCompanies,
  };
}
