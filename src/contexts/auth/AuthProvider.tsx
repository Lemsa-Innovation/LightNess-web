"use client";

import {AuthContext, AuthContextType} from "./AuthContext";
import {useEffect} from "react";
import {useAuthUser} from "@/firebase/auth/hooks";
import {useUser} from "@/firebase/firestore/collections/users/hooks";
import {checkAuthUser} from "@/firebase/auth/functions";

export interface ProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<ProviderProps> = ({
    children
}) => {
    const {tenant} = useAuthUser();
    const {
        isLoading,
        user: currentUser
    } = useUser({uid: tenant?.uid})


    const authContextValue: AuthContextType = {
        tenant,
        isLoading,
        currentUser,
    };
    useEffect(() => {
        if (tenant && currentUser)
            checkAuthUser({
                tenant,
                user: currentUser
            })
    }, [tenant, currentUser])

    return (
        <AuthContext.Provider
            value={authContextValue}
        >
            {children}
        </AuthContext.Provider>
    );
};
