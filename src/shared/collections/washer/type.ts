import {FcmToken, Review, WithFirestoreTypes} from "../../modules";
import {UserGender} from "../users";

export type WasherProfile<
  Ctx extends Pick<WithFirestoreTypes, "_time" | "_geo">,
> = {
  image?: string | null;
  fullname: string;
  address: string;
  region: string; // rayon d'intervention
  available: boolean;
  status: "active" | "inactive";
  geoPoint?: Ctx["_geo"];
  // experienceYears?: number;
  phoneNumber: string;
  secondaryPhoneNumbers?: string[] | null;
  gender: UserGender;
  createdAt: Ctx["_time"];
  updatedAt?: Ctx["_time"];
  reviews?: Record<string, Review<Ctx>>; // keyed by userId
  verifications: {
    identity: {
      isValidated: boolean;
      updatedAt?: Ctx["_time"];
      attachmentPath?: string | null;
    };
    certification: {
      isValidated: boolean;
      updatedAt?: Ctx["_time"];
      witnesses?:
        | {
            name: string;
            phoneNumber: string;
          }[]
        | null;
    };
  };
} & FcmToken;
