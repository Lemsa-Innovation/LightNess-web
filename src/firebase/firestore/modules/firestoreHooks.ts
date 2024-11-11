import { CollectionReference } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

export const useCollectionSnapshots = <T>(dataRef: CollectionReference) => {
    const [data , setData] = useState<T[]>([])
    const [snapshots , isLoading , error] = useCollection(dataRef)
    useEffect(()=>{
        if(snapshots && !isLoading && !error){
            setData(snapshots.docs.map((doc)=>({
                ref : doc.ref,
                ...doc.data()
            } as T)))
        }
    },[snapshots , isLoading , error])
    return {
        data, isLoading , error
    }
}