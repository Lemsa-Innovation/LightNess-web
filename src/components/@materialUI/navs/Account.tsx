import { Key } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@heroui/react";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { useAuth } from "@/contexts/auth/AuthContext";
import { logout } from "@/firebase/auth";
import { PROTECTED_ROUTES } from "@/config";
import { useImage } from "@/firebase/storage";

function Account() {
  const { push } = useRouter();
  const { currentUser } = useAuth();
  const { languageData } = useLanguage();

  const signOut = languageData?.auth.signOut;

  const image = useImage({
    src: currentUser?.avatarImage,
  });
  const imageSrc = image || currentUser?.photoUrl;

  const handleSelect = (key: Key) => {
    switch (key) {
      case "logout": {
        if (signOut?.toast) {
          const { error, success } = signOut.toast;
          logout();
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
          <p className="font-semibold">{currentUser?.email}</p>
        </DropdownItem>
        <DropdownItem key="logout" color="danger">
          {signOut?.logout}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default Account;
