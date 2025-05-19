"use server";

import { adminFirestore } from "@/firebase/admin/config";
import { Blog } from "./types";
import { BlogValidation, blogValidations, updateBlogValidations } from "./validations";
import { FieldValue, WithFieldValue } from "firebase-admin/firestore";
import { buildServerFirestoreUpdatePath } from "@/firebase/admin/firestore";
import { PartialWithFieldValue } from "@firebase/firestore";

export const createBlog = async (data: BlogValidation) => {
  const { content, isFeatured, path, readTime, title, coverImage, tags } =
    blogValidations.parse(data);
  const blog: Omit<WithFieldValue<Blog>,"ref"> = {
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
  const { coverImage,path , ...parsedData } =
    updateBlogValidations.parse(data);
  const blog: Omit<PartialWithFieldValue<Blog>,"ref"> = {
    ...parsedData,
    ...(typeof coverImage === "string" && { coverImageUrl: coverImage }),
  };
  const blogRef = adminFirestore.doc(path);
  await blogRef.update(buildServerFirestoreUpdatePath(blog));
};
