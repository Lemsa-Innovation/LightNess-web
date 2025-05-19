import { Control, useController } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Avatar, cn } from "@heroui/react";
import { CameraIcon } from "../../icons";
import { ImageField } from "@/language/structure/inputs/attachements";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { useImage } from "@/firebase/storage";

interface AvatarProps {
  control: Control<any>;
  name: string;
  altPath?: string;
  bordered?: boolean;
  zoomed?: boolean;
  isDisabled?: boolean;
  imagePlaceholder?: ImageField["placeholder"];
}
const InputAvatar: React.FC<AvatarProps> = ({
  control,
  name,
  altPath,
  isDisabled,
  imagePlaceholder,
}) => {
  const { languageData } = useLanguage();
  const defaultImagePlaceholder =
    languageData?.inputs.attachements.media.image.placeholder;
  const activePlaceholder = imagePlaceholder ?? defaultImagePlaceholder;
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const imagePath = useImage({
    src: value,
  });
  const src = imagePath || altPath;

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: 1024 * 1024 * 3.1,
    disabled: isDisabled,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    onDrop: (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      onChange(file);
    },
  });

  const classname = cn(
    "absolute flex flex-col items-center justify-center rounded-full w-full h-full",
    "hover:opacity-70 group-hover:z-10 bg-content1",
    src
      ? "opacity-0 text-white bg-gray-900"
      : "bg-foreground-100 text-foreground-800"
  );
  return (
    <div
      className={cn(
        "w-full h-full rounded-full border-2 border-primary-700",
        "group flex relative items-center content-center outline-none z-0",
        isDisabled ? "cursor-not-allowed" : "hover:cursor-pointer"
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {src && (
        <Avatar
          src={src}
          style={{ zIndex: 8 }}
          className="w-full h-full bg-foreground-50"
        />
      )}
      {!isDisabled && (
        <div className={classname}>
          <CameraIcon size={26} />
          <p
            color="currentColor"
            className={"p-1 text-center text-xs select-none"}
          >
            {src ? activePlaceholder?.update : activePlaceholder?.upload}
          </p>
        </div>
      )}
    </div>
  );
};
export default InputAvatar;
