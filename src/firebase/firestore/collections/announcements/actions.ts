"use server";
import { collectionIds } from "@shared/modules";
import {
  addAnnouncementServerValidation,
  addAnnouncementValidation,
  AnnouncementValidation,
} from "./validations";
import { adminFirestore, adminStorage } from "@/firebase/admin/config";
import { Announcement } from "./types";
import { FieldValue, WithFieldValue } from "firebase-admin/firestore";

export const addAnnouncement = async (data: AnnouncementValidation) => {
  console.log("Adding announcement", data);

  const { image, fullImage, path } =
    addAnnouncementServerValidation.parse(data);
  const announcement: Omit<WithFieldValue<Announcement>, "ref"> = {
    image: image as string,
    fullImage: fullImage as string,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };
  console.log(announcement);

  try {
    await adminFirestore.doc(path).create(announcement);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteAnnouncement = async (id: string) => {
  adminStorage.bucket("lightness-f70cb.appspot.com").deleteFiles({
    prefix: `announcements/${id}`,
  });
  await adminFirestore.collection(collectionIds.announcements).doc(id).delete();
};
