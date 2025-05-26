"use server"

import { adminFirestore } from "@/firebase/admin/config"
import { collectionIds } from "@shared/modules"
import {FieldValue} from "firebase-admin/firestore"
import { getUserFullName, User } from "../users"
import { buildServerFirestoreUpdatePath } from "@/firebase/admin/firestore"
import { DeathDeclaration } from "./types"
import { Testament } from "../testaments"
const {users, testaments} = collectionIds

export async function markUserAsDeath({matchedUid, declaredDeathsPath}: {
  matchedUid: string
  declaredDeathsPath: string[]
}) {
  const userRef = adminFirestore.collection(users).doc(matchedUid)
  const userSnapshot = await userRef.get()
  if (userSnapshot.exists) {
    const user = userSnapshot.data() as User
    const fullName = getUserFullName(user)
    if (user.isDead) {
      throw new Error("user already dead")
    }
    adminFirestore.runTransaction(async (transaction) => {
      transaction.update(userRef, buildServerFirestoreUpdatePath({
        isDead: true
      } as Partial<User>))
      await Promise.all(declaredDeathsPath.map(async (docPath) => {
        return transaction.update(adminFirestore.doc(docPath), buildServerFirestoreUpdatePath({
          status: "approved"
        } as Partial<DeathDeclaration>))
      }))
      Object.entries(user.testaments || {}).forEach(async ([testamentId, {role, validation}]) => {
        if (role === "owner") {
          const testamentRef = adminFirestore.collection(testaments).doc(testamentId)
          const testamentSnapshot = await testamentRef.get()
          const testament = testamentSnapshot.data() as Testament
          const recipientIds = Object.entries(testament.recipients).filter(([recipientId, {validation}]) => validation.status === "validated").map(([recipientId]) => recipientId)

          transaction.update(testamentRef, buildServerFirestoreUpdatePath({
            validation: {
              status: "validated",
              updatedAt: FieldValue.serverTimestamp()
            }
          } as Partial<Testament>))
          // const usersToNotify = new Set(recipientIds.concat(testament.ownerUid))
          // usersToNotify.delete(uid)

          // await Promise.all(recipientIds.map(async (uid) =>
          //   notifyUser({
          //     uid,
          //     notificationData: {
          //       fullName,
          //       testamentId,
          //       type: "testamentAvailable"
          //     },
          //     notificationPayload: {
          //       title: "Accès à un testament",
          //       body: `Vous êtes bénéficiaire d'un testament associé à ${fullName}. Veuillez consulter les détails dans votre espace personnel`
          //     }
          //   })
          // ));
        }
      })
    })
  }
}
export async function rejectDeadDeclarations({matchedUid, declaredDeathsPath}: {
  matchedUid: string
  declaredDeathsPath: string[]
}) {
  const userRef = adminFirestore.collection(users).doc(matchedUid)
  const userSnapshot = await userRef.get()
  if (userSnapshot.exists) {
    const user = userSnapshot.data() as User
    const fullName = getUserFullName(user)
    adminFirestore.runTransaction(async (transaction) => {
      await Promise.all(declaredDeathsPath.map(async (docPath) => {
        return transaction.update(adminFirestore.doc(docPath), buildServerFirestoreUpdatePath({
          status: "rejected"
        } as Partial<DeathDeclaration>))
      }))
    })
  }
}