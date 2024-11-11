import {DocumentReference, FieldValue, GeoPoint, Timestamp} from "firebase-admin/firestore";
import {adminDb} from "./firebaseAdmin";

export function buildServerFirestoreUpdatePath(obj: any, prefix = "", isUpdate = true): Record<string, any> {
  return Object.keys(obj).reduce((acc, key) => {
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
          Object.assign(acc, buildServerFirestoreUpdatePath(value, newPrefix));
        } else {
          // Keep the structure nested for creation
          acc[key] = buildServerFirestoreUpdatePath(value, "", isUpdate);
        }
      } else {
        acc[newPrefix] = value;
      }
    }
    return acc;
  }, {} as Record<string, any>);
}