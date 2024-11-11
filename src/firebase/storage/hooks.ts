import {useEffect, useState} from "react";
import {getDownloadURL, ref} from "@firebase/storage";
import {storage} from "../config/firebase";

export async function loadImage(image_path: string) {
    const imageRef = ref(storage, image_path);
    const file = getDownloadURL(imageRef);
    return file
}

export function useImage({src, displayNoImage}: {
    src: File | string | undefined
    displayNoImage?: boolean
}) {
    const [image, setImage] = useState<string>();
    useEffect(() => {
        const getImage = async () => {
            if (src) {
                if (typeof src === 'string') {
                    try {
                        const url = await loadImage(src)
                        setImage(url);
                    } catch (error) {
                        console.log("Error fetching image , l'image n'existe pas");
                    }
                }
                else {
                    setImage(URL.createObjectURL(src))
                }
            }
            else {
                if (displayNoImage)
                    setImage("/assets/images/no-image-icon.jpg")
                else
                    setImage(undefined)
            }
        }
        getImage()
    }, [src])
    return image;
}