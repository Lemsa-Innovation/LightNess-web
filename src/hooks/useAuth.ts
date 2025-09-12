import { useSupabaseClient } from "@supabase/auth-helpers-react";

export function useSupabaseAuth() {
  const supabase = useSupabaseClient();

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password/confirm`,
    });
    return { data, error };
  };

  const verifyResetToken = async (email: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "recovery",
    });
    return { data, error };
  };

  const updatePassword = async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });
    return { data, error };
  };

  return { resetPassword, verifyResetToken, updatePassword };
}
