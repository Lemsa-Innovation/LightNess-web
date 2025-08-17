"use client";
import { useEffect, useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { AuthContext, AuthContextType } from "./AuthContext";
import { UserWithRole } from "@/types/database";
import { getUserWithRole, isAdmin, isSuperAdmin } from "@/lib/supabase";

export interface ProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<ProviderProps> = ({
  children,
}) => {
  const supabaseUser = useUser();
  const supabase = useSupabaseClient();
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (supabaseUser) {
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
      } else {
        setUser(null);
      }
      setIsLoading(false);
    }

    loadUser();
  }, [supabaseUser]);

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
