import { DocumentReference, GeoPoint, Timestamp } from "@firebase/firestore";
import { WithFirestoreTypes } from "@shared/modules";

export type DefaultFirestoreTypes = WithFirestoreTypes<
  Timestamp,
  GeoPoint,
  DocumentReference
>;
