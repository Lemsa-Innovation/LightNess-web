"use client";
import { Tenant } from "@/firebase/auth";
import { User } from "@/firebase/firestore";
import { createContext, useContext } from "react";

export interface AuthContextType {
  tenant?: Tenant | null;
  isLoading: boolean | undefined;
  currentUser: User | null | undefined;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
