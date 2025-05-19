"use server";
import { collectionIds } from "@shared/modules";
import {
  addAnnouncementValidation,
  AnnouncementValidation,
} from "./validations";
import { adminFirestore, adminStorage } from "@/firebase/admin/config";
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
  adminStorage.bucket("lightness-f70cb.appspot.com").deleteFiles({
    prefix: `announcements/${id}`,
  });
  await adminFirestore.collection(collectionIds.announcements).doc(id).delete();
};
