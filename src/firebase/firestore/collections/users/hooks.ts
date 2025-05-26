"use client";
import {
  collectionGroup,
  DocumentReference,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "@firebase/firestore";
import { User } from "./types";
import {
  useCollectionSnapshots,
  useDocSnapshot,
} from "../../modules/firestoreHooks";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getUserRef, getUsersRef } from "./helpers";

export function useUser({ uid }: { uid?: string }) {
  const userRef = useMemo(() => (uid ? getUserRef(uid) : undefined), [uid]);
  return useDocSnapshot<User>(userRef);
}

export function useUserQuery({ uid }: { uid?: string }) {
  return useQuery({
    queryKey: ["user", uid],
    queryFn: async () => {
      if (uid) {
        const userRef = getUserRef(uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          return {
            uid: userRef.id,
            ...userDoc.data(),
          } as User;
        }
      }
    },
  });
}

export function useUsersQuery() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const usersRef = getUsersRef();
      const queryRef = query(
        usersRef,
        orderBy("createdAt", "desc"),
        limit(100)
      );
      const usersSnapshots = await getDocs(queryRef);
      return usersSnapshots.docs.map(
        (doc) =>
          ({
            uid: doc.id,
            ...doc.data(),
          }) as User
      );
    },
  });
}
