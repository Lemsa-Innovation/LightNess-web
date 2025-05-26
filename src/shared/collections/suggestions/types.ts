import {WithFirestoreTypes} from "../../modules";
import {UserGender} from "../users/types";

type QuestionType =
  | "isPaid"
  | "perpetuity"
  | "muslimFriendly"
  | "belongsToMosque";

export type Comment<Ctx extends Partial<Pick<WithFirestoreTypes, "_time">>> = {
  uid: string;
  message: string;
  fullName: string;
  createdAt: Ctx["_time"];
  contact?: string | null;
  trustLevel?: 1 | 2 | 3 | 4 | 5 | null; // Niveau de confiance (1 à 5)
  questions?: Record<QuestionType, boolean> | null;
};

type SuggestionType = "cemetery" | "washer" | "funeralPump";
export type Suggestion<
  Ctx extends Partial<
    Pick<WithFirestoreTypes, "_time" | "_geo">
  > = WithFirestoreTypes<"_time" | "_geo">,
> = {
  type: SuggestionType; // Type de suggestion
  name: string; // Nom de l'entité suggérée
  mapLocation: {
    geoPoint: Ctx["_geo"];
    placeId?: string;
    manualAddress?: string;
  };
  city?: string;
  gender?: UserGender;
  phoneNumber?: string;
  countryCode?: string;
  createdBy: string;
  additionalInfo?: string; // Informations supplémentaires optionnelles
  createdAt: Ctx["_time"]; // Date de création (timestamp)
  isActive: boolean; // Indique si la suggestion est activée ou non
  comments?: Record<string, Comment<Ctx>>;
};
