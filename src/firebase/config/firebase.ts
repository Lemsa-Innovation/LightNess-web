import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getMessaging, isSupported } from "@firebase/messaging";
import { getStorage } from "@firebase/storage";
import { getFunctions } from 'firebase/functions';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};



const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const messaging = async () => await isSupported() && getMessaging(app);
const firestoreDb = getFirestore(app);
const functions = getFunctions(app);
export { app, storage, auth, firestoreDb, functions, messaging };