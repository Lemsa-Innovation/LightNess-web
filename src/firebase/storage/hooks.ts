"use client";
import { useEffect, useState } from "react";
import { loadImage } from "./functions";
import { storage } from "../app";

export function useImage({
  src,
  displayNoImage,
}: {
  src: File | string | undefined | null;
  displayNoImage?: boolean;
}) {
  const [image, setImage] = useState<string>();
  useEffect(() => {
    const getImage = async () => {
      if (src) {
        if (typeof src === "string") {
          try {
            const url = await loadImage(storage, src);
            setImage(url);
          } catch (error) {
            // console.log("Error fetching image , l'image n'existe pas");
          }
        } else {
          setImage(URL.createObjectURL(src));
        }
      } else {
        if (displayNoImage) setImage("/assets/images/no-image-icon.jpg");
        else setImage(undefined);
      }
    };
    getImage();
  }, [src]);
  return image;
}
