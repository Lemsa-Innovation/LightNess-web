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
import {UserRole} from "../firestore/collections/users/models";
import {CustomClaims, Tenant} from "./models";
import {PROTECTED_PATHS} from "@/routes";


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

  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [isLoadingTenant, setIsLoadingTenant] = useState<boolean>(true)
  const handleIdTokenChanged = async (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      try {
        const tokenResult = await getIdTokenResult(firebaseUser, true)
        const tenant = mapFirebaseResponseToTenant(tokenResult, firebaseUser)
        setTenant(tenant)
        await fetchLoginApi(tokenResult.token)
        if (tenant.customClaims.role as UserRole === 'admin') {
          if (pathname.startsWith("/auth"))
            window.location.reload()
        }
      } catch (error: any) {
        console.log(error.code);
        switch (error.code) {
          case 'auth/network-request-failed': {
            //toast.error(languageData?.authTranslation.signIn.errors.networkRequestFailed)
          }
        }
      }
    }
    else {
      console.log("User signed out");
      await fetch("/api/logout");
      const isProtected = PROTECTED_PATHS.some((route) => pathname.startsWith(route))

      if (isProtected) {
        window.location.reload()
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