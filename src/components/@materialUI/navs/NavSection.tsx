import { useAuth } from "@/contexts/auth/AuthContext";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { Skeleton } from "@heroui/react";
import { usePathname } from "next/navigation";
import { Fragment, ReactNode } from "react";
import { Icon } from "@iconify/react";
import { SidebarItems } from "@/language/structure";
import { NavItem, SidebarItemProps } from "./NavItem";
import { SIDEBAR_ROUTES } from "@/config";

const ITEM_HEIGHT = 44;
const ICONS: Record<keyof SidebarItems, ReactNode> = {
  users: <Icon className="size-6" icon="lucide:users" />,
  blogs: <Icon className="size-6" icon="mdi:blog" />,
  announcements: <Icon className="size-6" icon="mdi:announcement" />,
  washers: <Icon className="size-6" icon="mdi:washing-machine" />,
  funeralServices: <Icon className="size-6" icon="mdi:dead" />,
  cemeteries: <Icon className="size-6" icon="mdi:death-star" />,
  deathDeclarations: (
    <Icon className="size-6" icon="ic:baseline-perm-device-information" />
  ),
};

const NavSection: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  const pathname = usePathname();
  const { currentUser } = useAuth();
  const { languageData } = useLanguage();
  const sidebarTranslation = languageData?.commons.sidebar;

  const isActivePath = (path: string) =>
    path ? pathname.startsWith(path) : false;
  const storeRoutes: SidebarItemProps[] = [];

  Object.entries(SIDEBAR_ROUTES).forEach(
    ([code, { isDisabled, path, children }]) => {
      const labelCode = code as keyof SidebarItems;
      const route = {
        path,
        children,
        isDisabled,
        isCollapsed,
        isActive: isActivePath(path),
        icon: ICONS[labelCode],
        label: sidebarTranslation?.[labelCode],
      };
      storeRoutes.push(route);
    }
  );

  const renderNavItems = () => {
    if (!currentUser || !languageData)
      return Array(7)
        .fill(0)
        .map((value, index) => {
          return (
            <Skeleton key={index} className="rounded-lg">
              <div
                style={{
                  height: ITEM_HEIGHT,
                }}
              />
            </Skeleton>
          );
        });
    else {
      return (
        <Fragment>
          {storeRoutes.map((route) => (
            <NavItem key={route.label} {...route} />
          ))}
        </Fragment>
      );
    }
  };

  return (
    <div className="space-y-4 flex flex-col p-4 overflow-y-auto scrollbar-hide">
      {renderNavItems()}
    </div>
  );
};

export default NavSection;
