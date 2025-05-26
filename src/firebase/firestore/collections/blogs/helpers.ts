import { doc } from "@firebase/firestore";
import { getCollectionRef } from "@/firebase/firestore/modules";
import { collectionIds } from "@shared/modules";

export const getBlogRef = (blogId: string) => {
  return doc(getCollectionRef(collectionIds.blogs), blogId);
};
export const generateBlogPath = () => {
  const docRef = doc(getCollectionRef(collectionIds.blogs));
  return docRef.path;
};

export const getBlogsRef = () => {
  return getCollectionRef(collectionIds.blogs);
};
