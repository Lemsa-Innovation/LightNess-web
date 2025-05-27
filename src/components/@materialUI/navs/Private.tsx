import {
  cn,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { useState } from "react";
import { useLanguage } from "@/contexts/language/LanguageContext";
import Account from "./Account";
import { SIDEBAR_ROUTES } from "@/config";
import { SidebarItems } from "@/language/structure";
import { LanguageSwitch, ThemeSwitch } from "../buttons";
import { usePathname } from "next/navigation";

function PrivateHeader() {
  const pathname = usePathname();
  const { languageData } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebar = languageData?.commons.sidebar;

  const handleClick = () => {
    setIsMenuOpen(false);
  };
  return (
    <Navbar
      isBlurred
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="sticky"
      classNames={{
        wrapper: "gap-4 min-w-full",
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:bg-primary",
          "data-[active=true]:font-semibold",
        ],
      }}
    >
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {Object.entries(SIDEBAR_ROUTES).map(
          ([routeName, { path, children }]) => {
            const firstItem = children?.at(0);
            const href = firstItem ? path.concat("/", firstItem) : path;
            const isSelected = pathname.startsWith(path);
            return (
              <NavbarMenuItem key={routeName}>
                <Link
                  color="foreground"
                  href={href}
                  onClick={handleClick}
                  className={cn(
                    "dark:text-white hover:text-primary-500 active:text-primary",
                    isSelected && "text-primary dark:text-primary"
                  )}
                >
                  {sidebar?.[routeName as keyof SidebarItems]}
                </Link>
              </NavbarMenuItem>
            );
          }
        )}
      </NavbarMenu>

      <NavbarBrand className="hidden md:flex flex-col gap-1 items-start">
        <p className="text-primary text-xl  __className_c4ff9d">LightNess</p>
        <p className="font-semibold">for admins</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <LanguageSwitch />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        {/* {currentUser ? <NotificationTrigger uid={currentUser.uid} /> : <Skeleton />} */}
        <Account />
      </NavbarContent>
    </Navbar>
  );
}

export { PrivateHeader };
