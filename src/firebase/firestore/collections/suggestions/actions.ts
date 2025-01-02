"use server"

import {adminFirestore} from "@/firebase/admin/firebaseAdmin"
import {suggestionFormSchema, SuggestionUpdateForm} from "./validations"
import {buildServerFirestoreUpdatePath} from "@/firebase/admin/helpers"
import {Suggestion} from "./models"
import {FieldValue} from "firebase-admin/firestore"

export async function deleteSuggestion(path: string) {
  const dataRef = adminFirestore.doc(path)
  await dataRef.delete()
}

export async function deleteComment({commentId, suggestionPath}: {
  suggestionPath: string
  commentId: string
}) {
  const dataRef = adminFirestore.doc(suggestionPath)
  await dataRef.update(buildServerFirestoreUpdatePath({
    comments: {
      [commentId]: FieldValue.delete()
    }
  }
    // as Partial<Suggestion>
  ))
}

export async function updateSuggestion({data, path}: {
  path: string
  data: SuggestionUpdateForm
}) {
  const parsedData = suggestionFormSchema.parse(data)
  const dataRef = adminFirestore.doc(path)
  await dataRef.update(buildServerFirestoreUpdatePath(parsedData))
} 