'use client';
import {Tenant} from '@/firebase/auth/models';
import {User} from '@/firebase/firestore/collections/users/models';
import {createContext, useContext} from 'react';

export interface AuthContextType {
    tenant?: Tenant
    isLoading: boolean | undefined
    currentUser: User<"client"> | null | undefined
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}