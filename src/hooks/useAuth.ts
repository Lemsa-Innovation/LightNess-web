import { useSupabaseClient } from "@supabase/auth-helpers-react";

export function useSupabaseAuth() {
  const supabase = useSupabaseClient();

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password/confirm`,
    });
    return { data, error };
  };

  return { resetPassword };
}
