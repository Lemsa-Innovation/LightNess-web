"use server";

import { buildServerFirestoreUpdatePath } from "@/firebase/admin/firestore/helpers";

import { adminAuth, adminFirestore } from "@/firebase/admin/config";
import { getUserAdminRef } from "@/firebase/admin/firestore";
import { collectionIds } from "@shared/modules";
import { auth } from "firebase-admin";
import {
  FieldValue,
  Timestamp,
  PartialWithFieldValue,
} from "firebase-admin/firestore";
import { User } from "./types";
import { updateUserSchema, UpdateUserSchema } from "./validations";
import { authFormSchema, AuthSchema } from "@/firebase/auth";
import { setCustomUserClaims } from "@/firebase/auth/actions";

export async function deleteUser(uid: string) {
  await auth().deleteUser(uid);
  const userRef = getUserAdminRef(uid);
  await userRef.delete();
}

export async function verifyEmail({ uid }: { uid: string }) {
  await auth().updateUser(uid, {
    emailVerified: true,
  });
  const userRef = adminFirestore.collection(collectionIds.users).doc(uid);
  const updatedUser: PartialWithFieldValue<User> = {
    verificationSteps: {
      email: {
        verified: true,
        timestamp: FieldValue.serverTimestamp(),
      },
    },
  };
  await userRef.update(buildServerFirestoreUpdatePath(updatedUser));
  // await notifyUser({
  //   uid,
  //   notificationData: {},
  //   notificationPayload: {
  //     title: "Vérification d'email réussie",
  //     body: "Votre adresse email a été vérifiée avec succès. Vous pouvez désormais accéder à toutes les fonctionnalités.",
  //   },
  // });
}

export async function updateUser(data: UpdateUserSchema) {
  const { uid, birthday, ...parsedData } = updateUserSchema.parse(data);
  const user: Partial<User> = {
    ...parsedData,
    birthday: birthday ? birthday.toISOString() : undefined,
  };
  const userRef = adminFirestore.collection(collectionIds.users).doc(uid);
  userRef.update(buildServerFirestoreUpdatePath(user));
}

export async function createAdmin(data: AuthSchema) {
  const { email, password } = authFormSchema.parse(data);
  const userCredentials = await adminAuth.createUser({
    email,
    password,
  });
  await setCustomUserClaims({
    uid: userCredentials.uid,
    customClaims: {
      position : "manager",
      role : "admin",
    },
  });
  const user: PartialWithFieldValue<User> = {
    accountStatus: "active",
    email,
    role: "admin",
    position: "manager",
    createdAt: FieldValue.serverTimestamp(),
  };
  const userRef = getUserAdminRef(userCredentials.uid);
  userRef.create(buildServerFirestoreUpdatePath(user));
}
