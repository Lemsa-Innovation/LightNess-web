import * as admin from 'firebase-admin';
if (!admin.apps.length) {
    const serviceAccount = require('@/firebase/config/serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
const adminAuth = admin.auth()
const adminStorage = admin.storage()
const adminMessaging = admin.messaging()
const adminFirestore = admin.firestore()
export {admin as adminDb, adminFirestore, adminAuth, adminStorage, adminMessaging};