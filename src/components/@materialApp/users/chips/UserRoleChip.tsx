import { useLanguage } from "@/contexts/language/LanguageContext";
import { Chip, InputProps } from "@heroui/react";
import { SupabaseUser } from "@/hooks/useSupabaseUsers";

function UserRoleChip({ user }: { user: SupabaseUser }) {
  const { role } = user;
  const { languageData } = useLanguage();
  const roles = languageData?.profile.roles;
  const colors: Record<string, InputProps["color"]> = {
    admin: "default",
    super_admin: "danger",
    user: "success",
  };
  return (
    <Chip
      variant="bordered"
      className="dark:text-black"
      color={colors[role] || "default"}
    >
      {roles?.[(role ?? "user") as keyof typeof roles]?.label || role}
    </Chip>
  );
}

export { UserRoleChip };
