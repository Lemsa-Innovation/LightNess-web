import { useAuth as useAuthContext } from "@/contexts/auth/AuthContext";
import { createClient } from "@/utils/supabase/client";

export function useSupabaseAuth() {
  const signIn = async (email: string, password: string) => {
    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data?.user) {
        return { data, error };
      }

      return { data, error: null } as any;
    } catch (e) {
      const err = e instanceof Error ? e : new Error("Sign in failed");
      return { data: null as any, error: err };
    }
  };

  const resetPassword = async (email: string) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password/confirm`,
    });
    return { data, error };
  };

  const signOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    // The AuthProvider will handle the redirect on SIGNED_OUT event
    return { error };
  };

  return { signIn, resetPassword, signOut };
}

export function useAuth() {
  return useAuthContext();
}
