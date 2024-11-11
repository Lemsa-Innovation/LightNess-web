export const storageAssets = {
    images: "images",
    updatedImage: "updatedImage",
    verifiedImage: "verifiedImage"
}

export function generateImageLockType({ folderPath, isLocked }: {
    folderPath: string
    isLocked?: boolean
}) {
    if (isLocked) {
        return folderPath.concat('/', storageAssets.updatedImage)
    }
    return folderPath.concat('/', storageAssets.verifiedImage)
}