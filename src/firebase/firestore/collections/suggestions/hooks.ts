import {getSuggestionsRef} from "./helpers";
import {query, where} from "@firebase/firestore";
import {Suggestion} from "./models";
import {useEffect, useState} from "react";
import {useCollection} from "react-firebase-hooks/firestore";

export function useSuggestions({suggestionType}: {
  suggestionType: Suggestion["type"]
}) {
  const dataRef = getSuggestionsRef()
  const queryRef = query(dataRef, where("type", "==", suggestionType))

  const [snapshots, isLoading, error] = useCollection(queryRef)
  const [data, setData] = useState<Suggestion[]>([])
  useEffect(() => {
    if (!isLoading && !error && snapshots && !snapshots?.empty) {
      setData(snapshots.docs.map((doc) => ({
        ref: doc.ref,
        ...doc.data()
      } as Suggestion)))
    }
  }, [snapshots, isLoading, error])

  return {
    data,
    isLoading,
    error
  }
}