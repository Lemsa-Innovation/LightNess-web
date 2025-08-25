import { Avatar } from "@heroui/react";

type UserGender = "men" | "women";

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
