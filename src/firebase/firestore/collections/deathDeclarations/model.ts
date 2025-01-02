import {Status} from "@/language/structure/commons";
import {DocumentReference, Timestamp} from "@firebase/firestore";

export type DeathDeclaration = {
  ref: DocumentReference
  declaredBy: string
  matchedUid: string
  dateOfDeath?: string; // Date de décès (format ISO 8601)
  placeOfDeath?: string; // Lieu de décès
  createdAt: Timestamp
  status: keyof Pick<Status, "rejected" | "pending" | "approved">// Statut de la déclaration
}