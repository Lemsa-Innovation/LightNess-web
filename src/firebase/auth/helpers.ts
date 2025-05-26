import { IdTokenResult } from "firebase/auth";
import { AuthUser, CustomClaims, Tenant } from "./types";
import { Timestamp } from "@firebase/firestore";

export function generatePassword(email: string): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@_";
  const passwordLength = 8;
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  const emailPassword = email.split("@", 1).at(0);
  if (emailPassword && emailPassword?.length >= 8) {
    return emailPassword;
  }
  return password;
}

export const fetchLoginApi = (token: string) => {
  return fetch("/api/login", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchLogoutApi = () => {
  return fetch("/api/logout");
};

export const mapFirebaseResponseToTenant = (
  result: IdTokenResult,
  user: AuthUser
): Tenant => {
  const providerData = user.providerData;
  const lastSignInTime = user.metadata.lastSignInTime
    ? Timestamp.fromDate(new Date(user.metadata.lastSignInTime))
    : null;

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
