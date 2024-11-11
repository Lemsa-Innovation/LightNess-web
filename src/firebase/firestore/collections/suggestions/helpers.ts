import {collectionIds} from "../../modules/assets";
import {getCollectionRef, getDocumentRef} from "../../modules/helpers";

export function getSuggestionRef(suggestionId: string) {
  return getDocumentRef(
    collectionIds.suggestions,
    suggestionId
  )
}

export function getSuggestionsRef() {
  return getCollectionRef(
    collectionIds.suggestions,
  )
}
