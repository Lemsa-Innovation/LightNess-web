import { useAuth as useAuthContext } from "@/contexts/auth/AuthContext";
import { useRouter } from "next/navigation";
import {
  getUserWithRole,
  isAdmin,
  isSuperAdmin,
  supabase,
} from "@/lib/supabase";

export function useSupabaseAuth() {
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    console.log(`🔐 useAuth - Attempting sign in for: ${email}`);
    try {
      console.log(`🔐 useAuth - Calling supabase.auth.signInWithPassword`);
      const { data, error } = (await Promise.race([
        supabase.auth.signInWithPassword({
          email,
          password,
        }),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("signInWithPassword timeout")),
            10000
          )
        ),
      ])) as any;
      console.log(`🔐 useAuth - signInWithPassword result`, {
        hasUser: !!data?.user,
        error: error?.message,
      });

      if (error || !data?.user) {
        return { data, error };
      }

      console.log(`✅ useAuth - Sign in successful for user: ${data.user.id}`);

      // Attempt to load role with a timeout so UI never hangs
      let userRole: string | undefined = undefined;
      try {
        const roleResult = (await Promise.race([
          getUserWithRole(data.user.id),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("getUserWithRole timeout")), 8000)
          ),
        ])) as any;
        if (roleResult && !roleResult.error && roleResult.user) {
          userRole = roleResult.role || "user";
        }
        console.log(`👤 useAuth - Role fetch result`, {
          userRole,
          hadError: !!roleResult?.error,
        });
      } catch (e) {
        console.log(`❌ useAuth - Role fetch failed`, e);
      }

      const effectiveRole = userRole || "user";
      if (isAdmin(effectiveRole) || isSuperAdmin(effectiveRole)) {
        console.log(`🚀 useAuth - Admin user, redirecting to /users`);
        router.push("/users");
        setTimeout(() => {
          console.log(`🚀 useAuth - Fallback redirect to /users`);
          window.location.href = "/users";
        }, 1000);
      } else {
        console.log(
          `🏠 useAuth - Regular user, redirecting to / (middleware will handle routing)`
        );
        router.push("/");
        setTimeout(() => {
          console.log(`🏠 useAuth - Fallback redirect to /`);
          window.location.href = "/";
        }, 1000);
      }

      return { data, error: null } as any;
    } catch (e) {
      console.log(`❌ useAuth - Unexpected sign in error`, e);
      const err = e instanceof Error ? e : new Error("Sign in failed");
      return { data: null as any, error: err };
    }
  };

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password/confirm`,
    });
    return { data, error };
  };

  const signOut = async () => {
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
