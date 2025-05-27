"use client";
import Image from "next/image";
import { Image as NextuiImage, Skeleton, cn, image } from "@heroui/react";
import clsx from "clsx";
import { unavailableImage } from "@/config";

export const DisplayImage: React.FC<{
  src?: string | File;
  isZoomed?: boolean;
  className?: string;
}> = ({ src, isZoomed, className }) => {
  return (
    <NextuiImage
      alt="image"
      src={src || unavailableImage}
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
  const className = cn(
    "rounded-lg bg-foreground-100 object-cover duration-700 ease-in-out w-full h-full"
  );

  return (
    <div className="relative w-full h-full rounded-lg">
      {src ? (
        <Image fill sizes="100%" alt="image" src={src} className={className} />
      ) : (
        <Skeleton isLoaded={!!src} className={cn("w-full h-full rounded-lg")} />
      )}
    </div>
  );
};
