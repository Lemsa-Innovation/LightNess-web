import { CollectionReference, DocumentReference, getDoc, getDocs } from "@firebase/firestore";
import { useQuery } from "@tanstack/react-query";

export const useCollectionQuery = <T>({ dataRef, queryKey }: {
    queryKey: string[]
    dataRef?: CollectionReference
}) => {
    return useQuery({
        queryKey,
        initialData : [],
        enabled: !!dataRef,
        queryFn: async () => {
            if (dataRef) {
                const snapshots = await getDocs(dataRef)
                if (!snapshots.empty)
                    return snapshots.docs.map((doc) => ({
                        ref: doc.ref,
                        ...doc.data()
                    }) as T)
            }
            return []
        }
    })
}
export const useDocumentQuery = <T>({ queryKey, docRef }: {
    docRef: DocumentReference
    queryKey: string[]
}) => {
    return useQuery({
        queryKey,
        enabled: !!docRef,
        queryFn: async () => {
            if (docRef) {
                const snapshot = await getDoc(docRef)
                if (snapshot.exists()) {
                    return ({
                        ref: snapshot.ref,
                        ...snapshot.data()
                    } as T)
                }
            }
            return null
        }
    })
}