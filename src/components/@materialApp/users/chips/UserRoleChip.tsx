import { useLanguage } from "@/contexts/language/LanguageContext";
import { User } from "@/firebase/firestore";
import { Chip, InputProps } from "@heroui/react";
import { UserRole } from "@shared/collections";

function UserRoleChip({ user }: { user: User }) {
  const { role } = user;
  const { languageData } = useLanguage();
  const roles = languageData?.profile.roles;
  const colors: Record<UserRole, InputProps["color"]> = {
    admin: "default",
    user: "success",
  };
  return (
    <Chip variant="bordered" className="dark:text-black" color={colors[role]}>
      {roles?.[role ?? "user"].label}
    </Chip>
  );
}

export { UserRoleChip };
