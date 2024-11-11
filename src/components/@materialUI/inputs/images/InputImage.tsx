import Image from "next/image";
import { cn } from "@nextui-org/react";
import { useDropzone } from "react-dropzone";
import { Control, useController } from 'react-hook-form';
import { useImage } from "@/firebase/storage/hooks";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { ImageField } from "@/language/structure/inputs/attachements";
import { CameraIcon } from "../../icons";

const InputImage: React.FC<{
    name: string;
    altPath?: string;
    control: Control<any>
    squared?: boolean
    maxSize?: number
    isDisabled?: boolean
    imagePlaceholder?: ImageField['placeholder']
}> = ({
    control,
    name,
    altPath,
    squared,
    maxSize,
    isDisabled,
    imagePlaceholder
}) => {
        const { languageData } = useLanguage()
        const defaultImagePlaceholder = languageData?.inputs.attachements.media.image.placeholder
        const activePlaceholder = imagePlaceholder ?? defaultImagePlaceholder

        const { field: { value, onChange }, fieldState: { error } } = useController({
            name,
            control,
        });
        const imagePath = useImage({
            src: value
        })
        const src = imagePath || altPath

        const { getRootProps, getInputProps } = useDropzone({
            multiple: false,
            disabled: isDisabled,
            maxSize: 1024 * 1024 * (maxSize ?? 3.1),
            accept: {
                'image/jpeg': ['.jpeg', '.jpg'],
                'image/png': ['.png']
            },
            onDrop: (acceptedFiles: File[]) => {
                const file = acceptedFiles[0]
                onChange(file)
            }
        });


        return (
            <div
                className={cn(
                    'flex relative w-full h-full items-center justify-center',
                    ' border-2 border-primary-700 outline-none overflow-hidden p-2 z-0 group',
                    squared ? 'rounded-xl' : 'rounded-full',
                    isDisabled ? "cursor-not-allowed" : "hover:cursor-pointer",
                )}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                {src && <Image
                    fill
                    src={src}
                    style={{ zIndex: 8 }}
                    className="object-cover"
                    alt="image"
                />}
                <div
                    className={cn(
                        'absolute flex flex-col items-center justify-center w-full h-full',
                        !isDisabled && 'hover:opacity-70  group-hover:z-10 ',
                        !!src && !isDisabled && 'opacity-0 text-white bg-gray-900',
                        !src && !isDisabled && 'bg-foreground-100 text-foreground-800'
                    )}
                >
                    <CameraIcon size={26} />
                    <p color="currentColor" className={'p-1 text-center text-sm font-normal md:text-lg select-none'}>
                        {src ? activePlaceholder?.update : activePlaceholder?.upload}
                    </p>
                </div>
            </div>
        );
    }

export default InputImage;