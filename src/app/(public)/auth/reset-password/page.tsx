"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useLoadingCallback } from "react-loading-hook";
import { InputText } from "@/components/@materialUI/inputs/texts";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { useSupabaseAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { resetPasswordFormSchema } from "@/lib/validations";

function ResetPasswordPage() {
  const { languageData } = useLanguage();
  const auth = languageData?.auth;
  const { resetPassword } = useSupabaseAuth();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const [handleResetPassword, isLoading] = useLoadingCallback(
    async ({ email }) => {
      try {
        const { error } = await resetPassword(email);
        if (error) {
          if (error.message.includes("User not found")) {
            toast.error(auth?.errors.emailNotFound, {
              position: "top-right",
            });
          } else {
            toast.error(auth?.resetPassword?.toastContents.error, {
              position: "top-right",
            });
          }
        } else {
          setIsSuccess(true);
          toast.success(auth?.resetPassword?.toastContents.success, {
            position: "top-right",
          });
        }
      } catch {
        toast.error(auth?.resetPassword?.toastContents.error, {
          position: "top-right",
        });
      }
    }
  );

  if (isSuccess) {
    return (
      <div className="flex h-full w-full justify-center items-center overflow-auto p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">
                {auth?.resetPassword?.success.title}
              </h1>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {auth?.resetPassword?.success?.description}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Button
              color="primary"
              className="w-full"
              onClick={() =>
                (window.location.href = "/auth/reset-password/confirm")
              }
            >
              Continue to Password Reset
            </Button>
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
            <h1 className="text-2xl font-bold">{auth?.resetPassword?.title}</h1>
            <p className="text-sm text-default-500">
              {auth?.resetPassword?.description}
            </p>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <form
            onSubmit={handleSubmit(handleResetPassword)}
            className="flex flex-col gap-4"
          >
            <InputText
              name="email"
              control={control}
              field={auth?.fields.email}
            />
            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              isDisabled={!isValid}
            >
              {auth?.resetPassword?.button}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default ResetPasswordPage;
