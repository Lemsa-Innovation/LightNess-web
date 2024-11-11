"use server"

import {adminFirestore} from "@/firebase/admin/firebaseAdmin"

export async function deleteSuggestion(path: string) {
  const dataRef = adminFirestore.doc(path)
  await dataRef.delete()
} 