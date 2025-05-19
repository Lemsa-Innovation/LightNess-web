import { useQuery } from "@tanstack/react-query";
import {
  CollectionReference,
  DocumentReference,
  getDoc,
  getDocs,
  Query,
} from "@firebase/firestore";

export const useCollectionQuery = <T>({
  dataRef,
  queryKey,
}: {
  queryKey: string[];
  dataRef?: Query;
}) => {
  return useQuery({
    queryKey,
    initialData: [],
    enabled: !!dataRef,
    queryFn: async () => {
      if (dataRef) {
        const snapshots = await getDocs(dataRef);
        if (!snapshots.empty)
          return snapshots.docs.map(
            (doc) =>
              ({
                ref: doc.ref,
                ...doc.data(),
              }) as T
          );
      }
      return [];
    },
  });
};

export const useDocumentQuery = <T>({
  queryKey,
  docRef,
  staleTime,
}: {
  docRef: DocumentReference | null;
  queryKey: string[];
  staleTime?: number;
}) => {
  return useQuery({
    queryKey,
    enabled: !!docRef,
    staleTime,
    queryFn: async () => {
      if (docRef) {
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          return {
            ref: snapshot.ref,
            ...snapshot.data(),
          } as T;
        } else {
          throw new Error("not-found");
        }
      }
      return null;
    },
  });
};

export const useDocumentsQuery = <T>({
  queryKey,
  docRefs,
}: {
  queryKey: string[];
  docRefs: DocumentReference[];
}) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const snapshots = await Promise.all(
        docRefs.map((docRef) => getDoc(docRef))
      );
      return snapshots.map(
        (snapshot) =>
          ({
            ref: snapshot.ref,
            ...snapshot.data(),
          }) as T
      );
    },
  });
};
