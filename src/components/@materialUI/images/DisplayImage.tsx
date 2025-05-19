"use client";
import Image from "next/image";
import { Image as NextuiImage, Skeleton, cn } from "@heroui/react";
import { useImage } from "@/firebase/storage";
import clsx from "clsx";

export const DisplayImage: React.FC<{
  src: string | File;
  isZoomed?: boolean;
  className?: string;
}> = ({ src, isZoomed, className }) => {
  const image = useImage({
    src,
  });
  return (
    <NextuiImage
      alt="image"
      src={image}
      width={"100%"}
      height={"100%"}
      isZoomed={isZoomed}
      className={clsx(
        "object-contain rounded-lg duration-700 ease-in-out",
        className
      )}
    />
  );
};

export const DisplayNextImage: React.FC<{
  src?: string;
  displayNoImage?: boolean;
}> = ({ src, displayNoImage }) => {
  const image = useImage({
    src,
    displayNoImage,
  });

  const className = cn(
    "rounded-lg bg-foreground-100 object-cover duration-700 ease-in-out w-full h-full"
  );

  return (
    <div className="relative w-full h-full rounded-lg">
      {image ? (
        <Image
          fill
          sizes="100%"
          alt="image"
          src={image}
          className={className}
        />
      ) : (
        <Skeleton
          isLoaded={!!image}
          className={cn("w-full h-full rounded-lg")}
        />
      )}
    </div>
  );
};
