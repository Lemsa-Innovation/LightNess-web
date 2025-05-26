export type UserGender = "women" | "men";

export type UserInfo = {
  isDead?: boolean;
  uid: string;
  email: string;
  lastName?: string;
  firstName?: string;
  phoneNumber?: string | null;
  secondaryPhoneNumbers?: string[] | null;
  secondaryEmail?: string | null;
  countryCode?: string | null;
  countryId?: string | null;
  birthday?: string | null;
  gender?: UserGender | null;
  photoUrl?: string | null;
  avatarImage?: string | null;
  estimatedSurvivalTime?: number | null; // in days
  invitedBy?: string;
};
