import {collectionIds} from "../../modules/assets";
import {getCollectionRef, getDocumentRef} from "../../modules/helpers";
import {User} from "./models";
const {users} = collectionIds

export function getUserRef(uid: string) {
    return getDocumentRef(users, uid)
}
export function getUsersRef() {
    return getCollectionRef(users)
}
export function generateUserAvatarPath(uid: string) {
    return (`${users}/${uid}`)
}
export function getFullName({firstName = '', lastName = ''}: {
    firstName?: string
    lastName?: string
}) {
    return `${firstName} ${lastName}`.trim();
}

export function isUserVerified(verificationSteps: User<"client">["verificationSteps"]) {
    return !!(verificationSteps?.phone?.verified && verificationSteps?.email?.verified)
}