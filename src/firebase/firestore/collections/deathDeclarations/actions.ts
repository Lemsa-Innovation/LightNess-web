"use server"
import {adminFirestore} from "@/firebase/admin/firebaseAdmin"
import {collectionIds} from "../../modules/assets"
import {buildServerFirestoreUpdatePath} from "@/firebase/admin/helpers"
import {User} from "../users/models"
import {Testament} from "../testaments/models"
import {FieldValue} from "firebase-admin/firestore"
import {notifyUser} from "@/firebase/messaging/actions"
import {getFullName} from "../users/helpers"
import {DeathDeclaration} from "./model"
const {users, testaments} = collectionIds

export async function markUserAsDeath({matchedUid, declaredDeathsPath}: {
  matchedUid: string
  declaredDeathsPath: string[]
}) {
  const userRef = adminFirestore.collection(users).doc(matchedUid)
  const userSnapshot = await userRef.get()
  if (userSnapshot.exists) {
    const user = userSnapshot.data() as User<"client">
    const fullName = getFullName(user)
    if (user.isDead) {
      throw new Error("user already dead")
    }
    adminFirestore.runTransaction(async (transaction) => {
      declaredDeathsPath
      transaction.update(userRef, buildServerFirestoreUpdatePath({
        isDead: true
      } as Partial<User<"client">>))
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

          await Promise.all(recipientIds.map(async (uid) =>
            notifyUser({
              uid,
              notificationData: {
                fullName,
                testamentId,
                type: "testamentAvailable"
              },
              notificationPayload: {
                title: "Accès à un testament",
                body: `Vous êtes bénéficiaire d'un testament associé à ${fullName}. Veuillez consulter les détails dans votre espace personnel`
              }
            })
          ));
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
    const user = userSnapshot.data() as User<"client">
    const fullName = getFullName(user)
    adminFirestore.runTransaction(async (transaction) => {
      await Promise.all(declaredDeathsPath.map(async (docPath) => {
        return transaction.update(adminFirestore.doc(docPath), buildServerFirestoreUpdatePath({
          status: "rejected"
        } as Partial<DeathDeclaration>))
      }))
    })
  }
}