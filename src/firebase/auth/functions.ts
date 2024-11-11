import {auth} from "../config/firebase";
import {updateDoc} from "@firebase/firestore";
import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";
import {CustomClaims, Tenant} from "./models";
import {saveMessagingDeviceToken} from "../messaging/functions";
import {getUserRef} from "../firestore/collections/users/helpers";
import {
    createAuthUser,
    setCustomUserClaims
} from "./actions";
import {User} from "../firestore/collections/users/models";

// credentials
export const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
}

export const logout = () => {
    return signOut(auth)
}
// third providers
const handleProviderSignIn = async (provider: any) => {
    const {user} = await signInWithPopup(auth, provider);
    const tokenResult = await user.getIdTokenResult();
    return tokenResult
};

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return handleProviderSignIn(provider);
};

export async function checkAuthUser({tenant, user}: {
    tenant: Tenant
    user: User<"client">
}) {
    const updatedUserFields: Partial<User<"client">> = {}
    if (tenant.photoUrl && tenant.photoUrl !== user.photoUrl) {
        updatedUserFields.photoUrl = tenant.photoUrl
    }
    const fcmToken = await saveMessagingDeviceToken({
        uid: tenant.uid,
        old_fcmToken: user.fcmToken?.web
    })

    if (fcmToken) {
        await updateDoc(getUserRef(tenant.uid), {
            ["fcmToken.web"]: fcmToken
        } as Partial<User<"client">>)
    }
}

export function generatePassword(email: string): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@_";
    const passwordLength = 8;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    const emailPassword = email.split("@", 1).at(0)
    if (emailPassword && emailPassword?.length >= 8) {
        return emailPassword
    }
    return password;
}

export async function createAndSetUserClaims({email, phoneNumber, customClaims}: {
    email: string
    phoneNumber: string
    customClaims: CustomClaims
}) {
    const password = generatePassword(email)
    const user = await createAuthUser({
        password,
        emailVerified: true,
        email: email,
        phoneNumber: phoneNumber,
    })

    await setCustomUserClaims({
        uid: user.uid,
        customClaims
    })
    return {
        password,
        user
    }
}