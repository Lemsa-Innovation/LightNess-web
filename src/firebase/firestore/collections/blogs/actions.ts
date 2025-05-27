"use server";

import { adminFirestore, adminStorage } from "@/firebase/admin/config";
import { Blog } from "./types";
import {
  BlogValidation,
  blogValidations,
  updateBlogValidations,
} from "./validations";
import { FieldValue, WithFieldValue } from "firebase-admin/firestore";
import { buildServerFirestoreUpdatePath } from "@/firebase/admin/firestore";
import { PartialWithFieldValue } from "@firebase/firestore";
import { collectionIds } from "@/shared";

export const createBlog = async (data: BlogValidation) => {
  const { content, isFeatured, path, readTime, title, coverImage, tags } =
    blogValidations("server").parse(data);
  const blog: Omit<WithFieldValue<Blog>, "ref"> = {
    content,
    tags,
    isFeatured,
    title,
    readTime,
    published: true,
    createdAt: FieldValue.serverTimestamp(),
    ...(typeof coverImage === "string" && { coverImageUrl: coverImage }),
  };
  const blogRef = adminFirestore.doc(path);
  await blogRef.create(buildServerFirestoreUpdatePath(blog, false));
};

export const updateBlog = async (data: BlogValidation) => {
  const { coverImage, path, ...parsedData } =
    updateBlogValidations("server").parse(data);
  const blog: Omit<PartialWithFieldValue<Blog>, "ref"> = {
    ...parsedData,
    ...(typeof coverImage === "string" && { coverImageUrl: coverImage }),
  };
  const blogRef = adminFirestore.doc(path);
  await blogRef.update(buildServerFirestoreUpdatePath(blog));
};

export const deleteBlog = async (id: string) => {
  adminStorage.bucket("lightness-f70cb.appspot.com").deleteFiles({
    prefix: `blogs/${id}`,
  });
  await adminFirestore.collection(collectionIds.blogs).doc(id).delete();
};
