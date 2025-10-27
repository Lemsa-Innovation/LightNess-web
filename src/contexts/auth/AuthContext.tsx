"use client";
import { createContext, useContext } from "react";

// Define a simple user type for auth context
interface AuthUser {
  id: string;
  email?: string;
  role: string;
  [key: string]: any;
}

export interface AuthContextType {
  user?: AuthUser | null;
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
