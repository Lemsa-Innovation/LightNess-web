import { DocumentReference, GeoPoint, Timestamp } from "@firebase/firestore";
import { WithFirestoreTypes } from "@shared/modules";

export type WithRef<T> = T & {
  ref: DocumentReference;
};

export type DefaultFirestoreTypes = WithFirestoreTypes<
  Timestamp,
  GeoPoint,
  DocumentReference
>;
