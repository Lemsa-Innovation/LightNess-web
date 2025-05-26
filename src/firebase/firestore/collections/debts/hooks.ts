import {useQuery} from "@tanstack/react-query";
import {getDocs} from "@firebase/firestore";
import {getCollectionRef} from "../../modules/helpers";
import { collectionIds } from "@shared/modules";
import { Debt } from "./types";

export function useDebts() {
  return useQuery({
    initialData: [],
    queryKey: ["debts"],
    queryFn: async () => {
      const dataRef = getCollectionRef(collectionIds.debts)
      const snapshots = await getDocs(dataRef)
      return snapshots.docs.map((doc) => ({
        ref: doc.ref,
        ...doc.data()
      } as Debt))
    }
  })
}