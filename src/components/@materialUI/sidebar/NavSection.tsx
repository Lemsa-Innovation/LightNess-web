import {useAuth} from "@/contexts/auth/AuthContext";
import {useLanguage} from "@/contexts/language/LanguageContext";
import {SidebarItems} from "@/language/structure/commons";
import {Skeleton} from "@nextui-org/react";
import {usePathname} from "next/navigation";
import {ReactNode} from "react";
import {DocumentText, Home2, LocationDiscover, Moneys, ReceiptMinus, Send2, Setting2} from "iconsax-react";
import {GanttChart, Users} from "lucide-react";
import {NavItem, SidebarItemProps} from "./NavItem";
import {SIDEBAR_ROUTES} from "@/routes";

const ITEM_HEIGHT = 44;
const ICONS: Record<keyof SidebarItems, ReactNode> = {
	dashboard: <Home2 size={24} color="black" />,
	cemeteries: <GanttChart />,
	users: <Users />,
	funeralServices: <LocationDiscover />,
	washers: <Moneys />,
	settings: <Setting2 />,
};

const NavSection: React.FC<{isCollapsed: boolean}> = ({isCollapsed}) => {
	const pathname = usePathname();
	const {currentUser} = useAuth();
	const {languageData} = useLanguage();
	const sidebarTranslation = languageData?.commons.sidebar;
	const match = (path: string) => (path ? pathname === path : false);

	const routes: SidebarItemProps[] = Object.entries(SIDEBAR_ROUTES).map(
		([code, route]) => {
			const labelCode = code as keyof SidebarItems;
			return {
				isCollapsed,
				path: route.path,
				isActive: match(route.path),
				label: sidebarTranslation?.[labelCode],
				icon: ICONS[labelCode],
				children: route.children,
			};
		}
	);

	return (
		<div className="space-y-4 flex flex-col p-4">
			{currentUser && sidebarTranslation
				? routes.map((route) => <NavItem key={route.label} {...route} />)
				: Array(7)
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
					})}
		</div>
	);
};

export default NavSection;
