import { auth } from "../app";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { fetchLoginApi, fetchLogoutApi } from "./helpers";

export const logout = async () => {
  if (!auth) {
    throw new Error("Firebase Auth is not initialized");
  }
  await signOut(auth);
  await fetchLogoutApi();
};

export const signIn = async (email: string, password: string) => {
  if (!auth) {
    throw new Error("Firebase Auth is not initialized");
  }
  return signInWithEmailAndPassword(auth, email, password);
};
