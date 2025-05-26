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
type ProvidersProps = {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
};
function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const queryClient = new QueryClient();
  return (
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
  );
}

export default Providers;
