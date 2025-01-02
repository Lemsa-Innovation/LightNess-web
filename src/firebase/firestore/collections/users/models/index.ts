
import {FieldValue, GeoPoint, Timestamp} from "@firebase/firestore";
import {Status} from "@/language/structure/commons";
import {UserRoles} from "@/language/structure/profile";
import {EnvSource, Validation} from "@/firebase/firestore/modules/models";
import {Admin} from "./admin";
import {Relationship, UserGender} from "../validations";

type UserValidation = {
  validation: Validation
  role: "owner" | "recipient" | "witness"
}
/*******************************************/
export type UserRole = keyof UserRoles
export type UserStatus = keyof Pick<Status, 'active' | 'inReview' | 'pending' | 'unverified' | 'disabled'>
/*******************************************/

export type VerificationType = keyof UserVerificationSteps<"client">
export type VerificationStep<Env extends EnvSource> = {
  verified: boolean
  timestamp: Env extends "client" ? Timestamp : FieldValue
}
export type UserVerificationSteps<Env extends EnvSource> = {
  email?: VerificationStep<Env>
  identity?: VerificationStep<Env>
  phone?: VerificationStep<Env>
}
/*******************************************/
export type User<Env extends EnvSource> = {
  uid: string

  username?: string;
  firstName?: string;
  lastName?: string;

  email?: string
  birthday?: Env extends "client" ? Timestamp : FieldValue
  gender?: UserGender;

  countryId: string;

  phoneNumber?: string;
  photoUrl?: string;
  avatarImage?: string;
  estimatedSurvivalTime?: Timestamp; // in days
  createdAt: Env extends "client" ? Timestamp : FieldValue

  verificationSteps?: UserVerificationSteps<Env>
  accountStatus: UserStatus;
  isDead?: boolean
  fcmToken?: {
    web?: Env extends "client" ? string : FieldValue;
    android?: Env extends "client" ? string : FieldValue;
    ios?: Env extends "client" ? string : FieldValue;
  };

  contacts?: Record<string, {
    relation?: Relationship
    createdAt: Env extends "client" ? Timestamp : FieldValue;
    address?: {
      geoPoint: GeoPoint
      manualAddress?: string;
    }
  }>
  invitedBy?: string
  invitedContacts?: Env extends "client" ? string[] : FieldValue
  // medicalInfo?: Record<string, MedicalInfo>;
  debts?: Record<string, Env extends "client" ? UserValidation : FieldValue>;
  testaments?: Record<
    string, Env extends "client" ? UserValidation : FieldValue>;
  favorites?: Env extends "client" ? string[] : FieldValue // doc paths
  suggestedEntities?: Env extends "client" ? string[] : FieldValue // ids
} & (Admin | {
  role: "user"
});