import {DocumentReference, Timestamp} from "@firebase/firestore"

export type NotificationData = {}

export type NotificationModel = {
  ref: DocumentReference
  isRead: boolean
  createdAt: Timestamp
}