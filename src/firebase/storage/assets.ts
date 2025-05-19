type ItemImageProps = {
  folderPath: string;
  isLocked?: boolean;
} & (
  | {
      asThumbnails: true;
      size: "200" | "400";
    }
  | {
      asThumbnails?: false;
    }
);

export const storageAssets = {
  images: "images",
  updatedImage: "updatedImage",
  verifiedImage: "verifiedImage",
};

export function getImagePath(props: ItemImageProps) {
  const { folderPath, asThumbnails, isLocked } = props;

  if (isLocked) {
    if (asThumbnails) {
      switch (props.size) {
        case "200": {
          return folderPath.concat(
            "/thumbnails/",
            storageAssets.updatedImage.concat("_200x200")
          );
        }
        case "400": {
          return folderPath.concat(
            "/thumbnails/",
            storageAssets.updatedImage.concat("_400x400")
          );
        }
      }
    }
    return folderPath.concat("/", storageAssets.updatedImage);
  } else {
    if (asThumbnails) {
      switch (props.size) {
        case "200": {
          return folderPath.concat(
            "/thumbnails/",
            storageAssets.verifiedImage.concat("_200x200")
          );
        }
      }
    }
    return folderPath.concat("/", storageAssets.verifiedImage);
  }
}
