import {useQuery} from "@tanstack/react-query";
import {getSuggestionsRef} from "./helpers";
import {getDocs, query, where} from "@firebase/firestore";
import {Suggestion} from "./models";

export function useSuggestions({suggestionType}: {
  suggestionType: Suggestion["type"]
}) {
  return useQuery({
    initialData: [],
    queryKey: ["suggestions"],
    queryFn: async () => {
      const dataRef = getSuggestionsRef()
      const queryRef = query(dataRef, where("type", "==", suggestionType))
      const snapshots = await getDocs(queryRef)
      return snapshots.docs.map((doc) => ({
        ref: doc.ref,
        ...doc.data()
      } as Suggestion))
    }
  })
}