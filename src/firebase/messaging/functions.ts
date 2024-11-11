import {getToken, onMessage} from "@firebase/messaging";
import {messaging} from "../config/firebase";

export async function requestNotificationsPermissions(uid: string, old_fcmToken: string | undefined) {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
        // Notification permission granted.
        await saveMessagingDeviceToken({
            uid, old_fcmToken
        });
    } else {
        console.log('Unable to get permission to notify.');
    }
}

// Saves the messaging device token to Cloud Firestore.
export async function saveMessagingDeviceToken({uid, old_fcmToken}: {
    uid: string
    old_fcmToken: string | undefined
}) {
    console.log('save msg device token');
    try {
        const msg = await messaging();
        if (msg) {
            const fcmToken = await getToken(msg, {vapidKey: process.env.NEXT_PUBLIC_FIREBASE_KEY_PAIR});
            if (fcmToken) {
                console.log('Got FCM device token:', fcmToken);
                // This will fire when a message is received while the app is in the foreground.
                onMessage(msg, (payload) => {
                    console.log('Received foreground message => ', payload);
                    // toastSonnerNotification(payload.data)
                });
                if (fcmToken !== old_fcmToken) {
                    return fcmToken
                }
            } else {
                // Need to request permissions to show notifications.
                requestNotificationsPermissions(uid, old_fcmToken);
            }
        }
    } catch (error) {
        console.error('Unable to get messaging token.', error);
    };
}