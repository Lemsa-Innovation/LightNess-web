import {FcmToken, Validation, WithFirestoreTypes} from "../../../modules";
import {UserContact} from "./contact";
import {UserInfo} from "./info";
import {UserChoices} from "./choice";

type UserValidation<Ctx extends Partial<Pick<WithFirestoreTypes, "_time">>> = {
  validation: Validation<Ctx>;
  role: "owner" | "recipient" | "witness";
};

/** *****************************************/
export type UserStatus =
  | "active"
  | "inReview"
  | "pending"
  | "unverified"
  | "disabled";
export type UserRole = "admin" | "user";
/** *****************************************/

export type VerificationType = keyof UserVerificationSteps;

export type VerificationStep<
  Ctx extends Partial<Pick<WithFirestoreTypes, "_time">>,
> = {
  verified: boolean;
  timestamp: Ctx["_time"];
};
export type UserVerificationSteps<
  Ctx extends Pick<WithFirestoreTypes, "_time"> = WithFirestoreTypes,
> = {
  email?: VerificationStep<Ctx>;
  identity?: VerificationStep<Ctx>;
  phone?: VerificationStep<Ctx>;
};

export type User<Ctx extends WithFirestoreTypes = WithFirestoreTypes> = {
  createdAt: Ctx["_time"];
  choices?: UserChoices;

  testaments?: Record<string, UserValidation<Ctx>>;
  debts?: Record<string, UserValidation<Ctx>>;

  invitedContacts?: string[] | null; // string[]
  favorites?: string[] | null; // string[]
  likes?: {
    washers?: string[];
    cemeteries?: string[];
    funeralCompanies?: string[];
  };
  suggestedEntities?: string[] | null; // string[]
  contacts?: Record<string, UserContact<Ctx>>;
  isWasher?: boolean;
  hasFuneralProfile?: boolean;

  accountStatus?: UserStatus;

  verificationSteps?: UserVerificationSteps<Ctx>;
} & FcmToken &
  UserInfo;
