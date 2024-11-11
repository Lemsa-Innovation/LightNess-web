import {DisplayAvatar} from "@/components/@materialUI/images";
import {getFullName} from "@/firebase/firestore/collections/users/helpers";
import {useUserQuery} from "@/firebase/firestore/collections/users/hooks";
import {User} from "@/firebase/firestore/collections/users/models";
import {isNew} from "@/utils/fDate";
import {Badge, Skeleton} from "@nextui-org/react";

type Props = {
    fetch: true
    uid: string
} | {
    fetch: false
    user: User<"client">
}
function MinimalUser(props: Props) {
    const {fetch} = props
    const {data} = useUserQuery({
        uid: fetch ? props.uid : undefined
    })

    const user = fetch ? data : props.user

    const isNewUser = user && isNew({createdAt: user.createdAt})
    return (
        <div className="flex flex-row space-x-4 items-center">
            <Badge
                content="new"
                isInvisible={!isNewUser}
                color="danger"
                size="sm"
            >
                <div className="size-12">
                    <DisplayAvatar
                        src={user?.avatarImage || user?.photoUrl}
                    />
                </div>
            </Badge>
            <div className="flex flex-col">
                <Skeleton isLoaded={!!user}>
                    <p className="text-bold text-small capitalize">{getFullName({firstName: user?.firstName, lastName: user?.lastName})}</p>
                </Skeleton>
                <p className="text-foreground-700 font-light text-sm">{user?.email}</p>
            </div>
        </div>
    )
}

export default MinimalUser;