"use server"

import { adminFirestore } from "@/firebase/admin/config"
import { buildServerFirestoreUpdatePath } from "@/firebase/admin/firestore"
import { Suggestion } from "@shared/collections"
import {FieldValue, PartialWithFieldValue} from "firebase-admin/firestore"
import { suggestionFormSchema, SuggestionUpdateForm } from "./validations"

export async function deleteSuggestion(path: string) {
  const dataRef = adminFirestore.doc(path)
  await dataRef.delete()
}

export async function deleteComment({commentId, suggestionPath}: {
  suggestionPath: string
  commentId: string
}) {
  const dataRef = adminFirestore.doc(suggestionPath)
  const updatedComment : PartialWithFieldValue<Suggestion> = {
    comments : {
      [commentId]: FieldValue.delete()
    }
  }
  await dataRef.update(buildServerFirestoreUpdatePath(updatedComment))
}

export async function updateSuggestion({data, path}: {
  path: string
  data: SuggestionUpdateForm
}) {
  const parsedData = suggestionFormSchema.parse(data)
  const dataRef = adminFirestore.doc(path)
  await dataRef.update(buildServerFirestoreUpdatePath(parsedData))
} 