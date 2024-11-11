import {useLanguage} from "@/contexts/language/LanguageContext";
import {Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Skeleton} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {NotificationIcon} from "../icons";


function NotificationTrigger({uid}: {uid: string}) {
    const {push} = useRouter()
    const {languageData} = useLanguage()
    // const {data, isLoading, error} = useNotifications(uid)

    // const unreadNotifications = useMemo(() => data.filter((notification) => !notification.isRead), [data]);
    // const readNotifications = useMemo(() => data.filter((notification) => notification.isRead), [data]);
    // const unreadCount = useMemo(() => unreadNotifications.length, [unreadNotifications]);

    // const handleSelection = (key: Key) => {
    //     const notification = data.find((notification) => notification.ref.id === key)
    //     switch (notification?.type) {

    //     }
    // }

    // const handleReadNotification = () => {
    //     const docs = unreadNotifications.map((notification) => notification.ref)
    //     if (docs.length)
    //         markNotificationsRead(docs)
    // }
    return (
        <Skeleton
            className='rounded-xl'
            isLoaded={!isLoading && !!languageData} >
            {languageData && <Dropdown
            >
                <DropdownTrigger>
                    <Button
                        onClick={handleReadNotification}
                        isIconOnly
                        startContent={
                            <Badge
                                color="danger"
                                content={unreadCount}
                                isInvisible={!unreadCount}
                                shape="circle"
                            >
                                <NotificationIcon />
                            </Badge>
                        }
                    />
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Notifications"
                    variant="flat"
                    selectionMode="none"
                    classNames={{
                        list: "dark:text-white"
                    }}
                    className="max-w-sm max-h-unit-7xl overflow-y-scroll"
                    onAction={handleSelection}
                >
                    <DropdownSection showDivider>
                        {unreadNotifications.map((notification) => (
                            <DropdownItem
                                key={notification.ref.id}
                                className="h-fit"
                            >
                                {/* <NotificationItem notification={notification}/> */}
                            </DropdownItem>
                        ))}
                    </DropdownSection>
                    <DropdownSection>
                        {readNotifications?.map((notification) => (
                            <DropdownItem
                                key={notification.ref.id}
                                className="h-fit"
                            >
                                {/* <NotificationItem notification={notification}/> */}
                            </DropdownItem>
                        ))}
                    </DropdownSection>

                </DropdownMenu>
            </Dropdown>}


        </Skeleton>
    );
}

export default NotificationTrigger;