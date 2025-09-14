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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error && data.user) {
      console.log(`✅ useAuth - Sign in successful for user: ${data.user.id}`);

      // Check user role after successful login
      const { user: userWithRole, error: roleError } = await getUserWithRole(
        data.user.id
      );

      if (!roleError && userWithRole) {
        const userRole = userWithRole.role || "user";
        console.log(`👤 useAuth - User role: ${userRole}`);

        // Check if user has admin or super_admin role
        if (isAdmin(userRole) || isSuperAdmin(userRole)) {
          console.log(`🚀 useAuth - Admin user, redirecting to /users`);
          // Redirect to admin dashboard
          router.push("/users");
          console.log(`🚀 useAuth - Router.push("/users") called`);

          // Fallback redirect after a short delay
          setTimeout(() => {
            console.log(`🚀 useAuth - Fallback redirect to /users`);
            window.location.href = "/users";
          }, 1000);
        } else {
          console.log(
            `🏠 useAuth - Regular user, redirecting to / (middleware will handle routing)`
          );
          // Redirect regular users to root - middleware will handle proper routing
          router.push("/");
          console.log(`🏠 useAuth - Router.push("/") called`);

          // Fallback redirect after a short delay
          setTimeout(() => {
            console.log(`🏠 useAuth - Fallback redirect to /`);
            window.location.href = "/";
          }, 1000);
        }
      } else {
        // Handle role fetch error - redirect to root, middleware will handle routing
        console.error(`❌ useAuth - Error fetching user role:`, roleError);
        console.log(
          `🏠 useAuth - Role fetch error, redirecting to / (middleware will handle routing)`
        );
        router.push("/");
        console.log(`🏠 useAuth - Router.push("/") called after role error`);

        // Fallback redirect after a short delay
        setTimeout(() => {
          console.log(`🏠 useAuth - Fallback redirect to / after role error`);
          window.location.href = "/";
        }, 1000);
      }
    } else {
      console.log(
        `❌ useAuth - Sign in failed:`,
        error?.message || "Unknown error"
      );
    }

    return { data, error };
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
