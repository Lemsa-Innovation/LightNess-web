import {UserInfo} from "firebase/auth";
import {Timestamp} from "firebase/firestore";
import {UserStatus} from "../firestore/collections/users/models";
import {AdminPositions} from "@/language/structure/profile";

export type CustomClaims = {
    status: UserStatus
} & ({
    role: "admin"
    position: keyof AdminPositions
})

export interface Tenant {
    uid: string;
    lastSignInTime: Timestamp | null
    email: string | null;
    photoUrl: string | null
    emailVerified: boolean
    customClaims: CustomClaims
    providerId?: string
    phoneNumber?: string | null
    idToken: string
    providerData?: UserInfo[]
}