"use client";
import { useEffect, useState } from "react";
import { getIdTokenResult, onIdTokenChanged } from "firebase/auth";
import { AuthUser, CustomClaims, Tenant } from "./types";

import {
  fetchLoginApi,
  fetchLogoutApi,
  mapFirebaseResponseToTenant,
} from "./helpers";
import { usePathname } from "next/navigation";
import { auth } from "../app";
import { PROTECTED_PATHS } from "@/config";

export function useAuthUser() {
  const pathname = usePathname();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [isLoadingTenant, setIsLoadingTenant] = useState<boolean>(true);

  const handleIdTokenChanged = async (firebaseUser: AuthUser | null) => {
    if (firebaseUser) {
      try {
        const tokenResult = await getIdTokenResult(firebaseUser, true);
        const tenant = mapFirebaseResponseToTenant(tokenResult, firebaseUser);
        const fetching = await fetchLoginApi(tokenResult.token);
        if (fetching.ok) {
          if (tenant.customClaims.role === "admin") {
            if (pathname.startsWith("/auth")) {
              window.location.reload();
            }
          }
        } else {
          // toast.error(errors?.networkRequestFailed);
        }
        setTenant(tenant);
      } catch (error: any) {
        switch (error.code) {
          case "auth/network-request-failed": {
            //toast.error(languageData?.authTranslation.signIn.errors.networkRequestFailed)
          }
        }
      }
    } else {
      const response = await fetchLogoutApi();
      const isProtected = PROTECTED_PATHS?.some((route) =>
        pathname.startsWith(route)
      );
      if (response.ok) {
        isProtected && window.location.reload();
      } else {
        // toast.error(errors?.networkRequestFailed);
      }
    }
    setIsLoadingTenant(false);
  };

  useEffect(() => {
    return onIdTokenChanged(auth, handleIdTokenChanged);
  }, [pathname]);

  return {
    tenant,
    isLoadingTenant,
  };
}
