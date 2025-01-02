"use client"
import {Toaster} from 'sonner'
import {NextUIProvider} from "@nextui-org/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {AuthProvider} from '@/contexts/auth/AuthProvider';
import {LanguageProvider} from '@/contexts/language/LanguageProvider';

export function Providers({children}: {children: React.ReactNode}) {
    //const router = useRouter();
    const queryClient = new QueryClient()
    return (
        <NextUIProvider
        //navigate={router.push}
        >
            <LanguageProvider>
                <AuthProvider>
                    <QueryClientProvider client={queryClient}>
                        {children}
                    </QueryClientProvider>
                    <Toaster richColors />
                </AuthProvider>
            </LanguageProvider>
        </NextUIProvider>
    )
}