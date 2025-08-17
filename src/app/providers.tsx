"use client";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { HeroUIProvider } from "@heroui/react";
import { LanguageProvider } from "@/contexts/language/LanguageProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";
import { AuthProvider } from "@/contexts/auth/AuthProvider";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabase";
type ProvidersProps = {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
};
function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const queryClient = new QueryClient();
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <HeroUIProvider navigate={router.push}>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <AuthProvider>
              <NextThemesProvider {...themeProps}>
                {children}
                <Toaster richColors />
              </NextThemesProvider>
            </AuthProvider>
          </LanguageProvider>
        </QueryClientProvider>
      </HeroUIProvider>
    </SessionContextProvider>
  );
}

export default Providers;
