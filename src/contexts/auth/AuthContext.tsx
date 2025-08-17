"use client";
import { UserWithRole } from "@/types/database";
import { createContext, useContext } from "react";

export interface AuthContextType {
  user?: UserWithRole | null;
  isLoading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
