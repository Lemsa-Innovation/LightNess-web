import { User } from "./types";
import { getCollectionRef, getDocumentRef } from "../../modules/helpers";
import { collectionIds } from "@shared/modules";
const { users } = collectionIds;

export function getUserRef(uid: string) {
  return getDocumentRef(users, uid);
}
export function getUsersRef() {
  return getCollectionRef(users);
}

export function getUserFullName(
  user: Pick<User, "firstName" | "lastName"> | undefined
) {
  if (!user) return "";
  return `${user.firstName || ""} ${user.lastName || ""}`;
}
