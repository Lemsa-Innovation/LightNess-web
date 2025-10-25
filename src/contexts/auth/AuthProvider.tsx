"use client";
import { useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";
import { UserWithRole } from "@/types/database";
import {
  getUserWithRole,
  isAdmin,
  isSuperAdmin,
  supabase,
} from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export interface ProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<ProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user && !error) {
        await loadUser(user);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    };

    // Load user data
    const loadUser = async (supabaseUser: User) => {
      try {
        const { user: userWithRole, error } = await getUserWithRole(
          supabaseUser.id
        );
        if (!error && userWithRole) {
          setUser({ ...userWithRole, role: userWithRole.role });
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
      setIsLoading(false);
    };

    getInitialSession();

    // Listen for auth changes and sync cookies for middleware via route handler
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, _session) => {
      const {
        data: { user: verifiedUser },
      } = await supabase.auth.getUser();
      console.log(`🔄 Auth state change: ${event}`, verifiedUser?.id);

      // Sync session cookies server-side so middleware sees session
      try {
        await fetch("/auth/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event, session: _session }),
        });
      } catch (_e) {
        // ignore network errors
      }

      if (verifiedUser) {
        await loadUser(verifiedUser);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const authContextValue: AuthContextType = {
    user,
    isLoading,
    isAdmin: isAdmin(user?.role),
    isSuperAdmin: isSuperAdmin(user?.role),
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
