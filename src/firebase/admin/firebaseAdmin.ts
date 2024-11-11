import * as admin from 'firebase-admin';
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID!,
            clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
            privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY!.replace(/\\n/g, "\n"),
        })
    });
}
const adminAuth = admin.auth()
const adminStorage = admin.storage()
const adminMessaging = admin.messaging()
const adminFirestore = admin.firestore()
export {admin as adminDb, adminFirestore, adminAuth, adminStorage, adminMessaging};