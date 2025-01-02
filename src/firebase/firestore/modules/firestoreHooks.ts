import {CollectionReference, DocumentReference} from "@firebase/firestore";
import {useEffect, useState} from "react";
import {useCollection, useDocument} from "react-firebase-hooks/firestore";

export const useCollectionSnapshots = <T>(dataRef: CollectionReference) => {
    const [data, setData] = useState<T[]>([])
    const [snapshots, isLoading, error] = useCollection(dataRef)
    useEffect(() => {
        if (snapshots && !isLoading && !error) {
            setData(snapshots.docs.map((doc) => ({
                ref: doc.ref,
                ...doc.data()
            } as T)))
        }
    }, [snapshots, isLoading, error])
    return {
        data, isLoading, error
    }
}

export const useDocumentSnapshot = <T>(dataRef: DocumentReference) => {
    const [data, setData] = useState<T>()
    const [snapshot, isLoading, error] = useDocument(dataRef)
    useEffect(() => {
        if (snapshot && !isLoading && !error) {
            setData({
                ref: snapshot.ref,
                ...snapshot.data()
            } as T)
        }
    }, [snapshot, isLoading, error])
    return {
        data, isLoading, error
    }
}