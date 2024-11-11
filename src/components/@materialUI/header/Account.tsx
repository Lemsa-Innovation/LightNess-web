import {Key} from "react"
import {useRouter} from "next/navigation"
import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Skeleton
} from "@nextui-org/react"
import {PROTECTED_ROUTES} from "@/routes"
import {useLanguage} from "@/contexts/language/LanguageContext"
import {useAuth} from "@/contexts/auth/AuthContext"
import {logout} from "@/firebase/auth/functions"
import {useImage} from "@/firebase/storage/hooks"
import {toast} from "sonner"

function Account() {
    const {push} = useRouter()
    const {languageData} = useLanguage()
    const {currentUser} = useAuth()

    const signOut = languageData?.auth.signOut

    const image = useImage({
        src: currentUser?.avatarImage
    })
    const imageSrc = image || currentUser?.photoUrl

    const handleSelect = (key: Key) => {
        switch (key) {
            case "logout": {
                if (signOut?.toast) {
                    const {error, success} = signOut.toast
                    toast.promise(logout(), {
                        success,
                        error
                    })
                }
                break
            }
            case "profile": {
                push(PROTECTED_ROUTES.profile)
                break
            }
            default:
                break;
        }
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="primary"
                    src={imageSrc}
                    fallback={<Skeleton />}
                />
            </DropdownTrigger>
            <DropdownMenu
                color="primary"
                aria-label="Avatar Actions"
                onAction={handleSelect}
                className='dark:text-white'
                variant="flat"
            >
                <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">
                        {currentUser?.email}
                    </p>
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                    {signOut?.logout}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default Account;