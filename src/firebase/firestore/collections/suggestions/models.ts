import {UserGender} from "../users/validations";
import {DocumentReference, GeoPoint, Timestamp} from "@firebase/firestore";
type SuggestionType = "cemetery" | "washer" | "funeralPump"
export type Comment = {
  uid: string
  fullName: string
  message: string
  createdAt: Timestamp
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
  createdBy: string
  additionalInfo?: string; // Informations supplémentaires optionnelles
  createdAt: Timestamp; // Date de création (timestamp)
  isActive: boolean; // Indique si la suggestion est activée ou non
  comments?: Record<string, {

  }>
};
