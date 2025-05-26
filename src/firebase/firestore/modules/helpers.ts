import { firestoreDb } from "../../app";
import {
  DocumentReference,
  collection,
  doc,
  Timestamp,
} from "@firebase/firestore";

export function generateDocumentRef(path: string, ...pathSegments: string[]) {
  return doc(collection(firestoreDb, path, ...pathSegments));
}
export function getDocumentRef(path: string, ...pathSegments: string[]) {
  return doc(firestoreDb, path, ...pathSegments);
}

export function getCollectionRef(path: string, ...pathSegments: string[]) {
  return collection(firestoreDb, path, ...pathSegments);
}
export const getRefId = (
  ref: DocumentReference | undefined | null,
  repertory: string
) => {
  if (!ref) {
    throw new Error(`Missing reference for ${repertory}`);
  }
  return ref.id;
};

export const getParentDocOfDoc = (
  ref: DocumentReference | undefined | null
) => {
  if (ref && ref.parent.parent) {
    return ref.parent.parent;
  }
  throw new Error(`Missing reference `);
};

export function checkArrayValues({
  updatedValue,
  defaultValue,
}: {
  updatedValue: string[];
  defaultValue?: string[];
}) {
  return {
    removedItems: defaultValue?.filter(
      (value) => !updatedValue.includes(value)
    ),
    addedItems: updatedValue.filter((value) => !defaultValue?.includes(value)),
  };
}

// export const timestampFilterQuery = (appliedFilter: TimestampFilter) => {
//   switch (appliedFilter) {
//     case "today":
//     case "last24hours":
//       return Timestamp.now().toMillis() - hoursToMilliseconds(24); // Temps actuel - 24 heures
//     case "lastWeek":
//       return Timestamp.now().toMillis() - hoursToMilliseconds(24) * 7;
//     case "lastMonth":
//       return Timestamp.now().toMillis() - hoursToMilliseconds(24) * 30;
//     case "last3months":
//       return Timestamp.now().toMillis() - hoursToMilliseconds(24) * 90;
//   }
// };
