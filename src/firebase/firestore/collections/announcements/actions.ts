"use server";
import { collectionIds } from "@shared/modules";
import {
  addAnnouncementValidation,
  AnnouncementValidation,
} from "./validations";
import { adminFirestore } from "@/firebase/admin/config";
import { Announcement } from "./types";
import { FieldValue, WithFieldValue } from "firebase-admin/firestore";

export const addAnnouncement = async (data: AnnouncementValidation) => {
  const { image, fullImage } = addAnnouncementValidation.parse(data);
  const announcement: Omit<WithFieldValue<Announcement>, "ref"> = {
    image: image as string,
    fullImage: fullImage as string,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };
  await adminFirestore
    .collection(collectionIds.announcements)
    .add(announcement);
};

export const deleteAnnouncement = async (id: string) => {
  await adminFirestore.collection(collectionIds.announcements).doc(id).delete();
};
