"use client";
import {
    cn,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@nextui-org/react";
import {useState} from "react";
import Account from "./Account";
import Link from "next/link";
import {SidebarItems} from "@/language/structure/commons";
import {usePathname} from "next/navigation";
import {SIDEBAR_ROUTES} from "@/routes";
import {useLanguage} from "@/contexts/language/LanguageContext";
import ThemeSwitch from "./ThemeSwitch";

function AdminHeader() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {languageData} = useLanguage();
    const sidebar = languageData?.commons.sidebar;

    const handleClick = () => {
        setIsMenuOpen(false);
    };
    return (
        <Navbar
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className="sticky"
            isBlurred
            isBordered
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
                    ([routeName, {path, children}]) => {
                        const firstItem = children?.at(0);
                        const href = firstItem ? path.concat("/", firstItem) : path;
                        const isSelected = pathname.startsWith(path);
                        return (
                            <NavbarMenuItem key={routeName} onClick={handleClick}>
                                <Link
                                    color="foreground"
                                    href={href}
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
                <p className="text-primary text-xl  __className_c4ff9d">Lightness</p>
                <p className="font-semibold">Console</p>
            </NavbarBrand>

            <NavbarContent justify="end">
                {/* <NavbarItem>
                    <LanguageSwitch />
                </NavbarItem> */}
                {/* <NavbarItem>
                    <ThemeSwitch />
                </NavbarItem> */}
                {/* <NavbarItem>
                    {currentUser ? <NotificationTrigger uid={currentUser.uid} /> : <Skeleton />}
                </NavbarItem> */}
                <NavbarItem>
                    <Account />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}

export default AdminHeader;
