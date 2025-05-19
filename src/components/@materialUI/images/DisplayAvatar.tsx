import { Avatar } from "@heroui/react";
import { useImage } from "@/firebase/storage";
import { UserGender } from "@shared/collections";
function DisplayAvatar({
  src,
  gender,
  altPath,
  className,
}: {
  src: string | undefined;
  gender?: UserGender;
  altPath?: string;
  className?: string;
}) {
  const image = useImage({
    src,
  });

  return (
    <Avatar
      isBordered
      src={image || altPath}
      className={className}
      color={gender ? (gender === "men" ? "secondary" : "danger") : "default"}
    />
  );
}

export default DisplayAvatar;
