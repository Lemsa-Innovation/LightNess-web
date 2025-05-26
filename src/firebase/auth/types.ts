import { Timestamp } from "@firebase/firestore";
import { Admin } from "../firestore";
import { User, UserInfo } from "firebase/auth";
export type CustomClaims = Admin;
export type AuthUser = User;

export interface Tenant {
  uid: string;
  lastSignInTime: Timestamp | null;
  email: string | null;
  photoUrl: string | null;
  emailVerified: boolean;
  customClaims: CustomClaims;
  providerId?: string;
  phoneNumber?: string | null;
  idToken: string;
  providerData?: UserInfo[];
}
