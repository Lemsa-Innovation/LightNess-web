import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {
  getIdTokenResult,
  onIdTokenChanged,
  User as FirebaseUser,
  IdTokenResult
} from "firebase/auth";
import {auth} from "../config/firebase";
import {Timestamp} from "@firebase/firestore";
import {CustomClaims, Tenant} from "./models";
import {PROTECTED_PATHS} from "@/routes";
import {toast} from "sonner";
import {useLanguage} from "@/contexts/language/LanguageContext";

const fetchLoginApi = (token: string) => {
  return fetch("/api/login", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const mapFirebaseResponseToTenant = (
  result: IdTokenResult,
  user: FirebaseUser
): Tenant => {
  const providerData = user.providerData
  const lastSignInTime = user.metadata.lastSignInTime ? Timestamp.fromDate(new Date(user.metadata.lastSignInTime)) : null;

  return {
    uid: user.uid,
    email: user.email || null,
    emailVerified: user.emailVerified || false,
    photoUrl: user.photoURL || null,
    customClaims: result.claims as CustomClaims,
    lastSignInTime,
    providerData: providerData,
    idToken: result.token,
    phoneNumber: user.phoneNumber,
  };
};


export function useAuthUser() {
  const pathname = usePathname()
  const {languageData} = useLanguage()
  const errors = languageData?.auth.errors
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [isLoadingTenant, setIsLoadingTenant] = useState<boolean>(true)
  const handleIdTokenChanged = async (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      try {
        const tokenResult = await getIdTokenResult(firebaseUser, true)
        const tenant = mapFirebaseResponseToTenant(tokenResult, firebaseUser)
        const fetching = await fetchLoginApi(tokenResult.token)
        if (fetching.ok) {
          if (tenant.customClaims.role === 'admin') {
            if (pathname.startsWith("/auth")) {
              window.location.reload()
            }
          }
        }
        else {
          toast.error(errors?.networkRequestFailed)
        }
        setTenant(tenant)
      } catch (error: any) {
        switch (error.code) {
          case 'auth/network-request-failed': {
            //toast.error(languageData?.authTranslation.signIn.errors.networkRequestFailed)
          }
        }
      }
    }
    else {
      const response = await fetch("/api/logout");
      const isProtected = PROTECTED_PATHS.some((route) => pathname.startsWith(route))
      if (response.ok) {
        isProtected && window.location.reload()
      }
      else {
        toast.error(errors?.networkRequestFailed)
      }
    }
    setIsLoadingTenant(false)
  };

  useEffect(() => {
    return onIdTokenChanged(auth, handleIdTokenChanged)
  }, [])

  return {
    tenant,
    isLoadingTenant
  }
}