import Image from "next/image";
import { useImage } from "@/firebase/storage/hooks";
import { Image as NextuiImage, Skeleton, cn } from "@nextui-org/react";

export const DisplayImage: React.FC<{
    src: string | File
    isZoomed?: boolean
}> = ({ src, isZoomed }) => {
    const image = useImage({
        src
    })
    return (
        <NextuiImage
            alt="image"
            isZoomed={isZoomed}
            src={image}
            className="object-contain rounded-lg duration-700 ease-in-out"
            as={Image}
            width={250}
            height={250}
        />
    );
}

export const DisplayNextImage: React.FC<{
    src?: string
    displayNoImage?: boolean
}> = ({ src, displayNoImage }) => {

    const image = useImage({
        src, displayNoImage
    })

    const className = cn(
        'rounded-lg bg-foreground-100 duration-700 ease-in-out w-full h-full',
    )

    return (

        <div className="relative w-full h-full rounded-lg">
            {image ? <Image
                fill
                sizes="100%"
                alt="image"
                src={image}
                className={className}
            /> : <Skeleton
                isLoaded={!!image}
                className={cn(
                    "w-full h-full rounded-lg",
                )}
            />}
        </div>

    )
}