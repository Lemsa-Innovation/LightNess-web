import { auth } from "../app";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { fetchLoginApi, fetchLogoutApi } from "./helpers";

export const logout = async () => {
  await signOut(auth);
  await fetchLogoutApi();
};

export const signIn = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
