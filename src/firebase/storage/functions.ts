import {ref, uploadBytesResumable} from "@firebase/storage";
import {v4 as uuidv4} from 'uuid';
import {storage} from "../config/firebase";

export async function uploadImageBucket({image, imagePath}: {
    image: File
    imagePath: string
}) {
    const storageRef = ref(storage, imagePath);
    const uploadTask = uploadBytesResumable(storageRef, image);
    await uploadTask;

    return imagePath
}

export function uploadImages({path, images}: {
    images: File[]
    path: string
}) {
    return Promise.all(
        images.map(async (image) => {
            const uuid = uuidGenerate();
            const imageUrl = path.concat(`/${uuid}`)
            await uploadImageBucket({
                image, imagePath: imageUrl
            })
        })
    )
}

export function uuidGenerate() {
    return uuidv4();
}