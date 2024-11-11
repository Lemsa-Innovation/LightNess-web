'use server'
import {NotificationItem} from "@/language/structure/notifications";
import {collectionsIDS} from "../firestore/modules/assets";
import {adminFirestore, adminMessaging} from "../admin/firebaseAdmin";
import {User} from "../firestore/collections/users/models";
import {NotificationData} from "./models";

const {users} = collectionsIDS

export async function notifyUsers({userUIDs, notificationData, notificationPayload}: {
    userUIDs: string[]
    notificationData: NotificationData
    notificationPayload?: NotificationItem
}) {
    await Promise.all(userUIDs.map((uid) => notifyUser({
        uid,
        notificationData,
        notificationPayload
    })))
}

export async function notifyUser({uid, notificationData, notificationPayload}: {
    uid: string
    notificationData: NotificationData
    notificationPayload?: NotificationItem
}) {
    const userSnapshot = await adminFirestore.collection(users).doc(uid).get();
    const {fcmToken} = (userSnapshot?.data() as User<"client">)
    if (fcmToken) {
        await Promise.all(Object.entries(fcmToken).map(([, token]) => adminMessaging.send({
            token,
            data: notificationData,
            notification: notificationPayload
        })))
    }
    //Add notification to user's notifications collection
    // await adminFirestore.collection(userSnapshot.ref.path.concat('/', notifications)).doc().set({
    //     ...notificationData,
    //     createdAt: adminDb.firestore.FieldValue.serverTimestamp(),
    //     isRead: false
    // })
}

export async function subscribeToTopic(token: string, topic: string) {
    return adminMessaging.subscribeToTopic(token, topic)
}