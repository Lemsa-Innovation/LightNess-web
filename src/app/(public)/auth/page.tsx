"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useLoadingCallback } from "react-loading-hook";
import {
  InputText,
  InputPassword,
} from "@/components/@materialUI/inputs/texts";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { useSupabaseAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { authFormSchema } from "@/firebase/auth";
import Link from "next/link";

function Page() {
  const { languageData } = useLanguage();
  const auth = languageData?.auth;
  const { signIn } = useSupabaseAuth();

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(authFormSchema),
  });

  const [handleSignIn, isLoading] = useLoadingCallback(
    async ({ email, password }) => {
      console.log(`📝 Auth Page - Form submitted with email: ${email}`);
      try {
        const { data, error } = await signIn(email, password);
        console.log(`📝 Auth Page - signIn result:`, {
          data: !!data,
          error: !!error,
        });

        if (error) {
          console.log(`📝 Auth Page - Sign in error:`, error.message);
          toast.error(auth?.errors.invalidCredential, {
            position: "top-right",
          });
        } else if (data?.user) {
          console.log(
            `📝 Auth Page - Sign in successful, showing success toast`
          );
          // Show success message before redirect
          toast.success(auth?.signIn.toastContents.success, {
            position: "top-right",
          });
        }
      } catch (_error: unknown) {
        console.log(`📝 Auth Page - Sign in exception:`, _error);
        toast.error(auth?.signIn.toastContents.error, {
          position: "top-right",
        });
      }
    }
  );

  return (
    <div className="flex h-full w-full justify-center items-center overflow-auto p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{auth?.signIn.title}</h1>
            <p className="text-sm text-default-500">
              {auth?.signIn.description}
            </p>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex flex-col gap-4"
          >
            <InputText
              name="email"
              control={control}
              field={auth?.fields.email}
            />
            <InputPassword
              name="password"
              control={control}
              isRequired={true}
            />
            <div className="text-right">
              <Link
                href="/auth/reset-password"
                className="text-sm text-primary hover:underline"
              >
                {auth?.resetPassword?.forgotPassword}
              </Link>
            </div>
            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              isDisabled={!isValid}
            >
              {auth?.signIn.button}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Page;
