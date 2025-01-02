import {useLanguage} from "@/contexts/language/LanguageContext";
import {User, UserRole} from "@/firebase/firestore/collections/users/models";
import {Chip, InputProps} from "@nextui-org/react";

function UserRoleChip({user}: {
  user: User<"client">
}) {
  const {role} = user
  const {languageData} = useLanguage()
  const roles = languageData?.profile.roles
  const colors: Record<UserRole, InputProps['color']> = {
    admin: "default",
    user: "success",
  }
  return (
    <Chip
      variant="bordered"
      className="dark:text-black"
      color={colors[role]}
    >
      {roles?.[role ?? "user"].label}
    </Chip>
  )
}

export default UserRoleChip;