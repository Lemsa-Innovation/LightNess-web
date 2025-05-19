import {Review, WithFirestoreTypes} from "../../modules";

export type FuneralCompanyProfile<
  Ctx extends Pick<WithFirestoreTypes, "_time" | "_geo">,
> = {
  image?: string | null;
  userId: string; // Référence au User
  companyName: string;
  email: string;
  phoneNumber: string;
  address: string;
  website?: string | null;
  secondaryPhoneNumbers?: string[] | null;
  operatingHours?: string | null; // ex: "Lundi-Vendredi: 09:00-17:00"
  services?: string | null;
  region: string; // rayon d'intervention
  createdAt: Ctx["_time"];
  updatedAt?: Ctx["_time"];
  geoPoint?: Ctx["_geo"];

  reviews?: Record<string, Review<Ctx>>; // keyed by userId
  verifications: {
    identity: {
      isValidated: boolean;
      updatedAt?: Ctx["_time"];
      attachmentPath?: string | null;
    };
  };
};
