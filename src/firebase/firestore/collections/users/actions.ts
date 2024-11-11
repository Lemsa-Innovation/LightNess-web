"use server"

import {adminDb, adminFirestore} from "@/firebase/admin/firebaseAdmin"
import {collectionIds} from "../../modules/assets"
import {auth} from "firebase-admin"
import {buildServerFirestoreUpdatePath} from "@/firebase/admin/helpers"
import {User} from "./models"
import {notifyUser} from "@/firebase/messaging/actions"

export async function deleteUser(uid: string) {
  try {
    await auth().deleteUser(uid)
  } catch (error: any) {
    if (error.code !== "auth/user-not-found")
      throw Error(error.code)
  }
  const userRef = adminFirestore.collection(collectionIds.users).doc(uid)
  await userRef.delete()
}


export async function verifyEmail({
  uid
}: {
  uid: string
}) {
  await auth().updateUser(uid, {
    emailVerified: true
  })
  const userRef = adminFirestore.collection(collectionIds.users).doc(uid)
  await userRef.update(buildServerFirestoreUpdatePath({
    verificationSteps: {
      email: {
        verified: true,
        timestamp: adminDb.firestore.FieldValue.serverTimestamp()
      }
    }
  } as Partial<User<"server">>))
  await notifyUser({
    uid,
    notificationData: {},
    notificationPayload: {
      title: "Vérification d'email réussie",
      body: "Votre adresse email a été vérifiée avec succès. Vous pouvez désormais accéder à toutes les fonctionnalités."
    }
  })
}
// export async function updateUser(data: UpdateUserSchema) {
//   const {uid, phoneNumber, birthday, ...parsedData} = updateUserSchema.parse(data)
//   const parsedPhone = phoneNumber ? formatPhoneNumberToInter(phoneNumber) : undefined
//   const user: Partial<User<"server">> = {
//     ...parsedData,
//     ...(parsedPhone ? {phoneNumber: parsedPhone} : {}),
//     birthday: birthday ? Timestamp.fromDate(birthday) : undefined,
//   }

//   const userRef = adminFirestore.collection(collectionIds.users).doc(uid)
//   userRef.update(buildServerFirestoreUpdatePath(user))
// }
