import { Avatar } from "@heroui/react";
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
  return (
    <Avatar
      isBordered
      src={src || altPath}
      className={className}
      color={gender ? (gender === "men" ? "secondary" : "danger") : "default"}
    />
  );
}

export default DisplayAvatar;
