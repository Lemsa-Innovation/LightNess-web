import {
  FirebaseStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../app";
export async function loadImage(image_path: string) {
  const imageRef = ref(storage, image_path);
  const file = getDownloadURL(imageRef);
  return file;
}
export async function uploadImageBucket({
  image,
  imagePath,
}: {
  image: File;
  imagePath: string;
}) {
  const storageRef = ref(storage, imagePath);
  const uploadTask = uploadBytesResumable(storageRef, image);
  const result = await uploadTask;
  return result.ref.fullPath;
  // return await loadImage(result.ref.fullPath);
}

export function uploadImages({
  path,
  images,
}: {
  images: File[];
  path: string;
}) {
  return Promise.all(
    images.map(async (image) => {
      const uuid = uuidGenerate();
      const imageUrl = path.concat(`/${uuid}`);
      await uploadImageBucket({
        image,
        imagePath: imageUrl,
      });
    })
  );
}

export function uuidGenerate() {
  return uuidv4();
}
