import {collectionIds} from "../../modules/assets";
import {getCollectionRef, getDocumentRef} from "../../modules/helpers";

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
