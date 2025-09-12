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
import { newPasswordFormSchema } from "@/lib/validations";
import { useRouter, useSearchParams } from "next/navigation";

function ConfirmResetPasswordPage() {
  const { languageData } = useLanguage();
  const auth = languageData?.auth;
  const { verifyResetToken, updatePassword } = useSupabaseAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"loading" | "password" | "success">(
    "loading"
  );
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Form for password update
  const {
    control: passwordControl,
    formState: { isValid: isPasswordValid },
    handleSubmit: handlePasswordSubmit,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(newPasswordFormSchema),
  });

  // Auto-verify token from URL on component mount
  useEffect(() => {
    const verifyTokenFromUrl = async () => {
      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (!token || !email) {
        toast.error(auth?.confirmPassword?.errors.invalidToken, {
          position: "top-right",
        });
        router.push("/auth/reset-password");
        return;
      }

      setIsVerifying(true);
      try {
        const { data, error } = await verifyResetToken(email, token);

        if (error) {
          toast.error(auth?.confirmPassword?.errors.invalidToken, {
            position: "top-right",
          });
          router.push("/auth/reset-password");
        } else {
          setEmail(email);
          setStep("password");
          toast.success("Verification successful! Now set your new password.", {
            position: "top-right",
          });
        }
      } catch (error) {
        toast.error(auth?.confirmPassword?.errors.updateFailed, {
          position: "top-right",
        });
        router.push("/auth/reset-password");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyTokenFromUrl();
  }, [searchParams, verifyResetToken, router]);

  const [handleUpdatePassword, isUpdating] = useLoadingCallback(
    async ({ password }) => {
      try {
        const { error } = await updatePassword(password);

        if (error) {
          toast.error(auth?.confirmPassword?.errors.updateFailed, {
            position: "top-right",
          });
        } else {
          setStep("success");
          toast.success(
            auth?.confirmPassword?.success?.title ||
              "Password updated successfully!",
            {
              position: "top-right",
            }
          );
        }
      } catch (error) {
        toast.error(auth?.confirmPassword?.errors.updateFailed, {
          position: "top-right",
        });
      }
    }
  );

  if (step === "loading") {
    return (
      <div className="flex h-full w-full justify-center items-center overflow-auto p-4">
        <Card className="w-full max-w-md">
          <CardBody className="flex flex-col gap-4">
            <div className="text-center">
              <p className="text-sm text-default-500">
                {isVerifying ? auth?.confirmPassword?.loading : "Loading..."}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="flex h-full w-full justify-center items-center overflow-auto p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">
                {auth?.confirmPassword?.success?.title}
              </h1>
              <p className="text-sm text-default-500">
                {auth?.confirmPassword?.success?.description}
              </p>
            </div>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Button
              color="primary"
              className="w-full"
              onClick={() => router.push("/auth/signin")}
            >
              {auth?.confirmPassword?.success?.button}
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
            onSubmit={handlePasswordSubmit(handleUpdatePassword)}
            className="flex flex-col gap-4"
          >
            <InputPassword
              name="password"
              control={passwordControl}
              isRequired={true}
            />
            <InputPassword
              name="confirmPassword"
              control={passwordControl}
              isRequired={true}
            />
            <Button
              type="submit"
              color="primary"
              isLoading={isUpdating}
              isDisabled={!isPasswordValid}
            >
              {auth?.confirmPassword?.button}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default ConfirmResetPasswordPage;
