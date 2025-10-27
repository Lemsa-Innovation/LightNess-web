"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext, AuthContextType } from "./AuthContext";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";

// Define a simple user type for auth context
interface AuthUser {
  id: string;
  email?: string;
  role: string;
  [key: string]: any;
}

export interface ProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<ProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) {
          console.log("🔄 [AuthProvider] getUser error:", error.message);
        }
        if (user && !error) {
          await loadUser(user);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      } catch (err) {
        console.log("🔄 [AuthProvider] getInitialSession error:", err);
        setUser(null);
        setIsLoading(false);
      }
    };

    // Load user data - NO ASYNC CALLS INSIDE onAuthStateChange
    const loadUser = async (supabaseUser: User) => {
      console.log(`🔄 [AuthProvider] Loading user: ${supabaseUser.id}`);

      try {
        // Fetch the user role first
        let userRole = "user"; // Default role

        try {
          console.log(
            `🔄 [AuthProvider] Fetching role for user: ${supabaseUser.id}`
          );
          const { data: roleData, error: roleError } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", supabaseUser.id as any)
            .single();

          if (!roleError && roleData) {
            userRole = (roleData as any)?.role || "user";
            console.log(`🔄 [AuthProvider] Found role: ${userRole}`);
          } else {
            console.log(
              "🔄 [AuthProvider] Role fetch error:",
              roleError?.message || "No role data"
            );
          }
        } catch (roleError) {
          console.log("🔄 [AuthProvider] Role fetch exception:", roleError);
        }

        // Set the user with the actual role
        const authUser: AuthUser = {
          ...supabaseUser,
          role: userRole,
        };
        setUser(authUser);
        setIsLoading(false);
        console.log(`🔄 [AuthProvider] User loaded with role: ${userRole}`);

        return userRole; // Return the role for redirect logic
      } catch (error) {
        console.error("🔄 [AuthProvider] Error loading user:", error);
        // Fallback: set user without role
        const authUser: AuthUser = {
          ...supabaseUser,
          role: "user",
        };
        setUser(authUser);
        setIsLoading(false);
        return "user";
      }
    };

    getInitialSession();

    // CRITICAL FIX: NO ASYNC CALLS INSIDE onAuthStateChange - USE setTimeout(0)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`🔄 Auth state change: ${event}`, session?.user?.id);

      // Use setTimeout(0) to prevent deadlock - this is the official Supabase fix
      setTimeout(() => {
        if (event === "SIGNED_IN" && session?.user) {
          console.log(
            `🔄 [AuthProvider] SIGNED_IN event - setting user immediately`
          );

          // Set user immediately with default role to stop loading
          const authUser: AuthUser = {
            ...session.user,
            role: "user", // Default role
          };
          setUser(authUser);
          setIsLoading(false);
          console.log(
            `🔄 [AuthProvider] User set immediately with default role`
          );

          // Handle redirect immediately
          const currentPath = window.location.pathname;
          console.log(`🔄 [AuthProvider] Current path: ${currentPath}`);

          // Only redirect if we're on auth pages
          if (currentPath.startsWith("/auth") || currentPath === "/login") {
            console.log(`🏠 [AuthProvider] Redirecting to /`);
            router.push("/");
          }

          // Load role in background without blocking
          setTimeout(async () => {
            try {
              const { data: roleData, error: roleError } = await supabase
                .from("user_roles")
                .select("role")
                .eq("user_id", session.user.id as any)
                .single();

              if (!roleError && roleData) {
                const userRole = (roleData as any)?.role || "user";
                const updatedUser: AuthUser = {
                  ...session.user,
                  role: userRole,
                };
                setUser(updatedUser);
                console.log(
                  `🔄 [AuthProvider] Updated user with role: ${userRole}`
                );
              }
            } catch (roleError) {
              console.log(
                "🔄 [AuthProvider] Background role fetch failed:",
                roleError
              );
            }
          }, 500);
        } else if (event === "SIGNED_OUT") {
          console.log(`🔄 [AuthProvider] SIGNED_OUT event - clearing user`);
          setUser(null);
          setIsLoading(false);
        } else {
          // For other events, just set loading to false
          setIsLoading(false);
        }
      }, 0); // This prevents the deadlock
    });

    return () => subscription.unsubscribe();
  }, []);

  const authContextValue: AuthContextType = {
    user,
    isLoading,
    isAdmin: user?.role === "admin" || user?.role === "super_admin",
    isSuperAdmin: user?.role === "super_admin",
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
