import {UserGender} from "../users/validations";
import {DocumentReference, GeoPoint, Timestamp} from "@firebase/firestore";

type QuestionType =
  | "isPaid"
  | "perpetuity"
  | "muslimFriendly"
  | "belongsToMosque"

export type Comment = {
  uid: string
  message: string
  fullName: string
  createdAt: Timestamp
  contact?: string | null
  trustLevel?: 1 | 2 | 3 | 4 | 5 | null; // Niveau de confiance (1 à 5)
  questions?: Record<QuestionType, boolean> | null
}

export type Suggestion = {
  ref: DocumentReference
  type: SuggestionType;// Type de suggestion (cimetière, laveurs, pompe funèbre)
  name: string; // Nom de l'entité suggérée
  mapLocation: {
    geoPoint: GeoPoint
    placeId?: string
    manualAddress?: string
  }
  gender?: UserGender
  phoneNumber?: string;
  countryCode?: string
  createdBy: string
  additionalInfo?: string; // Informations supplémentaires optionnelles
  createdAt: Timestamp; // Date de création (timestamp)
  isActive: boolean; // Indique si la suggestion est activée ou non
  comments?: Record<string, Comment>
};


type SuggestionType = "cemetery" | "washer" | "funeralPump"
