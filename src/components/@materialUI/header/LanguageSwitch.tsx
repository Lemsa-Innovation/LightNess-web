import {
    availableLanguages,
    Language,
    useLanguage,
} from "@/contexts/language/LanguageContext";
import {auth} from "@/firebase/config/firebase";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Skeleton,
} from "@nextui-org/react";
import Image from "next/image";
import {Key} from "react";

export default function LanguageSwitch() {
    const {language, changeLanguage} = useLanguage();

    const handleAction = (key: Key) => {
        const selectedLang = key as Language;
        changeLanguage(selectedLang);
        auth.languageCode = selectedLang;
        localStorage.setItem("language", selectedLang);
    };

    const selectedLanguage = language && availableLanguages[language];
    const iconClasses =
        "text-xl text-default-500 pointer-events-none flex-shrink-0";

    return (
        <Skeleton className="rounded-xl" isLoaded={!!language}>
            <Dropdown closeOnSelect>
                <DropdownTrigger>
                    {language ? (
                        <Button isIconOnly>
                            {selectedLanguage && (
                                <Image
                                    width={28}
                                    height={28}
                                    src={selectedLanguage.icon}
                                    alt={"lang"}
                                />
                            )}
                        </Button>
                    ) : (
                        <Skeleton className="w-10 h-10 rounded-xl" />
                    )}
                </DropdownTrigger>
                <DropdownMenu
                    variant="faded"
                    selectionMode="single"
                    selectedKeys={language ? [language] : undefined}
                    onAction={handleAction}
                >
                    {Object.entries(availableLanguages).map(([key, value]) => (
                        <DropdownItem
                            startContent={
                                <Image
                                    width={24}
                                    height={24}
                                    src={value.icon}
                                    alt="image"
                                    className={iconClasses}
                                />
                            }
                            key={key}
                            className="dark:text-white"
                        >
                            {language && value[language]}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </Skeleton>
    );
}
