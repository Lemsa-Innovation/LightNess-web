"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useLoadingCallback } from "react-loading-hook";
import { InputPassword } from "@/components/@materialUI/inputs/texts";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { useSupabaseAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { newPasswordFormSchema } from "@/firebase/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function ConfirmResetPasswordPage() {
  const { languageData } = useLanguage();
  const auth = languageData?.auth;
  const supabase = useSupabaseClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(newPasswordFormSchema),
  });

  useEffect(() => {
    // Check for access token and refresh token in URL params
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    const type = searchParams.get("type");

    const validateResetToken = async () => {
      try {
        if (type === "recovery" && accessToken && refreshToken) {
          // Set the session using the tokens from URL
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.error("Session error:", error);
            toast.error(auth?.confirmPassword?.errors.invalidToken, {
              position: "top-right",
            });
            router.push("/auth/reset-password");
            return;
          }

          if (data.session) {
            setIsValidToken(true);
          } else {
            toast.error(auth?.confirmPassword?.errors.invalidToken, {
              position: "top-right",
            });
            router.push("/auth/reset-password");
          }
        } else {
          // Check if user already has a valid session
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (session) {
            setIsValidToken(true);
          } else {
            toast.error(auth?.confirmPassword?.errors.invalidToken, {
              position: "top-right",
            });
            router.push("/auth/reset-password");
          }
        }
      } catch (error) {
        console.error("Token validation error:", error);
        toast.error(auth?.confirmPassword?.errors.invalidToken, {
          position: "top-right",
        });
        router.push("/auth/reset-password");
      } finally {
        setIsLoading(false);
      }
    };

    validateResetToken();
  }, [
    searchParams,
    supabase.auth,
    router,
    auth?.confirmPassword?.errors.invalidToken,
  ]);

  const [handleUpdatePassword, isUpdating] = useLoadingCallback(
    async ({ password }) => {
      try {
        const { data, error } = await supabase.auth.updateUser({
          password: password,
        });

        if (error) {
          console.error("Password update error:", error);
          toast.error(auth?.confirmPassword?.errors.updateFailed, {
            position: "top-right",
          });
        } else {
          setIsSuccess(true);
          toast.success("Password updated successfully!", {
            position: "top-right",
          });

          // Sign out the user after successful password update
          await supabase.auth.signOut();
        }
      } catch (_error: unknown) {
        console.error("Password update error:", _error);
        toast.error(auth?.confirmPassword?.errors.updateFailed, {
          position: "top-right",
        });
      }
    }
  );

  if (isLoading) {
    return (
      <div className="flex h-full w-full justify-center items-center overflow-auto p-4">
        <Card className="w-full max-w-md">
          <CardBody className="flex flex-col gap-4">
            <div className="text-center">
              <p className="text-sm text-default-500">
                {auth?.confirmPassword?.loading}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="flex h-full w-full justify-center items-center overflow-auto p-4">
        <Card className="w-full max-w-md">
          <CardBody className="flex flex-col gap-4">
            <div className="text-center">
              <p className="text-sm text-default-500">
                {auth?.confirmPassword?.invalidLink}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex h-full w-full justify-center items-center overflow-auto p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">
                {auth?.confirmPassword?.success.title}
              </h1>
              <p className="text-sm text-default-500">
                {auth?.confirmPassword?.success.description}
              </p>
            </div>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Link href="/auth">
              <Button color="primary" className="w-full">
                {auth?.confirmPassword?.success.button}
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full justify-center items-center overflow-auto p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">
              {auth?.confirmPassword?.title}
            </h1>
            <p className="text-sm text-default-500">
              {auth?.confirmPassword?.description}
            </p>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <form
            onSubmit={handleSubmit(handleUpdatePassword)}
            className="flex flex-col gap-4"
          >
            <InputPassword
              name="password"
              control={control}
              isRequired={true}
            />
            <InputPassword
              name="confirmPassword"
              control={control}
              isRequired={true}
            />
            <Button
              type="submit"
              color="primary"
              isLoading={isUpdating}
              isDisabled={!isValid}
            >
              {auth?.confirmPassword?.button}
            </Button>
          </form>
          <div className="text-center">
            <Link
              href="/auth"
              className="text-sm text-default-500 hover:text-primary"
            >
              {auth?.confirmPassword?.backToLogin}
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default ConfirmResetPasswordPage;
