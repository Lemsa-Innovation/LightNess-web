import {UserGender} from "@/firebase/firestore/collections/users/validations";
import {useImage} from "@/firebase/storage/hooks";
import {Avatar} from "@nextui-org/react";
function DisplayAvatar({
    src,
    gender,
    altPath,
    className,
}: {
    src: string | undefined
    gender?: UserGender
    altPath?: string
    className?: string
}) {

    const image = useImage({
        src,
    })

    return (
        <Avatar
            isBordered
            src={image || altPath}
            className={className}
            color={gender ? (gender === 'men' ? 'secondary' : 'danger') : 'default'}
        />
    );
}

export default DisplayAvatar;