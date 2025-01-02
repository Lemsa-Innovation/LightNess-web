"use client"

import {UsersTable} from "@/components/@materialApp/users/table";
// import {createAuthUser, setCustomUserClaims} from "@/firebase/auth/actions";
// import {getUserRef} from "@/firebase/firestore/collections/users/helpers";
// import {setDoc, Timestamp} from "@firebase/firestore";
// import {Button} from "@nextui-org/react";


function Page() {
    // const {tenant} = useAuth()
    // const handle = async () => {
    //     // await createAuthUser({
    //     //     email: "superadmin@lightness.live",
    //     //     password: "superadmin@2024",
    //     //     uid: "superadmin"
    //     // })
    //     await setCustomUserClaims({
    //         uid: "superadmin",
    //         customClaims: {
    //             role: 'admin',
    //             position: "super",
    //             status: "active"
    //         }
    //     })
    //     const userRef = getUserRef("superadmin")
    //     setDoc(userRef, {
    //         accountStatus: 'active',
    //         countryId: "blg",
    //         position: "super",
    //         createdAt: Timestamp.now(),
    //         role: "admin",
    //         email: "superadmin@lightness.live",
    //         gender: "men",
    //         firstName: "Mohammed",
    //         lastName: "Admin",
    //     })
    // }
    return (
        <div className="flex w-full h-full">
            {/* <Button
                onClick={handle}
            >
                Set user
            </Button> */}
            <UsersTable />
        </div>
    );
}

export default Page;