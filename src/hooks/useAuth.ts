import { useAuth as useAuthContext } from "@/contexts/auth/AuthContext";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export function useSupabaseAuth() {
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    console.log(`🔐 useAuth - Attempting sign in for: ${email}`);
    try {
      const supabase = createClient();

      console.log(`🔐 useAuth - Calling supabase.auth.signInWithPassword`);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log(`🔐 useAuth - signInWithPassword result`, {
        hasUser: !!data?.user,
        error: error?.message,
      });

      if (error || !data?.user) {
        return { data, error };
      }

      console.log(`✅ useAuth - Sign in successful for user: ${data.user.id}`);
      console.log(
        `🔄 useAuth - AuthProvider will handle redirect via onAuthStateChange`
      );

      return { data, error: null } as any;
    } catch (e) {
      console.log(`❌ useAuth - Unexpected sign in error`, e);
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
    if (!error) {
      // Redirect to login page after logout
      router.push("/auth");
    }
    return { error };
  };

  return { signIn, resetPassword, signOut };
}

export function useAuth() {
  return useAuthContext();
}
