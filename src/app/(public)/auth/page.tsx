"use client";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Card, CardBody, CardHeader, cn} from "@nextui-org/react";
import {useLoadingCallback} from "react-loading-hook";
import {
  InputText,
  InputPassword,
} from "@/components/@materialUI/inputs/texts";
import {useLanguage} from "@/contexts/language/LanguageContext";
import {signIn} from "@/firebase/auth/functions";
import {
  authFormSchema,
  AuthSchema,
} from "@/firebase/firestore/collections/users/validations";

function Page() {
  const {languageData} = useLanguage();
  const auth = languageData?.auth;
  const fields = languageData?.inputs.users.fields;

  const {
    control,
    formState: {isValid},
    handleSubmit,
  } = useForm<AuthSchema>({
    mode: "onChange",
    resolver: zodResolver(authFormSchema),
  });

  const [handleSignIn, isLoading] = useLoadingCallback(
    async ({email, password}: AuthSchema) => {
      try {
        await signIn(email, password);
      } catch (error: any) {
        console.log(error.code);
        switch (error.code) {
          case "auth/invalid-credential": {
            toast.error(auth?.errors.invalidCredential, {
              position: "top-right",
            });
          }
          case "incorrectPassword": {
            break;
          }
          default: {
            toast.error(auth?.signIn.toastContents.error, {
              position: "top-right",
            });
            break;
          }
        }
      }
    }
  );

  return (
    <div className="flex h-full w-full justify-center items-center overflow-auto p-4">
      <Card
        isBlurred
        className={cn(
          "w-full h-fit md:p-0 md:w-[600px]",
          "rounded-2xl border-2 flex justify-center items-center shadow-lg"
        )}
      >
        <CardHeader className="flex-col items-center">
          <p className="font-extrabold text-lg text-center">
            {auth?.signIn.header}
          </p>
        </CardHeader>
        <CardBody>
          <div className="flex-col items-center gap-2 space-y-4">
            <InputText name="email" field={fields?.email} control={control} />
            <InputPassword control={control} />
            <Button
              className="w-full"
              color="primary"
              variant="solid"
              onClick={() => handleSubmit(handleSignIn)()}
              isDisabled={!isValid}
              isLoading={isLoading}
            >
              {auth?.signIn.signIn}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Page;
