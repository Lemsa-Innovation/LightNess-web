import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getMessaging, isSupported } from "@firebase/messaging";
import { getStorage } from "@firebase/storage";
import { getFunctions } from "firebase/functions";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

// Only initialize Firebase if we have the required configuration
const hasValidConfig = firebaseConfig.apiKey && firebaseConfig.projectId;

let app: any = null;
let storage: any = null;
let auth: any = null;
let firestoreDb: any = null;
let functions: any = null;

if (hasValidConfig) {
  try {
    app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
    storage = getStorage(app);
    auth = getAuth(app);
    firestoreDb = getFirestore(app);
    functions = getFunctions(app);
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
  }
} else {
  console.warn("Firebase configuration is incomplete. Please check your environment variables.");
}

const messaging = async () => {
  if (!hasValidConfig) return null;
  return (await isSupported()) && getMessaging(app);
};

export { app, storage, auth, firestoreDb, functions, messaging };
