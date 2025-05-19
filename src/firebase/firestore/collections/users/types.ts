import { User as BaseUser, Positions } from "@shared/index";
import { DefaultFirestoreTypes } from "../../modules/types";
import { DocumentReference } from "@firebase/firestore";

export type Admin = {
  role: "admin";
  position: keyof Pick<Positions, "super" | "manager" | "secretary">;
};
export type User = {
  ref: DocumentReference;
} & BaseUser<DefaultFirestoreTypes> & Admin;
