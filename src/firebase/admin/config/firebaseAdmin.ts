import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

if (!admin.apps.length) {
  const credential = admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  });
  admin.initializeApp({
    credential,
  });
}
const adminAuth = admin?.auth();
const adminStorage = admin?.storage();
const adminMessaging = admin?.messaging();
const adminFirestore = getFirestore();
export {
  admin as adminDb,
  adminFirestore,
  adminAuth,
  adminStorage,
  adminMessaging,
};
