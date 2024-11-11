import {Button, Divider, cn} from "@nextui-org/react"
import {Fragment, ReactNode} from "react"
import Link from "next/link"

export interface SidebarItemProps {
    label: string | undefined
    icon: ReactNode
    path: string
    isActive: boolean
    isDisabled?: boolean
    isCollapsed: boolean
    children?: string[]
}

export function NavItem({
    isDisabled,
    isCollapsed,
    isActive,
    label,
    path,
    icon, children
}: SidebarItemProps) {
    const linkClassName = cn(
        'px-2 py-1 flex w-full rounded-sm items-center gap-x-2 text-foreground-600 hover:bg-foreground-100 ',
        isCollapsed ? 'flex-col text-tiny' : 'flex-row text-base h-[44px]',
        isActive ? 'dark:bg-foreground-50 ' : 'bg-transparent'
    )
    const disabledClassname = cn(
        'flex w-full gap-2 rounded-xl px-2 py-1 items-center',
        isCollapsed ? 'flex-col text-tiny' : 'flex-row text-base h-[44px]'
    )

    const renderNav = () => {
        const firstChild = children?.at(0)
        const hrefPath = firstChild ? path.concat('/', firstChild) : path
        return (
            <Link href={hrefPath} className="flex gap-1 items-center">
                <Divider className={cn(
                    "flex w-1",
                    isActive ? "bg-primary" : "bg-transparent"
                )} orientation="vertical" />
                <div className={linkClassName}>
                    {icon}
                    <p className="overflow-visible text-center">
                        {label}
                    </p>
                </div>
            </Link>
        )
    }
    return (
        <Fragment>
            {isDisabled && <Button
                isDisabled
                className="h-fit px-2 py-1"
            >
                <div
                    className={disabledClassname}
                >
                    {icon}
                    <p className="overflow-visible text-center">
                        {label}
                    </p>
                </div>
            </Button>}
            {!isDisabled && renderNav()}
        </Fragment>
    )
}