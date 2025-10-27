import { Key, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useSupabaseAuth } from "@/hooks/useAuth";
import { PROTECTED_ROUTES } from "@/config";

function Account() {
  const { push } = useRouter();
  const { user } = useAuth();
  const { languageData } = useLanguage();
  const { signOut } = useSupabaseAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const signOutText = languageData?.auth.signOut;

  const imageSrc = user?.avatar_image || user?.photo_url;

  const handleSelect = async (key: Key) => {
    switch (key) {
      case "logout": {
        try {
          setIsLoggingOut(true);
          await signOut();
          // The signOut function already handles redirect to /auth
        } catch (error) {
          console.error("Logout failed:", error);
          setIsLoggingOut(false);
        }
        break;
      }
      case "profile": {
        push(PROTECTED_ROUTES.profile);
        break;
      }
      default:
        break;
    }
  };

  return (
    <Dropdown
      classNames={{
        content: "dark:text-white text-black",
      }}
    >
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="primary"
          src={imageSrc || undefined}
          fallback={<Skeleton />}
        />
      </DropdownTrigger>
      <DropdownMenu
        color="primary"
        aria-label="Avatar Actions"
        onAction={handleSelect}
        variant="flat"
      >
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user?.email}</p>
        </DropdownItem>
        <DropdownItem key="logout" color="danger" isDisabled={isLoggingOut}>
          {isLoggingOut ? (
            <span className="flex items-center gap-2">
              <Spinner size="sm" />
              Logging out...
            </span>
          ) : (
            signOutText?.logout
          )}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default Account;
