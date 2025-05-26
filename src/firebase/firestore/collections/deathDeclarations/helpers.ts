import {getCollectionRef, getDocumentRef} from "../../modules/helpers";
import {collectionIds} from "@shared/modules";
export function getDeclarationRef(docId: string) {
  return getDocumentRef(
    collectionIds.deathDeclarations,
    docId
  )
}

export function getDeclarationsRef() {
  return getCollectionRef(
    collectionIds.deathDeclarations,
  )
}
