import {getSuggestionRef, getSuggestionsRef} from "./helpers";
import {query, where} from "@firebase/firestore";
import {useEffect, useState} from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import { Suggestion } from "./types";
import { useDocSnapshot } from "../../modules";

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

export function useSuggestionQuery(docId: string) {
  const docRef = getSuggestionRef(docId)
  return useDocSnapshot<Suggestion>(docRef)
}