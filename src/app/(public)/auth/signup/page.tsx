"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useLoadingCallback } from "react-loading-hook";
import {
  InputText,
  InputPassword,
} from "@/components/@materialUI/inputs/texts";

import InputPhone from "@/components/@materialUI/inputs/texts/InputPhone";
import InputGender from "@/components/@materialUI/inputs/select/gender";
import InputCountry from "@/components/@materialUI/inputs/select/country";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { toast } from "sonner";
import { signupFormSchema, SignupSchema } from "@/lib/validations";
import { useRouter, useSearchParams } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function SignupPage() {
  const { languageData, changeLanguage, language } = useLanguage();
  const auth = languageData?.auth;
  const supabase = useSupabaseClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [invitedUser, setInvitedUser] = useState<{
    id: string;
    email: string;
    token: string;
    expires_at: string;
    accepted: boolean;
    invited_by: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
  } = useForm<SignupSchema>({
    mode: "onChange",
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      gender: "men",
    },
  });

  // Language switcher component
  const LanguageSwitcher = () => (
    <div className="absolute top-4 right-4">
      <Button
        size="sm"
        variant="bordered"
        onClick={() => changeLanguage(language === "en" ? "fr" : "en")}
      >
        {language === "en" ? "🇫🇷 Français" : "🇺🇸 English"}
      </Button>
    </div>
  );

  useEffect(() => {
    const token = searchParams.get("token");
    console.log("🔍 Token from URL:", token);
    console.log("🔍 Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("🔍 Supabase client:", supabase);

    const validateInvitationToken = async () => {
      try {
        if (!token) {
          console.log("❌ No token found in URL");
          setErrorMessage("No token found in URL");
          // router.push("/auth/reset-password");
          return;
        }

        console.log("🔍 Checking token in database:", token);
        // Check if the invitation token exists and is valid
        const { data: invitedUserData, error } = await supabase
          .from("invited_users")
          .select("*")
          .eq("token", token)
          .single();

        console.log("📊 Database response:", { data: invitedUserData, error });

        if (error || !invitedUserData) {
          console.log("❌ Token not found or database error:", error);
          setErrorMessage(
            `Token not found or database error: ${
              error?.message || "No data returned"
            }`
          );
          // router.push("/auth/reset-password");
          return;
        }

        console.log("✅ Token found, checking expiration...");
        console.log("📅 Expires at:", invitedUserData.expires_at);
        console.log("📅 Current time:", new Date());

        // Check if token is expired
        if (new Date() > new Date(invitedUserData.expires_at)) {
          console.log("❌ Token expired");
          setErrorMessage("Token expired");
          // router.push("/auth/reset-password");
          return;
        }

        // Check if token is already accepted
        if (invitedUserData.accepted) {
          console.log("❌ Token already used");
          setErrorMessage("Token already used");
          // router.push("/auth/reset-password");
          return;
        }

        console.log("✅ Token is valid!");
        setInvitedUser(invitedUserData);
        setIsValidToken(true);
      } catch (error) {
        console.error("❌ Error validating token:", error);
        setErrorMessage("Error validating token");
        // router.push("/auth/reset-password");
      } finally {
        setIsLoading(false);
      }
    };

    validateInvitationToken();
  }, [searchParams, supabase]);

  const [handleSignup, isSigningUp] = useLoadingCallback(
    async (formData: SignupSchema) => {
      try {
        const token = searchParams.get("token");
        if (!token || !invitedUser) {
          toast.error(auth?.signup?.errors.invalidToken, {
            position: "top-right",
          });
          return;
        }

        const firstName = formData.fullName.trim();

        const { data: authData, error: authError } = await supabase.auth.signUp(
          {
            email: invitedUser.email,
            password: formData.password,
          }
        );

        if (authError) {
          console.error("Auth error:", authError);
          toast.error(
            `${auth?.signup?.errors.signupFailed}: ${authError.message}`,
            {
              position: "top-right",
            }
          );
          return;
        }

        if (authData.user) {
          // Format phone number for storage (keep E.164 format)
          const formattedPhoneNumber = formData.phoneNumber;

          // Get country code with + for country_code field
          let countryCodeWithPlus = "";
          if (formData.phoneNumber && formData.phoneNumber.startsWith("+")) {
            // Extract country code with + (e.g., "+213", "+33")
            const match = formData.phoneNumber.match(/^\+(\d{1,3})/);
            if (match) {
              countryCodeWithPlus = `+${match[1]}`;
            }
          }

          const { error: userError } = await supabase.from("users").insert({
            id: authData.user.id,
            uid: authData.user.id,
            email: invitedUser.email,
            first_name: firstName,
            last_name: "",
            phone_number: formattedPhoneNumber, // Keep E.164 format like "+33 0636752182"
            country_code: countryCodeWithPlus, // Store "+213" format
            country_id: formData.country, // Store "DZ" format
            birthday: formData.birthday,
            gender: formData.gender,
            invited_by: invitedUser.invited_by,
          });

          if (userError) {
            console.error("User insert error:", userError);
            toast.error(
              `${auth?.signup?.errors.signupFailed}: ${userError.message}`,
              {
                position: "top-right",
              }
            );
            return;
          }

          const { error: updateError } = await supabase
            .from("invited_users")
            .update({ accepted: true })
            .eq("token", token);

          if (updateError) {
            console.error("Update invitation error:", updateError);
          }

          setIsSuccess(true);
          toast.success("Account created successfully!", {
            position: "top-right",
          });
        }
      } catch (error) {
        console.error("Signup error:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        toast.error(`${auth?.signup?.errors.signupFailed}: ${errorMessage}`, {
          position: "top-right",
        });
      }
    }
  );

  if (isLoading) {
    return (
      <div className="flex h-full w-full justify-center items-center overflow-auto p-4 relative">
        <LanguageSwitcher />
        <Card className="w-full max-w-md border-none md:border shadow-none md:shadow">
          <CardBody className="flex flex-col gap-4">
            <div className="text-center">
              <p className="text-sm text-default-500">
                {auth?.signup?.loading}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (!isValidToken || errorMessage) {
    return (
      <div className="flex h-full w-full justify-center items-center overflow-auto p-4 relative">
        <LanguageSwitcher />
        <Card className="w-full max-w-md border-none md:border shadow-none md:shadow">
          <CardHeader className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-2xl font-bold text-danger">
                Token Validation Error
              </h1>
              <p className="text-sm text-default-500">
                {errorMessage || auth?.signup?.invalidToken}
              </p>
            </div>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <div className="text-center">
              <p className="text-sm text-default-500 mb-4">
                {auth?.signup?.appDownload?.title}
              </p>
              <div className="flex flex-col gap-2">
                <Button
                  as="a"
                  href="https://play.google.com/store/apps/details?id=com.lemsainnovation.lightnessworld&pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  variant="bordered"
                  className="w-full"
                  startContent={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                  }
                >
                  {auth?.signup?.appDownload?.androidButton}
                </Button>
                <Button
                  as="a"
                  href="https://apps.apple.com/us/app/lightness/id6741383097"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  variant="bordered"
                  className="w-full"
                  startContent={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                    </svg>
                  }
                >
                  {auth?.signup?.appDownload?.iosButton}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex h-full w-full justify-center items-center overflow-auto p-4 relative">
        <LanguageSwitcher />
        <Card className="w-full max-w-md border-none md:border shadow-none md:shadow">
          <CardHeader className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">
                {auth?.signup?.success.title}
              </h1>
              <p className="text-sm text-default-500">
                {auth?.signup?.success.description}
              </p>
            </div>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <div className="text-center">
              <p className="text-sm text-default-500 mb-4">
                {auth?.signup?.appDownload?.title}
              </p>
              <div className="flex flex-col gap-2">
                <Button
                  as="a"
                  href="https://play.google.com/store/apps/details?id=com.lemsainnovation.lightnessworld&pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  variant="bordered"
                  className="w-full"
                  startContent={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                  }
                >
                  {auth?.signup?.appDownload?.androidButton}
                </Button>
                <Button
                  as="a"
                  href="https://apps.apple.com/us/app/lightness/id6741383097"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  variant="bordered"
                  className="w-full"
                  startContent={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                    </svg>
                  }
                >
                  {auth?.signup?.appDownload?.iosButton}
                </Button>
              </div>
            </div>
            <Button
              color="primary"
              className="w-full"
              onClick={() => router.push("/auth/reset-password")}
            >
              {auth?.signup?.success.button}
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full justify-center items-center overflow-auto p-4 relative">
      <LanguageSwitcher />
      <Card className="w-full max-w-md border-none md:border shadow-none md:shadow">
        <CardHeader className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{auth?.signup?.title}</h1>
            <p className="text-sm text-default-500">
              {auth?.signup?.description}
            </p>
            <p className="text-xs text-default-400">
              Email: {invitedUser?.email}
            </p>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <form
            onSubmit={handleSubmit(handleSignup)}
            className="flex flex-col gap-4"
          >
            <InputText
              name="fullName"
              control={control}
              field={{
                label: auth?.fields.fullName?.label || "Full Name",
                placeholder:
                  auth?.fields.fullName?.placeholder || "Enter your full name",
              }}
              isRequired={true}
            />

            {/* Mobile-friendly date input */}
            <div className="w-full">
              <label className="text-sm font-medium text-foreground mb-3 block">
                {auth?.fields.birthday?.label || "Date of Birth"}
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors border-default-300"
                onChange={(e) => {
                  const date = e.target.value
                    ? new Date(e.target.value)
                    : undefined;
                  // Set the value in the form
                  setValue("birthday", date);
                }}
                max={(() => {
                  const today = new Date();
                  const minAge = new Date(
                    today.getFullYear() - 18,
                    today.getMonth(),
                    today.getDate()
                  );
                  return minAge.toISOString().split("T")[0];
                })()}
                min={(() => {
                  const today = new Date();
                  const maxAge = new Date(
                    today.getFullYear() - 100,
                    today.getMonth(),
                    today.getDate()
                  );
                  return maxAge.toISOString().split("T")[0];
                })()}
              />
            </div>

            <InputGender
              name="gender"
              control={control}
              field={auth?.fields.gender}
            />

            <InputPhone
              name="phoneNumber"
              control={control}
              field={{
                label: auth?.fields.phoneNumber?.label || "Phone Number",
                placeholder:
                  auth?.fields.phoneNumber?.placeholder ||
                  "Enter your phone number",
              }}
            />

            <InputCountry
              name="country"
              control={control}
              field={auth?.fields.country}
            />

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
              isLoading={isSigningUp}
              isDisabled={!isValid}
            >
              {auth?.signup?.button}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default SignupPage;
