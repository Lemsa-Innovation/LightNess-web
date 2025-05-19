import { DocumentReference } from "firebase-admin/firestore";
import { getAdminDocRef } from "./helpers";

export async function getAdminDoc<T>(path: string): Promise<{
  ref: DocumentReference;
  data: T;
}> {
  const docRef = getAdminDocRef(path);
  const doc = await docRef.get();
  return {
    ref: docRef,
    data: doc.data() as T,
  };
}
