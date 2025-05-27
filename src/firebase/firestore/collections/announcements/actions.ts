"use server";
import { collectionIds } from "@shared/modules";
import { announcementValidation, AnnouncementValidation } from "./validations";
import { adminFirestore, adminStorage } from "@/firebase/admin/config";
import { Announcement } from "./types";
import {
  FieldValue,
  PartialWithFieldValue,
  WithFieldValue,
} from "firebase-admin/firestore";
import { buildServerFirestoreUpdatePath } from "@/firebase/admin/firestore";

export const setAnnouncement = async (
  data: AnnouncementValidation,
  actionType: "update" | "add"
) => {
  const { image, fullImage, type, path } = announcementValidation(
    "server",
    actionType
  ).parse(data);
  const announcement: PartialWithFieldValue<Announcement> = {
    image: image as string,
    fullImage: fullImage as string,
    ...(type === "update"
      ? {
          updatedAt: FieldValue.serverTimestamp(),
        }
      : {
          createdAt: FieldValue.serverTimestamp(),
        }),
  };
  console.log(announcement);
  await adminFirestore
    .doc(path)
    .set(buildServerFirestoreUpdatePath(announcement, actionType === "update"));
};

export const deleteAnnouncement = async (id: string) => {
  adminStorage.bucket("lightness-f70cb.appspot.com").deleteFiles({
    prefix: `announcements/${id}`,
  });
  await adminFirestore.collection(collectionIds.announcements).doc(id).delete();
};
