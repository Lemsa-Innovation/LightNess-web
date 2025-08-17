import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useAuth as useAuthContext } from "@/contexts/auth/AuthContext";
import { useRouter } from "next/navigation";
import { getUserWithRole, isAdmin, isSuperAdmin } from "@/lib/supabase";

export function useSupabaseAuth() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error && data.user) {
      // Check user role after successful login
      const { user: userWithRole, error: roleError } = await getUserWithRole(
        data.user.id
      );

      if (!roleError && userWithRole) {
        const userRole = userWithRole.role || "user";

        // Check if user has admin or super_admin role
        if (isAdmin(userRole) || isSuperAdmin(userRole)) {
          // Redirect to admin dashboard
          router.push("/app");
        } else {
          // Redirect regular users to a different page or show access denied
          router.push("/");
        }
      } else {
        // Handle role fetch error
        console.error("Error fetching user role:", roleError);
        router.push("/");
      }
    }

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

  return { user, signIn, signOut };
}

export function useAuth() {
  return useAuthContext();
}
