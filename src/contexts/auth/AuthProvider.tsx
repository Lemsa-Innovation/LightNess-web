"use client";

import { useAuthUser } from "@/firebase/auth";
import { AuthContext, AuthContextType } from "./AuthContext";
import { useUser } from "@/firebase/firestore/collections/users/hooks";

export interface ProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<ProviderProps> = ({
  children,
}) => {
  const { tenant } = useAuthUser();
  const { data: user, isLoading } = useUser({ uid: tenant?.uid });

  const authContextValue: AuthContextType = {
    tenant: tenant || null,
    isLoading,
    currentUser: user,
  };
  console.log("tenant", tenant);

  //   useEffect(() => {
  //     // if (tenant && currentUser)
  //     //   checkAuthUser({
  //     //     tenant,
  //     //     user: currentUser,
  //     //   });
  //   }, [tenant]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
