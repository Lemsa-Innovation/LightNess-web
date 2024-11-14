import {getUserRef, getUsersRef} from "./helpers"
import {User} from "./models"
import {useEffect, useState} from "react"
import {getDoc, getDocs, onSnapshot, orderBy, query} from "@firebase/firestore"
import {useQuery} from "@tanstack/react-query"
import {useCollection} from "react-firebase-hooks/firestore"

export function useUser({uid}: {
    uid?: string
}) {
    const [error, setError] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [user, setUser] = useState<User<"client">>()
    useEffect(() => {
        if (uid) {
            const userRef = getUserRef(uid)
            onSnapshot(userRef, {
                next(snapshot) {
                    if (snapshot.exists()) {
                        const user = {
                            uid,
                            ...snapshot.data(),
                        } as User<"client">
                        setUser(user)
                        setIsLoading(false)
                    }
                },
                error(error) {
                    setError(error.code)
                },
            })
        }
    }, [uid])

    return {
        user,
        isLoading,
        error
    }
}
export function useUsersQuery() {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const usersRef = getUsersRef()
            const queryRef = query(usersRef,
                orderBy("createdAt", "desc")
            )
            const usersSnapshots = await getDocs(queryRef)
            return usersSnapshots.docs.map((doc) => ({
                uid: doc.id,
                ...doc.data()
            } as User<"client">))
        }
    })
}

export function useUsers() {
    const usersRef = getUsersRef()
    const queryRef = query(usersRef,
        orderBy("createdAt", "desc")
    )

    const [snapshots, isLoading, error] = useCollection(queryRef)
    const [data, setData] = useState<User<"client">[]>([])
    useEffect(() => {
        if (!isLoading && !error && snapshots && !snapshots?.empty) {
            setData(snapshots.docs.map((doc) => ({
                uid: doc.ref.id,
                ...doc.data()
            } as User<"client">)))
        }
    }, [snapshots, isLoading, error])

    return {
        data,
        isLoading,
        error
    }
}

export function useUserQuery({uid}: {
    uid?: string
}) {
    return useQuery({
        queryKey: ["user", uid],
        queryFn: async () => {
            if (uid) {
                const userRef = getUserRef(uid)
                const userDoc = await getDoc(userRef)
                if (userDoc.exists()) {
                    return ({
                        uid,
                        ...userDoc.data()
                    } as User<"client">)
                }
            }
        }
    })
}