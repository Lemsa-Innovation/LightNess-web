import { DocumentReference, GeoPoint, Timestamp } from "@firebase/firestore";
import { WithFirestoreTypes } from "@shared/modules";

export type EnvSource = "server" | "client";
export type WithRef<T> = T & {
  ref: DocumentReference;
};

export type DefaultFirestoreTypes = WithFirestoreTypes<
  Timestamp,
  GeoPoint,
  DocumentReference
>;
