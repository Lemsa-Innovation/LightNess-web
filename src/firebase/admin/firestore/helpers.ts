import {
  GeoPoint,
  Timestamp,
  FieldValue,
  DocumentReference,
} from "firebase-admin/firestore";
import { adminFirestore } from "../config";

export function buildServerFirestoreUpdatePath(
  obj: any,
  isUpdate = true,
  prefix = ""
): Record<string, any> {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const value = obj[key];
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      if (value !== undefined) {
        if (
          value !== null &&
          !Array.isArray(value) &&
          typeof value === "object" &&
          !(value instanceof GeoPoint) &&
          !(value instanceof Timestamp) &&
          !(value instanceof FieldValue) &&
          !(value instanceof DocumentReference)
        ) {
          if (isUpdate) {
            // Flatten the structure for updates
            Object.assign(
              acc,
              buildServerFirestoreUpdatePath(value, isUpdate, newPrefix)
            );
          } else {
            // Keep the structure nested for creation
            acc[key] = buildServerFirestoreUpdatePath(value, isUpdate, "");
          }
        } else {
          acc[newPrefix] = value;
        }
      }
      return acc;
    },
    {} as Record<string, any>
  );
}

export function getUserAdminRef(uid: string) {
  return adminFirestore.collection("users").doc(uid);
}

export function getAdminParentDocOfDocRef(
  docRef: DocumentReference
): DocumentReference {
  const parent = docRef.parent?.parent;
  if (parent) {
    return parent;
  } else {
    throw new Error("Invalid path");
  }
}
export function getAdminDocRef(path: string): DocumentReference {
  return adminFirestore.doc(path);
}
